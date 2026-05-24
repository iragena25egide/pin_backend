import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1779630807388 implements MigrationInterface {
    name = 'InitialMigration1779630807388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'editor', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "bio" text, "role" "public"."users_role_enum" NOT NULL DEFAULT 'admin', "is_active" boolean NOT NULL DEFAULT true, "has_changed_credentials" boolean NOT NULL DEFAULT false, "last_login" TIMESTAMP, "password_reset_token" character varying, "password_reset_expires" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying, "content" text NOT NULL, "excerpt" text, "author" character varying, "image" character varying, "category" character varying, "views" integer NOT NULL DEFAULT '0', "is_sponsored" boolean NOT NULL DEFAULT false, "is_featured" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying, "description" text, "video_url" character varying, "youtube_video_id" character varying, "thumbnail" character varying, "type" character varying NOT NULL DEFAULT 'upload', "category" character varying, "views" integer NOT NULL DEFAULT '0', "is_live" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5dbcc1ee100f853490582eccc71" UNIQUE ("slug"), CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "post_id" integer, "video_id" integer, "content" text NOT NULL, "user_id" integer, "author_name" character varying NOT NULL DEFAULT 'Anonymous', "author_email" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ads_position_enum" AS ENUM('header', 'sidebar', 'between_posts', 'footer', 'top')`);
        await queryRunner.query(`CREATE TYPE "public"."ads_type_enum" AS ENUM('banner', 'video', 'sponsored')`);
        await queryRunner.query(`CREATE TABLE "ads" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "image_url" character varying, "video_url" character varying, "link" character varying, "position" "public"."ads_position_enum" NOT NULL DEFAULT 'sidebar', "type" "public"."ads_type_enum" NOT NULL DEFAULT 'banner', "start_date" TIMESTAMP, "end_date" TIMESTAMP, "clicks" integer NOT NULL DEFAULT '0', "impressions" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "post_id" integer, "video_id" integer, "comment_id" integer, "user_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscribers" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying, "is_active" boolean NOT NULL DEFAULT true, "subscribed_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1a7163c08f0e57bd1c9821508b1" UNIQUE ("email"), CONSTRAINT "PK_cbe0a7a9256c826f403c0236b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_messages" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "subject" character varying NOT NULL, "message" text NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b74f96eb2edd977ccfba6533293" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact_messages"`);
        await queryRunner.query(`DROP TABLE "subscribers"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "ads"`);
        await queryRunner.query(`DROP TYPE "public"."ads_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ads_position_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
