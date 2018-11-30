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

    requestTeaserImage(params) {
        params.show = 'pic,katcode';
        return this.requestSearch(params).then(response => {
            return new Promise((resolve, reject) => {
                if (!response.items || response.items.length === 0) {
                    reject();
                }
                let item = response.items[0];
                let image = item.Images.Medium.find(image => image.type === 'A') || item.Images.Medium[0];
                resolve(image.url);
            });
        });
    }
}
