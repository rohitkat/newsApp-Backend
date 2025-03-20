import { MigrationInterface, QueryRunner } from "typeorm";

export class PostListPostRelationship1742476814391 implements MigrationInterface {
    name = 'PostListPostRelationship1742476814391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` ADD \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` ADD UNIQUE INDEX \`IDX_a6f4f891e79872a57b7c1ca3f6\` (\`postId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a6f4f891e79872a57b7c1ca3f6\` ON \`post_list_detail\` (\`postId\`)`);
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` ADD CONSTRAINT \`FK_a6f4f891e79872a57b7c1ca3f69\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` DROP FOREIGN KEY \`FK_a6f4f891e79872a57b7c1ca3f69\``);
        await queryRunner.query(`DROP INDEX \`REL_a6f4f891e79872a57b7c1ca3f6\` ON \`post_list_detail\``);
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` DROP INDEX \`IDX_a6f4f891e79872a57b7c1ca3f6\``);
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` DROP COLUMN \`postId\``);
    }

}
