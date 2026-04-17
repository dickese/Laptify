-- Insert Roles
INSERT INTO roles (name)
VALUES ('ADMIN'),
       ('USER');

-- Insert Users
INSERT INTO users (email, name, password, role_id)
VALUES ('user1@example.com', 'Nguyen Van A', 'hashed_password_1', 2),
       ('user2@example.com', 'Tran Thi B', 'hashed_password_2', 2),
       ('user3@example.com', 'Le Van C', 'hashed_password_3', 2),
       ('user4@example.com', 'Pham Thi D', 'hashed_password_4', 2),
       ('admin@example.com', 'Admin User', 'hashed_password_admin', 1);

-- Insert User Placement Infos
INSERT INTO user_placement_infos (customer_name, phone_number, address, is_saved)
VALUES ('Nguyen Van A', '0912345678', '123 Nguyen Hue, HCMC', 1),
       ('Tran Thi B', '0987654321', '456 Tran Hung Dao, HCMC', 1),
       ('Le Van C', '0901234567', '789 Hoang Van Thu, HCMC', 0),
       ('Pham Thi D', '0923456789', '321 Ly Thuong Kiet, Hanoi', 1),
       ('Hoang Van E', '0934567890', '654 Nguyen Trai, HCMC', 0);

-- Insert Brands
INSERT INTO brands (code, name, description, created_at)
VALUES ('APPLE', 'Apple', 'Premium technology company', NOW()),
       ('DELL', 'Dell', 'Leading computer manufacturer', NOW()),
       ('HP', 'HP', 'Hewlett-Packard technology solutions', NOW()),
       ('LENOVO', 'Lenovo', 'Chinese multinational tech company', NOW()),
       ('ASUS', 'ASUS', 'Taiwanese computer hardware company', NOW()),
       ('CORSAIR', 'Corsair', 'Gaming peripherals manufacturer', NOW()),
       ('LOGITECH', 'Logitech', 'Computer input devices', NOW()),
       ('RAZER', 'Razer', 'Gaming hardware specialist', NOW()),
       ('STEELSERIES', 'SteelSeries', 'Gaming peripherals brand', NOW()),
       ('HYPERX', 'HyperX', 'Gaming brand by HP', NOW()),
       ('SONY', 'Sony', 'Electronics and entertainment', NOW()),
       ('BEATS', 'Beats', 'Premium audio brand', NOW()),
       ('SENNHEISER', 'Sennheiser', 'German audio equipment', NOW()),
       ('JBL', 'JBL', 'Audio equipment company', NOW()),
       ('BOSE', 'Bose', 'Premium sound systems', NOW()),
       ('MICROSOFT', 'Microsoft', 'Software and hardware company', NOW()),
       ('ROCCAT', 'ROCCAT', 'Gaming peripherals', NOW()),
       ('MADCATZ', 'Mad Catz', 'Gaming controller manufacturer', NOW()),
       ('NINTENDO', 'Nintendo', 'Gaming company', NOW()),
       ('SONY_GAMING', 'Sony Gaming', 'PlayStation manufacturer', NOW());

-- Insert Categories
INSERT INTO categories (id, name, description)
VALUES (1, 'Laptop', 'Portable computing devices'),
       (2, 'Keyboard', 'Computer input keyboards'),
       (3, 'Mouse', 'Computer pointing devices'),
       (4, 'Headphone', 'Audio listening devices'),
       (5, 'Gamepad', 'Gaming controllers');

