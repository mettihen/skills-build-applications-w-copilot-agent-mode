import { User, UserDocument } from '../models/User';
import { createResourceRouter } from './resourceRouter';

export const usersRouter = createResourceRouter<UserDocument>(User);