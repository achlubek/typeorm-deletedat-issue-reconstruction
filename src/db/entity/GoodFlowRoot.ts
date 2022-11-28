import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { GoodFlowParent } from "@app/db/entity/GoodFlowParent";

@Entity()
export class GoodFlowRoot {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => GoodFlowParent, (object) => object.root, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  child!: GoodFlowParent;
}
