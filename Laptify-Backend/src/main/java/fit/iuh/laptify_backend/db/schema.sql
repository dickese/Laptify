CREATE TABLE Brands
(
    id          INTEGER PRIMARY KEY AUTO_INCREMENT,
    code        VARCHAR(50) UNIQUE,
    name        VARCHAR(100)       NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories
(
    id          VARCHAR(255) PRIMARY KEY,
    name        VARCHAR(100)       NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products
(
    id          VARCHAR(255) PRIMARY KEY,
    category_id VARCHAR(255) NOT NULL,
    name        VARCHAR(255) NOT NULL,
    brand       INTEGER      NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (brand) REFERENCES Brands (id)
);

CREATE TABLE skus
(
    sku_code       VARCHAR(100) PRIMARY KEY UNIQUE NOT NULL, -- MAC-M2-SILVER
    product_id     VARCHAR(255)                    NOT NULL,
    color          VARCHAR(50)                     NOT NULL,
    price          DECIMAL(15, 2)                  NOT NULL DEFAULT 0.00,
    stock_quantity INT                             NOT NULL DEFAULT 0,
    image_url      VARCHAR(500),
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);