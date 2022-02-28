from marshmallow import Schema


class StudentSchema(Schema):
    class Meta:
        fields = ('id', 'name')


class GradeSchema(Schema):
    class Meta:
        fields = ('id', 'students_id', 'discipline', 'mark')
