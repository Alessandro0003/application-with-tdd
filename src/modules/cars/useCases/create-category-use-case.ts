import { CreateCarsDTO } from "../dtos/create-cars";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: any) {}

  async execute({ name, description }: CreateCarsDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    this.categoryRepository.create({ name, description });
  }
}