from flask import Flask
import requests
from constants import BASE_URL

app = Flask(__name__)


@app.route("/monsters")
def get_monsters():
    response = requests.get(BASE_URL + "/monsters")
    if response.ok:
        return response.json()
    else:
        return None


if __name__ == "__main__":
    app.run()
