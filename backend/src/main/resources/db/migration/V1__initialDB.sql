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

CREATE TABLE workflow (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE status (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    fk_id_workflow BIGINT,
    FOREIGN KEY (fk_id_workflow)
        REFERENCES workflow(id)
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
    fk_id_status BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_user)
        REFERENCES user(id),
    FOREIGN KEY (fk_id_equipment)
        REFERENCES equipment(id),
    FOREIGN KEY (fk_id_status)
            REFERENCES status(id)
);

CREATE TABLE ticket_history (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url_photo VARCHAR(150),
    fk_id_ticket BIGINT NOT NULL,
    fk_id_status BIGINT NOT NULL,
    FOREIGN KEY (fk_id_ticket)
        REFERENCES ticket(id),
    FOREIGN KEY (fk_id_status)
        REFERENCES status(id)
);

insert into equipment_type (name) values ("Computador");
insert into equipment_type (name) values ("Impressora");

insert into workflow (name) values("Pendente");
insert into workflow (name) values("Fazendo");
insert into workflow (name) values("Feito");

insert into status (name, fk_id_workflow) values ("Aguardando atendimento", 1);
insert into status (name, fk_id_workflow) values ("Em deslocamento", 1);
insert into status (name, fk_id_workflow) values ("Em atendimento", 2);
insert into status (name, fk_id_workflow) values ("Aguardando peça", 2);
insert into status (name, fk_id_workflow) values ("Retirado para oficina", 2);
insert into status (name, fk_id_workflow) values ("Reparo concluido", 3);
insert into status (name, fk_id_workflow) values ("Atendimento finalizado", 3);

insert into sector (name) values ("Geral");

