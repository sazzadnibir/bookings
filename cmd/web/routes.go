package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/sazzadnibir/bookings/pkg/config"
	"github.com/sazzadnibir/bookings/pkg/handlers"
)

func routes(app *config.AppConfig) http.Handler {
	mux := chi.NewRouter()

	// Middleware
	mux.Use(middleware.Recoverer)
	mux.Use(NoSurf)
	mux.Use(SessionLoad)

	// Routes
	mux.Get("/", handlers.Repo.Home)
	mux.Get("/about", handlers.Repo.About)
	mux.Get("/generals-quarters", handlers.Repo.GeneralsQuarters)
	mux.Get("/majors-suite", handlers.Repo.MajorSuite)
	mux.Get("/book", handlers.Repo.Book)
	mux.Get("/make-reservation", handlers.Repo.Reservation)
	mux.Get("/book", handlers.Repo.Book)
	mux.Get("/contact", handlers.Repo.Contact)

	// Static files
	fileServer := http.FileServer(http.Dir("./static/"))
	mux.Handle("/static/*", http.StripPrefix("/static", fileServer))

	return mux
}
