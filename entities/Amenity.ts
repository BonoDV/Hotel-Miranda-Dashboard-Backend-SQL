import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("amenities")
export class Amenity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  name!: string;
}
