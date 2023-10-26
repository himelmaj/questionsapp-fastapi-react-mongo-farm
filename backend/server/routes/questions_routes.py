from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import add_question, delete_question, retrieve_question, retrieve_questions, update_question
from server.models.questions_models import error_response_model, response_model, Question, UpdateQuestion

router = APIRouter()

# post
@router.post("/", response_description="Question added")
async def add_question_data(question: Question = Body(...)):
    question = jsonable_encoder(question)
    new_question = await add_question(question)
    return response_model(new_question, "Question added successfully.")

# get

@router.get("/", response_description="Question retrieved")
async def get_questions():
    questions = await retrieve_questions()
    if questions:
        return response_model(questions, "Questions data retrieved successfully")
    return response_model(questions, "Empty list returned")

# get one

@router.get("/{id}", response_description="Question data retrieved")
async def get_question_data(id):
    question = await retrieve_question(id)
    if question:
        return response_model(question, "Question data retrieved successfully")
    return error_response_model("An error occurred.", 404, "Question doesn't exist.")

# update

@router.put("/{id}")
async def update_question_data(id: str, req: UpdateQuestion = Body(...)):
    req = {k: v for k, v in dict(req).items() if v is not None}
    updated_question = await update_question(id, req)
    if updated_question:
        return response_model(
            "Question with ID: {} name update is successful".format(id),
            "Question name updated successfully",
        )
    return error_response_model(
        "An error occurred",
        404,
        "There was an error updating the question data.",
    )

# delete

@router.delete("/{id}", response_description="question data deleted from the database")
async def delete_question_data(id: str):
    deleted_question = await delete_question(id)
    if deleted_question:
        return response_model(
            "Student with ID: {} removed".format(id), "Student deleted successfully"
        )
    return error_response_model(
        "An error occurred", 404, "Student with id {id} doesn't exist".format(id)
    )
