import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.substring(7);

        // Verify token
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback_study_buddy_secret_2024';
        const decoded = jwt.verify(token, JWT_SECRET);

        // Add user info to request
        req.userId = decoded.userId;
        req.userEmail = decoded.email;

        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
