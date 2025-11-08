import express from 'express';

const router = express.Router();

// Backend APIs

// View APIs
router.get('/', (req, res) => {
    res.render('dashboard/index', { title: 'Dashboard' });
});


export default router;