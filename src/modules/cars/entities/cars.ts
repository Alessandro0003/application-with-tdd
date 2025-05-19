import { Entity, PrimaryGeneratedColumn, Column, BaseEntity  } from 'typeorm';

@Entity()
export class Cars extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string

  @Column()
  description!: string
}