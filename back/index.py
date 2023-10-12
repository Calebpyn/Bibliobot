from flask import Flask
from speech_recognition_service import SpeechRecognizer

app = Flask(__name__)
sr = SpeechRecognizer()

@app.route('/', methods=['GET'])
def hello():
    return sr.recognize('Encinos.wav')
    
if __name__ == '__main__':
    app.run(debug=True)

