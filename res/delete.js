var ID = process.argv[2];

return fetch(`https://reportbase.com/image/${ID}`, {method: 'DELETE'})
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

