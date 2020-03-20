import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function DeleteModal(props) {

    return (
        <Modal isOpen={props.show}>
            <ModalHeader closeButton>
                <p>Delete Date</p>
            </ModalHeader>
            <ModalBody>
                <p>Ready to forget about the whole thing? If you click the "Delete Date" button below, this date will disappear from the annals of the time forever.</p>
                <p>Only click if you're sure!</p> 
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" name="delete" onClick={props.handleClose}>
                    Go Back
                </Button>
                <Button variant="primary" name="delete" onClick={props.handleDelete}>
                    Delete Date
                </Button>
            </ModalFooter>
        </Modal>
    )
};

export default DeleteModal;