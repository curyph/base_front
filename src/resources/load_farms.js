import axios from "axios";

// export default {
//     post(state_id, city_id, abc) {
//         console.log(JSON.stringify(abc))
//         return axios.post(`/api/farms/search?state_id=${state_id}&city_id=${city_id}&fpr_id=5`, abc, {
//             data: null,
//             headers: {
//               'Content-Type': 'application/json'
//             }
//         })
//     }
// }

export default {
    get(state_id, city_id) {
        return axios.get(`/api/farms/states/${state_id}/cities/${city_id}`)
    }
}

// export default {
//     get(state_id, city_id, pedologies) {
//         return axios.get(`/api/farms/search?state_id=${state_id}&city_id=${city_id}&fpr_id=5&pedology=${pedologies}`)
//     }
// }