import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1669627217572 implements MigrationInterface {
  name = "Base1669627217572";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bad_flow_child" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "deleted_at" TIMESTAMP, "parent_id" uuid, CONSTRAINT "PK_43332329d53507cdbe9a3018634" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bad_flow_root" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP, "child_id" uuid, CONSTRAINT "REL_136140cb2948c06c5c932891c3" UNIQUE ("child_id"), CONSTRAINT "PK_fddf9172e05d2edbf7ae0372588" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bad_flow_parent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d03856b4d202fc11dc3b842f3c0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "good_flow_root" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "child_id" uuid, CONSTRAINT "REL_ebd68232e0f377a78aac36faea" UNIQUE ("child_id"), CONSTRAINT "PK_ee15261057d4b69d07c40669da3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "good_flow_parent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_e1faf2b6651968b1607e4c2757a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "good_flow_child" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "parent_id" uuid, CONSTRAINT "PK_04031bb6ecb25bb095037b247be" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "bad_flow_child" ADD CONSTRAINT "FK_6cd4d3cee362a5905952bee26b9" FOREIGN KEY ("parent_id") REFERENCES "bad_flow_parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bad_flow_root" ADD CONSTRAINT "FK_136140cb2948c06c5c932891c36" FOREIGN KEY ("child_id") REFERENCES "bad_flow_parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "good_flow_root" ADD CONSTRAINT "FK_ebd68232e0f377a78aac36faeaf" FOREIGN KEY ("child_id") REFERENCES "good_flow_parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "good_flow_child" ADD CONSTRAINT "FK_26bf7774e0587a104c8e0e23f67" FOREIGN KEY ("parent_id") REFERENCES "good_flow_parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "good_flow_child" DROP CONSTRAINT "FK_26bf7774e0587a104c8e0e23f67"`
    );
    await queryRunner.query(
      `ALTER TABLE "good_flow_root" DROP CONSTRAINT "FK_ebd68232e0f377a78aac36faeaf"`
    );
    await queryRunner.query(
      `ALTER TABLE "bad_flow_root" DROP CONSTRAINT "FK_136140cb2948c06c5c932891c36"`
    );
    await queryRunner.query(
      `ALTER TABLE "bad_flow_child" DROP CONSTRAINT "FK_6cd4d3cee362a5905952bee26b9"`
    );
    await queryRunner.query(`DROP TABLE "good_flow_child"`);
    await queryRunner.query(`DROP TABLE "good_flow_parent"`);
    await queryRunner.query(`DROP TABLE "good_flow_root"`);
    await queryRunner.query(`DROP TABLE "bad_flow_parent"`);
    await queryRunner.query(`DROP TABLE "bad_flow_root"`);
    await queryRunner.query(`DROP TABLE "bad_flow_child"`);
  }
}
