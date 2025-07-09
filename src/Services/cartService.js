import axios from "./httpRequester";

export const addItem = itemId => {
    return axios.post('/cart', { itemId }).catch(e => e.response);
}