from sqlmodel import Session

from app.crud.project import get_default_project, create_project
from app.models.project import Project


def ensure_default_project_exists(session: Session, user_id: int):
    default_project = get_default_project(session, user_id)
    if not default_project:
        default_project = Project(
            title="Текучка",
            desc="Задачи без конкретного проекта",
            is_default=True,
            user_id=user_id,
        )
        session.add(default_project)
        session.commit()
        session.refresh(default_project)