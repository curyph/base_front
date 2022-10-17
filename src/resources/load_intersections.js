import axios from "axios";

export default {
    get() {
        //return axios.get(`/api/farms/${}`)
        return axios.get(`/api/farms/16/reserves`)
    }
}