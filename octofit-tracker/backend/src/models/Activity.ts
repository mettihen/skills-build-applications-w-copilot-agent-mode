import mongoose, { Schema, Types } from 'mongoose';

export interface ActivityDocument {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  points: number;
  completedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);