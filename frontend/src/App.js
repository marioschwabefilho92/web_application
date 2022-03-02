import axios from "axios";
import React from "react";

const getStudentsUrl = "http://192.168.100.2:5000//get/students";

export default function App() {
  const [students, setStudents] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // invalid url will trigger an 404 error
    axios.get(`${getStudentsUrl}`).then((response) => {
      setStudents(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  if (error) return `Error: ${error.message}`;
  if (!students) return "No Students!"
  console.log(students)

  return (
    <div>
      <h1>{students}</h1>
    </div>
  );
}
