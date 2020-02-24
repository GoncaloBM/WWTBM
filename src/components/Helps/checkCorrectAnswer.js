export const checkCorrectAnswer = (props) => {
    let correctAnswer = props.correctAnswer;
    let answers = props.answers;
    let count = 0;
    let correctIndex;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] !== correctAnswer) {
        count++;
      } else {
        if (count === 0) {
          correctIndex = "A";
        } else if (count === 1) {
          correctIndex = "B";
        } else if (count === 2) {
          correctIndex = "C";
        } else if (count === 3) {
          correctIndex = "D";
        }
        return correctIndex;
      }
    }
  };