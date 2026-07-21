import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AnalyticsEvent1782388117438 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
