import React, { createContext, useReducer, useContext } from "react";
import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOCATION,
  UPDATE_EVENT_ACTIVE,
  UPDATE_HOME_ACTIVE,
  SET_NEW_EVENT,
  SET_UPCOMING_EVENT,
  SET_ALL_EVENTS,
  UPDATE_EVENT,
  REMOVE_EVENT,
  COMPLETE_EVENT,
  ADD_LOCATION,
  ADD_LIKE,
  ADD_DISLIKE
} from './actions';
import moment from 'moment';

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        username: action.username,
        userid: action.userid,
        phoneNumber: action.phoneNumber
      }

    case LOGOUT_USER:
      return {
        ...state,
        username: ''
      }
      
    case SET_LOCATION:
      return {
        ...state,
        locations: action.locations,
        filteredLocations: action.locations
      }

    case UPDATE_EVENT_ACTIVE:
      return {
        ...state,
        eventActive: action.eventActive
      }

    case UPDATE_HOME_ACTIVE:
      return {
        ...state,
        homeActive: action.homeActive
      }

    case SET_NEW_EVENT:
      return {
        ...state,
        newEvent: action.newEvent
      }

    case SET_UPCOMING_EVENT:
      return {
        ...state,
        upcomingEvent: action.event
      }

    case SET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.allEvents
      }

    case UPDATE_EVENT:
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          [action.column]: action.update
        }
      }

    case COMPLETE_EVENT:
      return {
        ...state,
        newEvent: {},
        allEvents: [
          ...state.allEvents,
          action.completedEvent
        ]
      }

    case REMOVE_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.filter(event => {
          return action.id !== event.id
        })
      }

    case ADD_LOCATION:
      return {
        ...state,
        locations: [
          ...state.locations,
          action.newLocation
        ]
      }

    case ADD_LIKE:
      return {
        ...state,
        likes: state.locations.map(location => {
          if (location.id === action.id) {
            location.likes += 1
          }
          return location
        })
      }

    case ADD_DISLIKE:
      return {
        ...state,
        dislikes: state.locations.map(location => {
          if (location.id === action.id) {
            location.dislikes += 1
          }
          return location
        })
      }

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    userid: 0,
    reload: false,
    autocomplete: "",
    newEvent: {
      event_date: moment.utc().local().format(),
    },
    upcomingCall: {},
    upcomingText: {},
    locations: [{
      id: 0,
      locationName: "",
      locationAddress: "",
      locationCity: "",
      locationState: "",
      locationZip: "",
      angelShot: "",
      likes: 0,
      dislikes: 0
    }],
    filteredLocations: [],
    handleInputChange: event => {
      let name = event.target.name;
      let value = event.target.value;
      if (name === 'call_type') {
        dispatch({
          type: UPDATE_EVENT,
          column: name,
          update: event.target.innerText
        })
      } else {
        dispatch({
          type: UPDATE_EVENT,
          column: name,
          update: value
        });
      };
    },
    handleDateChange: date => {
      let eventDate = moment.utc(date).local().format();
      dispatch({
        type: UPDATE_EVENT,
        column: "event_date",
        update: eventDate
      });
    },
    handleTimeChange: time => {
      dispatch({
        type: UPDATE_EVENT,
        column: "event_time",
        update: time
      });
    },
    handleCallTime: time => {
      dispatch({
        type: UPDATE_EVENT,
        column: "call_time",
        update: time
      })
    }

  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
