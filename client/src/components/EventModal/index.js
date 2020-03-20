import React from 'react';
import CopyLink from '../CopyLink';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState'

function EventModal (props) {
    const [state, _] = useStoreContext();

    return (
        <div>
            {state.newEvent ? (
                <Modal isOpen={props.show} onHide={props.handleClose}>
                <ModalHeader closeButton>
                    <h3>Date Saved</h3>
                </ModalHeader>
                <ModalBody>
                    <p>Your date has been successfully saved!</p>
                    <p>Here is your unique date page link that you can share with friends.</p>
                    <CopyLink shortid={state.newEvent.shortid} />
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={props.handleClose}>
                        Got it!
              </Button>
                </ModalFooter>
            </Modal>
            ) : (<></>)}
        </div>
    )
};

export default EventModal;