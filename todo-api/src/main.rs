use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn get() -> impl Responder {
    "all todos"
}

#[get("/create")]
async fn create() -> impl Responder {
    "create"
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
    HttpServer::new(|| {
        App::new().service(
            web::scope("/todos")
                .service(get)
                .service(create)
                .service(delete)
                .service(update),
        )
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
