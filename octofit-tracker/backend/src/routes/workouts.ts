import { Workout, WorkoutDocument } from '../models/Workout';
import { createResourceRouter } from './resourceRouter';

export const workoutsRouter = createResourceRouter<WorkoutDocument>(Workout);