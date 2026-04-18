create table brands
(
    id          bigint auto_increment
        primary key,
    code        varchar(50)  not null,
    created_at  datetime(6)  null,
    description text         null,
    name        varchar(100) not null
);

create table categories
(
    id          bigint       not null
        primary key,
    description text         null,
    name        varchar(100) not null
);

create table products
(
    id          bigint primary key,
    created_at  datetime(6)  null,
    description text         null,
    name        varchar(255) not null,
    brand_id    bigint       not null,
    category_id bigint       not null,
    constraint FKa3a4mpsfdf4d2y6r8ra3sc8mv
        foreign key (brand_id) references brands (id),
    constraint FKog2rp4qthbtt2lfyhfo32lsw9
        foreign key (category_id) references categories (id)
);

create table roles
(
    id   bigint auto_increment
        primary key,
    name enum ('ADMIN', 'USER') null
);

create table skus
(
    sku_code        varchar(100)                 not null
        primary key,
    color           varchar(50)                  not null,
    image_url       varchar(500)                 null,
    price           decimal(38, 2)               not null,
    stock_quantity  int                          not null,
    total_purchases int                          not null,
    product_id      bigint                       not null,
    media_metadata  longtext collate utf8mb4_bin null
        check (json_valid(`media_metadata`)),
    constraint FK49suh4vsoilpii18pb6j8adkp
        foreign key (product_id) references products (id)
);

create table users
(
    id       bigint auto_increment
        primary key,
    email    varchar(255) null,
    name     varchar(255) null,
    password varchar(255) null,
    role_id  bigint       null,
    constraint FKp56c1712k691lhsyewcssf40f
        foreign key (role_id) references roles (id)
);

create table carts
(
    id      bigint not null
        primary key,
    user_id bigint null,
    constraint UK64t7ox312pqal3p7fg9o503c2
        unique (user_id),
    constraint FKb5o626f86h46m4s7ms6ginnop
        foreign key (user_id) references users (id)
);

create table cart_details
(
    cart_id    bigint       not null,
    sku_code   varchar(255) not null,
    created_at datetime(6)  null,
    quantity   int          not null,
    primary key (cart_id, sku_code),
    constraint FKkcochhsa891wv0s9wrtf36wgt
        foreign key (cart_id) references carts (id),
    constraint FKqeogefywkfd2jd95ht6in93hw
        foreign key (sku_code) references skus (sku_code)
);

create table user_placement_infos
(
    id            bigint auto_increment
        primary key,
    address       varchar(255) null,
    customer_name varchar(255) null,
    is_saved      bit          not null,
    phone_number  varchar(255) null,
    email         varchar(255) null,
    user_id       bigint       null,
    constraint FKn9ajrtqly3oacqnf33y0d3u72
        foreign key (user_id) references users (id)
);

create table orders
(
    id                     bigint                                                      not null
        primary key,
    order_date             datetime(6)                                                       null,
    shipping_fee           decimal(38, 2)                                                    null,
    status                 enum ('PACKAGING', 'PENDING', 'RECEIVED', 'RETURNED', 'SHIPPING') null,
    total_price            decimal(38, 2)                                                    null,
    user_placement_info_id bigint                                                            not null,
    constraint FKp26qv8517f5vrug521uu1t720
        foreign key (user_placement_info_id) references user_placement_infos (id)
);

create table order_details
(
    id                bigint auto_increment
        primary key,
    price_at_purchase decimal(38, 2) null,
    quantity          int            not null,
    order_id          varchar(255)   null,
    sku_code          varchar(100)   not null,
    constraint FKjyu2qbqt8gnvno9oe9j2s2ldk
        foreign key (order_id) references orders (id),
    constraint FKq1avcjj3dydu2578oht793fyw
        foreign key (sku_code) references skus (sku_code)
);

