import axios from "axios";

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

export const deleteGrade = (id) => {
    console.log("deleteGrade triggered")
    axios.delete(`${URLS.DELETE.GRADE_BY_ID}${id}`).then((response) => {
        if (response.status === 200) {
            window.location.reload(false);
        }
    }).catch(error => {
        console.log(error)
    });
}

export const updateGrade = (id, data) => {
    console.log("updateGrade triggered")
    axios.put(`${URLS.UPDATE.GRADE_BY_ID}${id}`, JSON.stringify(data)).then((response) => {
        if (response.status === 200) {
            window.location.reload(false);
        }
    }).catch(error => {
        console.log(error)
    });
}