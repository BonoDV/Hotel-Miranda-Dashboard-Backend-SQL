import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("bookings")
export class Booking {
  @PrimaryColumn({ type: "varchar", length: 36 })
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column("text")
  image!: string;

  @Column("date")
  orderDate!: string;

  @Column("date")
  checkIn!: string;

  @Column("date")
  checkOut!: string;

  @Column({ type: "tinyint", width: 1 })
  specialRequest_status!: number;

  @Column("text")
  specialRequest_text!: string;

  @Column({ length: 50 })
  roomType!: string;

  @Column({ length: 50 })
  status!: string;

  @Column({ length: 20 })
  phone!: string;

  @Column({ length: 100 })
  email!: string;

  @Column()
  roomNumber!: number;
}
