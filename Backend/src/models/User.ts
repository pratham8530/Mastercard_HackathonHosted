import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export type Role = 'donor' | 'receiver' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: Role;
  userType: string;
  city: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['donor', 'receiver', 'admin'], required: true },
  userType: { type: String, default: 'individual' },
  city: { type: String, default: '' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password!);
};

const User = model<IUser>('User', userSchema);
export default User;