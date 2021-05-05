import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { SayButton } from "react-say";

const App = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
  return (
    <div>
      <button
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
      >
        Start
      </button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <button onClick={() => resetTranscript()}>Reset</button>
      <p>{transcript}</p>

      <SayButton
        onClick={(event: any) => console.log(event)}
        speak={transcript}
      >
      Play
      </SayButton>
    </div>
  );
};
export default App;
