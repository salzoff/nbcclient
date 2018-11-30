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
                if (!response.items || response.items.length === 0) {
                    return false;
                }
                let item = response.items.find(item => item.CatalogCode === params.katcode) || response.items[0];
                let image = item.Images.Medium.find(image => image.type === 'A') || item.Images.Medium[0];
                return image.url;
            });
    }
}
