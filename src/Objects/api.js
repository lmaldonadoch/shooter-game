async function getKey() {
  try {
    const response = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games',
      {
        method: 'POST',
        body: JSON.stringify({
          name: 'HP shooter game',
        }),
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

getKey().then((response) => {
  console.log(response);
});
