from flask import Flask
import requests

app = Flask(__name__)

monsters = requests.get("https://api.open5e.com/monsters/").json()

@app.route("/monsters")
def get_monsters():
    return monsters


if __name__ == "__main__":
    app.run()
