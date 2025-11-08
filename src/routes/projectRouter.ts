import express from 'express';

const router = express.Router();


// Backend APIs

// View APIs

router.get('/', (req, res) => {
    res.render('project/index', { title: 'Project', test: 'THIS IS PROJECT PAGE' });
});

export default router;