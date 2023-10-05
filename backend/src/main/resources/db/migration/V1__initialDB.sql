CREATE TABLE user (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(64) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE equipment_type (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE sector (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE workflow (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE status (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    fk_id_workflow BIGINT,
    KEY fk_id_workflow_idx (fk_id_workflow)
);

CREATE TABLE equipment (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    fk_id_sector BIGINT,
    fk_id_equipment_type BIGINT,
    KEY fk_id_sector_idx (fk_id_sector),
    KEY fk_id_equipment_type_idx (fk_id_equipment_type)
);

CREATE TABLE ticket (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    url_photo VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_id_user BIGINT,
    fk_id_equipment BIGINT,
    fk_id_status BIGINT,
    KEY fk_id_user_idx (fk_id_user),
    KEY fk_id_equipment_idx (fk_id_equipment),
    KEY fk_id_status_idx (fk_id_status)
);

CREATE TABLE ticket_history (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url_photo VARCHAR(150),
    fk_id_user BIGINT NOT NULL,
    fk_id_ticket BIGINT NOT NULL,
    fk_id_status BIGINT NOT NULL,
    KEY fk_id_user_idx (fk_id_user),
    KEY fk_id_ticket_idx (fk_id_ticket),
    KEY fk_id_status_idx (fk_id_status)
);

insert into equipment_type (name) values ("Computador");
insert into equipment_type (name) values ("Impressora");

insert into workflow (name) values("todo");
insert into workflow (name) values("doing");
insert into workflow (name) values("done");

insert into status (name, fk_id_workflow) values ("Aguardando atendimento", 1);
insert into status (name, fk_id_workflow) values ("Em deslocamento", 1);
insert into status (name, fk_id_workflow) values ("Em atendimento", 2);
insert into status (name, fk_id_workflow) values ("Aguardando peça", 2);
insert into status (name, fk_id_workflow) values ("Retirado para oficina", 2);
insert into status (name, fk_id_workflow) values ("Reparo concluido", 2);
insert into status (name, fk_id_workflow) values ("Atendimento finalizado", 3);

insert into sector (name) values ("Geral");

