import React from "react";
import axios from "axios";
import { useState } from "react";
import { URLS } from "../routes/Routes";

export function Grades(props) {
    const [error, setError] = useState(null);

    const deleteGrade = (id) => {
        console.log("deleteGrade triggered")
        axios.delete(`${URLS.DEL_GRADE}${id}`).then((response) => {
            if (response.status == "200") {
                window.location.reload(false);
            }
        }).catch(error => {
            setError(error);
        });
    }

    return (
        <>
            {props.grades.map(grade => {
                return (
                    <tr key={grade.id}>
                        <td>{props.name}</td>
                        <td>{grade.discipline}</td>
                        <td>{grade.mark}</td>

                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => deleteGrade(grade.id)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}