import { User } from './user.type';

export type Comment = {
  text: string;
  issueDate: Date;
  rating: number;
  user: User;
}
