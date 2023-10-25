const questions = [
    { id: 1, text: '1.How satisfied are you with our products?', type: 'rating', min: 1, max: 5 },
    { id: 2, text: '2.How fair are the prices compared to similar retailers?', type: 'rating', min: 1, max: 5 },
    { id: 3, text: '3.How satisfied are you with the value for money of your purchase?', type: 'rating', min: 1, max: 5 },
    { id: 4, text: '4.On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', min: 1, max: 10 },
    { id: 5, text: '5.What could we do to improve our service?', type: 'text' }
];

let currentQuestionIndex = 0;
let answers = [];

function startSurvey() {
    document.getElementById('survey-container').style.display = 'block';
    document.getElementById('welcome-container').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuestion.text;
    document.getElementById('question-number').innerText = `${currentQuestionIndex + 1}/${questions.length}`;

    if (currentQuestion.type === 'rating') {
        showRatingOptions(currentQuestion);
    } else {
        showTextInput();
    }
}

function showRatingOptions(question) {
    let optionsHtml = '';
    for (let i = question.min; i <= question.max; i++) {
        optionsHtml += `<input type="radio" name="rating" value="${i}" id="option${i}">
                        <label for="option${i}">${i}</label>`;
    }
    document.getElementById('answers-container').innerHTML = optionsHtml;
}

function showTextInput() {
    document.getElementById('answers-container').innerHTML = '<textarea id="text-answer"></textarea>';
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        saveAnswer();
        currentQuestionIndex++;
        showQuestion();
    }
}

function skipQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function saveAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === 'rating') {
        const selectedRating = document.querySelector('input[name="rating"]:checked').value;
        answers.push({ questionId: currentQuestion.id, answer: selectedRating });
    } else {
        const textAnswer = document.getElementById('text-answer').value;
        answers.push({ questionId: currentQuestion.id, answer: textAnswer });
    }
}

function submitSurvey() {
    saveAnswer();
    localStorage.setItem('surveyAnswers', JSON.stringify(answers));
    const isConfirmed = confirm('Are you sure you want to submit the survey?');

    if (isConfirmed) {

        localStorage.setItem('surveyStatus', 'COMPLETED');
        document.getElementById('survey-container').innerHTML = '<h2>Thank you for your time!</h2>';

        setTimeout(() => {
            document.getElementById('welcome-container').style.display = 'block';
            document.getElementById('survey-container').style.display = 'none';
        }, 5000);
    }
}
