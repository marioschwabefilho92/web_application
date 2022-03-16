import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function ConfirmDelete(props) {
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
                    Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>WARNING!</h4>
                <p>
                    Are you sure you want to delete?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="danger" onClick={props.onSubmit}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}