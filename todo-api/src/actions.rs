use diesel::ExpressionMethods;
use diesel::{QueryDsl, RunQueryDsl, SqliteConnection};
use uuid::Uuid;

use crate::models;

pub fn get_all_todos(
    connection: &SqliteConnection,
) -> Result<Vec<models::Todo>, diesel::result::Error> {
    use crate::schema::todos::dsl::*;

    todos.load::<models::Todo>(connection)
}

pub fn insert_new_todo(
    todo_title: &str,
    connection: &SqliteConnection,
) -> Result<models::Todo, diesel::result::Error> {
    use crate::schema::todos::dsl::*;

    let new_todo = models::Todo {
        id: Uuid::new_v4().to_string(),
        title: todo_title.to_owned(),
        is_done: false,
    };

    diesel::insert_into(todos)
        .values(&new_todo)
        .execute(connection)?;

    Ok(new_todo)
}

pub fn delete_todo(
    todo: &models::DeleteTodo,
    connection: &SqliteConnection,
) -> Result<(), diesel::result::Error> {
    use crate::schema::todos::dsl::*;

    diesel::delete(todos.filter(id.eq(&todo.id))).execute(connection)?;

    Ok(())
}

pub fn update_todo(
    todo: &models::UpdateTodo,
    connection: &SqliteConnection,
) -> Result<(), diesel::result::Error> {
    use crate::schema::todos::dsl::*;

    diesel::update(todos.filter(id.eq(&todo.id)))
        .set(is_done.eq(todo.is_done))
        .execute(connection)?;

    Ok(())
}
