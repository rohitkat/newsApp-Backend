import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCategoryAddURL1742363037385 implements MigrationInterface {
    name = 'PostCategoryAddURL1742363037385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_category\` ADD \`Url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_category\` DROP COLUMN \`Url\``);
    }

}
