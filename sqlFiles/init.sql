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
