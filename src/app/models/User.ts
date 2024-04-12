import { Address } from './Address';
import { UserType } from './enums/UserType';

export interface User {
  id: string;
  name: string;
  cpf: string;
  birthday: string;
  email: string;
  password: string
  userType: UserType;
  address: Address;
}