-- Insert Products - Laptop (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('MacBook Pro 14', 'High-performance laptop', 1, 1, NOW()),
       ('Dell XPS 13', 'Ultra-portable laptop', 2, 1, NOW()),
       ('HP Pavilion 15', 'Affordable laptop', 3, 1, NOW()),
       ('Lenovo ThinkPad X1', 'Business laptop', 4, 1, NOW()),
       ('ASUS VivoBook 15', 'Budget-friendly laptop', 5, 1, NOW());

-- Insert Products - Keyboard (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('Corsair K95 Platinum', 'Mechanical gaming keyboard', 6, 2, NOW()),
       ('Logitech MX Keys', 'Wireless keyboard', 7, 2, NOW()),
       ('Razer BlackWidow', 'Gaming keyboard', 8, 2, NOW()),
       ('SteelSeries Apex Pro', 'Adjustable switches keyboard', 9, 2, NOW()),
       ('Apple Magic Keyboard', 'Wireless keyboard', 1, 2, NOW());

-- Insert Products - Mouse (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('Logitech G Pro X', 'Gaming mouse', 7, 3, NOW()),
       ('Razer DeathAdder V3', 'High-precision mouse', 8, 3, NOW()),
       ('Corsair Dark Core RGB', 'Wireless gaming mouse', 6, 3, NOW()),
       ('Steelseries Rival 600', 'Esports mouse', 9, 3, NOW()),
       ('Apple Magic Mouse', 'Wireless mouse', 1, 3, NOW());

-- Insert Products - Headphone (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('Sony WH-1000XM5', 'Noise-cancelling headphones', 11, 4, NOW()),
       ('Beats Studio Pro', 'Premium headphones', 12, 4, NOW()),
       ('Sennheiser Momentum 4', 'High-quality audio', 13, 4, NOW()),
       ('JBL Live Pro 2', 'True wireless earbuds', 14, 4, NOW()),
       ('Bose QuietComfort 45', 'Comfort headphones', 15, 4, NOW());

-- Insert Products - Gamepad (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('Xbox Series X Controller', 'Microsoft gaming controller', 16, 5, NOW()),
       ('PlayStation 5 Controller', 'DualSense controller', 20, 5, NOW()),
       ('Razer Wolverine V2 Pro', 'Professional gamepad', 8, 5, NOW()),
       ('HyperX Clutch Gladiate', 'Gaming controller', 10, 5, NOW()),
       ('Mad Catz C.A.T. 8', 'Fighting game controller', 18, 5, NOW());

-- Insert SKUs - Laptop (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 1-5
INSERT INTO skus (sku_code, color, media_metadata, price, stock_quantity, product_id, total_purchases)
VALUES ('LP001-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/lp001-slv.jpg', 'publicId', 'lp001-slv')), 47976000, 10, 1, 45),
       ('LP001-GRY', 'Gray', JSON_ARRAY(JSON_OBJECT('url', '/images/lp001-gry.jpg', 'publicId', 'lp001-gry')), 47976000, 8, 1, 32),
       ('LP001-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/lp001-blk.jpg', 'publicId', 'lp001-blk')), 47976000, 12, 1, 28),
       ('LP002-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/lp002-slv.jpg', 'publicId', 'lp002-slv')), 23976000, 15, 2, 52),
       ('LP002-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/lp002-blu.jpg', 'publicId', 'lp002-blu')), 23976000, 20, 2, 38),
       ('LP002-GRN', 'Green', JSON_ARRAY(JSON_OBJECT('url', '/images/lp002-grn.jpg', 'publicId', 'lp002-grn')), 23976000, 18, 2, 25),
       ('LP003-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/lp003-slv.jpg', 'publicId', 'lp003-slv')), 14376000, 25, 3, 61),
       ('LP003-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/lp003-blk.jpg', 'publicId', 'lp003-blk')), 14376000, 22, 3, 48),
       ('LP003-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/lp003-wht.jpg', 'publicId', 'lp003-wht')), 14376000, 20, 3, 35),
       ('LP004-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/lp004-blk.jpg', 'publicId', 'lp004-blk')), 31176000, 14, 4, 56),
       ('LP004-GRY', 'Gray', JSON_ARRAY(JSON_OBJECT('url', '/images/lp004-gry.jpg', 'publicId', 'lp004-gry')), 31176000, 11, 4, 42),
       ('LP004-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/lp004-slv.jpg', 'publicId', 'lp004-slv')), 31176000, 9, 4, 31),
       ('LP005-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/lp005-slv.jpg', 'publicId', 'lp005-slv')), 16776000, 30, 5, 70),
       ('LP005-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/lp005-blu.jpg', 'publicId', 'lp005-blu')), 16776000, 28, 5, 54),
       ('LP005-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/lp005-blk.jpg', 'publicId', 'lp005-blk')), 16776000, 25, 5, 40);

