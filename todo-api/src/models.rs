use serde::{Deserialize, Serialize};

use crate::schema::todos;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
pub struct Todo {
    pub id: String,
    pub title: String,
    #[serde(rename(serialize = "isDone", deserialize = "isDone"))]
    pub is_done: bool,
}

#[derive(Debug, Deserialize)]
pub struct CreateTodoRequest {
    pub title: String,
}

#[derive(Debug, Deserialize)]
pub struct DeleteTodosRequest {
    pub ids: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTodoRequest {
    #[serde(rename(deserialize = "isDone"))]
    pub is_done: bool,
}
