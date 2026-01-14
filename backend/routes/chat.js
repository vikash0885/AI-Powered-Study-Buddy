import express from 'express';
import db from '../config/database.js';
import { authMiddleware } from '../middleware/auth.js';
import { generateAIResponse } from '../config/ai.js';

const router = express.Router();

// Send message to AI
router.post('/message', authMiddleware, async (req, res) => {
    try {
        const { message, conversationId, subject } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        let convId = conversationId;

        // Create new conversation if not provided
        if (!convId) {
            const title = message.substring(0, 50) + (message.length > 50 ? '...' : '');
            const result = await db.prepare(
                'INSERT INTO conversations (user_id, title, subject) VALUES (?, ?, ?)'
            ).run(req.userId, title, subject || 'General');

            convId = result.lastInsertRowid;
        }

        // Verify conversation belongs to user
        const conversation = await db.prepare(
            'SELECT * FROM conversations WHERE id = ? AND user_id = ?'
        ).get(convId, req.userId);

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Save user message
        await db.prepare(
            'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)'
        ).run(convId, 'user', message);

        // Get conversation history
        const history = await db.prepare(
            'SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC'
        ).all(convId);

        // Generate AI response
        const aiResponse = await generateAIResponse(message, history.slice(0, -1), subject);

        // Save AI response
        await db.prepare(
            'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)'
        ).run(convId, 'assistant', aiResponse);

        // Update conversation timestamp
        await db.prepare(
            'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?'
        ).run(convId);

        res.json({
            conversationId: convId,
            message: aiResponse
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: error.message || 'Failed to process message' });
    }
});

// Get user's conversations
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const conversations = await db.prepare(`
      SELECT 
        c.id, 
        c.title, 
        c.subject, 
        c.created_at, 
        c.updated_at,
        COUNT(m.id) as message_count
      FROM conversations c
      LEFT JOIN messages m ON c.id = m.conversation_id
      WHERE c.user_id = ?
      GROUP BY c.id
      ORDER BY c.updated_at DESC
    `).all(req.userId);

        res.json(conversations);
    } catch (error) {
        console.error('History error:', error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});

// Get specific conversation with messages
router.get('/conversation/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Get conversation
        const conversation = await db.prepare(
            'SELECT * FROM conversations WHERE id = ? AND user_id = ?'
        ).get(id, req.userId);

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Get messages
        const messages = await db.prepare(
            'SELECT id, role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at ASC'
        ).all(id);

        res.json({
            ...conversation,
            messages
        });
    } catch (error) {
        console.error('Get conversation error:', error);
        res.status(500).json({ error: 'Failed to fetch conversation' });
    }
});

// Delete conversation
router.delete('/conversation/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.prepare(
            'DELETE FROM conversations WHERE id = ? AND user_id = ?'
        ).run(id, req.userId);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        console.error('Delete conversation error:', error);
        res.status(500).json({ error: 'Failed to delete conversation' });
    }
});

export default router;
