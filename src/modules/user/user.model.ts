// import mongoose from 'mongoose';
// import { User } from '../../types/user.type.js';

// export interface UserDocument extends User, mongoose.Document {
//   createdAt: Date,
//   updatedAt: Date,
// }

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: [2, 'Min length of username is 2'],
//   },
//   email: {
//     type: String,
//     unique: true,
//     match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
//     required: true,
//   },
//   avatar: {
//     type: String,
//     required: true,
//     minlength: [5, 'Min length of avatar path is 5'],
//   },
//   password: String,
//   type: String,
// },{
//   timestamps: true,
// });

// export const UserModel = mongoose.model<UserDocument>('User', userSchema);
