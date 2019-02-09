# Rails-React-TypeScript-Docker Example

## TL;DR

**Here is an example application with the following modern web technology stacks. With this boilerplate, you can easily start to build your own app.**

- [Ruby](https://www.ruby-lang.org/en/) 2.6.0
- [Rails](https://rubyonrails.org/) 5.2.2
- [React.js](https://reactjs.org/) 16.7.0
- [TypeScript](https://www.typescriptlang.org/) 3.2.2
- [Docker](https://docs.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Usage

```shell
$ git clone https://github.com/ohbarye/rails-react-typescript-docker-example.git && cd rails-react-typescript-docker-example

# Setup
$ docker-compose run frontend yarn
$ docker-compose run backend rake db:create

# Start
$ docker-compose up -d (docker-compose up worked for me)
$ open http://localhost:3000
```

## NOTES

To setup configuring the react app to the backend for production, this might me what i [need](https://github.com/tylergaugler16/rails-react-typescript-docker-example/tree/master/frontend#advanced-configuration).

To setup cloudFont this might be what i [need](https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af)


## Further Details

### Backend

The combination, Rails + PostgreSQL + Docker Compose, is just a result I followed [Docker Compose's official instruction](https://docs.docker.com/compose/rails/).

### Frontend

Bootstrapped with [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript).
