package main

import (
	"encoding/gob"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/alexedwards/scs/v2"
	"github.com/sazzadnibir/bookings/internal/config"
	"github.com/sazzadnibir/bookings/internal/handlers"
	"github.com/sazzadnibir/bookings/internal/models"
	"github.com/sazzadnibir/bookings/internal/render"
)

const port = ":8080"

var app config.AppConfig
var session *scs.SessionManager

func main() {
	err := run()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(fmt.Sprintf("Starting application on port %s", port))

	serve := &http.Server{
		Addr:    port,
		Handler: routes(&app),
	}

	err = serve.ListenAndServe()
	log.Fatal(err)
}

func run() error {
	// Session Data
	gob.Register(models.Reservation{})

	// Change this to true when in production
	app.InProduction = false

	// Setting up sessions
	session = scs.New()
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = app.InProduction

	app.Session = session

	tc, err := render.CreateTemplateCache()
	if err != nil {
		log.Fatal("Can't create template cache")
		return err
	}

	app.TemplateCache = tc
	app.UseCache = false

	repo := handlers.NewRepo(&app)
	handlers.NewHandalers(repo)

	render.NewTemplates(&app)

	return nil
}
