import mongoose, { Schema, Types } from 'mongoose';

export interface TeamDocument {
  name: string;
  mascot?: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    mascot: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);