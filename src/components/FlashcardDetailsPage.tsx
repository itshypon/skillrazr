import { useParams } from "react-router-dom";
import { flashcards } from "../data/flashcards";
import { useState, useEffect, useCallback } from "react";
import "./FlashcardDetailsPage.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  integrity="sha512-q1vfLJkiTtYrXtTjDLZPvMXefPNTwFYzVhKj67zp0z+VkC1Qtt0HkX8so0+uvZc7z3e3JFdH/y+KEDGGksyIjA=="
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>;

function FlashcardDetailsPage() {
  const { id: category } = useParams();
  console.log("id", category);

  const matchingFlashcards = flashcards.filter(
    (flashcard) => flashcard.category === category
  );

  // get all the flashcards belongs to the id. e.g javascript

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleNextClick = useCallback(() => {
    if (currentQuestionIndex < matchingFlashcards.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsFlipped(false);
    }
  }, [currentQuestionIndex, matchingFlashcards.length]);

  const handlePrevClick = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsFlipped(false);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    function handleArrowKeys(event: { keyCode: number }) {
      if (event.keyCode === 37) {
        // left arrow key
        handlePrevClick();
      } else if (event.keyCode === 39) {
        // right arrow key
        handleNextClick();
      }
    }

    window.addEventListener("keydown", handleArrowKeys);
    return () => {
      window.removeEventListener("keydown", handleArrowKeys);
    };
  }, [currentQuestionIndex, handleNextClick, handlePrevClick]);

  return (
    <>
      {matchingFlashcards.length > 0 && (
        <>
          <div className="heading">
            <h1 className="category">
              {matchingFlashcards[currentQuestionIndex].category}
            </h1>
            <h1 className="description">
              {`- ${matchingFlashcards[currentQuestionIndex].description}`}
            </h1>
          </div>
          <div className="flashcard-container">
            <div className="question-number">
              <p>{`${currentQuestionIndex + 1} / ${
                matchingFlashcards.length
              }`}</p>
            </div>
            <div className={`card ${isFlipped ? "flipped" : ""}`}>
              <div className="front">
                <h2 className="question">{`Q${currentQuestionIndex + 1}) ${
                  matchingFlashcards[currentQuestionIndex].question
                }`}</h2>
                <div className="button-container">
                  {currentQuestionIndex === 0 ? (
                    <p></p>
                  ) : (
                    <button className="prev-button" onClick={handlePrevClick}>
                      <i className="fa fa-chevron-left"></i>
                    </button>
                  )}

                  {currentQuestionIndex !== matchingFlashcards.length - 1 && (
                    <button className="next-button" onClick={handleNextClick}>
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  )}
                </div>
                <button className="flip-button" onClick={handleClick}>
                  Flip
                </button>
              </div>
              <div className="back">
                <h2>Answer:</h2>
                <h2 className="answer">
                  {matchingFlashcards[currentQuestionIndex].answer}
                </h2>
                <button className="flip-button" onClick={handleClick}>
                  Flip
                </button>
                {!isFlipped && (
                  <>
                    <button className="prev-button" onClick={handlePrevClick}>
                      Prev
                    </button>
                    <button className="next-button" onClick={handleNextClick}>
                      Next
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FlashcardDetailsPage;
