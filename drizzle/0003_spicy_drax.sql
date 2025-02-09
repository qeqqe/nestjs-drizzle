CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_to_categories" (
	"post_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "posts_to_categories_category_id_post_id_pk" PRIMARY KEY("category_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "posts_to_categories" ADD CONSTRAINT "posts_to_categories_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_to_categories" ADD CONSTRAINT "posts_to_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;