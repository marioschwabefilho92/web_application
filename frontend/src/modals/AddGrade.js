import React from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import { APIService } from "../routes/APIService";

export default function AddGrade(props) {
    const [students] = useState(props.students)
    const [formValue, setFormValue] = useState({
        name: "",
        discipline: "",
        mark: ""
    });
    const [avaliableDisciplines] = useState(["Biology", "Math", "Physics"]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        console.log(formValue)
    };

    const handleSubmit = () => {
        console.log(formValue)
        APIService.addGrade(formValue)
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Grade
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Select name="name" onChange={handleChange}>
                            {students.map(({ name, id }) => {
                                return (
                                    <option key={id}>{name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Discipline</Form.Label>
                        <Form.Select name="discipline" onChange={handleChange}>
                            {avaliableDisciplines.map((discipline, id) => {
                                return (
                                    <option key={id}>{discipline}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mark</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="mark"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="success" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}