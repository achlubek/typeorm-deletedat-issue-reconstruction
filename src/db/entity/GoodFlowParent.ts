import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { GoodFlowChild } from "@app/db/entity/GoodFlowChild";
import { GoodFlowRoot } from "@app/db/entity/GoodFlowRoot";

@Entity()
export class GoodFlowParent {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => GoodFlowRoot, (object) => object.child)
  root!: GoodFlowRoot;

  @OneToMany(() => GoodFlowChild, (object) => object.parent)
  child!: GoodFlowChild[];
}
