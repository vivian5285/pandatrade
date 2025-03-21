import pytest
from django.urls import reverse

@pytest.mark.django_db
def test_example_feature(client):
    url = reverse('example_endpoint')
    response = client.get(url)
    assert response.status_code == 200
    assert 'expected_key' in response.json()
