import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn({ type: "varchar", length: 36 })
  id!: string;

  @Column("text")
  photo!: string;

  @Column({ length: 100 })
  first_name!: string;

  @Column({ length: 100 })
  last_name!: string;

  @Column({ length: 100 })
  job!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 20 })
  phone_number!: string;

  @Column("date")
  start_date!: string;

  @Column({ length: 50 })
  schedule!: string;

  @Column("text")
  function_description!: string;

  @Column({ type: "tinyint", width: 1 })
  status!: number;

  @Column("text")
  password!: string;
}
