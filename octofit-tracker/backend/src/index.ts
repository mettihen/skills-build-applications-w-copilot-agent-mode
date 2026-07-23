import express from 'express';
import { apiBaseUrl } from './config/api';
import './config/database';
import { activitiesRouter } from './routes/activities';
import { leaderboardRouter } from './routes/leaderboard';
import { teamsRouter } from './routes/teams';
import { usersRouter } from './routes/users';
import { workoutsRouter } from './routes/workouts';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening at ${apiBaseUrl}`);
});
