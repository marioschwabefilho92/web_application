from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Initial try on data valitadion
class Students(db.Model):
    __bind_key__ = 'class'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    grades = db.relationship('Grades', backref='students')

    def validate_name(self, name):
        if not name:
            raise AssertionError('No name provided')
        if Students.query.filter(Students.name == name).first():
            raise AssertionError('Name is already in use')
        if len(name) < 1 or len(name) > 20:
            raise AssertionError('Name must be between 1 and 20 characters')
        return name


class Grades(db.Model):
    __bind_key__ = 'class'
    id = db.Column(db.Integer, primary_key=True)
    students_id = db.Column(db.Integer, db.ForeignKey(
        'students.id'), nullable=False)
    discipline = db.Column(db.String(), nullable=False)
    mark = db.Column(db.Integer, nullable=False)

    def validate_mark(self, mark: int):
        if not mark:
            raise AssertionError('No mark provided')
        if mark < 0 or mark > 100:
            raise AssertionError('Mark must be between 1 and 100')
        return mark
