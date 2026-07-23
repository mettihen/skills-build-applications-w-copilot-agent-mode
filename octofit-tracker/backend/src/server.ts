import express from 'express';
import './config/database';
import { activitiesRouter } from './routes/activities';
import { leaderboardRouter } from './routes/leaderboard';
import { teamsRouter } from './routes/teams';
import { usersRouter } from './routes/users';
import { workoutsRouter } from './routes/workouts';

const app = express();
const apiPort = Number(process.env.PORT) || 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const localhostUrl = `http://localhost:${apiPort}`;

const codespace_url = CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev` : undefined;
const apiBaseUrl = codespace_url ?? localhostUrl;

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    ...(CODESPACE_NAME ? [`https://${CODESPACE_NAME}-5173.app.github.dev`] : []),
  ]);

  if (typeof origin === 'string' && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

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

app.listen(apiPort, () => {
  console.log(`OctoFit backend listening at ${apiBaseUrl}`);
});