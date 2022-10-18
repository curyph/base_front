import axios from "axios";

export default {
    getStates() {
        return axios.get(`/api/states`)
    },

    getCities(state_id) {
        return axios.get(`/api/states/${state_id}/cities`)
    }
}