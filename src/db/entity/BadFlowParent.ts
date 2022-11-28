import {
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BadFlowChild } from "@app/db/entity/BadFlowChild";
import { BadFlowRoot } from "@app/db/entity/BadFlowRoot";

@Entity()
export class BadFlowParent {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => BadFlowRoot, (object) => object.child)
  root!: BadFlowRoot;

  @OneToMany(() => BadFlowChild, (object) => object.parent)
  child!: BadFlowChild[];

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
