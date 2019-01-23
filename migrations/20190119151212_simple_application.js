
exports.up = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists("application_forms")
        .dropTableIfExists("parents")
        .createTable("applications", t => {
            t.increments("id").unsigned().primary();
            t.string("name").notNullable();
            t.enum("gender", ["boy", "girl", "neutral"]).notNullable();
            t.date("dob").notNullable();
            t.string("father").notNullable();
            t.string("mother");
            t.bigInteger("phone").notNullable();
            t.string("email");
            t.boolean("isParentAlumni").defaultTo(false);
            t.boolean("hasSiblings").defaultTo(false);
            t.dateTime("createdAt").defaultTo(knex.fn.now());
            t.dateTime("updatedAt").defaultTo(knex.fn.now());
        }).createTable("admin", t=>{
            t.string("user");
            t.string("password"); // currently have it as a plain text. Then we can do a bcrypt.
        }).createTable("schedule", t=> {
            t.string("event");
            t.boolean(  "started");
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists("applications")
        .dropTableIfExists("admin")
        .dropTableIfExists("schedule");
};
