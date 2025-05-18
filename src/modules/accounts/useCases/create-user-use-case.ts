
interface CreateUserUseCaseProps {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: any) {}

  async create({ name, email, password, driver_license }: CreateUserUseCaseProps): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    this.usersRepository.create({
      name,
      email,
      password,
      driver_license
    });
  }
}