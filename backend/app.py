from flask import Flask, jsonify


app = Flask(__name__)


@app.route('/', methods=['GET'])
def main():
    return jsonify()


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
