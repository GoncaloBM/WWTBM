export const checkCorrectAnswer = (props) => {
    let correctAnswer = props.correctAnswer;
    let answers = props.answers;
    let count = 0;
    // if you don't change the reference, prefer using const instead.
    let correctIndex;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] !== correctAnswer) {
        count++;
      } else { // You can refactor this by consuming the different values from an array
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