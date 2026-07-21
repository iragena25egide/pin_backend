"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsEvent1782388117438 = void 0;
class AnalyticsEvent1782388117438 {
    constructor() {
        this.name = 'AnalyticsEvent1782388117438';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "analytics_events" ("id" SERIAL NOT NULL, "event_type" character varying NOT NULL, "payload" jsonb, "visitor_id" character varying, "ip_address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5d643d67a09b55653e98616f421" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "category" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "category" character varying`);
        await queryRunner.query(`DROP TABLE "analytics_events"`);
    }
}
exports.AnalyticsEvent1782388117438 = AnalyticsEvent1782388117438;
//# sourceMappingURL=1782388117438-AnalyticsEvent.js.map