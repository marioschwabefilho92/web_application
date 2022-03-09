import React from "react";

export function Students(props) {
    return (
        <tbody>
            {props.students.map(student => {
                return (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                    </tr>
                )
            })}
        </tbody>
    );
}