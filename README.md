## To Run the Backend Locally

Navigate to the project directory:

```bash
cd ./my-node-project/
```
Start the server:

```bash
node ./server.js
```

## To Run the Frontend Locally

Navigate to the project directory:

```bash
cd ./my-react-app/
```
Start the react app:

```bash
npm run start
```

Note: this assumes postgres db is available for backend to communicate to. 


## Deployment Setup
Visit the app at: https://react-workout.netlify.app/

### Frontend
Frontend is hosted by https://www.netlify.com/
- pushing to main branch will trigger CI/CD pipeline to redeploy

### Server
Express server is hosted on https://dashboard.heroku.com/
```bash
git push heroku main
```
^^ will trigger a deployment

### Database 
Postgres database is hosted at https://www.elephantsql.com/
