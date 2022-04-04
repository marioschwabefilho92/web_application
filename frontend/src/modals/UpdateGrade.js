import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import APIService from "../routes/APIService";

export default function UpdateGrade(props) {
    const [formValue, setFormValue] = useState({
        students_id: props.students_id,
        discipline: props.discipline,
        mark: props.mark,
        invalidMark: false,
        validMark: true,
        validatedMarkMessage: "Looks Good!"
    })
    const [disciplines] = useState(props.disciplines)

    const hasBlankSpaces = (str) => {
        return str.match(/^\s+$/) !== null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        startValidation(name, value)
    }

    const startValidation = (name, value) => {
        if (name === "mark") {
            validateMark(name, value)
        } else if (name === "discipline") {
            setFormValue((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                }
            })
        } else {
            console.log("Nothing to validate")
        }
    }


    const validateMark = (name, value) => {
        setFormValue((prevState) => {
            if (value === "" || hasBlankSpaces(value)) {
                return {
                    ...prevState,
                    [name]: value,
                    invalidMark: true,
                    validMark: false,
                    validatedMarkMessage: "Mark value cannot be empty"
                }
            } else if (value < 0 || value > 100 || isNaN(value)) {
                return {
                    ...prevState,
                    [name]: value,
                    invalidMark: true,
                    validMark: false,
                    validatedMarkMessage: "Mark must be a number between 0 and 100"
                }
            } else {
                return {
                    ...prevState,
                    [name]: value,
                    invalidMark: false,
                    validMark: true,
                    validatedMarkMessage: "Looks Good!"
                }
            }
        })
    }

    const handleSubmit = () => {
        if (props.discipline === formValue.discipline && props.mark === formValue.mark) {
            console.log("Nothing to update")
        } else if (formValue.validMark === true && formValue.invalidMark === false) {
            APIService.updateGrade(props.id, formValue)
        } else {
            console.log("First fix invalid values")
        }
    }

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
                            disabled
                            type="text"
                            defaultValue={props.student_name}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Discipline</Form.Label>
                        <Form.Select name="discipline" value={formValue.discipline} onChange={handleChange}>
                            {disciplines.map((discipline, id) => {
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
                            defaultValue={props.mark}
                            onChange={handleChange}
                            isInvalid={formValue.invalidMark}
                            isValid={formValue.validMark}
                        />
                        <Form.Control.Feedback type='invalid'>{formValue.validatedMarkMessage}</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>{formValue.validatedMarkMessage}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="success" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}