-- Insert SKUs - Keyboard (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 6-10
INSERT INTO skus (sku_code, color, media_metadata, price, stock_quantity, product_id, total_purchases)
VALUES ('KB001-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/kb001-blk.jpg', 'publicId', 'kb001-blk')), 5496000, 20, 6, 85),
       ('KB001-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/kb001-wht.jpg', 'publicId', 'kb001-wht')), 5496000, 18, 6, 67),
       ('KB001-GRY', 'Gray', JSON_ARRAY(JSON_OBJECT('url', '/images/kb001-gry.jpg', 'publicId', 'kb001-gry')), 5496000, 16, 6, 52),
       ('KB002-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/kb002-blk.jpg', 'publicId', 'kb002-blk')), 2376000, 35, 7, 125),
       ('KB002-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/kb002-slv.jpg', 'publicId', 'kb002-slv')), 2376000, 32, 7, 98),
       ('KB002-GLD', 'Gold', JSON_ARRAY(JSON_OBJECT('url', '/images/kb002-gld.jpg', 'publicId', 'kb002-gld')), 2376000, 30, 7, 76),
       ('KB003-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/kb003-blk.jpg', 'publicId', 'kb003-blk')), 3576000, 25, 8, 95),
       ('KB003-GRN', 'Green', JSON_ARRAY(JSON_OBJECT('url', '/images/kb003-grn.jpg', 'publicId', 'kb003-grn')), 3576000, 22, 8, 72),
       ('KB003-PRP', 'Purple', JSON_ARRAY(JSON_OBJECT('url', '/images/kb003-prp.jpg', 'publicId', 'kb003-prp')), 3576000, 20, 8, 58),
       ('KB004-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/kb004-blk.jpg', 'publicId', 'kb004-blk')), 4776000, 18, 9, 88),
       ('KB004-RD', 'Red', JSON_ARRAY(JSON_OBJECT('url', '/images/kb004-rd.jpg', 'publicId', 'kb004-rd')), 4776000, 15, 9, 69),
       ('KB004-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/kb004-blu.jpg', 'publicId', 'kb004-blu')), 4776000, 12, 9, 54),
       ('KB005-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/kb005-slv.jpg', 'publicId', 'kb005-slv')), 1896000, 0, 10, 142),
       ('KB005-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/kb005-wht.jpg', 'publicId', 'kb005-wht')), 1896000, 0, 10, 118),
       ('KB005-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/kb005-blk.jpg', 'publicId', 'kb005-blk')), 1896000, 0, 10, 95);

-- Insert SKUs - Mouse (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 11-15
INSERT INTO skus (sku_code, color, media_metadata, price, stock_quantity, product_id, total_purchases)
VALUES ('MS001-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/ms001-blk.jpg', 'publicId', 'ms001-blk')), 1656000, 30, 11, 115),
       ('MS001-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/ms001-wht.jpg', 'publicId', 'ms001-wht')), 1656000, 28, 11, 92),
       ('MS001-GRY', 'Gray', JSON_ARRAY(JSON_OBJECT('url', '/images/ms001-gry.jpg', 'publicId', 'ms001-gry')), 1656000, 26, 11, 78),
       ('MS002-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/ms002-blk.jpg', 'publicId', 'ms002-blk')), 1896000, 25, 12, 105),
       ('MS002-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/ms002-wht.jpg', 'publicId', 'ms002-wht')), 1896000, 23, 12, 84),
       ('MS002-RD', 'Red', JSON_ARRAY(JSON_OBJECT('url', '/images/ms002-rd.jpg', 'publicId', 'ms002-rd')), 1896000, 21, 12, 67),
       ('MS003-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/ms003-blk.jpg', 'publicId', 'ms003-blk')), 1416000, 40, 13, 128),
       ('MS003-GRY', 'Gray', JSON_ARRAY(JSON_OBJECT('url', '/images/ms003-gry.jpg', 'publicId', 'ms003-gry')), 1416000, 38, 13, 102),
       ('MS003-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/ms003-blu.jpg', 'publicId', 'ms003-blu')), 1416000, 36, 13, 81),
       ('MS004-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/ms004-blk.jpg', 'publicId', 'ms004-blk')), 2136000, 20, 14, 98),
       ('MS004-GRY', 'Gray', JSON_ARRAY(JSON_OBJECT('url', '/images/ms004-gry.jpg', 'publicId', 'ms004-gry')), 2136000, 18, 14, 76),
       ('MS004-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/ms004-blu.jpg', 'publicId', 'ms004-blu')), 2136000, 16, 14, 61),
       ('MS005-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/ms005-slv.jpg', 'publicId', 'ms005-slv')), 1896000, 32, 15, 110),
       ('MS005-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/ms005-wht.jpg', 'publicId', 'ms005-wht')), 1896000, 30, 15, 88),
       ('MS005-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/ms005-blk.jpg', 'publicId', 'ms005-blk')), 1896000, 28, 15, 72);

