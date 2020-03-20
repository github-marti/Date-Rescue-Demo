import React, { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FormData from 'form-data';
import Search from '../Search';
import EventModal from '../EventModal';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/eventAPI';
import { SET_NEW_EVENT, UPDATE_EVENT, UPDATE_EVENT_ACTIVE } from '../../utils/actions';
import './style.css';

function CreateEvent() {
    const [state, dispatch] = useStoreContext();
    const [show, setShow] = useState(false);
    const [dropdownOpen, setDropdown] = useState(false);

    useEffect(() => {
        
    }, [state.active, show]);

    const handleClose = () => {
        setShow(false);
        dispatch({
            type: UPDATE_EVENT_ACTIVE,
            eventActive: 'upcoming'
        })
    }

    const toggle = () => {
        setDropdown(!dropdownOpen);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log(state.newEvent);
        let initialEvent = await API.saveEvent({
            event_name: state.newEvent.event_name,
            event_date: state.newEvent.event_date.split('T')[0],
            event_time: state.newEvent.event_time,
            event_location: state.newEvent.event_location,
            event_note: state.newEvent.event_note,
        });
        dispatch({
            type: SET_NEW_EVENT,
            newEvent: initialEvent.data
        });
        let eventImage = document.getElementById('event_image').files[0];
        let eventid = initialEvent.data.id;

        // proceed to save call if user selected to receive a call
        if (state.newEvent.call_time) {
            API.saveCall(eventid, {
                call_time: state.newEvent.call_time,
                event_date: state.newEvent.event_date.split('T')[0],
                call_type: state.newEvent.call_type
            })
        };

        // proceed to save image and update event with image link if image is detected AND initial event data was saved
        if (eventImage && initialEvent.data) {
            let formData = new FormData();
            formData.append("image", eventImage);
            let imageData = await API.saveImage(eventid, formData);
            dispatch({
                type: UPDATE_EVENT,
                column: "event_date_picture",
                update: imageData.data
            });
        };

        //proceed to show modal if event save was successful
        if (initialEvent.data) {
            setShow(true);
        } else {
            console.log('error in saving event');
        };
    };

    return (
        <div className="card-body">
            <label className="font-weight-bold">Name Your Date</label>
            <div><input className="form-control" type="text" name="event_name" required onChange={state.handleInputChange} /></div>
            <label className="font-weight-bold"> Set Date Time</label>
            <div>
                <DatePicker className="mr-8" value={state.newEvent && state.newEvent.event_date ? new Date(state.newEvent.event_date) : new Date()} onChange={state.handleDateChange} minDate={new Date()} />
                <TimePicker onChange={state.handleTimeChange} disableClock={true} />
            </div>
            <label className="font-weight-bold">Set Date Location</label>
            <div><Search /></div>
            <label className="font-weight-bold">Add Notes (optional)</label>
            <div><textarea className="form-control" name="event_note" onChange={state.handleInputChange} /></div>
            <div className="call-container">
                <label className="font-weight-bold">Schedule a Call (optional)</label>
                <div><TimePicker onChange={state.handleCallTime} disableClock={true} /></div>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        {state.newEvent && state.newEvent.call_type ? state.newEvent.call_type : "Call Type"}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem name="call_type" onClick={state.handleInputChange}>Best Friend Breakup</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem name="call_type" onClick={state.handleInputChange}>Family Emergency</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
            <label className="font-weight-bold">Image Upload (optional)</label>
            <div><input type="file" id="event_image" /></div>
            <div><button className="btn btn-primary mx-auto" onClick={handleFormSubmit} id="submit-button">Submit</button></div>
            <EventModal show={show} handleClose={handleClose} />

        </div>
    );
}

export default CreateEvent;
