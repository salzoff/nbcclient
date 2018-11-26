import config from '../config';
import NBClient from '../../lib/NBClient';

class ExampleApp {
    constructor() {
        this.client = new NBClient(config.apiUrl);
        this.test = null;
    }
}

document.addEventListener('DOMContentLoader', () => {
    const exampleApp = new ExampleApp();
});