-- Insert SKUs - Headphone (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 16-20
INSERT INTO skus (sku_code, color, media_metadata, price, stock_quantity, product_id, total_purchases)
VALUES ('HP001-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/hp001-blk.jpg', 'publicId', 'hp001-blk')), 8376000, 15, 16, 78),
       ('HP001-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/hp001-slv.jpg', 'publicId', 'hp001-slv')), 8376000, 13, 16, 62),
       ('HP001-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/hp001-blu.jpg', 'publicId', 'hp001-blu')), 8376000, 11, 16, 48),
       ('HP002-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/hp002-blk.jpg', 'publicId', 'hp002-blk')), 9576000, 12, 17, 65),
       ('HP002-RD', 'Red', JSON_ARRAY(JSON_OBJECT('url', '/images/hp002-rd.jpg', 'publicId', 'hp002-rd')), 9576000, 10, 17, 52),
       ('HP002-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/hp002-blu.jpg', 'publicId', 'hp002-blu')), 9576000, 9, 17, 41),
       ('HP003-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/hp003-blk.jpg', 'publicId', 'hp003-blk')), 9096000, 14, 18, 72),
       ('HP003-BRN', 'Brown', JSON_ARRAY(JSON_OBJECT('url', '/images/hp003-brn.jpg', 'publicId', 'hp003-brn')), 9096000, 12, 18, 58),
       ('HP003-GRY', 'Gray', JSON_ARRAY(JSON_OBJECT('url', '/images/hp003-gry.jpg', 'publicId', 'hp003-gry')), 9096000, 10, 18, 46),
       ('HP004-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/hp004-blk.jpg', 'publicId', 'hp004-blk')), 4776000, 20, 19, 102),
       ('HP004-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/hp004-wht.jpg', 'publicId', 'hp004-wht')), 4776000, 18, 19, 81),
       ('HP004-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/hp004-blu.jpg', 'publicId', 'hp004-blu')), 4776000, 16, 19, 65),
       ('HP005-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/hp005-blk.jpg', 'publicId', 'hp005-blk')), 7896000, 16, 20, 85),
       ('HP005-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/hp005-slv.jpg', 'publicId', 'hp005-slv')), 7896000, 14, 20, 68),
       ('HP005-GLD', 'Gold', JSON_ARRAY(JSON_OBJECT('url', '/images/hp005-gld.jpg', 'publicId', 'hp005-gld')), 7896000, 12, 20, 54);

-- Insert SKUs - Gamepad (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 21-25
INSERT INTO skus (sku_code, color, media_metadata, price, stock_quantity, product_id, total_purchases)
VALUES ('GP001-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/gp001-blk.jpg', 'publicId', 'gp001-blk')), 1416000, 30, 21, 145),
       ('GP001-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/gp001-wht.jpg', 'publicId', 'gp001-wht')), 1416000, 28, 21, 118),
       ('GP001-GRN', 'Green', JSON_ARRAY(JSON_OBJECT('url', '/images/gp001-grn.jpg', 'publicId', 'gp001-grn')), 1416000, 26, 21, 92),
       ('GP002-WHT', 'White', JSON_ARRAY(JSON_OBJECT('url', '/images/gp002-wht.jpg', 'publicId', 'gp002-wht')), 1656000, 25, 22, 138),
       ('GP002-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/gp002-blk.jpg', 'publicId', 'gp002-blk')), 1656000, 23, 22, 112),
       ('GP002-RD', 'Red', JSON_ARRAY(JSON_OBJECT('url', '/images/gp002-rd.jpg', 'publicId', 'gp002-rd')), 1656000, 21, 22, 89),
       ('GP003-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/gp003-blk.jpg', 'publicId', 'gp003-blk')), 4536000, 15, 23, 72),
       ('GP003-PRP', 'Purple', JSON_ARRAY(JSON_OBJECT('url', '/images/gp003-prp.jpg', 'publicId', 'gp003-prp')), 4536000, 13, 23, 58),
       ('GP003-GRN', 'Green', JSON_ARRAY(JSON_OBJECT('url', '/images/gp003-grn.jpg', 'publicId', 'gp003-grn')), 4536000, 11, 23, 46),
       ('GP004-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/gp004-blk.jpg', 'publicId', 'gp004-blk')), 2376000, 20, 24, 95),
       ('GP004-RD', 'Red', JSON_ARRAY(JSON_OBJECT('url', '/images/gp004-rd.jpg', 'publicId', 'gp004-rd')), 2376000, 18, 24, 76),
       ('GP004-BLU', 'Blue', JSON_ARRAY(JSON_OBJECT('url', '/images/gp004-blu.jpg', 'publicId', 'gp004-blu')), 2376000, 16, 24, 61),
       ('GP005-BLK', 'Black', JSON_ARRAY(JSON_OBJECT('url', '/images/gp005-blk.jpg', 'publicId', 'gp005-blk')), 3576000, 18, 25, 68),
       ('GP005-SLV', 'Silver', JSON_ARRAY(JSON_OBJECT('url', '/images/gp005-slv.jpg', 'publicId', 'gp005-slv')), 3576000, 16, 25, 54),
       ('GP005-GLD', 'Gold', JSON_ARRAY(JSON_OBJECT('url', '/images/gp005-gld.jpg', 'publicId', 'gp005-gld')), 3576000, 14, 25, 43);

