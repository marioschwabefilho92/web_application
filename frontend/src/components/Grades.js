import React from "react";
import { useState } from "react";
import ConfirmDelete from "../forms/ConfirmDelete"
import { deleteGrade } from "../routes/Routes";

export function Grades(props) {
    const [modalShow, setModalShow] = useState(false);
    const [gradeId, setGradeId] = useState();

    return (
        <>
            {props.grades.map(grade => {
                return (
                    <tr key={grade.id}>
                        <td>{props.name}</td>
                        <td>{grade.discipline}</td>
                        <td>{grade.mark}</td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                setModalShow(true);
                                setGradeId(grade.id)
                            }}>Delete</button>
                        </td>
                    </tr>
                )
            })}
            {modalShow ?
                <ConfirmDelete
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSubmit={() => deleteGrade(gradeId)}
                />
                : false}

        </>
    )
}