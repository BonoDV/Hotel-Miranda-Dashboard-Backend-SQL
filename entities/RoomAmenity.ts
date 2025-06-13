import { Entity, PrimaryColumn } from "typeorm";

@Entity("room_amenities")
export class RoomAmenity {
  @PrimaryColumn()
  roomNumber!: number;

  @PrimaryColumn()
  amenity_id!: number;
}
