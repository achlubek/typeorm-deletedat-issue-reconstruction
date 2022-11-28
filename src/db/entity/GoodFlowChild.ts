import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { GoodFlowParent } from "@app/db/entity/GoodFlowParent";

@Entity()
export class GoodFlowChild {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => GoodFlowParent, (object) => object.child)
  parent!: GoodFlowParent;

  @Column()
  content!: string;
}
