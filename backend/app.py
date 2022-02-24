from flask import Flask, jsonify, request
from models import db, Articles, Author
from schemas import ArticleSchema, AuthorSchema

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@172.20.1.1/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
db.create_all()

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)


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
