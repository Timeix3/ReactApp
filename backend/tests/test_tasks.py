from fastapi import status


def test_get_tasks_empty_list(client):
    response = client.get("/api/tasks")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == []


def test_create_and_get_task(client):
    project = client.post(
        "/api/projects",
        json={"title": "Project A", "desc": "desc", "is_default": False},
    ).json()

    payload = {"title": "Task 1", "desc": "Desc", "project_id": project["id"]}
    create_response = client.post("/api/tasks", json=payload)

    assert create_response.status_code == status.HTTP_201_CREATED
    task = create_response.json()
    assert task["title"] == payload["title"]
    assert task["projectId"] == payload["project_id"]

    response = client.get(f"/api/tasks/{task['id']}")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["id"] == task["id"]


def test_project_tasks_list(client):
    project = client.post(
        "/api/projects",
        json={"title": "Project B", "desc": "desc", "is_default": False},
    ).json()

    client.post("/api/tasks", json={"title": "Task 1", "desc": "d1", "project_id": project["id"]})
    client.post("/api/tasks", json={"title": "Task 2", "desc": "d2", "project_id": project["id"]})

    response = client.get(f"/api/projects/{project['id']}/tasks")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 2
    assert {item["title"] for item in data} == {"Task 1", "Task 2"}


def test_delete_task(client):
    project = client.post(
        "/api/projects",
        json={"title": "Project C", "desc": "desc", "is_default": False},
    ).json()
    task = client.post(
        "/api/tasks",
        json={"title": "Task to delete", "desc": "desc", "project_id": project["id"]},
    ).json()

    response = client.delete(f"/api/tasks/{task['id']}")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["id"] == task["id"]
    assert client.get(f"/api/tasks/{task['id']}").status_code == 404
