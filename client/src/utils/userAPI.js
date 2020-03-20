import axios from 'axios';

export default {
    getUser: function () {
        return axios.get("/api/user_data");
    },
    logout: function () {
        return axios.get("/api/logout");
    }
}