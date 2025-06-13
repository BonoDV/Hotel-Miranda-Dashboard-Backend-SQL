import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Room } from "./Room";
import { Amenity } from "./Amenity";

@Entity()
export class RoomAmenity {
  @PrimaryColumn()
  roomNumber!: number;

  @PrimaryColumn()
  amenity_id!: number;

  @ManyToOne(() => Room, (room) => room.roomAmenities)
  @JoinColumn({ name: "roomNumber" })
  room!: Room;

  @ManyToOne(() => Amenity)
  @JoinColumn({ name: "amenity_id" })
  amenity!: Amenity;
}
