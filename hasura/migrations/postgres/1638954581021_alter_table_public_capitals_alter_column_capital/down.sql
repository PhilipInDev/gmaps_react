alter table "public"."capitals" drop constraint "capitals_capital_key";
alter table "public"."capitals" alter column "capital" drop not null;
