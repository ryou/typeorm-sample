import { MigrationInterface, QueryRunner } from 'typeorm'

export class Post1570253689867 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "userId" integer)`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "userId" integer, CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
            undefined
        )
        await queryRunner.query(
            `INSERT INTO "temporary_post"("id", "title", "content", "userId") SELECT "id", "title", "content", "userId" FROM "post"`,
            undefined
        )
        await queryRunner.query(`DROP TABLE "post"`, undefined)
        await queryRunner.query(
            `ALTER TABLE "temporary_post" RENAME TO "post"`,
            undefined
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "post" RENAME TO "temporary_post"`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "userId" integer)`,
            undefined
        )
        await queryRunner.query(
            `INSERT INTO "post"("id", "title", "content", "userId") SELECT "id", "title", "content", "userId" FROM "temporary_post"`,
            undefined
        )
        await queryRunner.query(`DROP TABLE "temporary_post"`, undefined)
        await queryRunner.query(`DROP TABLE "post"`, undefined)
    }
}
