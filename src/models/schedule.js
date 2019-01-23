import {Model, transaction} from 'objection';


class Schedule extends Model {
    static tableName = 'schedule';

    static jsonSchema = {
        type: 'object',
        required: ["started", "event"],
        properties: {
            started: {type: "boolean"},
            event: {type: "string"}
        }
    }
}

const start = async (event) => {
    await transaction(Schedule.knex(),
        tx => Schedule.query(tx).where('event','=', event).update({event: event, started: true}));
};

const end = async (event) => {
    await transaction(Schedule.knex(),
        tx => Schedule.query(tx).where('event','=', event).update({event: event, started: false}));
};

export {
    start,
    end
}