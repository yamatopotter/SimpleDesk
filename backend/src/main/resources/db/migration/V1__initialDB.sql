CREATE TABLE user (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(64) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL,
    created_at TIMESTAMP default CURRENT_TIMESTAMP
);

CREATE TABLE equipment_type (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE sector (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE status (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE equipment (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    fk_id_sector BIGINT,
    fk_id_equipment_type BIGINT,
    FOREIGN KEY (fk_id_sector)
        REFERENCES sector(id),
    FOREIGN KEY (fk_id_equipment_type)
        REFERENCES equipment_type(id)
);

CREATE TABLE ticket (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    url_photo VARCHAR(150),
    fk_id_user BIGINT,
    fk_id_equipment BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_user)
        REFERENCES user(id),
    FOREIGN KEY (fk_id_equipment)
        REFERENCES equipment(id)
);

CREATE TABLE ticket_history (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url_image VARCHAR(150),
    fk_id_ticket BIGINT NOT NULL,
    fk_id_status BIGINT NOT NULL,
    FOREIGN KEY (fk_id_ticket)
        REFERENCES ticket(id),
    FOREIGN KEY (fk_id_status)
        REFERENCES status(id)
);

insert into equipment_type (name) values ("Computador");
insert into equipment_type (name) values ("Impressora");

insert into status (name) values ("Aguardando atendimento");
insert into status (name) values ("Em deslocamento");
insert into status (name) values ("Em atendimento");
insert into status (name) values ("Aguardando peça");
insert into status (name) values ("Retirado para oficina");
insert into status (name) values ("Reparo concluido");
insert into status (name) values ("Atendimento finalizado");

insert into sector (name) values ("Geral");