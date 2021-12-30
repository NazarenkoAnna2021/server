create table universities (
 id serial primary key,
 country varchar,
 city varchar,
 name varchar,
 accreditation varchar
);

create table users (
 id serial primary key,
 role varchar,
 name varchar,
 age integer,
 university_id integer,
 foreign key (university_id) references universities(id)
 ON DELETE CASCADE
 ON UPDATE CASCADE
);

create table courses (
 id serial primary key,
 name varchar,
 university_id integer,
 teachers_id integer,
 foreign key (university_id) references universities(id)
 ON DELETE CASCADE
 ON UPDATE cascade,
 foreign key (teachers_id) references users(id)
 ON DELETE CASCADE
 ON UPDATE CASCADE
);

create table students_courses (
 students_id int,
 courses_id int,
 foreign key (students_id) references users(id)
 ON DELETE CASCADE
 ON UPDATE cascade,
 foreign key (courses_id) references courses(id)
 ON DELETE CASCADE
 ON UPDATE CASCADE
);

create table marks (
 id serial primary key,
 mark int,
 student_id int,
 course_id int,
 university_id int,
 foreign key (university_id) references universities(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    foreign key (student_id) references users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    foreign key (course_id) references courses(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);