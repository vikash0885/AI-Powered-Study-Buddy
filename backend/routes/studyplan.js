import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { generateStudyPlan } from '../config/ai.js';

const router = express.Router();

// Generate study plan
router.post('/generate', authMiddleware, async (req, res) => {
    try {
        const { subject, duration, hoursPerDay } = req.body;

        // Validate input
        if (!subject || !duration || !hoursPerDay) {
            return res.status(400).json({
                error: 'Please provide subject, duration, and hours per day'
            });
        }

        // Generate study plan
        const studyPlan = await generateStudyPlan(subject, duration, hoursPerDay);

        res.json({
            subject,
            duration,
            hoursPerDay,
            plan: studyPlan
        });
    } catch (error) {
        console.error('Study plan error:', error);
        res.status(500).json({ error: error.message || 'Failed to generate study plan' });
    }
});

export default router;
