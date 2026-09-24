from fastapi import status


def test_get_projects_creates_default_project(client):
    response = client.get("/api/projects")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Текучка"
    assert data[0]["isDefault"] is True


def test_create_project(client):
    payload = {"title": "Новый проект", "desc": "Описание", "is_default": False}

    response = client.post("/api/projects", json=payload)

    assert response.status_code == status.HTTP_201_CREATED
    body = response.json()
    assert body["title"] == payload["title"]
    assert body["desc"] == payload["desc"]
    assert body["isDefault"] is False
    assert body["id"] is not None


def test_update_project(client):
    created = client.post(
        "/api/projects",
        json={"title": "Старый проект", "desc": "Старое описание", "is_default": False},
    )
    project_id = created.json()["id"]

    response = client.patch(
        f"/api/projects/{project_id}",
        json={"title": "Новый заголовок", "desc": "Новое описание"},
    )

    assert response.status_code == status.HTTP_200_OK
    body = response.json()
    assert body["id"] == project_id
    assert body["title"] == "Новый заголовок"
    assert body["desc"] == "Новое описание"


def test_delete_project_rejects_default_project(client):
    default_project = client.get("/api/projects").json()[0]

    response = client.delete(f"/api/projects/{default_project['id']}")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == "Cannot delete default project"
