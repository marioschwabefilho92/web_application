import axios from "axios";
import React, { useState, useEffect } from "react";
import { Students } from "./components/Students";

const getStudentsUrl = "http://192.168.100.2:5000/get/students";

export default function App() {
  const [students, setStudents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${getStudentsUrl}`).then((response) => {
      setStudents(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  if (error) return `Error: ${error.message}`;
  if (!students) return "No Students!"

  return (
    <div>
      <h1>HELLO</h1>
      {students.map(student => {
        return (
          <div key={student.id}>
            <h2>{student.name}</h2>
          </div>
        )
      })}
    </div>
  );
}
