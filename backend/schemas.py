from marshmallow import Schema, fields, ValidationError, pre_load


class ArticleSchema(Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')


class AuthorSchema(Schema):
    id = fields.Int(dump_only=True)
    first = fields.Str()
    last = fields.Str()
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, author):
        return f"{author.last}, {author.first}"


class StudentSchema(Schema):
    class Meta:
        fields = ('id', 'name')
