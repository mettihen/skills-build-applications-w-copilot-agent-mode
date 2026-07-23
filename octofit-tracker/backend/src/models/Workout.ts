import mongoose, { Schema } from 'mongoose';

export interface WorkoutDocument {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  activityTypes: string[];
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 0 },
    activityTypes: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);