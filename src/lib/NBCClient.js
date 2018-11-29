import axios from 'axios';
export default class NBCClient {
    constructor(url) {
        this.url = url;
        this.$http = axios.create({
            baseURL: url
        }) ;
    }

    requestList(params, orderBy) {
        return this.$http.post('list', params)
                .then(responseObj => responseObj.data);
    }

    requestSearch(params) {
        return this.$http.post('search', params)
            .then(responseObj => responseObj.data);
    }

    requestHotel(params) {
        return this.$http.post('hotel', params)
            .then(responseObj => responseObj.data);
    }
};
