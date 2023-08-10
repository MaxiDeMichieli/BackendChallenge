CREATE TABLE "movies" (
    "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    "title" varchar NOT NULL,
    "director" varchar NOT NULL,
    "producer" varchar NOT NULL,
    "releaseDate" varchar NOT NULL,
    "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
    "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
    "deletedAt" datetime
);

CREATE TABLE "users" (
    "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    "firstName" varchar NOT NULL,
    "lastName" varchar NOT NULL,
    "email" varchar NOT NULL,
    "role" varchar NOT NULL,
    "password" varchar NOT NULL,
    "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
    "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
    "deletedAt" datetime,
    CONSTRAINT "uq_email" UNIQUE ("email")
);