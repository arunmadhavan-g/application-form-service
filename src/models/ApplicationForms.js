import {Model} from 'objection';
import Parents from "./Parents";


export default class ApplicationForms extends Model {
    static tableName = "application_forms";

    static jsonSchema = {
        type: 'object',
        required: ["name",
                    "gender",
                    "date_of_birth",
                    "nationality"],
        properties:{
            id: {type: 'integer'},
            father_id: {type: 'integer'},
            mother_id: {type: 'integer'},
            name: {type: 'string'},
            gender: {type: 'string'},
            date_of_birth: {type: 'date'},
            created: {type: 'datetime'},
            updated: {type: 'datetime'}
        }
    };

    static relationMappings = {
        father: {
            relation: Model.BelongsToOneRelation,
            modelClass: Parents,
            join: {
                from: 'application_forms.father_id',
                to: 'parents.id'
            }
        },
        mother: {
            relation: Model.BelongsToOneRelation,
            modelClass: Parents,
            join: {
                from: 'application_forms.mother_id',
                to: 'parents.id'
            }
        }
    };
}