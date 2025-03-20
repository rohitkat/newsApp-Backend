import { MigrationInterface, QueryRunner } from "typeorm";

export class PostListPostRelationshipUpdate1742477807647 implements MigrationInterface {
    name = 'PostListPostRelationshipUpdate1742477807647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign key constraint first
        await queryRunner.query(`ALTER TABLE post_list_detail DROP FOREIGN KEY FK_a6f4f891e79872a57b7c1ca3f69`);
        
        // Drop the index linked to the foreign key
        await queryRunner.query(`DROP INDEX \`REL_a6f4f891e79872a57b7c1ca3f6\` ON \`post_list_detail\``);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate the index
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a6f4f891e79872a57b7c1ca3f6\` ON \`post_list_detail\` (\`postId\`)`);
    
        // Restore the foreign key relationship
        await queryRunner.query(`
            ALTER TABLE post_list_detail 
            ADD CONSTRAINT FK_a6f4f891e79872a57b7c1ca3f69 
            FOREIGN KEY (postId) REFERENCES post(id) 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }
    

}
