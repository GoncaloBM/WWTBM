export function currentScoreBoard() {
  let currentScore = window.localStorage.getItem("scores");
  currentScore = JSON.parse(currentScore);

  return currentScore;
}

export function whichQuestionLost(lost, question) {
  if (!lost) {
    return question;
  } else {
    if (question > 5) {
      return 0;
    } else if (question > 4 && question < 10) {
      return 5;
    } else if (question > 9) {
      return 10;
    }
  }
}
