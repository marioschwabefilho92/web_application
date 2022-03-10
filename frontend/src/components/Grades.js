import React from "react";

export function Grades(props) {
    return (
        <>
            {props.grades.map(grade => {
                return (
                    <tr key={grade.id}>
                        <td>{props.name}</td>
                        <td>{grade.discipline}</td>
                        <td>{grade.mark}</td>
                    </tr>
                )
            })}
        </>
    )
}