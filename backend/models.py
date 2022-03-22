from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Students(db.Model):
    __bind_key__ = 'class'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    grades = db.relationship('Grades', backref='students')


class Grades(db.Model):
    __bind_key__ = 'class'
    id = db.Column(db.Integer, primary_key=True)
    students_id = db.Column(db.Integer, db.ForeignKey(
        'students.id'), nullable=False)
    discipline = db.Column(db.String(), nullable=False)
    mark = db.Column(db.Integer, nullable=False)
