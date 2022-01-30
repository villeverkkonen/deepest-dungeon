import unittest
from unittest.mock import patch, Mock
from api import get_monsters


class ApiTests(unittest.TestCase):
    def test_get_monsters(self):
        mock_get_patcher = patch('api.requests.get')
        monsters = [
            {
                "name": "Test Orc",
                "challenge_rating": "2"
            },
            {
                "name": "Test Dragon",
                "challenge_rating": "4"
            }
        ]

        mock_get = mock_get_patcher.start()

        mock_get.return_value.json.return_value = monsters
        response = get_monsters()

        mock_get_patcher.stop()

        self.assertEqual(response, monsters)


if __name__ == "__main__":
    unittest.main()
