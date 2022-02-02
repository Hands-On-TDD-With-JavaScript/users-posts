# Cheat Sheet

* [Mock and spy (assert on call parameters)](#mock-and-spy-(assert-on-call-parameters))
* [Mock and respond with 5xx error](#mock-and-respond-with-5xx-error)
* [Mock and respond with 404 error](#mock-and-respond-with-404-error)
* [Mock and respond with actual user data](#mock-and-respond-with-actual-user-data)
* [One possible fetchUser() implementation](#one-possible-fetchuser()-implementation)
* [Docs and References](#docs-and-references)

## Mock and spy (assert on call parameters)

```javascript
const fetch = require("node-fetch");
const { Response } = jest.requireActual("node-fetch");
const { fetchUser } = require("./fetchUser");
const users = require("./fixtures/users");

const { API_URL } = require("./config").CONFIG;

jest.mock("node-fetch");

describe("fetchUser(userId)", () => {
  it("should call fetch with the correct parameters", async () => {
    const mockUser = { ...users[0] };

    const mockOpts = {
      status: 200,
      statusText: "OK",
    };

    const fetchSpy = fetch.mockImplementationOnce(() => {
      return Promise.resolve(new Response(JSON.stringify(mockUser), mockOpts));
    });

    await fetchUser(mockUser.id);

    const expectedUrl = `${API_URL}/users/${mockUser.id}`;
    const expectedOpts = { method: "GET" };

    expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, expectedOpts);
  });
});
```



## Mock and respond with 5xx error

```javascript
const mockOpts = {
  status: 500,
  statusText: "Internal Server Error",
};

fetch.mockImplementationOnce(() => {
  return Promise.reject(new Response(null, mockOpts));
});

const resp = await fetchUser(NaN);

expect(resp).toStrictEqual({
  status: 500,
  statusText: "Internal Server Error",
});
```



## Mock and respond with 404 error

```javascript
const mockResp = JSON.stringify({
  message: "Resource not found.", // <1>
});

const mockOpts = {
  status: 404,
  statusText: "Not found",
};

fetch.mockImplementationOnce(() => {
  return Promise.resolve(new Response(mockResp, mockOpts));
});

const data = await fetchUser(42);

expect(data).toMatchObject({
  status: 404,
  message: "User with ID 42 not found.",
});

```

N1: Here the service responds with “resource not found” but the implementation of `fetchUser` checks for the status code and returns a more friendly and informative message.



## Mock and respond with actual user data

```javascript
const mockResp = JSON.stringify(users[0]);

const mockOpts = {
  status: 200,
  statusText: "OK",
};

fetch.mockResolvedValueOnce(new Response(mockResp, mockOpts));

const data = await fetchUser(1);

expect(data).toMatchObject({ ...users[0] });
```



## One possible fetchUser() implementation

```javascript
const fetch = require("node-fetch");

const { API_URL } = require("./config").CONFIG;

async function fetchUser(userId) {
  const url = `${API_URL}/users/${userId}`;
  const opts = { method: "GET" };

  return fetch(url, opts)
    .then((resp) => {

      if (resp.status === 404) {
        return {
          status: 404,
          message: "User with ID 42 not found.",
        };
      }

      return resp.json();
    })
    .catch(({ status, statusText }) => {

      return {
        status,
        statusText,
      };
    });
}

module.exports = { fetchUser };
```



## Docs and References

- https://fetch.spec.whatwg.org/
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- https://developer.mozilla.org/en-US/docs/Web/API/fetch
- https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
- https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
- https://jestjs.io/docs/tutorial-async
- https://jestjs.io/docs/es6-class-mocks
- https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue

