use serde::{Deserialize, Serialize};

use crate::schema::todos;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
pub struct Todo {
    pub id: String,
    pub title: String,
    pub is_done: bool,
}
