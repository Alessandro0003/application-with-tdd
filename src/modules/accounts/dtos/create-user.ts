import { User } from "../infra/typeorm/entities/user";

export class CreateUserDTO extends User {
  declare name: string;
  declare email: string;
  declare password: string;
  declare driver_license: string;
}