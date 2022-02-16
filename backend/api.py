from flask import Flask
import requests

deepest_dungeon = Flask(
    __name__, static_folder='../build', static_url_path='/')


@deepest_dungeon.route('/')
def index():
    return deepest_dungeon.send_static_file('index.html')


@deepest_dungeon.route('/api/monsters')
def get_monsters():
    response = requests.get('https://api.open5e.com/monsters?limit=2000')
    if response.ok:
        filteredMonsters = {'results': []}

        for monster in response.json()['results']:
            challengeRating = monster['challenge_rating']
            if monster['challenge_rating'] == '1/4':
                challengeRating = '0.25'
            if monster['challenge_rating'] == '1/2':
                challengeRating = '0.5'

            filteredMonsters['results'].append(
                {'name': monster['name'], 'type': monster['type'].capitalize(), 'challenge_rating': challengeRating, 'quantity': 0})

        return filteredMonsters
    else:
        return None


if __name__ == '__main__':
    deepest_dungeon.run()
