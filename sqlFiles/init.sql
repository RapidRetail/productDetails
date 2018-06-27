DROP DATABASE IF EXISTS rapidRetail;

CREATE DATABASE rapidRetail;

USE rapidRetail;

DROP TABLE IF EXISTS colors

CREATE TABLE colors (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(40)
);

DROP TABLE IF EXISTS products_colors

CREATE TABLE products_colors (
    id          SERIAL PRIMARY KEY,
    product_id  INT,
    color_id    INT
);

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100),
    price       VARCHAR(10),
    description TEXT,
    size        INT[],
    fabric      VARCHAR(100),
    care        VARCHAR(100),
    features    VARCHAR(100)
);

COPY products_colors(product_id, color_id) FROM '/Users/grantyang/RapidRetail/productDetails/data_generators/mockProductColors.tsv' DELIMITER E'\t';

COPY colors(name) FROM '/Users/grantyang/RapidRetail/productDetails/data_generators/mockColors.tsv' DELIMITER E'\t';

COPY products(title, price, description, size, fabric, care, features) FROM '/Users/grantyang/RapidRetail/productDetails/data_generators/mockProductDetails.tsv' DELIMITER E'\t';

ALTER TABLE products_colors ADD CONSTRAINT const1 FOREIGN KEY (product_id) REFERENCES products (id) MATCH FULL;

ALTER TABLE products_colors ADD CONSTRAINT const2 FOREIGN KEY (color_id) REFERENCES colors (id) MATCH FULL;

CREATE MATERIALIZED VIEW mat_product_details AS
SELECT p.id, p.title, p.price, p.description, p.size, p.fabric, p.care, p.features, array_agg(colors.name) as color
FROM products as p
JOIN products_colors as pc ON p.id = pc.product_id
JOIN colors ON colors.id = pc.color_id
GROUP BY 1,2,3,4,5,6,7,8;

CREATE INDEX ON mat_product_details (id);