document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { 
            question: "How often do you feel tired or have little energy?",
            answers: ["Almost every day", "Several days", "Rarely", "Not at all"],
            correct: 0
        },
        { 
            question: "How often do you feel nervous, anxious, or on edge?",
            answers: ["Not at all", "Several days", "More than half the days", "Almost every day"],
            correct: 3
        },
        { 
            question: "How often do you find yourself worrying about different things?",
            answers: ["Not at all", "Several days", "More than half the days", "Almost every day"],
            correct: 3
        },
        { 
            question: "How often do you feel confident about your ability to handle your personal problems?",
            answers: ["Almost every day", "More than half the days", "Several days", "Not at all"],
            correct: 0
        },
        { 
            question: "How often do you feel so restless that it's hard to sit still?",
            answers: ["Not at all", "Several days", "More than half the days", "Almost every day"],
            correct: 3
        },
        { 
            question: "How often do you feel down, depressed, or hopeless?",
            answers: ["Not at all", "Several days", "More than half the days", "Almost every day"],
            correct: 3
        },
        { 
            question: "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?",
            answers: ["Not at all", "Several days", "More than half the days", "Almost every day"],
            correct: 3
        },
        { 
            question: "How often do you feel bad about yourself — or that you are a failure or have let yourself or your family down?",
            answers: ["Not at all", "Several days", "More than half the days", "Almost every day"],
            correct: 3
        },
        { 
            question: "How often do you have trouble falling or staying asleep, or sleep too much?",
            answers: ["Not at all", "Several days", "More than half the days", "Almost every day"],
            correct: 3
        },
        { 
            question: "How often do you feel detached or estranged from others?",
            answers: ["Not at all", "Several days", "More than half the days", "Almost every day"],
            correct: 3
        }
        //{ question: "Question 1", answers: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        // Define the rest of your questions here
    ];

    let currentQuestionIndex = 0;
    let score = 0; // Initialize score

    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const progressText = document.getElementById('progress');
    const resultsContainer = document.getElementById('results');
    const submitBtn = document.getElementById('submitBtn');

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        optionsContainer.innerHTML = ''; // Clear previous options
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index, currentQuestion.correct));
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedIndex, correctIndex) {
        if (selectedIndex === correctIndex) {
            score++;
        }

        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.disabled = true; // Disable all options after selection
        });

        if (currentQuestionIndex < questions.length - 1) {
            submitBtn.classList.remove('hide');
            submitBtn.onclick = () => {
                currentQuestionIndex++;
                loadQuestion();
                submitBtn.classList.add('hide');
            };
        } else {
            submitBtn.textContent = 'See Results';
            submitBtn.onclick = showResults;
            submitBtn.classList.remove('hide');
        }
    }

    function showResults() {
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.style.display = 'none';
        resultsContainer.classList.remove('hide');

        // Calculate the score and display the appropriate message
        let resultText = `You've completed the quiz! Your score is ${score} out of ${questions.length}.`;
        let customMessage = "";
        let contactInfo = "";


        // Adjust the custom message based on the score
        if (score > questions.length * 0.7 ) {
            customMessage = "It seems like you might be experiencing significant distress. We encourage you to talk to a mental health professional.";
            contactInfo = `
            <div class="contact-info">
                <p>Here are some contacts you might consider:</p>
                <ul>
                    <li>Dr.wade wilson - email: wade@example.com, phone: 1234567890</li>
                    <li>Dr. jake paul - email: mel@example.com, phone: 7397403759</li>
                    <li>Dr. Yashwant - email: youp@example.com, phone: 7548898960</li>
                </ul>
                <p>Please remember, seeking help is a sign of strength.</p>
            </div>
        `;
              
        } else if (score <= questions.length * 0.6 & score >= questions.length * 0.4)  {
            customMessage = "You may have some concerns about your mental health. If these feelings persist, reaching out to a professional could be beneficial.";
        } else {
            customMessage = "Hey It looks like you are fine, but always pay attention to how you're feeling. If you ever find your mental health affecting your daily life, consider speaking with someone.";
        }

        resultsContainer.innerHTML = `<h1>${resultText}</h1><p>${customMessage}</p>${contactInfo}`;
    }

    loadQuestion();
});