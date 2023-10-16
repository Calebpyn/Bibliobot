
import wave
import sys
import io

from vosk import Model, KaldiRecognizer, SetLogLevel

class SpeechRecognizer():
    def __init__(self):
        self.model = Model(lang="es")
    
    def recognize(self, audioFile) -> str:
        wf = wave.open(audioFile, "rb")
        if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
            raise Exception("Audio file must be WAV format mono PCM.")
        
        rec = KaldiRecognizer(self.model, wf.getframerate())
        rec.SetWords(True)
        rec.SetPartialWords(True)
        
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            rec.AcceptWaveform(data)
        return rec.FinalResult().split("text")[1]

__all__ = ['speech_recognizer']