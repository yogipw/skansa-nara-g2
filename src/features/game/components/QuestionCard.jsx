export default function QuestionCard({ question, chapter, state, progress, onAnswer, onNext }) {
  const options = [question.option_a, question.option_b, question.option_c, question.option_d];
  return (
    <div className="screen active" id="screen-quiz">
      <div className="quiz-header">
        <div className="score-chip">⭐ <span>{state.score}</span></div>
        <div className="progress-wrap"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        <div className="question-num">{state.index + 1}/{state.questions.length}</div>
        <div className="streak-chip">🔥 <span>{state.streak}</span></div>
      </div>
      <div className="card" id="quiz-card">
        <div id="nara-card-comment"><span className="nc-emoji">🦸</span><span>Yuk gasss! 🔥</span></div>
        <span className={`chapter-badge ${chapter?.className || 'ch1'}`}>Bab {chapter?.order_number} - {chapter?.title}</span>
        <span className="question-emoji">{question.emoji}</span>
        <div className="question-text">{question.question_text}</div>
        <div className="answers-grid">
          {options.map((option, index) => {
            const isSelected = state.selectedOption === index;
            const isCorrect = state.answered && index === question.correct_option;
            const isWrong = state.answered && isSelected && index !== question.correct_option;
            return (
              <button
                className={`answer-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${isSelected ? 'selected-answer' : ''}`}
                key={option}
                type="button"
                onClick={() => onAnswer(index)}
                disabled={state.answered}
              >
                <span className="opt-label">{String.fromCharCode(65 + index)}</span> {option}
              </button>
            );
          })}
        </div>
        <div className={`mini-fact-box ${state.answered ? 'show' : ''}`}><span>💡</span><span>{question.explanation}</span></div>
        {state.answered ? <div className="next-btn-wrap"><button className="btn btn-primary" type="button" onClick={onNext}>Lanjut ➡️</button></div> : null}
      </div>
    </div>
  );
}
