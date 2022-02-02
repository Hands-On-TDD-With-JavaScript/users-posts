# Users Posts - Hands-on TDD with JavaScript

This repository is part of the [Hands-On TDD with JavaScript](https://gitlab.com/hands-on-tdd-with-javascript) series on practical Test Driven Development, which focus on concepts, motivation, practical examples and general tips.

**NOTE**: The [main repo is the one on Gitlab](https://gitlab.com/hands-on-tdd-with-javascript/users-posts). The [Github repo](https://github.com/Hands-On-TDD-With-JavaScript/users-posts) is only a mirror. Discussion, issues, etc. should be happen on [Gitlab](https://gitlab.com/hands-on-tdd-with-javascript/users-posts).

## Table of Contents

* [Table of Contents](#table-of-contents)
* [Intro](#intro)
* [Goal](#goal)
* [API Endpoints Documentation](#api-endpoints-documentation)
* [Blog Service Responses](#blog-service-responses)
* [Blog BFF Example Response](#blog-bff-example-response)
* [Functionality to Implement](#functionality-to-implement)
  * [fetchUser(userId)](#fetchuser(userid))
  * [fetchPosts(userId)](#fetchposts(userid))
  * [fetchUserPosts(userId)](#fetchuserposts(userid))
* [Local Development](#local-development)
* [What about ES Modules‽](#what-about-es-modules‽)
* [Cheat Sheet](#cheat-sheet)

## Intro

This is the second iteration of the series. It focuses on exemplifying how to mock response data and test asynchronous operations in JavaScript.

We are going to use [node-fetch](https://github.com/node-fetch/node-fetch) because it mimics the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), which means most of what we learn here (Node.js) regarding testing asynchronous operations is also applicable when working in the browser environment.

For the unit tests, we’ll use [jest](https://jestjs.io/) to mock responses and assert on the desired results.

## Goal

For this exercise, let's pretend there is an application called Blog Service. It provides the data the client application needs, but not in an optimal structure. We want to avoid having the client perform multiple requests to this service and then format the data itself. What we want is to build a BFF (Backend for Frontend) that does the heavy lifting and provides the data ready to be consumed by the front-end application. Let's call our application Blog BFF.

In other words, the Blog Service API does not have an endpoint that allows us to fetch both the user with their posts at once. It has endpoints that responds with the users and posts individually. Our BFF needs to make these two requests and merge the user and their posts into a single object before sending it back to the client.

We are going to use vanilla JavaScript with Node.js to implement a few functions that will fetch JSON data from a remote API and prepare it for the client's consumption.

These are endpoints from the Blog Service API that we are going to use:

- `GET /users/:userId`
- `GET /users/:userId/posts`

Our job is to:

- Fetch a user by ID;
- Fetch a list of posts for a user given the user ID;
- Craft the JSON object which includes user details and their posts.

## API Endpoints Documentation

To read the API docs through [Redoc](https://github.com/Redocly/redoc) locally, run:

```shell-session
$ npm install
```

Then, on two different shell sessions, run these:

```shell-session
$ npm run spec-blog-service
$ npm run spec-blog-bff
```

Then point your web browser to:

- [http://localhost:8080](http://localhost:8080) (local blog service API spec)
- [http://localhost:8081](http://localhost:8081) (local blog BFF API spec)

Or, if you prefer Swagger UI, read it online:

- [Blog Service API Spec](https://app.swaggerhub.com/apis-docs/hands-on-tdd-js/blog-service-api)
- [Blog BFF API Spec](https://app.swaggerhub.com/apis-docs/hands-on-tdd-js/blog-bff-api)

## Blog Service Responses

If the service responds with a status code that is not a "200 OK" or a "404 Not found", then we simply return the original `status` and `statusText` to the client.

For example, if a service responds with "500 Internal Server Error", we simply return the unmodified service response:

```json
{
  "status": 500,
  "statusText": "Internal Server Error",
}
```



## Blog BFF Example Response

After we fetch an user and their posts from the Blog Service, we merge them together and send a response to the client.

Our endpoint example response:

```json
{
  "user": {
    "id": 1,
    "title": "There is no try",
    "text": "Do or do not. There is no try.",
    "posts": [
      {
        "id": 1,
        "title": "There is no try",
        "text": "Do or do not. There is no try."
      },
      {
        "id": 2,
        "title": "Fear and The Dark Side",
        "text": "Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering."
      }
    ]
  }
}
```



## Functionality to Implement

### fetchUser(userId)

- should call fetch with the correct parameters
- when the service returns a 404
  - should return a 404 message
- when the user with the given id is found
  - should return that user

### fetchPosts(userId)

- should call fetch with the correct parameters
- when the service returns a 404
  - should return a 404 message
- when the user with the given id is found
  - should return a list of posts from that user

### fetchUserPosts(userId)

- when the service returns a 404 for the user
  - should return a 404 message
- when user is found and has no posts
  - should return user details with empty list of posts
- when user is found and has posts
  - should return user details with non-empty list of posts

## Local Development

Install [nvm](https://github.com/nvm-sh/nvm), then run (just once):

```shell-session
$ nvm install < .nvmrc
$ npm install
```

To start implementing the the code, run:

```shell-session
$ nvm use && npm run test
```

And may the source be with you.

## What about ES Modules‽

Yes, [Jest supports ES Modules](https://jestjs.io/docs/ecmascript-modules) but [not 100%](https://github.com/facebook/jest/issues/10025) (at least os of Jan 2022).

> Please note that we currently don’t support jest.mock in a clean way in ESM, but that is something we intend to add proper support for in the future.
> — jest docs on ECMAScript Modules

The problem is that `jest.mock()` does not work yet for ES Modules. It simply fails to mock, and methods like `mockImplementation()` and `mockResolvedValue()` are not present on the instances of the mocked dependencies.

Because I didn’t want to introduce complex Webpack and Babel setup, I have chosen to go with good old CommonJS modules for this project for now.



## Cheat Sheet

There are some examples in the [cheat sheet](./CHEATSHEET.md) so we can consult and use as a reference as we progress through this exercise.
