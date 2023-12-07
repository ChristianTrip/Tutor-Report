CREATE TABLE IF NOT EXISTS tutorreportdb.users
(
    enabled    bit          not null,
    locked     bit          not null,
    created    datetime(6)  null,
    edited     datetime(6)  null,
    user_type  varchar(31)  not null,
    email      varchar(255) not null
        primary key,
    first_name varchar(255) null,
    last_name  varchar(255) null,
    password   varchar(255) not null
);

CREATE TABLE IF NOT EXISTS tutorreportdb.user_authorities
(
    authorities enum ('USER', 'ADMIN') null,
    user_email  varchar(255)           not null,
    constraint fkey_user_role
        foreign key (user_email) references users (email)
);


CREATE TABLE IF NOT EXISTS tutorreportdb.reports
(
    date              date                                                                                                      not null,
    id                int auto_increment
        primary key,
    course_class_name varchar(255)                                                                                              null,
    duration          enum ('FIFTY_MIN', 'FIVE_MIN', 'FORTY_MIN', 'HALF_HOUR', 'HOUR', 'OVER_AN_HOUR', 'TEN_MIN', 'TWENTY_MIN') not null,
    problem           text                                                                                                      not null,
    semester          enum ('FIFTH', 'FIRST', 'FOURTH', 'SECOND', 'THIRD')                                                      not null,
    solution          text                                                                                                      not null,
    tutor_email       varchar(255)                                                                                              not null,
    constraint fkey_report_user
        foreign key (tutor_email) references users (email)
);