import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Room } from "./Room";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true, type: "text" })
  image!: string;

  @Column({ type: "date", nullable: true })
  orderDate!: Date;

  @Column({ type: "date", nullable: true })
  checkIn!: Date;

  @Column({ type: "date", nullable: true })
  checkOut!: Date;

  @Column({ type: "tinyint", nullable: true })
  specialRequest_status!: number;

  @Column({ type: "text", nullable: true })
  specialRequest_text!: string;

  @Column({ nullable: true })
  roomType!: string;

  @Column()
  roomNumber!: number;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: "roomNumber" })
  room!: Room;
}
