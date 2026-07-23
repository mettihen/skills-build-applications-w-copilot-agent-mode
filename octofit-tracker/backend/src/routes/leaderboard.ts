import { LeaderboardEntry, LeaderboardEntryDocument } from '../models/LeaderboardEntry';
import { createResourceRouter } from './resourceRouter';

export const leaderboardRouter = createResourceRouter<LeaderboardEntryDocument>(LeaderboardEntry, {
  sort: { points: -1 },
});