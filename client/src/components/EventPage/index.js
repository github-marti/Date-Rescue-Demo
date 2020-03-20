import React from 'react';
import Moment from 'react-moment';
import API from '../../utils/eventAPI';
import './style.css';

class EventPage extends React.Component {
    state = {
        event_name: "",
        event_date: "",
        event_time: "",
        event_location: "",
        event_note: "",
        event_date_picture: ""
    }


    async componentDidMount() {
        const { shortid } = this.props.match.params;
        let eventData = await API.getEventByShortId(shortid);
        this.setState({
            event_name: eventData.data.event_name,
            event_date: eventData.data.event_date,
            event_time: eventData.data.event_time,
            event_location: eventData.data.event_location,
            event_note: eventData.data.event_note,
            event_date_picture: eventData.data.event_date_picture
        })
    }

    formatTime = time => {
        let hour = time.split(':')[0];
        if (hour.charAt(0) === '0') {
            hour = hour.substring(1);
        }
        let minutes = time.split(':')[1];
        return hour > 12 ? `${(hour - 12)}:${minutes} PM` : `${hour}:${minutes} AM`;
    };

    render() {
        if (this.state.event_name) {
            return (
                <div>
                    <h4 className="font-weight-bold title p-3">Your Friend's DateRescue Page</h4>
                    <div className="p-3">
                        <p><span className="font-weight-bold">Date:</span> <Moment date={this.state.event_date} format="MMMM Do YYYY" /></p>
                        <p><span className="font-weight-bold">Time:</span> {this.formatTime(this.state.event_time)}</p>
                        <p><span className="font-weight-bold">Location:</span> {this.state.event_location}</p>
                        <iframe title="google-maps" width="300" height="200" frameBorder="0"
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${this.state.event_location}`} allowFullScreen></iframe>
                        <p><span className="font-weight-bold">Note:</span> {this.state.event_note}</p>
                        <p><img width="300px" src={this.state.event_date_picture} alt="date"></img></p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="m-4">
                    <h4>Sorry, this event address is either invalid or has expired.</h4>
                    <p>If you think there's been some sort of mistake, ask your friend to resend their unique event address,
                    or if this is your event, login to <a href="/">Date Rescue</a> and double-check the address is correct.</p>
                </div>
            )
        }
    }

}

export default EventPage;