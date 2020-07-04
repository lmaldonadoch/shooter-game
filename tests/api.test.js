import API from '../src/Objects/api';

it('Retrieves the scores from the DB', () => {
  API.getScores()
    .then((response) => {
      expect(response).toBe('Succeed');
    })
    .catch((error) => {
      return error;
    });
});

it('Post a new score to database', () => {
  API.postScores('test', 1)
    .then((response) => {
      expect(response).toBe('Leaderboard score created correctly.');
    })
    .catch((error) => {
      return error;
    });
});
