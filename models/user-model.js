import mongoose from 'mongoose';

const UserModel = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    avatarUrl: { 
      public_id: { type: String, required: true},
      url: { type: String, required: true}
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserModel);
