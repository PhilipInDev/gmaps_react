alter table "public"."capitals" alter column "capital" set not null;
alter table "public"."capitals" add constraint "capitals_capital_key" unique ("capital");
