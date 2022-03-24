import React from "react";
import { useState } from "react";
import ConfirmDelete from "../modals/ConfirmDelete"
import UpdateGrade from "../modals/UpdateGrade";
import Button from 'react-bootstrap/Button'
import APIService from "../routes/APIService";

export function Grades(props) {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showUpdateGrade, setShowUpdateGrade] = useState(false);
    const [gradeId, setGradeId] = useState();
    const [discipline, setDiscipline] = useState();
    const [mark, setMark] = useState();
    const [studentsId, setStudentsId] = useState();
    const [studentName, setStudentName] = useState();

    return (
        <>
            {props.grades.map(grade => {
                return (
                    <tr key={grade.id}>
                        <td>{props.name}</td>
                        <td>{grade.discipline}</td>
                        <td>{grade.mark}</td>
                        <td>
                            <Button onClick={() => {
                                setShowUpdateGrade(true);
                                setGradeId(grade.id)
                                setStudentsId(grade.students_id)
                                setStudentName(props.name)
                                setDiscipline(grade.discipline)
                                setMark(grade.mark)
                            }}>Update</Button>
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => {
                                setShowConfirmDelete(true);
                                setGradeId(grade.id)
                            }}>Delete</Button>
                        </td>
                    </tr>
                )
            })}
            {
                showConfirmDelete ?
                    <ConfirmDelete
                        show={showConfirmDelete}
                        onHide={() => setShowConfirmDelete(false)}
                        onSubmit={() => APIService.deleteGrade(gradeId)}
                    />
                    : false
            }
            {
                showUpdateGrade ?
                    <UpdateGrade
                        show={showUpdateGrade}
                        id={gradeId}
                        students_id={studentsId}
                        student_name={studentName}
                        discipline={discipline}
                        mark={mark}
                        onHide={() => setShowUpdateGrade(false)}
                    />
                    : false
            }

        </>
    )
}