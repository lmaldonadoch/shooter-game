const API = (() => {
  async function getKey() {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
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

  async function getScores() {
    try {
      const scores = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/H5yqL2wSwI7OndDjAjut/scores/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      return scores.json();
    } catch (error) {
      return error;
    }
  }

  return { getScores };
})();

export default API;
