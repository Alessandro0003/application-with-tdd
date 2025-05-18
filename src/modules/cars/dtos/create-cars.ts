import { Cars } from "../entities/cars";

export class CreateCarsDTO extends Cars {
  declare name: string;
  declare description: string;
}