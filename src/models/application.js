import {Model} from 'objection';


export default class Application extends Model {
    static tableName = 'application';

    static jsonSchema = {
        type: 'object',
        required: ["name"],
        properties:{
            id: {type: 'integer'},
            name: {type: 'string'}
        }
    };
}