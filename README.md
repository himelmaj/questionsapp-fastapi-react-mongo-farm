
# Questions App

Questions App is a project where I have used FastAPI for the backend, React Vite for the frontend, and MongoDB as the database. The project involves creating questions and answering them in pairs.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`FRONTEND_URL`

`MONGODB_URL`


## Run Locally

Clone the project
```bash
  git clone https://github.com/himelmaj/questionsapp-fastapi-react-mongo-farm.git
```

Navigate to the project directory

```bash
  cd questionsapp-fastapi-react-mongo-farm
```
### Backend: Terminal 1

Navigate to the backend directory

```bash
  cd backend
```

Create a virtual environment and activate it

```bash
  python -m venv venv

  .\venv\Scripts\activate
```

Install Python dependencies

```bash
  pip install -r requirements.txt
```
Start the server

```bash
  python .\main.py
```

### Frontend: Terminal 2

Navigate to the frontend directory

```bash
  cd frontend
```

Install Node.js dependencies

```bash
  npm install
```


Start the server

```bash
  npm run dev
```

### Remember to create at least 2 questions to play.

