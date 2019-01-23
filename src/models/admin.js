import {Model} from 'objection';


class Admin extends Model {
    static tableName = 'admin';
    static jsonSchema = {
        type: 'object',
        required: ["user", "password"],
        properties: {
            user: {type: "string"},
            password: {type: "string"}
        }
    };
}

const loginCount = async (user, password) => Number((await Admin.query()
    .where('user', "=", user)
    .where('password', "=", password)
    .count())[0].count);


export {
    loginCount
}