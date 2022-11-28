import {
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BadFlowParent } from "@app/db/entity/BadFlowParent";

@Entity()
export class BadFlowRoot {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => BadFlowParent, (object) => object.root, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  child!: BadFlowParent;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
