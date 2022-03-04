import React from "react";

export function Students(props) {
    return (
        <div>
            {props.students.map(student => {
                return (
                    <div key={student.id}>
                        <h2>{student.name}</h2>
                    </div>
                )
            })}
        </div>
    );
}