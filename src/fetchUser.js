import fetch from 'node-fetch';

const usersURL = 'https://example.dev/api/v1/users';

async function fetchUser() {
  const response = await fetch(`${usersURL}/1`);
  return response;
}

export { fetchUser };
