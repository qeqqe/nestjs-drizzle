CREATE TABLE "profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"age" integer,
	"bio" text,
	"user_id" uuid
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;