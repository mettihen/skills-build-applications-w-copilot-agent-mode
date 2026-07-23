import mongoose, { Schema, Types } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  username: string;
  team?: Types.ObjectId;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true, trim: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);