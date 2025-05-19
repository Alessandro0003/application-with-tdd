import { Cars } from "../infra/typeorm/entities/cars";

export class CreateCarsDTO extends Cars {
  declare name: string;
  declare description: string;
}