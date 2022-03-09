import React from "react";

export function Grades(props) {
    return (
        <tbody>
            {props.grades.map(grade => {
                return (
                    <tr key={grade.id}>
                        <td>{grade.discipline}</td>
                        <td>{grade.mark}</td>
                        <td>{grade.students_id}</td>
                    </tr>
                )
            })}
        </tbody>
    );
}