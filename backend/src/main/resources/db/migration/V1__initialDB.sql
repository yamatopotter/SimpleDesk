CREATE TABLE user (
    idUser BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(64) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL,
    created_at TIMESTAMP default CURRENT_TIMESTAMP
);

CREATE TABLE equipmenttype (
    idEquipmentType BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE sector (
    idSector BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE status (
    idStatus BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE equipment (
    idEquipment BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    fk_idSector BIGINT,
    fk_idEquipmentType BIGINT,
    FOREIGN KEY (fk_idSector)
        REFERENCES sector (idSector),
    FOREIGN KEY (fk_idEquipmentType)
        REFERENCES equipmenttype (idEquipmentType)
);

CREATE TABLE ticket (
    idTicket BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    urlPhoto VARCHAR(150),
    fk_idUser BIGINT,
    fk_idEquipment BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_idUser)
        REFERENCES user (idUser),
    FOREIGN KEY (fk_idEquipment)
        REFERENCES equipment (idEquipment)
);

CREATE TABLE tickethistory (
    idTicketHistory BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    urlimage VARCHAR(150),
    fk_idTicket BIGINT NOT NULL,
    fk_idStatus BIGINT NOT NULL,
    FOREIGN KEY (fk_idTicket)
        REFERENCES ticket (idTicket),
    FOREIGN KEY (fk_idStatus)
        REFERENCES status (idStatus)
);

insert into equipmenttype (name) values ("Computador");
insert into equipmenttype (name) values ("Impressora");

insert into status (name) values ("Aguardando atendimento");
insert into status (name) values ("Em deslocamento");
insert into status (name) values ("Em atendimento");
insert into status (name) values ("Aguardando peça");
insert into status (name) values ("Retirado para oficina");
insert into status (name) values ("Reparo concluido");
insert into status (name) values ("Atendimento finalizado");

insert into sector (name) values ("Geral");