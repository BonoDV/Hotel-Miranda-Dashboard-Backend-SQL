import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn()
  roomNumber!: number;

  @Column({ length: 50 })
  roomType!: string;

  @Column({ length: 50 })
  bedType!: string;

  @Column({ length: 20 })
  roomFloor!: string;

  @Column({ length: 200 })
  photos!: string;

  @Column("text")
  description!: string;

  @Column({ length: 3 })
  offer!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  discount!: number;

  @Column("text")
  cancellation!: string;
}
