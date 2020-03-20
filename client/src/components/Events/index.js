import React from 'react';
import EventTab from '../EventTab';
import UpcomingEvent from '../UpcomingEvent';
import CreateEvent from '../CreateEvent';
import AllEvents from '../AllEvents';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_EVENT_ACTIVE } from '../../utils/actions';

function Events() {
    const [state, dispatch] = useStoreContext();

    const handleClick = (event) => {
        let name = event.target.name;
        dispatch({
            type: UPDATE_EVENT_ACTIVE,
            eventActive: name
        });
    }

    return (
        <div className="events-container">
            <EventTab handleClick={handleClick} />
            <div className="events-container">
                {state.eventActive === 'upcoming' ? (
                    <UpcomingEvent />
                ) : state.eventActive === 'create' ? (
                    <CreateEvent handleClick={handleClick}/>
                ) : state.eventActive === 'all' ? (
                    <AllEvents />
                ) : (<UpcomingEvent />)}
            </div>
        </div>
    )
};

export default Events;