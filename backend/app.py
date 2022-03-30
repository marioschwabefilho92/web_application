from email import message
from shutil import ExecError
from wsgiref import headers
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


@app.route('/add/student', methods=['POST'])
def add_student():
    name = request.json['name']

    student = Students(name=name)
    db.session.add(student)
    db.session.commit()
    return student_schema.jsonify(student)


@app.route('/get/student/<id>', methods=['GET'])
def get_student_by_id(id: int):
    student = Students.query.get(id)
    return student_schema.jsonify(student)


@app.route('/update/student/<id>', methods=['PUT'])
def update_student(id: int):
    student = Students.query.get(id)

    name = request.json['name']

    student.name = name

    db.session.commit()

    return student_schema.jsonify(student)


@app.route('/del/student/<id>', methods=['DELETE'])
def del_student(id: int):
    student = Students.query.get(id)
    db.session.delete(student)
    db.session.commit()

    return student_schema.jsonify(student)


@app.route('/get/grades', methods=['GET'])
def get_grades():
    all_grades = Grades.query.all()
    results = grades_schema.dump(all_grades)
    return jsonify(results)


@app.route('/add/grade', methods=['POST'])
def add_grade():
    try:
        name = request.json['name']
        student = db.session.query(Students).filter(
            Students.name == name).first()
        students_id = student.id
        discipline = request.json['discipline']
        mark = request.json['mark']
        grade = Grades(students_id=students_id,
                       discipline=discipline, mark=mark)
    except Exception as e:
        response = jsonify(message='Error: {}. '.format(e))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    try:
        grade.validate_mark(mark=mark)
        db.session.add(grade)
        db.session.commit()
        return grade_schema.jsonify(grade)
    except AssertionError as e:
        response = jsonify(message='Error: {}. '.format(e))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route('/get/grade/<id>', methods=['GET'])
def get_grades_by_id(id: int):
    grade = Grades.query.get(id)
    return grade_schema.jsonify(grade)


@app.route('/update/grade/<id>', methods=['PUT'])
def update_grade(id: int):
    try:
        grade = Grades.query.get(id)

        students_id = request.json['students_id']
        discipline = request.json['discipline']
        mark = request.json['mark']
        grade.students_id = students_id
        grade.discipline = discipline
        grade.mark = mark
    except Exception as e:
        response = jsonify(message='Error: {}. '.format(e))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    try:
        grade.validate_mark(mark=mark)
        db.session.commit()
        return grade_schema.jsonify(grade)
    except AssertionError as e:
        response = jsonify(message='Error: {}. '.format(e))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route('/del/grade/<id>', methods=['DELETE'])
def del_grade(id: int):
    grade = Grades.query.get(id)
    db.session.delete(grade)
    db.session.commit()

    return grade_schema.jsonify(grade)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
