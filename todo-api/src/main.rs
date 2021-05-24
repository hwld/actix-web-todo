#[macro_use]
extern crate diesel;

use actix_cors::Cors;
use actix_web::{delete, get, http, post, put, web, App, Error, HttpResponse, HttpServer};
use diesel::{r2d2::ConnectionManager, SqliteConnection};
use dotenv::dotenv;
use std::env;

mod actions;
mod models;
mod schema;

type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

#[get("")]
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

#[post("")]
async fn create(
    req: web::Json<models::CreateTodoRequest>,
    pool: web::Data<DbPool>,
) -> Result<HttpResponse, Error> {
    let connection = pool.get().expect("couldn't get db connection from pool");

    let todo = web::block(move || actions::insert_new_todo(&req.title, &connection))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().json(todo))
}

#[delete("/{todo_id}")]
async fn delete(
    web::Path(todo_id): web::Path<String>,
    pool: web::Data<DbPool>,
) -> Result<HttpResponse, Error> {
    let connection = pool.get().expect("couldn't get db connection from pool");

    web::block(move || actions::delete_todo(&todo_id, &connection))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().finish())
}

#[post("/delete")]
async fn delete_all(
    form: web::Json<models::DeleteTodosRequest>,
    pool: web::Data<DbPool>,
) -> Result<HttpResponse, Error> {
    let connection = pool.get().expect("couldn't get db connection from pool");

    web::block(move || actions::delete_todos(&form, &connection))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().finish())
}

#[put("/{todo_id}")]
async fn update(
    web::Path(todo_id): web::Path<String>,
    req: web::Json<models::UpdateTodoRequest>,
    pool: web::Data<DbPool>,
) -> Result<HttpResponse, Error> {
    let connection = pool.get().expect("couldn't get db connection from pool");

    web::block(move || actions::update_todo(&todo_id, &req, &connection))
        .await
        .map_err(|e| {
            eprintln!("{}", e);
            HttpResponse::InternalServerError().finish()
        })?;

    Ok(HttpResponse::Ok().finish())
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

    let allowed_origin = env::var("ALLOWED_ORIGIN").expect("ALLOWED_ORIGIN must be set");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&allowed_origin)
            .allowed_methods(vec!["GET", "POST", "DELETE", "PUT"])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);

        App::new().wrap(cors).data(pool.clone()).service(
            web::scope("/todos")
                .service(get)
                .service(create)
                .service(delete)
                .service(delete_all)
                .service(update),
        )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
