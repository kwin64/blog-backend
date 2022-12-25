import mongoose from 'mongoose';

const UserModel = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserModel);
