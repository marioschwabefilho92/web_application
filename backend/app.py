from flask import Flask, jsonify, request
from models import db, Students, Grades
from schemas import ma, StudentSchema, GradeSchema
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@192.168.100.1/main'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_BINDS'] = {
    'class': 'postgresql://postgres:postgres@192.168.100.1/class'
}


db.init_app(app)
ma.init_app(app)


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

grade_schema = GradeSchema()
grades_schema = GradeSchema(many=True)


@app.route('/', methods=['GET'])
def main():
    return jsonify("MAIN")


@app.route('/get/students', methods=['GET'])
def get_students():
    all_students = Students.query.all()
    results = students_schema.dump(all_students)
    return jsonify(results)


@app.route('/get/student/<id>', methods=['GET'])
def get_student_by_id(id):
    student = Students.query.get(id)
    results = student_schema.dump(student)
    return jsonify(results)


@app.route('/add/student', methods=['POST'])
def add_student():
    name = request.json['name']

    students = Students(name)
    results = student_schema.dump(students)
    db.session.add(students)
    db.session.commit()
    return jsonify(results)


@app.route('/get/grades', methods=['GET'])
def get_grades():
    all_grades = Grades.query.all()
    results = grades_schema.dump(all_grades)
    return jsonify(results)


@app.route('/get/grade/<id>', methods=['GET'])
def get_grades_by_id(id):
    grade = Grades.query.get(id)
    results = grade_schema.dump(grade)
    return jsonify(results)


@app.route('/add/grade', methods=['POST'])
def add_grade():
    students_id = request.json['students_id']
    discipline = request.json['discipline']
    mark = request.json['mark']

    grades = Grades(students_id, discipline, mark)
    results = grade_schema.dump(grades)
    db.session.add(grades)
    db.session.commit()
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
