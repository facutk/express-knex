
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('counter', function(table) {
        table.increments('uid').primary();
        table.integer('count');
        table.timestamps();
    });

};

exports.down = function(knex, Promise) {

    return knex.schema.dropTable('counter');
  
};
