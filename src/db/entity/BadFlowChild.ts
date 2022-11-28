import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BadFlowParent } from "@app/db/entity/BadFlowParent";

@Entity()
export class BadFlowChild {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => BadFlowParent, (object) => object.child)
  parent!: BadFlowParent;

  @Column()
  content!: string;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
