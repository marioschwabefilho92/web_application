from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@172.20.1.1/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body) -> None:
        self.title = title
        self.body = body


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')


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
