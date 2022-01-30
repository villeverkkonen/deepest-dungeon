import requests
import json
from api import app


def test_get_monsters():
    url = "https://api.open5e.com/monsters"
    monsters = requests.get(url)
    response = app.test_client().get("/monsters", content_type="html/text")

    assert response.status_code == 200
    assert "count".encode() in response.data
    assert "results".encode() in response.data
    assert json.loads(response.data) == monsters.json()
