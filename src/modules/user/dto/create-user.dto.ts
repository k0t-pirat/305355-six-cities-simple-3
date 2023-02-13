import { UserType } from '../../../types/user.type.js';

export default class CreateUserDTO {
  public name!: string;
  public email!: string;
  public avatar!: string;
  public password!: string;
  public type!: UserType;
}
