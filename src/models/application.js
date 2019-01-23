import {Model, transaction} from 'objection';


class Application extends Model {
    static tableName = 'applications';

    static jsonSchema = {
        type: 'object',
        required: ["name", "gender", "dob", "father", "phone"],
        properties:{
            id: { type: 'integer' },
            name: { type: 'string' },
            gender: { type: 'string' },
            dob: { type: 'date' },
            father: { type: 'string' },
            mother: { type: 'string' },
            phone: { type: 'bigInteger' },
            email: { type: 'string' },
            isParentAlumni: { type: 'boolean' },
            hasSiblings: { type: 'boolean' },
            createdAt: { type: 'dateTime' },
            updatedAt: { type: 'dateTime' }
        }
    };
}

const createApplication = async (graph) => await transaction(Application.knex(),
                                            tx => Application.query(tx)
                                                                     .insertGraph(graph));

const allApplications = async () => await Application.query().orderBy('applications.id');

export {
    createApplication,
    allApplications
}