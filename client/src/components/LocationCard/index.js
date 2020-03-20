import React from 'react';
import API from '../../utils/locationAPI';
import { useStoreContext } from '../../utils/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import "./style.css";

function CreateCard(props) {

    const [state] = useStoreContext();

    const handleLikeIncrement = event => {
        API.updateLike({ likes: state.locations[props.i].location_like, id: state.locations[props.i].id }).then(data => {
            console.log(data)
            props.click()
        });

        event.preventDefault();
    }

    const handleDisLikeIncrement = event => {
        API.updateDisLike({ dislikes: state.locations[props.i].location_dislike, id: state.locations[props.i].id }).then(data => {
            props.click()
        });

        event.preventDefault();
    }
    const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} />
    const thumbsDown = <FontAwesomeIcon icon={faThumbsDown} />

    return(
       <span className='border-2 border-primary'>
           <br></br>
        <div className="cardDiv">
            <h4>{props.data.location_name}</h4>
            <p>{props.data.location_address}</p>
            <p>{props.data.location_city}, {props.data.location_state}. {props.data.location_zip}</p>
            <iframe
                title="google-maps"
                className="map-container"
                width="300"
                height="200"
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${props.data.location_name}`}
                allowFullScreen>
            </iframe>
            <p>Does this location offer an angel shot service?  {props.data.angel_shot}</p>
            <button onClick={handleLikeIncrement} id="thumbsup">{thumbsUp} {state.locations[props.i].location_like || 0}</button>
            <button onClick={handleDisLikeIncrement} id="thumbsdown">{thumbsDown} {state.locations[props.i].location_dislike || 0}</button>
        </div>
        <br></br>
        </span>
    )
}



export default CreateCard