import React, { useEffect, useCallback, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { SayButton } from "react-say";
import {testapi} from './client/api';

const App = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [title, setTitle] = useState("Hold space bar to speak.");
  const startListen = useCallback((event) => {
    if (event.keyCode === 32) {
      SpeechRecognition.startListening({ continuous: true });
      setTitle("Listening...");
    }
  }, []);
  const stopListen = useCallback((event) => {
    if (event.keyCode === 32) {
      SpeechRecognition.stopListening();
      setTitle("Hold space bar to speak.");
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", startListen, false);
    document.addEventListener("keyup", stopListen, false);

    return () => {
      document.removeEventListener("keydown", startListen, false);
      document.addEventListener("keyup", stopListen, false);
    };
  }, [startListen, stopListen]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const callApi = () => {
    testapi().then((data : any) =>{
      console.log(data);
      alert(data.data.result.data);
    })
  };
  return (
    <div>
      <h3>{title}</h3>
      <button onClick={() => resetTranscript()}>Reset</button>
      <p>{transcript}</p>

      {transcript && (
        <SayButton
          onClick={(event: any) => console.log(event)}
          speak={transcript}
        >
          Click to play your recording!
        </SayButton>
      )}

      <button onClick={callApi}>Click to call api</button>
    </div>
  );
};
export default App;
