export function getQuestionsAndAnswersFromAPI(question) {
  if (question < 5) {
    return "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";
  } else if (question > 4 && question < 10) {
    return "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple";
  } else if (question > 9) {
    return "https://opentdb.com/api.php?amount=1&difficulty=hard&type=multiple";
  }
}
