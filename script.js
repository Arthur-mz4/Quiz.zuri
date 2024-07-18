document.addEventListener('DOMContentLoaded', () => {
    const topic1Questions = [
        { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Lisbon"], correctIndex: 2 },
        { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correctIndex: 1 },
        { question: "What is the largest ocean on Earth?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correctIndex: 3 },
        { question: "Which element has the chemical symbol O?", answers: ["Gold", "Oxygen", "Silver", "Iron"], correctIndex: 1 }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionText = document.getElementById('question-text');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressCircle = document.querySelector('.progress-circle');

    function loadQuestion() {
        const question = topic1Questions[currentQuestion];
        questionText.textContent = question.question;

        answerButtons.forEach((button, index) => {
            button.textContent = question.answers[index];
            button.dataset.correctIndex = question.correctIndex;
            button.style.backgroundColor = ''; // Reset button color
            button.disabled = false; // Re-enable button
            button.addEventListener('click', () => checkAnswer(button));
        });

        updateProgress();
    }

    function checkAnswer(button) {
        const correctIndex = button.dataset.correctIndex;
        const selectedAnswer = button.textContent;
        
        if (selectedAnswer === topic1Questions[currentQuestion].answers[correctIndex]) {
            button.style.backgroundColor = 'green'; // Correct answer
            score++;
        } else {
            button.style.backgroundColor = 'red'; // Incorrect answer
            answerButtons[correctIndex].style.backgroundColor = 'green'; // Highlight correct answer
            
            // Display pop-up with correct answer
            setTimeout(() => {
                alert(`Wrong answer! The correct answer is: ${topic1Questions[currentQuestion].answers[correctIndex]}`);
            }, 500);
        }

        // Disable all answer buttons after selection
        answerButtons.forEach(btn => {
            btn.disabled = true;
        });

        // Move to the next question after a brief delay
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < topic1Questions.length) {
                resetButtons();
                loadQuestion();
            } else {
                // Quiz completed, navigate or show completion message
                window.location.href = `completion.html?score=${score}`;
            }
        }, 1000);
    }

    function resetButtons() {
        answerButtons.forEach(btn => {
            btn.style.backgroundColor = ''; // Reset button color
            btn.disabled = false; // Re-enable button
        });
    }

    function updateProgress() {
        const progress = (currentQuestion / topic1Questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressCircle.textContent = `${Math.round(progress)}%`;
    }

    // Start with an empty progress bar
    updateProgress();

    // Load the first question on page load
    loadQuestion();
});
