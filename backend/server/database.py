from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from decouple import config


client = AsyncIOMotorClient(config('MONGODB_URL'))

database = client.questionsdb
questions_collection = database.get_collection("questions_collection")


def question_helper(question) -> dict:
    return {
        "id": str(question["_id"]),
        "question_title": question["question_title"],
        "answers": question["answers"],
        "correct_answer": question["correct_answer"],
    }


async def retrieve_questions():
    questions = []
    async for question in questions_collection.find():
        questions.append(question_helper(question))
    return questions


async def add_question(question_data: dict) -> dict:
    question = await questions_collection.insert_one(question_data)
    new_question = await questions_collection.find_one({"_id": question.inserted_id})
    return question_helper(new_question)


async def retrieve_question(id: str) -> dict:
    question = await questions_collection.find_one({"_id": ObjectId(id)})
    if question:
        return question_helper(question)


async def update_question(id: str, data: dict):
    if len(data) < 1:
        return False
    question = await questions_collection.find_one({"_id": ObjectId(id)})
    if question:
        update_question = await questions_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if update_question:
            return True
        return False


async def delete_question(id: str):
    question = await questions_collection.find_one({"_id": ObjectId(id)})
    if question:
        await questions_collection.delete_one({"_id": ObjectId(id)})
        return True