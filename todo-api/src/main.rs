#[macro_use]
extern crate diesel;

use actix_web::{get, post, web, App, Error, HttpResponse, HttpServer, Responder};
use diesel::{r2d2::ConnectionManager, SqliteConnection};
use dotenv::dotenv;
use std::env;

mod actions;
mod models;
mod schema;

type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

#[get("/")]
async fn get(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let connection = pool.get().expect("couldn't get db connection from pool");

    let todos = web::block(move || actions::get_all_todos(&connection))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().json(todos))
}

#[post("/create")]
async fn create(pool: web::Data<DbPool>, new_todo: web::Json<models::NewTodo>) -> Result<HttpResponse, Error> {
    let connection = pool.get().expect("couldn't get db connection from pool");

    let todo = web::block(move || actions::insert_new_todo(&new_todo.title, &connection))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().json(todo))
}

#[post("/delete")]
async fn delete() -> impl Responder {
    "delete"
}

#[post("/update")]
async fn update() -> impl Responder {
    "update"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<SqliteConnection>::new(database_url);
    // コネクションプールを作る
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    HttpServer::new(move || {
        App::new().data(pool.clone()).service(
            web::scope("/todos")
                .service(get)
                .service(create)
                .service(delete)
                .service(update),
        )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
