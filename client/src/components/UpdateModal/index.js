import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Search from '../Search';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';
import './style.css';

function UpdateModal(props) {
    const [state] = useStoreContext();
    const [dropdownOpen, setDropdown] = useState();

    const toggle = () => {
        setDropdown(!dropdownOpen);
    };

    return (
        <Modal isOpen={props.show}>
            <ModalHeader closeButton>
                <h3>Update-a-Date</h3>
            </ModalHeader>
            <ModalBody>
                <label className="font-weight-bold">Name</label>
                <p>
                    <input type="text" name="event_name" value={state.newEvent.event_name} required onChange={state.handleInputChange} />
                </p>
                <label className="font-weight-bold">Date</label>
                <p>
                    <DatePicker value={new Date(`${state.newEvent.event_date}`)} onChange={state.handleDateChange} minDate={new Date()} />
                </p>
                <label className="font-weight-bold">Time</label>
                <p>
                    <TimePicker value={state.newEvent.event_time} onChange={state.handleTimeChange} disableClock={true} />
                </p>
                <label className="font-weight-bold">Location</label>
                <Search handleInputChange={state.handleInputChange} />
                <label className="font-weight-bold">Notes</label>
                <p>
                    <textarea name="event_note" value={state.newEvent.event_note} onChange={state.handleInputChange} />
                </p>
                <div className="call-container">
                    <label className="font-weight-bold">Call Time</label>
                    <p>
                        <TimePicker value={state.newEvent.call_time} onChange={state.handleCallTime} disableClock={true} />
                    </p>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            {state.newEvent.call_type && state.newEvent.call_type !== '' ? state.newEvent.call_type : "Call Type"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name="call_type" onClick={state.handleInputChange}>Best Friend Breakup</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem name="call_type" onClick={state.handleInputChange}>Family Emergency</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>

                <input type="file" id="event_image" />

            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" name="update" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" name="update" onClick={props.handleUpdate}>
                    Update
                </Button>
            </ModalFooter>
        </Modal>
    )
};

export default UpdateModal;