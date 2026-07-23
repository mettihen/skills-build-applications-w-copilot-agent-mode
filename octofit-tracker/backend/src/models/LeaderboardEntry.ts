import mongoose, { Schema, Types } from 'mongoose';

export interface LeaderboardEntryDocument {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  rank?: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);