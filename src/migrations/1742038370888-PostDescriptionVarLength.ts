import { MigrationInterface, QueryRunner } from "typeorm";

export class PostDescriptionVarLength1742038370888 implements MigrationInterface {
    name = 'PostDescriptionVarLength1742038370888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`CaptionText\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`CaptionText\` varchar(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`Description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`Description\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`Description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`Description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`CaptionText\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`CaptionText\` varchar(255) NOT NULL`);
    }

}
