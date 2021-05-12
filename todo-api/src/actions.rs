use diesel::{RunQueryDsl, SqliteConnection};

use crate::models;

pub fn get_all_todos(
    connection: &SqliteConnection,
) -> Result<Vec<models::Todo>, diesel::result::Error> {
    use crate::schema::todos::dsl::*;

    todos.load::<models::Todo>(connection)
}

