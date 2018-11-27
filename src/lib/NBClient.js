import axios from 'axios';
export default class NBCClient {
    constructor(url) {
        this.url = url;
        this.$http = axios.create({
            baseURL: url
        }) ;
    }

    requestList(params) {
        return this.$http.post('list', params);
    }

    requestSearch(params) {
        return this.$http.post('search', params);
    }

    requestHotel(params) {
        return this.$http.post('hotel', params);
    }
};
