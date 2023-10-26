from pydantic import BaseModel, Field
from typing import Optional


class Question(BaseModel):
    question_title: str = Field(...)
    answers: list[str] = Field(..., min_length=4, max_length=4)
    correct_answer: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "question_title": "Cuando termino la segunda guerra mundial?",
                "answers": [
                    "1939",
                    "1945",
                    "1944",
                    "1940"
                ],
                "correct_answer": "1939"
            }
        }


class UpdateQuestion(BaseModel):
    question_title: Optional[str]
    answers: Optional[list[str]]
    correct_answer: Optional[str]

    class Config:
        json_schema_extra = {
            "example": {
                "question_title": "Cuando termino la segunda guerra mundial?",
                "answers": [
                    "1939",
                    "1945",
                    "1944",
                    "1940"
                ],
                "correct_answer": "1939"
            }
        }


def response_model(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def error_response_model(error, code, message):
    return {"error": error, "code": code, "message": message}