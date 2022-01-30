from flask import Flask
import requests
from constants import BASE_URL

app = Flask(__name__)

monsters = requests.get(BASE_URL + "/monsters")


@app.route("/monsters")
def get_monsters():
    # monsters = requests.get(BASE_URL + "/monsters")
    if monsters.ok:
        return monsters
    else:
        return None


if __name__ == "__main__":
    app.run()
