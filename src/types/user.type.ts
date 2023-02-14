export type UserType = 'обычный' | 'pro';

export type User = {
  name: string;
  email: string;
  avatar: string;
  type: UserType;
}
