import React from "react";
import { Grades } from "./Grades";


export function Students(props) {
    return (
        <>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Discipline</td>
                    <td>Mark</td>
                </tr>
            </thead>

            {props.students.map(({ name, id, grades }) => {
                return (
                    <tbody key={id}>
                        <Grades name={name} grades={grades} />
                    </tbody>

                )
            })}

        </>
    );
}