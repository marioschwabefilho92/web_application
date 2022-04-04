from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Students(db.Model):
    __bind_key__ = 'class'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    grades = db.relationship('Grades', backref='students')

    def validate_name(self, name: str):
        try:
            name = str(name)
            if not name:
                raise Exception('No name provided')
            if Students.query.filter(Students.name == name).first():
                raise Exception('Name is already in use')
            if len(name) < 1 or len(name) > 100:
                raise Exception('Name must be between 1 and 100 characters')
        except Exception:
            raise Exception("Could not convert data to a string")


class Grades(db.Model):
    __bind_key__ = 'class'
    id = db.Column(db.Integer, primary_key=True)
    students_id = db.Column(db.Integer, db.ForeignKey(
        'students.id'), nullable=False)
    discipline = db.Column(db.String(), nullable=False)
    mark = db.Column(db.Integer, nullable=False)

    def validate_mark(self, mark: int):
        try:
            mark = int(mark)
            if mark < 0 or mark > 100:
                raise Exception('Mark must be a number between 0 and 100')
        except Exception:
            raise Exception("Could not convert data to an integer")
