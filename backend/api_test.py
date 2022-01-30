import unittest
from api import get_monsters
from unittest.mock import patch


class ApiTests(unittest.TestCase):

    @patch('api.requests.get')
    def test_get_monsters(self, mock_get):
        mock_get.return_value.status_code = 200
        response = get_monsters()
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()
