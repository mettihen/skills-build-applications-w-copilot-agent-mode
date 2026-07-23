import { Activity, ActivityDocument } from '../models/Activity';
import { createResourceRouter } from './resourceRouter';

export const activitiesRouter = createResourceRouter<ActivityDocument>(Activity, {
  sort: { completedAt: -1 },
});