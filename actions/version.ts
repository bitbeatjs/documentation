import { WebAction } from '@bitbeat/web';
import axios from 'axios';

export default class Version extends WebAction {
    constructor() {
        super();
        this.name = 'version';
        this.methods = ['GET'];
    }

    async run({ result }: any): Promise<void> {
        const { data } = await axios.get('https://registry.npmjs.org/-/package/@bitbeat/core/dist-tags');
        const { latest } = data;
        result.version = latest;
    }
}