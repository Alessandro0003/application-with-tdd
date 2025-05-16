
interface CreateCategoryProps {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoryRepository: any) {}

  async execute({ name, description }: CreateCategoryProps): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    this.categoryRepository.create({ name, description });
  }
}