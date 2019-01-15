import {Model} from 'objection';


export default class Parents extends Model {
    static tableName = "parents";

    static jsonSchema = {
        type: 'object',
        required: ["name", "occupation", "annual_income", "is_alumni"],
        properties: {
            id: {type: 'integer'},
            name: {type: 'string'},
            occupation: {type: 'string'},
            annual_income: {type: 'float'},
            is_alumni: {type: 'boolean'},
            created: {type: 'datetime'},
            modified: {type: 'datetime'}
        }
    };

    // static relationMapping = {
    //   application_forms: {
    //       relation: Model.HasOneRelation,
    //       modelClass: `${__dirname}/ApplicationForms`,
    //       join: {
    //           from:'parents.id',
    //           to:  'application_forms.id'
    //       }
    //   }
    // };
}