import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['donor', 'receiver', 'admin'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
