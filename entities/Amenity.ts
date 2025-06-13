import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Room } from "./Room";

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
