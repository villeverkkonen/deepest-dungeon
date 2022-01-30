from flask import Flask
import requests

app = Flask(__name__)


@app.route("/monsters")
def get_monsters():
    return requests.get("https://api.open5e.com/monsters/").json()


if __name__ == "__main__":
    app.run()
