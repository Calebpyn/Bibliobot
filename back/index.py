from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from speech_recognition_service import SpeechRecognizer

app = Flask(__name__)
CORS(app, resources={r"/recognize": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/": {"origins": "http://localhost:3000"}})

sr = SpeechRecognizer()


@app.route('/', methods=['GET'])
def hello():
    path = '/Users/calebpayan/Desktop/Developer/Bibliobot/back/Encinos.wav'
    result = sr.recognize(path)
    print(result)
    return jsonify({'result': result})
 


@app.route('/recognize', methods=['POST'])
def recognize():
    path = request.json.get('path')
    result = sr.recognize(path)
    print(result)
    return jsonify({'result': result})


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response


if __name__ == '__main__':
    app.run(debug=True)


