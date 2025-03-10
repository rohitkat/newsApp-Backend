import { MigrationInterface, QueryRunner } from "typeorm";

export class PostAndCategory1741609453764 implements MigrationInterface {
    name = 'PostAndCategory1741609453764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Title\` varchar(255) NOT NULL, \`ParentCategoryId\` int NOT NULL, \`IsCustomCategory\` tinyint NOT NULL, \`DisplayOrder\` int NOT NULL, \`IsActive\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`CaptionText\` varchar(255) NOT NULL, \`Description\` varchar(255) NOT NULL, \`Image\` varchar(255) NOT NULL, \`Thumbnail\` varchar(255) NOT NULL, \`DisplayOrder\` int NOT NULL, \`CreatedOn\` datetime NOT NULL, \`UpdatedOn\` datetime NOT NULL, \`ActiveTillDate\` datetime NOT NULL, \`IsActive\` tinyint NOT NULL, \`categoryId\` int NULL, \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_1077d47e0112cad3c16bbcea6cd\` FOREIGN KEY (\`categoryId\`) REFERENCES \`post_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_1077d47e0112cad3c16bbcea6cd\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`post_category\``);
    }

}
