const getSingleUser = (user) => Promise((resolve, reject) => {
  fetch(`http://localhost:8088/users/${user}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getSingleUser;
