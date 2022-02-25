import re
from flask import Flask, jsonify, request
from models import db, Articles, Author, Students
from schemas import ArticleSchema, AuthorSchema, StudentSchema

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@192.168.100.1/class'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)


# @app.route('/get', methods=['GET'])
# def get_articles():
#     all_articles = Articles.query.all()
#     results = articles_schema.dump(all_articles)
#     return jsonify(results)

@app.route('/get', methods=['GET'])
def get_students():
    all_students = Students.query.all()
    results = students_schema.dump(all_students)
    return jsonify(results)


@app.route('/add', methods=['POST'])
def add_student():
    name = request.json['name']

    students = Students(name)
    db.session.add(students)
    db.session.commit()
    return students_schema.jsonify(students)


@app.route('/post', methods=['POST'])
def add_article():
    title = request.json['title']
    body = request.json['body']

    articles = Articles(title, body)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
