from sqlmodel import Session

from app.crud.project import get_default_project, create_project
from app.models.project import Project


def ensure_default_project_exists(session: Session):
    default_project = get_default_project(session)
    if not default_project:
        default_project = Project(title="Текучка", desc="Задачи без конкретного проекта", is_default=True)
        create_project(session, default_project)