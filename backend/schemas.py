from flask_marshmallow import Marshmallow
from models import Students, Grades
from marshmallow_sqlalchemy.fields import Nested

ma = Marshmallow()


class GradeSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Grades

    id = ma.auto_field()
    students_id = ma.auto_field()
    discipline = ma.auto_field()
    mark = ma.auto_field()


class StudentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Students

    id = ma.auto_field()
    name = ma.auto_field()
    grades = Nested(GradeSchema, many=True)
