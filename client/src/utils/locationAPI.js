import axios from "axios";

export default {
    // Gets all locations
    getLocation: function (locationid) {
        return axios.get(`/api/locations/${locationid}`);
    },

    getAllLocations: function () {
        return axios.get(`/api/locations/all`).then(data=>{return data});
    },
    // Gets the location with the given id that will filter city name
    getFilterLocation: function (locationid, location_city) {
        return axios.get(`/api/locations/location_city/${location_city}=`).then(data=>{return data});
    },
    // Saves the location to the database
    saveLocation: function (locationData) {
        return axios.post("/api/locations", locationData);
    },
    // Updates like with given information
    updateLike: function (data) {
        console.log(data)
        return axios.put(`/api/locations/addlike/${data.id}`, {likes: data.likes? data.likes: 0});
    },
    // Updates dislike with given information
    updateDisLike: function (data) {
        console.log(data)
        return axios.put(`/api/locations/adddislike/${data.id}`, {dislikes: data.dislikes? data.dislikes: 0});
    }
};