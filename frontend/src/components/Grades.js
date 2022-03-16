import React from "react";
import { useState } from "react";
import ConfirmDelete from "../modals/ConfirmDelete"
import UpdateGrade from "../modals/UpdateGrade";
import { deleteGrade } from "../routes/Routes";
import Button from 'react-bootstrap/Button'

export function Grades(props) {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showUpdateGrade, setShowUpdateGrade] = useState(false);
    const [gradeId, setGradeId] = useState();
    const [studentId, setStudentId] = useState();

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
                                setStudentId(props.student_id)
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
                        onSubmit={() => deleteGrade(gradeId)}
                    />
                    : false
            }
            {
                showUpdateGrade ?
                    <UpdateGrade
                        show={showUpdateGrade}
                        id={gradeId}
                        student_id={studentId}
                        onHide={() => setShowUpdateGrade(false)}
                    />
                    : false
            }

        </>
    )
}