import { randomUUID } from "node:crypto";
import { CreateCarsDTO } from "../../dtos/create-cars";


export class CategoryRepositoryInMemory {

  categories: CreateCarsDTO[] = []

  async findByName(name: string): Promise<CreateCarsDTO | undefined> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list(): Promise<CreateCarsDTO[]> {
    const all = this.categories;
    return all;
  }

  async create({ name, description }: Omit<CreateCarsDTO, "id">): Promise<void> {
    const id = randomUUID();
    const category: CreateCarsDTO = {
      id,
      name,
      description
    };

    this.categories.push(category);
  }
}