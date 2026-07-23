import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.create([
      { name: 'Octo Runners', mascot: 'Dash' },
      { name: 'Core Crushers', mascot: 'Flex' },
      { name: 'Trail Blazers', mascot: 'Summit' },
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', username: 'mayafit', team: teams[0]._id },
      { name: 'Jordan Blake', email: 'jordan.blake@example.com', username: 'jblake', team: teams[0]._id },
      { name: 'Priya Shah', email: 'priya.shah@example.com', username: 'priyapower', team: teams[1]._id },
      { name: 'Sam Rivera', email: 'sam.rivera@example.com', username: 'samsteps', team: teams[2]._id },
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', username: 'alexmoves', team: teams[2]._id },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[1]._id] }),
      Team.findByIdAndUpdate(teams[1]._id, { members: [users[2]._id] }),
      Team.findByIdAndUpdate(teams[2]._id, { members: [users[3]._id, users[4]._id] }),
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 42, points: 420, completedAt: new Date('2026-07-18T13:30:00Z') },
      { user: users[1]._id, type: 'cycling', durationMinutes: 55, points: 460, completedAt: new Date('2026-07-19T10:15:00Z') },
      { user: users[2]._id, type: 'strength training', durationMinutes: 38, points: 390, completedAt: new Date('2026-07-20T18:45:00Z') },
      { user: users[3]._id, type: 'hiking', durationMinutes: 75, points: 510, completedAt: new Date('2026-07-21T14:00:00Z') },
      { user: users[4]._id, type: 'yoga', durationMinutes: 30, points: 240, completedAt: new Date('2026-07-22T07:20:00Z') },
      { user: users[0]._id, type: 'rowing', durationMinutes: 28, points: 310, completedAt: new Date('2026-07-22T16:10:00Z') },
    ]);

    await LeaderboardEntry.create([
      { user: users[3]._id, team: teams[2]._id, points: 510, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 460, rank: 2 },
      { user: users[0]._id, team: teams[0]._id, points: 420, rank: 3 },
      { user: users[2]._id, team: teams[1]._id, points: 390, rank: 4 },
      { user: users[4]._id, team: teams[2]._id, points: 240, rank: 5 },
    ]);

    await Workout.create([
      {
        title: 'Morning Momentum Run',
        description: 'A steady aerobic run with a short stride finish for daily conditioning.',
        difficulty: 'beginner',
        durationMinutes: 35,
        activityTypes: ['running', 'mobility'],
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'Compound lifts and bodyweight intervals for balanced strength development.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        activityTypes: ['strength training', 'conditioning'],
      },
      {
        title: 'Summit Endurance Builder',
        description: 'Hill repeats and loaded carries designed for longer trail efforts.',
        difficulty: 'advanced',
        durationMinutes: 60,
        activityTypes: ['hiking', 'strength training'],
      },
      {
        title: 'Recovery Flow',
        description: 'Low-impact movement and breath work for active recovery days.',
        difficulty: 'beginner',
        durationMinutes: 25,
        activityTypes: ['yoga', 'mobility'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
