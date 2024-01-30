import React, { useState } from "react";

function NewsItem(props) {
  const [isListening, setIsListening] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const handleListen = () => {
    if (isListening) {
      window.speechSynthesis.cancel();
      setIsListening(false);
    } else {
      const newUtterance = new SpeechSynthesisUtterance();
      newUtterance.text = `${props.title}. ${props.description}`;
      window.speechSynthesis.speak(newUtterance);
      setUtterance(newUtterance);
      setIsListening(true);
    }
  };

  return (
    <div className="my-3">
      <div className="card">
        <img
          src={
            !props.imageURL
              ? "https://media.wired.com/photos/659dbf12156f76cbf3057921/191:100/w_1280,c_limit/Gary-Gensler-sec-GettyImages-1660268020.jpg"
              : props.imageURL
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}...</h5>
          <p className="card-text">{props.description}...</p>
          <p className="card-text">
            <small className="text-body-secondary text-dark">
              By {props.author} on {new Date(props.date).toTimeString()}
            </small>
          </p>
          <div className="d-flex justify-content-between">
          <button
            onClick={handleListen}
            className={`btn btn-sm ${isListening ? "btn-danger" : "btn-dark"}`}
          >
            {isListening ? "Stop Listening" : "Listen"}
          </button>
          <button
            href={props.newsURL}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark ml-2"
          >
            Read more
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
