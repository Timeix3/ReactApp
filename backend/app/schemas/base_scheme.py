from sqlmodel import SQLModel
from pydantic import ConfigDict
from pydantic.alias_generators import to_camel

class BaseScheme(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        validate_by_alias=True,
        validate_by_name=True,
        from_attributes=True
    )