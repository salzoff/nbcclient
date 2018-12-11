import axios from 'axios';
export default class NBCClient {
    constructor(url) {
        this.url = url;
        this.$http = axios.create({
            baseURL: url
        }) ;
    }

    transformParams(params) {
        return params;
    }

    requestList(params, orderBy) {
        return this.$http.post('list', this.transformParams(params))
                .then(responseObj => responseObj.data);
    }

    requestSearch(params) {
        return this.$http.post('search', this.transformParams(params))
            .then(responseObj => responseObj.data);
    }

    requestHotel(params) {
        return this.$http.post('hotel', this.transformParams(params))
            .then(responseObj => responseObj.data[0] ? responseObj.data[0] : responseObj.data);
    }

    requestTeaserImage(params) {
        params.show = 'pic320,katcode,oc';
        return this.requestSearch(params)
            .then(response => {
                return new Promise((resolve, reject) => {
                    if (!response.items || response.items.length === 0) {
                        reject();
                        return;
                    }
                    let item = response.items[0];
                    let image = item.Images.Medium.find(image => image.type === 'A') || item.Images.Medium[0];
                    resolve(image.Url);
            });
        });
    }

    requestImages(params) {
        params.show = 'pic800,katcode,oc';
        return this.requestHotel(params)
            .then(response => {
                return new Promise((resolve, reject) => {
                    if (!response.items || response.items.length === 0) {
                        reject();
                        return;
                    }
                    let item = response.items[0];
                    let images = item.Images.Medium.map(image => image.url);
                    resolve(image.Url);
                });
            });
    }
}
