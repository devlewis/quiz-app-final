const STORE = [
    {
      question: "What is the capital of Romania?",
      options: [
        "Bucharest",
        "Budapest",
        "Sofia",
        "Varna"
      ],
      correct:
        "Bucharest",
      country: "Romania"
    },
    {
      question:
        "What is the capital of Montenegro?",
      options: [
        "Timisoara",
        "Podgorica",
        "Dubrovnik",
        "Budapest"
      ],
      correct:
        "Podgorica",
      country: "Montenegro"
    },
    {
      question:
        "What is the capital of North Macedonia?",
      options: [
        "Skopje",
        "Tirana",
        "Sofia",
        "Podgorica"
      ],
      correct: "Skopje",
      country: "North Macedonia"
    },
    {
      question: "What is the capital of Lithuania?",
      options: [
        "Kaunas",
        "Vilnius",
        "Riga",
        "Minsk"
      ],
      correct: "Vilnius",
      country: "Lithuania"
    },
    {
      question:
        "What is the capital of Slovenia?",
      options: [
        "Prague",
        "Maribor",
        "Zagreb",
        "Ljubljana"
      ],
      correct:
        "Ljubljana",
      country: "Slovenia"
    }
  ];

//quiz score and question number initialization
let totalScore = 0
let questionNum = 0
let incorrect = 0

//begins the quiz
function beginQuiz() {
  $('.views').hide()
  $('.startView').on('click', '.start', function(event) {
    $('.startView').hide()
    $('.questionView').show()
    $('.questionView').append(makeQuestion())
  });
}

//question view maker
function makeQuestion() {
  if (questionNum < STORE.length) {
    return injectHTML(questionNum);
  } else {
    $('.questionView').hide();
    finalPage();
  }
}

//creates html for question view
function injectHTML(i) {
  let htmlInject = $(`<form>
    <fieldset>
    <legend>Question #${questionNum+1} of 5:</legend>
    <p class="question">${STORE[i].question}</p>
    </fieldset>
  </form>`)

  let fieldsetFinder = $(htmlInject).find('fieldset');

  STORE[i].options.forEach(function(option, index){
    $(`<label for="${index}" class= "radio">
        <input type="radio" id="${index}" value="${option}" name="option" required>
        <span>${option}</span><span>   </span><br></br>
      </label>
      `).appendTo(fieldsetFinder);
  });

  $(`<button type="submit">Submit</button>
 `).appendTo(fieldsetFinder);

$(`<p class="small">You've answered ${totalScore} correctly and ${incorrect} incorrectly.</p>`).appendTo(fieldsetFinder);


  return htmlInject;}




//submits selected option 
//check to see if it matches correct option in STORE
//run response functions
function submitOption() {
  $('.containerBox').on('submit', function(event) {
    event.preventDefault();
    $('.views').hide();
    $('.feedbackView').show();
    let selected = $('input:checked');
    let option = selected.val();
    let correct = STORE[questionNum].correct;
    if (option === correct) {
      totalScore++;
      correctFeedback();
    } else {
      incorrect++;
      wrongFeedback();
    }
  });
} 

//MAYBE I WILL COMBINE THESE, JUST FOR FUN 
//feedback view for correct answer
function correctFeedback() {
  $('.feedbackView').html(
    `<h1 class="green">Brilliant!</h1>
      <button class="next">Next one!</button>
      <p class="centered raleway">You've answered ${totalScore} correctly out of ${STORE.length} total!</p>`
  );
}

//feedback view for incorrect answer
function wrongFeedback() {
  $('.feedbackView').html(
    `<h1 class="red">Sorry!</h1>
    <p class="question raleway centered">${STORE[questionNum].correct} is the capital of ${STORE[questionNum].country}.</p>
    <button class="next">Next one</button>
    <p class="centered raleway">You've answered ${totalScore} correctly out of ${STORE.length} total.</p>`
  );
}

//makes the next question
function nextQuestion() {
  $('.containerBox').on('click', '.next', function (event) {
    questionNum++;
    $('.views').hide();
    $('.questionView').show();
    $('.questionView form').replaceWith(makeQuestion());
  });
}

//shows final results
function finalPage() {
  $('.finalView').show();

  if (totalScore === STORE.length) {
    rspns = "Great!";
  } else if (totalScore > (STORE.length/2)) {
    rspns = "Good job!";
  } else {
    rspns = "Try again!";
  }
  return $('.finalView').html(
    `<h1 class="final">You're Done!</h1>
    <h1>You answered ${totalScore} correctly and ${incorrect} incorrectly.</h1>
    <h4 class="rspns">${rspns}</h4>
    <button type="submit" class="restart">Take it again!</button>`
  );
}



//re-initializes score and question number at 0
//resets question view footer info 
function resetScore() {
  totalScore = 0;
  questionNum = 0;
  incorrect = 0;
}


//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.containerBox').on('click', '.restart', function (event) {
    event.preventDefault();
    resetScore();
    $('.views').hide();
    $('.startView').show();
  });
}

//runs the functions
function makeQuiz() {
  beginQuiz();
  makeQuestion();
  submitOption();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
