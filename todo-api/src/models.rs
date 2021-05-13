use serde::{Deserialize, Serialize};

use crate::schema::todos;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
pub struct Todo {
    pub id: String,
    pub title: String,
    pub is_done: bool,
}

#[derive(Debug, Deserialize)]
pub struct AddTodo {
    pub title: String,
}

#[derive(Debug, Deserialize)]
pub struct DeleteTodo {
    pub id: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTodo {
    pub id: String,
    pub is_done: bool,
}
