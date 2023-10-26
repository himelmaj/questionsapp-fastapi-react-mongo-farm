import axios from "axios";

const questionsApi = axios.create({baseURL: 'http://127.0.0.1:8000/'})

export const getAllQuestions = () => questionsApi.get('/')
export const getQuestion = (id) => questionsApi.get(`/${id}/`)
export const createQuestion = (question) => questionsApi.post('/', question)
export const deleteQuestion = (id) => questionsApi.delete(`/${id}/`)
export const updateQuestion = (id, question) => questionsApi.put(`/${id}/`, question)