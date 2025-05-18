import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";
import { UsersRepositoryInMemory } from "../repositories/in-memory/users-repository-in-memory";
import { CreateUserUseCase } from "./create-user-use-case";
import { CreateUserDTO } from "../dtos/create-user";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able athenticate an user", async () => {
    const user: CreateUserDTO =  {
      driver_license: "123456",
      email: "john.doe@acme.com",
      password: "123456",
      name: "John Doe"
    }

    await createUserUseCase.create(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "notEmail@acme.com",
        password: "123"
      });
    }).rejects.toThrow("Email or password incorrect");

    /** !TODO caso o meu erro estivesse dentro de uma instancia que trata o erro eu passaria da seguinte forma 
     *  .rejects.toInstanceOf(NomeDaFuncaoQueTrataErro)
     */
  });

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
       const user: CreateUserDTO =  {
        driver_license: "666",
        email: "kelly.doe@acme.com",
        password: "123",
        name: "Kelly Doe"
      }
    
      await createUserUseCase.create(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      });
    }).rejects.toThrow("Email or password incorrect"); 

    /** !TODO caso o meu erro estivesse dentro de uma instancia que trata o erro eu passaria da seguinte forma 
     *  .rejects.toInstanceOf(NomeDaFuncaoQueTrataErro)
     */
  })

});