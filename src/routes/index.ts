import express from 'express';
import dashboardRouter from './dashboardRouter';
import projectRouter from './projectRouter';

const router = express.Router();

router.use('/dashboard', dashboardRouter);
router.use('/project', projectRouter);

export default router;
