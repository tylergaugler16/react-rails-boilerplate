# React Rails Boilerplate

## Technologies Used
1) Rails for api
2) React for frontend js framework
3) Postgres for db
4) Typescript
5) Webpack for js builds
6) Sass for css builds

## Setup
```bash
# Rails server
$ cd backend
# Install dependencies
$ bundle install
# Migrate db
$ bundle exec rake db:migrate

# React App
$ cd frontend
$ yarn install

```

## Run Application

```bash

# Rails server
$ cd backend
$ rails s --port 3001

# React App
$ cd frontend
$ yarn start

open http://localhost:3000

```

## Deploy Application

```shell

# Rails server
$ git subtree push --prefix backend heroku master # in root dir
$ heroku run rake db:migrate --app name-of-app-on-heroku # only if migrations need to be run

# React App
$ npm run production-build-client # in root dir

TODO: instructions on how to get the script working. need to add a static site on aws 

```
## NOTES

To setup configuring the react app to the backend for production, this might me what i [need](https://github.com/tylergaugler16/rails-react-typescript-docker-example/tree/master/frontend#advanced-configuration).

To setup cloudFont this might be what i [need](https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af)

When deploying to heroku, use this: [git subtree push --prefix backend heroku master;](https://coderwall.com/p/ssxp5q/heroku-deployment-without-the-app-being-at-the-repo-root-in-a-subfolder)

