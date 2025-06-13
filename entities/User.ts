import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @Column({ type: "text", nullable: true })
  photo!: string;

  @Column({ nullable: true })
  first_name!: string;

  @Column({ nullable: true })
  last_name!: string;

  @Column({ nullable: true })
  job!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  phone_number!: string;

  @Column({ type: "date", nullable: true })
  start_date!: Date;

  @Column({ nullable: true })
  schedule!: string;

  @Column({ type: "text", nullable: true })
  function_description!: string;
}
