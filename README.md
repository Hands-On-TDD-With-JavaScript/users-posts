# Users Posts - Hands-on TDD with JavaScript

This repository is part of the
[Hands-On TDD with JavaScript](https://gitlab.com/hands-on-tdd-with-javascript)
series on practical Test Driven Development, which focus on concepts,
motivation, practical examples and general tips.

**NOTE**: The
[main repo is the one on Gitlab](https://gitlab.com/hands-on-tdd-with-javascript/users-posts).
The
[Github repo](https://github.com/Hands-On-TDD-With-JavaScript/users-posts)
is only a mirror. Discussion, issues, etc. should be happen on
[Gitlab](https://gitlab.com/hands-on-tdd-with-javascript/users-posts).

## Table of Contents


* [Table of Contents](#table-of-contents)
* [Intro](#intro)
* [Goal](#goal)
* [Blog Service Documentation](#blog-service-documentation)
* [Blog Service Example Responses](#blog-service-example-responses)
  * [Anything that is not 200 or 404 responses](#anything-that-is-not-200-or-404-responses)
  * [GET user | status 404](#get-user-|-status-404)
  * [GET user | status 200](#get-user-|-status-200)
  * [GET user posts | status 404 | user not found](#get-user-posts-|-status-404-|-user-not-found)
  * [GET user posts | status 200 | user without posts](#get-user-posts-|-status-200-|-user-without-posts)
  * [GET user posts |status 200 | user with posts](#get-user-posts-|status-200-|-user-with-posts)
* [Blog BFF Example Response](#blog-bff-example-response)
* [Functionality to Implement](#functionality-to-implement)
  * [fetchUser(userId)](#fetchuser(userid))
  * [fetchPosts(userId)](#fetchposts(userid))
  * [fetchUserPosts(userId)](#fetchuserposts(userid))
* [Local Development](#local-development)
* [What about ES Modules‽](#what-about-es-modules‽)

## Intro

This is the second iteration of the series. It focuses on exemplifying
how to mock response data and test asynchronous operations in
JavaScript.

We are going to use
[node-fetch](https://github.com/node-fetch/node-fetch)
because it mimics the
[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API),
which means most of what we learn here (Node.js) regarding testing asynchronous
operations is also applicable when working in the browser environment.

For the unit tests, we’ll use
[jest](https://jestjs.io/)
to mock responses and assert on the desired results.

## Goal

For this exercise, let's pretend there is an application called Blog
Service. It provides the data the client application needs but not in an
optimal structure. We want to avoid having the client perform multiple
requests to this service and then format the data itself. What we want
is to build a BFF (Backend for Frontend) that does the heavy lifting and
provides the data ready to be consumed by the front-end application.
Let's call our application Blog BFF.

We are going to use vanilla JavaScript with Node.js to implement a few
functions that will fetch JSON data from a remote API and prepare it
for the client's consumption.

These are endpoints from the Blog Service API that we are going to use:

- `GET /users/:userId`
- `GET /users/:userId/posts`

Our job is to:

- Fetch a user by ID;
- Fetch a list of posts for a user given the user ID;
- Craft the JSON object which includes user details and their posts.

## Blog Service Documentation

To read the API docs
(through [Redoc](https://github.com/Redocly/redoc))
locally, run:

```shell-session
$ npm install
$ npm run apispec
```

Then point your web browser to
[http://localhost:8080](http://localhost:8080).

If you prefer Swagger UI, read it
[online here](https://app.swaggerhub.com/apis-docs/DevHowTo/Blog).


## Blog Service Example Responses

### Anything that is not 200 or 404 responses

If the service responds with a status code that is not a "200 OK" or a
"404 Not found", then we simply return the original `status` and
`statusText` to the client.

For example, a service responds with "500 Internal Server Error", we
simply return the unmodified service response:

```json
{
  "status": 500",
  "statusText: "Internal Server Error",
}
```

### GET user | status 404

Request:

```text
GET /users/42
```

Response:

```json
{
  "status": 404,
  "message": "User with ID 42 not found."
}
```

### GET user | status 200

Request:

```
GET /users/1`
```

Response:

```json
{
  "id": 1,
  "name": "Yoda",
  "role": "Jedi Master"
}
```

### GET user posts | status 404 | user not found

Request:

```text
GET /users/42/posts
```

Response:

```json
{
  "status": 404,
  "message": "User with ID 42 not found."
}
```

### GET user posts | status 200 | user without posts

Request:

```text
GET /users/3/posts
```

Response:

```json
{
  "posts": []
}
```

### GET user posts |status 200 | user with posts

Request:

```text
GET /users/1/posts
```

Response:

```json
{
  "posts": [
    {
      "id": 1,
      "user_id": 1,
      "title": "There is no try",
      "text": "Do or do not. There is no try."
    },
    {
      "id": 2,
      "user_id": 1,
      "title": "Fear and The Dark Side",
      "text": "Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering."
    }
  ]
}
```

## Blog BFF Example Response

After we fetch an user and their posts from the Blog Service, we merge
them together and send a response to the client.

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

To start implmenting the functionality, run:

```shell-session
$ nvm use && npm run test
```

And may the source be with you.

## What about ES Modules‽

Yes,
[Jest supports ES Modules](https://jestjs.io/docs/ecmascript-modules)
but
[not 100%](https://github.com/facebook/jest/issues/10025)
(at least os of Jan 2022).

> Please note that we currently don’t support jest.mock in a clean way
> in ESM, but that is something we intend to add proper support for in
> the future.
>
> — jest docs on ECMAScript Modules

The problem is that `jest.mock()` does not work yet for ES Modules. It
simply fails to mock, and methods like `mockImplementation()` and
`mockResolvedValue()` are not present on the instances of the mocked
dependencies.

Because I didn’t want to introduce complex Webpack and Babel setup, I
have chosen to go with good old CommonJS modules for this project for
now.

