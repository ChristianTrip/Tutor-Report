INSERT INTO tutorreportdb.users(enabled, locked, created, edited, user_type, email, first_name, last_name, password) VALUES (1, 0, '2022-11-30 14:10:00.109260', '2022-12-01 14:10:00.109260', 'Tutor', 'peter@mail.com', 'Peter', 'Petersen', '{bcrypt}$2a$12$FOtdC8RMj1xKqtQKdCEW2.j0ZmnNlJ8ZBc3eGgPfzp7/83AXMHnMm');
INSERT INTO tutorreportdb.users(enabled, locked, created, edited, user_type, email, first_name, last_name, password) VALUES (1, 0, '2022-11-30 14:10:00.109260', '2022-12-01 14:10:00.109260', 'Tutor', 'alice@mail.com', 'Alice', 'Alison', '{bcrypt}$2a$12$NqDB2.sTqqisEE2YdWjUz.RMBBglITDpNGo5Dwr.BTYfILChbhu.e');
INSERT INTO tutorreportdb.users(enabled, locked, created, edited, user_type, email, first_name, last_name, password) VALUES (0, 0, '2022-11-30 14:10:00.109260', '2022-12-01 14:10:00.109260', 'Tutor', 'john@mail.com', 'John', 'Johnson', '{bcrypt}$2a$12$hdKEapv0JhhJxQmf8147We4z8an5WoNt0dSqk3zzruUgz1PdMZxmW');
INSERT INTO tutorreportdb.users(enabled, locked, created, edited, user_type, email, first_name, last_name, password) VALUES (1, 0, '2022-11-30 14:10:00.109260', '2022-12-01 14:10:00.109260', 'Teacher', 'eric@mail.com', 'Eric', 'Ericsson', '{bcrypt}$2a$12$yVO7bOdJGnj15admzRnHZep48hW/rVzFV1L2iO83JaeKNGOhog7fe');

INSERT INTO tutorreportdb.user_authorities(authorities, user_email) VALUES ('USER','peter@mail.com');
INSERT INTO tutorreportdb.user_authorities(authorities, user_email) VALUES ('USER','alice@mail.com');
INSERT INTO tutorreportdb.user_authorities(authorities, user_email) VALUES ('USER','john@mail.com');
INSERT INTO tutorreportdb.user_authorities(authorities, user_email) VALUES ('USER','eric@mail.com');
INSERT INTO tutorreportdb.user_authorities(authorities, user_email) VALUES ('ADMIN','eric@mail.com');

INSERT INTO tutorreportdb.reports(`date`,`id`,`education`,`duration`,`problem`,`semester`,`solution`,`tutor_email`) VALUES ('2023-11-14',1,'DAT','HOUR','Updated problem','FIRST','Updated solution','peter@mail.com');
INSERT INTO tutorreportdb.reports(`date`,`id`,`education`,`duration`,`problem`,`semester`,`solution`,`tutor_email`) VALUES ('2023-11-28',2,'ITA','TEN_MIN','For-loops index out of bounds','FIRST','change the end condition to: i < array.lenght','peter@mail.com');
INSERT INTO tutorreportdb.reports(`date`,`id`,`education`,`duration`,`problem`,`semester`,`solution`,`tutor_email`) VALUES ('2023-11-30',3,'DAT','FIVE_MIN','Docker image wont run a container','THIRD','The student was using the wrong command in the terminal, was missing the run command..','alice@mail.com');
