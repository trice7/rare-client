const endpoint = 'http://localhost:8088';

const getSingleUserDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const userDetails = Object.values(data).filter((user) => user.id === id);
      resolve(userDetails);
    })
    .catch(reject);
});

export default getSingleUserDetails;
