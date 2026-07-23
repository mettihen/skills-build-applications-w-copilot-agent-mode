import { Team, TeamDocument } from '../models/Team';
import { createResourceRouter } from './resourceRouter';

export const teamsRouter = createResourceRouter<TeamDocument>(Team);