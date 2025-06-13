import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Booking } from "./Booking";
import { RoomAmenity } from "./RoomAmenity";

@Entity()
export class Room {
  @PrimaryColumn()
  roomNumber!: number;

  @Column({ nullable: true })
  roomType!: string;

  @Column({ nullable: true })
  bedType!: string;

  @Column({ nullable: true })
  roomFloor!: string;

  @Column({ nullable: true, type: "varchar" })
  photos!: string;

  @Column({ nullable: true, type: "text" })
  description!: string;

  @Column({ nullable: true })
  offer!: string;

  @Column({ type: "decimal", nullable: true })
  price!: number;

  @Column({ type: "decimal", nullable: true })
  discount!: number;

  @Column({ nullable: true, type: "text" })
  cancellation!: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings!: Booking[];

  @OneToMany(() => RoomAmenity, (ra) => ra.room)
  roomAmenities!: RoomAmenity[];
}
