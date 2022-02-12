from flask import Flask
import requests
from constants import BASE_URL

app = Flask(__name__, static_folder='../build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/monsters')
def get_monsters():
    response = requests.get(BASE_URL + '/monsters?limit=2000')
    if response.ok:
        filteredMonsters = {'results': []}

        for monster in response.json()['results']:
            challengeRating = monster['challenge_rating']
            if monster['challenge_rating'] == '1/4':
                challengeRating = '0.25'
            if monster['challenge_rating'] == '1/2':
                challengeRating = '0.5'
            filteredMonsters['results'].append(
                {'name': monster['name'], 'challenge_rating': challengeRating, 'quantity': 0})

        return filteredMonsters
    else:
        return None


if __name__ == '__main__':
    app.run()
