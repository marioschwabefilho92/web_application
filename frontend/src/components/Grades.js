import React from "react";
import axios from "axios";
import { useState } from "react";
import { URLS } from "../routes/Routes";

export function Grades(props) {
    const [error, setError] = useState(null);

    const deleteGrade = (id, students_id) => {
        console.log("Delete Clicked")
        console.log(id)
        console.log(students_id)
        axios.get(`${URLS.DEL_STUDENT}${students_id}`).then((response) => {
            console.log(response)
        }).catch(error => {
            setError(error);
        });
    }
    console.log(error)

    return (
        <>
            {props.grades.map(grade => {
                return (
                    <tr key={grade.id}>
                        <td>{props.name}</td>
                        <td>{grade.discipline}</td>
                        <td>{grade.mark}</td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => deleteGrade(grade.id, grade.students_id)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}