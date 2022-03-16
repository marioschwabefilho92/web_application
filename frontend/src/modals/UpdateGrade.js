import React from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import { updateGrade } from "../routes/Routes";

export default function UpdateGrade(props) {
    const [formValue, setFormValue] = useState({
        username: "",
        discipline: "",
        mark: "",
    });

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
        updateGrade(1, formValue)
    };

    const { username, discipline, mark } = formValue;
    console.log(props)
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
                        <Form.Control
                            required
                            type="text"
                            name="username"
                            placeholder={username}
                            defaultValue="Name"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Discipline</Form.Label>
                        <Form.Select name="discipline" placeholder={discipline} onChange={handleChange}>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mark</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="mark"
                            placeholder={mark}
                            defaultValue="Mark"
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