import { WebAction } from '@bitbeat/web';
import axios from 'axios';

export default class Version extends WebAction {
    constructor() {
        super();
        this.name = 'version';
        this.methods = ['POST'];
        this.inputs = {
            name: {
                type: String,
                required: true,
                example: '@bitbeat/core',
                description: 'Get back the package version in the official npm repository.'
            }
        };
    }

    async run({ result, params }: any): Promise<void> {
        const { data } = await axios.get(`https://registry.npmjs.org/-/package/${params.name}/dist-tags`);
        const { latest } = data;
        result.version = latest;
    }
}