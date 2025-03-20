import { MigrationInterface, QueryRunner } from "typeorm";

export class PostListAndPostListDetail1742393989859 implements MigrationInterface {
    name = 'PostListAndPostListDetail1742393989859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Title\` varchar(255) NOT NULL, \`Description\` varchar(255) NOT NULL, \`IsActive\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_list_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`DisplayOrder\` int NOT NULL, \`Priority\` int NOT NULL, \`IsActive\` tinyint NOT NULL, \`postListId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` ADD CONSTRAINT \`FK_2128d889d101ac7f06a1336d0d7\` FOREIGN KEY (\`postListId\`) REFERENCES \`post_list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_list_detail\` DROP FOREIGN KEY \`FK_2128d889d101ac7f06a1336d0d7\``);
        await queryRunner.query(`DROP TABLE \`post_list_detail\``);
        await queryRunner.query(`DROP TABLE \`post_list\``);
    }

}
