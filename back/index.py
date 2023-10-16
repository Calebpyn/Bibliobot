from flask import Flask, request, jsonify
from flask_cors import CORS
from speech_recognition_service import SpeechRecognizer

app = Flask(__name__)
CORS(app, resources={r"/recognize": {"origins": "http://localhost:3000"}})
sr = SpeechRecognizer()

@app.route('/', methods=['GET'])
def hello():
    return sr.recognize('/Users/calebpayan/Desktop/Developer/Bibliobot/back/Encinos.wav')


@app.route('/recognize', methods=['POST'])
def recognize():
    path = request.json.get('path')
    return jsonify({'result': sr.recognize(path)})
    

    
if __name__ == '__main__':
    app.run(debug=True)


