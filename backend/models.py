from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    def __init__(self, name) -> None:
        self.name = name


class Grades(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    students_id = db.Column(db.Integer, db.ForeignKey(
        'students.id'), nullable=False)
    discipline = db.Column(db.String(), nullable=False)
    mark = db.Column(db.Integer(), nullable=False)

    def __init__(self, students_id, discipline, mark) -> None:
        self.students_id = students_id
        self.discipline = discipline
        self.mark = mark
