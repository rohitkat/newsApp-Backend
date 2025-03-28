import { MigrationInterface, QueryRunner } from "typeorm";

export class PostTitleAdded1742621836956 implements MigrationInterface {
    name = 'PostTitleAdded1742621836956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`Title\` varchar(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` ADD CONSTRAINT \`FK_a6f4f891e79872a57b7c1ca3f69\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` DROP FOREIGN KEY \`FK_a6f4f891e79872a57b7c1ca3f69\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`Title\``);
    }

}
