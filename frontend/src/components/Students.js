import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Grades } from "./Grades";
import styles from "./Student.module.css"
import AddGrade from "../modals/AddGrade";
import AddStudent from "../modals/AddStudent";

export function Students(props) {
    const [students] = useState(props.students)
    const [showAddGrade, setShowAddGrade] = useState(false);
    const [showAddStudent, setShowAddStudent] = useState(false);
    console.log(students)

    return (
        <>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Discipline</td>
                    <td>Mark</td>
                    <td>
                        <Button variant="warning" className={styles.add_grade_button} onClick={() => {
                            setShowAddGrade(true);
                        }}>ADD GRADE</Button>
                    </td>
                    <td>
                        <Button variant="success" className={styles.add_student_button} onClick={() => {
                            setShowAddStudent(true);
                        }}>ADD STUDENT</Button>
                    </td>
                </tr>
            </thead>

            {students.map(({ name, id, grades }) => {
                return (
                    <tbody key={id}>
                        <Grades name={name} grades={grades} />
                    </tbody>

                )
            })}

            {
                showAddGrade ?
                    <AddGrade
                        show={showAddGrade}
                        students={students}
                        onHide={() => setShowAddGrade(false)}
                    />
                    : false
            }
            {
                showAddStudent ?
                    <AddStudent
                        show={showAddStudent}
                        onHide={() => setShowAddStudent(false)}
                    />
                    : false
            }

        </>
    );
}