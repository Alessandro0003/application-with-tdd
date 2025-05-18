import { randomUUID } from "crypto";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

export class UsersRepositoryInMemory {
  users: User[] = [];

  async create({ driver_license, name, email, password }: Omit<User, "id">): Promise<void> {
    const id = randomUUID();
    const user: User = {
      id,
      driver_license,
      name,
      email,
      password,
    }

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);

  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}