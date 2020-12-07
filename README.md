# Fortgeschrittene Webentwicklung - Homework
As part of the course 'Fortgeschrittene Webentwicklung' we had to create a timetracker application.

## Installation

Create .env file

* Linux: `cp .env.example .env`
* Windows: `copy .env.example .env`

Start docker container (may take a while until all dependencies have been downloaded (in my last test it took about 7 minutes for backend and frontend))

* `docker-compose up --build`

Sync database through a new command prompt

* `docker-compose exec backend npm run typeorm schema:sync`

Fixtures can be inserted with

* `docker-compose exec backend npm run fixtures`



## Documenation

* [Backend](app/backend/README.md)
* [Frontend](app/frontend/README.md)

## License
**The MIT License (MIT)**

Copyright © 2020 Eliah Vogel