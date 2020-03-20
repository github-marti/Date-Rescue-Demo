import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function CancelModal(props) {

    return (
        <Modal isOpen={props.show}>
            <ModalHeader closeButton>
                <p>Cancel Date</p>
            </ModalHeader>
            <ModalBody>
                <p>Ready to cancel your date? If so, click the "Cancel Date" button below and friends will no longer be able to access the link you gave them.</p> 
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" name="cancel" onClick={props.handleClose}>
                    Go Back
                </Button>
                <Button variant="primary" name="cancel" onClick={props.handleCancel}>
                    Cancel Date
                </Button>
            </ModalFooter>
        </Modal>
    )
};

export default CancelModal;