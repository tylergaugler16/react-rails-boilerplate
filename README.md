# Widgetly

## *Easily add meaningful content to your website*
____


## Run Application

```shell

# Rails server
$ cd backend
$ rails s --port 3001

# React App
$ yarn start

open http://localhost:3000

```

## Deploy Application

```shell

# Rails server
$ git subtree push --prefix backend heroku master # in root dir
$ heroku run rake db:migrate --app widgetly-app # only if migrations need to be run

# React App
$ npm run production-build-client # in root dir

open http://widgetly.s3-website-us-east-1.amazonaws.com

```
## NOTES

To setup configuring the react app to the backend for production, this might me what i [need](https://github.com/tylergaugler16/rails-react-typescript-docker-example/tree/master/frontend#advanced-configuration).

To setup cloudFont this might be what i [need](https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af)

When deploying to heroku, use this: [git subtree push --prefix backend heroku master;](https://coderwall.com/p/ssxp5q/heroku-deployment-without-the-app-being-at-the-repo-root-in-a-subfolder)



## TO DO
### Authentication
* What is [multi provider authentication](https://stackoverflow.com/questions/46261290/multi-provider-authentication-layman-terms)?
* Which is used in [omniauth](https://github.com/omniauth/omniauth)
* https://developer.okta.com/blog/2018/09/18/simple-authentication-with-rails-and-omniauth
* https://medium.com/@ajayramesh/social-login-with-omniauth-and-rails-5-0-ad2bbd2a998e
* https://www.codementor.io/kristophmatthews/how-to-configure-your-first-rails-rest-api-du1084ym0
* Add unique classNames to widgets, so if we want we can do real custom css

## Resources
* really cool [input text animations](https://tympanus.net/Development/TextInputEffects/). The github is [here](https://github.com/codrops/TextInputEffects)
* This is how i'm going to create [custom inputs](https://jaredpalmer.com/formik/docs/api/field)
* General [ux tips](https://www.designforfounders.com/web-app-ux/)


### CSS INPUT animations
* [a lot of just css animations](https://freefrontend.com/css-input-text/)
