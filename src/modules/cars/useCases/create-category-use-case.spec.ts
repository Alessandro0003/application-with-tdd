import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { CategoryRepositoryInMemory } from '../repositories/in-memory/category-repository-in-memory';
import { CreateCategoryUseCase } from './create-category-use-case';
import { randomUUID } from 'crypto';

let createCategoryUseCase: CreateCategoryUseCase;
let createCategoryRpositoryInMemory: CategoryRepositoryInMemory;

describe('Create Category', () => {
  beforeAll(() => {})

  beforeEach(() => {
    createCategoryRpositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(createCategoryRpositoryInMemory);
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Teste',
      description: 'Category Teste Description'
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const result = await createCategoryRpositoryInMemory.findByName(category.name);

    expect(result).toHaveProperty('id');
  })

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category Teste',
        description: 'Category Teste Description'
      }

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toThrow('Category already exists');
    
    /** !TODO caso o meu erro estivesse dentro de uma instancia que trata o erro eu passaria da seguinte forma 
     *  .rejects.toInstanceOf(NomeDaFuncaoQueTrataErro)
     */
  })
})
