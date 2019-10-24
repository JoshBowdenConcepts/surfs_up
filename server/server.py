import requests
import sys
from flask import Flask, request
from flask_cors import CORS
import config

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    SECRET_KEY = config.key()
    spot = str(request.args.get('spotId'))
    response = requests.get("http://magicseaweed.com/api/" + str(SECRET_KEY) + "/forecast/?spot_id=" + spot)
    if response:
        if response.status_code == 200:
            return str(response.content)
        else:
            return 'Failure Code Returned'
    else:
        return 'Failure'
    
if __name__ == "__main__":
    app.run(debug=True)