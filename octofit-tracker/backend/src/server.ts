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

function buildCodespaceUrl(codespaceName: string) {
  const codespaceHost = `${codespaceName}-${apiPort}.app.github.dev`;
  return `https://${codespaceHost}`;
}

const codespace_url = CODESPACE_NAME ? buildCodespaceUrl(CODESPACE_NAME) : undefined;
const apiBaseUrl = codespace_url ?? localhostUrl;

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

app.listen(apiPort, () => {
  console.log(`OctoFit backend listening at ${apiBaseUrl}`);
});