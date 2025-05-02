CREATE TABLE "user_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"roll_number" varchar NOT NULL,
	"data" jsonb NOT NULL,
	"name" varchar(255) NOT NULL,
	"scores" jsonb NOT NULL
);
