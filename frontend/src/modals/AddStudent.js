import React from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import APIService from "../routes/APIService";

export default function AddStudent(props) {
    const [formValue, setFormValue] = useState({
        name: "",
        invalidName: false,
        validName: false,
        validatedNameMessage: "Looks Good!"
    });

    const hasBlankSpaces = (str) => {
        return str.match(/^\s+$/) !== null;
    }

    const allLetter = (str) => {
        if (!/[^a-zA-Z]/.test(str)) {
            return false
        } else {
            return true
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        validateName(name, value)
    }

    const validateName = (name, value) => {
        setFormValue((prevState) => {
            if (value === "" || hasBlankSpaces(value)) {
                return {
                    ...prevState,
                    [name]: value,
                    invalidName: true,
                    validName: false,
                    validatedNameMessage: "Name cannot be empty"
                }
            } else if (value.length < 0 || value.length > 100) {
                return {
                    ...prevState,
                    [name]: value,
                    invalidName: true,
                    validName: false,
                    validatedNameMessage: "Name must be between 1 and 100 characters"
                }
            } else if (allLetter(value)) {
                return {
                    ...prevState,
                    [name]: value,
                    invalidName: true,
                    validName: false,
                    validatedNameMessage: "Name must be only alphabets characters"
                }
            } else {
                return {
                    ...prevState,
                    [name]: value,
                    invalidName: false,
                    validName: true,
                    validatedNameMessage: "Looks Good!"
                }
            }
        })
    }

    const handleSubmit = () => {
        if (formValue.validName === true && formValue.invalidName === false) {
            APIService.addStudent(formValue)
        } else {
            console.log("First fix invalid values")
        }
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
                    Add Student
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            onChange={handleChange}
                            isInvalid={formValue.invalidName}
                            isValid={formValue.validName}
                        />
                        <Form.Control.Feedback type='invalid'>{formValue.validatedNameMessage}</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>{formValue.validatedNameMessage}</Form.Control.Feedback>
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