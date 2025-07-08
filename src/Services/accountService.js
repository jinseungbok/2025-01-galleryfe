import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080/api/v1'

export const join = args => {
    return axios.post('/account/join', args).catch(e => e.response);
}