$(document).ready(function() {
  // Global variables
  var timer
  var question
  var choices
  var answer
  var gif
  var correctCounter = 0
  var incorrectCounter = 0
  var unansweredCounter = 0
  var triviaQuestionIndex = 0
  var correct = false

  var messages = {
    start: "Welcome to a Monty Python Holy Grail themed trivia!" + "<div>Click 'Start Game' to begin your quest.</div>" + "<div>You will have 30 seconds to answer each of the 10 questions.</div>",
    correctAns: "<div class='green'>That is correct! On to the next one!</div>",
    wrongAns: "<div class='red'>That is wrong! Ni! Next question!</div>",
    correctAnsShow: "The correct answer is: "
  }

  var triviaQuestions = [
    //question1
    {
      question: "How old is Dennis?",
      choices: ["20", "54", "37. He's not old!", "6"],
      answer: 2,
      gif: "assets/images/question1.gif"
    },
    // question2
    {
      question: "What are the French doing in England?",
      choices: ["Seeing the loveli lakes", "Guarding their tower", "On holiday", "None of your business, now buzzoff!"],
      answer: 3,
      gif: "assets/images/question2.gif"
    },
    // question3
    {
      question: "What do the Knights who until recently said Ni now say?",
      choices: ["Ni Ni Ni!", "Ekke, Ekke, Ekke, Ekke, Ptang Zoo Boing!", "It", "x1"],
      answer: 1,
      gif: "assets/images/question3.gif"
    },
    // question4
    {
      question: "What is your favorite color?",
      choices: ["Blue...no red!", "x2", "x3", "x4"],
      answer: 0,
      gif: "assets/images/question4.gif"
    },
    // question5
    {
      question: "What is the capital of Assyria",
      choices: ["Assur", "Harran", "Ekallatum", "What? I don't know that!"],
      answer: 3,
      gif: "assets/images/question5.gif"
    },
    // question6
    {
      question: "What is the air-speed velocity of an unladen swallow?",
      choices: ["x1", "African or European?", "x3", "x4"],
      answer: 1,
      gif: "assets/images/question6.gif"
    },
    // question7
    {
      question: "What else floats on water?",
      choices: ["Lead", "Churches", "Very small rocks", "Ducks"],
      answer: 3,
      gif: "assets/images/question7.gif"
    },
    // question8
    {
      question: "What do we burn apart from witches?",
      choices: ["More witches!", "wood", "more witches.", "Mooooore witches!"],
      answer: 1,
      gif: "assets/images/question8.gif"
    },
    // question9
    {
      question: "How many did the Robinsons' lose to the plague today?",
      choices: ["x1", "x2", "x3", "9"],
      answer: 3,
      gif: "assets/images/question9.gif"
    },
    // question10
    {
      question: "How can you tell somebody's a King?",
      choices: ["x1", "x2", "He hasn't got shit all over him!", "x4"],
      answer: 2,
      gif: "assets/images/question10.gif"
    }
  ]

// beginning of functions
  // start page with start and instructions button
  function startPage() {
    $(".startPage").show()
    $(".startPage").append(messages.start)
    $(".startBtn").show()
    $(".question").hide()
    $(".choices").hide()
    $(".timer").hide()
    $(".resultsPage").hide()
  }

  $(".btn-success").click(function() {
    startBtn(this)
    console.log('clicked the start button')
  })

  // gamestart with button click event
  function startBtn(x) {
    $(".startPage").hide()
    $(".startBtn").hide()
    $(".question").show()
    $(".choices").show()
    $(".timer").show()
    $(".resultsPage").hide()
    postQuestions()
  }

  // post questions
  function postQuestions() {
    if (triviaQuestionIndex <= triviaQuestions.length) {
      $(".question").html(triviaQuestions[triviaQuestionIndex].question)
      $(".choices").html("");
      correct = false
      for (var j = 0; j < triviaQuestions[triviaQuestionIndex].choices.length; j++) {
        var newDiv = $("<div>");
        newDiv.addClass("pickAnswer").attr("indexnum", j).html(triviaQuestions[triviaQuestionIndex].choices[j]);
        $(".choices").append(newDiv);
      }
    countDown()
    console.log('test if posting questions')
  }
  // log user choice
  $(".pickAnswer").on("click", function() {
    $(".question").hide()
    $(".choices").hide()
    $(".timer").hide()
    var userChoice = $(this).attr("indexnum")
    userChoice = parseInt(userChoice)
    // checks if user is correct and will tally accordingly
    if (userChoice === triviaQuestions[triviaQuestionIndex].answer) {
      correct = true
      correctCounter++
      triviaQuestionIndex++
      revealAns()
    } else {
      incorrectCounter++
      triviaQuestionIndex++
      revealAns()
    }
  })
  }

  // timer function
  function countDown() {
    var time = 11
    var myInterval = setInterval(function() {
      if (time < 10) {
        $('.timer').html("0" + time)
        //$('.timer').effect("pulsate", {
        //  times: 25
        //}, 1000 * 5)
        $(".pickAnswer").on("click", function() {
          clearInterval(myInterval)
        })
      } else {
        $('.timer').html(time)
        $(".pickAnswer").on("click", function() {
          clearInterval(myInterval)
        })
      }
      if (time === 0) {
        correct = false
        unansweredCounter++
        clearInterval(myInterval)
      } else {
        time--
      }
    }, 1000);
  }


  // button answer selector

  // reveal answer function
  function revealAns() {
    var answerStr = triviaQuestions[triviaQuestionIndex].choices[(triviaQuestions[triviaQuestionIndex].answer)]
    console.log('seeing the string of answer')
    //var answerStr = answerIndex.toString
    if (correct) {
      $(".ansReveal").html(messages.correctAns + "<div>" + messages.correctAnsShow + "<div>" + "'" + answerStr + "'")
      $(".ansReveal").append('<img src="' + triviaQuestions[triviaQuestionIndex].gif + '" />')
      //postQuestions();
    } else if (!correct) {
      $(".ansReveal").html(messages.wrongAns  + "<div>" + messages.correctAnsShow + "<div>" + "'" + answerStr + "'")
        $(".ansReveal").append('<img src="' + triviaQuestions[triviaQuestionIndex].gif + '" />')
      //postQuestions();
    }
  }

  // final results page
  function printResults() {
    correctCounter
    incorrectCounter
    unansweredCounter
    alert('placeholder for results')
  }

  // restart whole game (does not reload, resets game)

  //call start page

  startPage()

})
