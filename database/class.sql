DROP TABLE IF EXISTS students CASCADE;

DROP TABLE IF EXISTS grades CASCADE;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != '')
);

CREATE TABLE grades(
    id SERIAL PRIMARY KEY,
    students_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    discipline VARCHAR NOT NULL,
    mark INTEGER NOT NULL
);

INSERT INTO
    students (name)
VALUES
    ('John'),
    ('Peter'),
    ('Christa'),
    ('Mary');

INSERT INTO
    grades (students_id, discipline, mark)
VALUES
    (1, 'Biology', 91),
    (1, 'Math', 28),
    (1, 'Physics', 47),
    (2, 'Biology', 20),
    (2, 'Math', 25),
    (2, 'Physics', 100),
    (3, 'Biology', 0),
    (3, 'Math', 33),
    (3, 'Physics', 44),
    (4, 'Biology', 16),
    (4, 'Math', 45),
    (4, 'Physics', 87);