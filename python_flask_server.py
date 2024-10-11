##### pip install Flask #####

from datetime import datetime
from flask import Flask, jsonify, request


def timeNow():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S').split(" ")[1]

app = Flask(__name__)
@app.route('/time') # http://127.0.0.1/time
def serve():
    return jsonify({"time": timeNow()})

@app.route('/msj', methods=['POST'])
def receive_message():
    data = request.get_json()
    message = data.get('message', '')
    print(f'Mensaje recibido: {message}')
    return jsonify({'message': 'Mensaje recibido en el backend'}), 200

app.run(host="0.0.0.0", port = 80)

