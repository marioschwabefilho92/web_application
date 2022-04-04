import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Grades } from "./Grades";
import styles from "./Student.module.css"
import AddGrade from "../modals/AddGrade";
import AddStudent from "../modals/AddStudent";

export function Students(props) {
    const [students] = useState(props.students)
    const [disciplines] = useState(["Biology", "Math", "Physics"]);
    const [showAddGrade, setShowAddGrade] = useState(false);
    const [showAddStudent, setShowAddStudent] = useState(false);

    return (
        <>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Discipline</th>
                    <th>Mark</th>
                    <th>
                        <Button variant="warning" className={styles.add_grade_button} onClick={() => {
                            setShowAddGrade(true);
                        }}>ADD GRADE</Button>
                    </th>
                    <th>
                        <Button variant="success" className={styles.add_student_button} onClick={() => {
                            setShowAddStudent(true);
                        }}>ADD STUDENT</Button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {students.map(({ name, id, grades }) => {
                    return (
                        <Grades key={id} name={name} grades={grades} disciplines={disciplines} />
                    )
                })}
            </tbody>
            {
                showAddGrade ?
                    <AddGrade
                        show={showAddGrade}
                        students={students}
                        disciplines={disciplines}
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