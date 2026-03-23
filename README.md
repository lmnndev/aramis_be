npm init -y

change the type to module to allow import/export

npm install -D typescript tsx @types/node @types/express

initiate tsconfig
npx tsc --init 

DRIZZLE ORM
npm i drizzle-orm @neondatabase/serverless

npm i -D drizzle-kit

## INSERT A DATA

``INSERT INTO cars (make, model, year, price)
VALUES ('BMW','4 Series', 2022, 2800)``


## INSERT MULTIPLE DATA ONE AT A TIME

``INSERT INTO cars (make, model, year, price)
VALUES 
('BMW','4 Series', 2022, 2800),
('TYT','4 Series', 2022, 2800),
('OKIE','4 Series', 2022, 2800),
('YEY','4 Series', 2022, 2800)``


## RETRIEVING DATA

``SELECT make, model FROM cars;``



## CONDITIONALS SELECT

```SELECT * FROM cars where year = 2022;```


```SELECT * FROM cars where year = 2022 AND PRICE < 270000;```

```SELECT * FROM cars where year = 2022 AND PRICE > 2200 ORDER BY PRICE;```

## LIMITS

SELECT * FROM cars ORDER BY price ASC LIMIT 3;

## UPDATE

UPDATE cars SET price = 26000 WHERE ID = 2;

## DELETE

DELETE FROM cars WHERE ID = 2;


## RAILWAY
IMPLEMENT