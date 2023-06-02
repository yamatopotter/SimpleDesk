CREATE TABLE user (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(64) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL,
    created_at DATETIME
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
    created_at DATETIME,
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
    created_at DATETIME,
    url_photo VARCHAR(150),
    fk_id_user BIGINT NOT NULL,
    fk_id_ticket BIGINT NOT NULL,
    fk_id_status BIGINT NOT NULL,
    FOREIGN KEY (fk_id_user)
            REFERENCES user(id),
    FOREIGN KEY (fk_id_ticket)
        REFERENCES ticket(id),
    FOREIGN KEY (fk_id_status)
        REFERENCES status(id)
);

-- Triggers Ticket_History

CREATE TRIGGER trg_before_update_ticket_history
BEFORE UPDATE ON simple_desk.ticket_history
FOR EACH ROW
BEGIN
	IF NEW.fk_id_ticket = (SELECT id FROM ticket WHERE id = NEW.fk_id_ticket)
THEN
		UPDATE simple_desk.ticket
		SET ticket.fk_id_status = NEW.fk_id_status
		WHERE ticket.id = NEW.fk_id_ticket;
    END IF;
END;

CREATE TRIGGER trg_before_insert_ticket_history
BEFORE INSERT ON simple_desk.ticket_history
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
END;

-- Triggers User

CREATE TRIGGER trg_before_insert_user
BEFORE INSERT ON simple_desk.user
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
END;

-- Triggers Ticket

CREATE TRIGGER trg_after_insert_ticket AFTER INSERT ON simple_desk.ticket
FOR EACH ROW
BEGIN
    INSERT INTO simple_desk.ticket_history (description, url_photo, fk_id_user, fk_id_ticket, fk_id_status)
    VALUES (NEW.description, NEW.url_photo, NEW.fk_id_user, NEW.id, NEW.fk_id_status);

END;

CREATE TRIGGER trg_before_insert_ticket
BEFORE INSERT ON simple_desk.ticket
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
END;

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

