var ADDRESS = "http://192.168.100.2:5000/"

export var URLS = {
    ADD: {
        STUDENT: ADDRESS + "add/student",
        GRADE: ADDRESS + "add/grade"
    },
    GET: {
        STUDENTS: ADDRESS + "get/students",
        GRADES: ADDRESS + "get/grades",
        STUDENT_BY_ID: ADDRESS + "get/student/",
        GRADE_BY_ID: ADDRESS + "get/student/",
    },
    UPDATE: {
        STUDENT_BY_ID: ADDRESS + "update/student/",
        GRADE_BY_ID: ADDRESS + "update/grade/"
    },
    DELETE: {
        STUDENT_BY_ID: ADDRESS + "del/student/",
        GRADE_BY_ID: ADDRESS + "del/grade/"
    }
}