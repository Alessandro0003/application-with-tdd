import { randomUUID } from "node:crypto";

interface Category {
  id: string;
  name: string;
  description: string;
}

export class CategoryRepositoryInMemory {

  categories: Category[] = []

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }

  async create({ name, description }: Omit<Category, "id">): Promise<void> {
    const id = randomUUID();
    const category: Category = {
      id,
      name,
      description
    };

    this.categories.push(category);
  }
}