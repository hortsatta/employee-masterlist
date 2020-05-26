employee-masterlist
======================
An employee master list application with basic encoding features.
This project was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app#readme); And utilizes [Firebase's Firestore and Cloud Storage](https://firebase.google.com/) as its database and image hosting respectively.

## Getting Started
```bash
# clone repo
git clone git@github.com:hortsatta/employee-masterlist.git

# navigate to repo
cd employee-masterlist

# install deps
npm install

# run app
npm start
```

**Additional Instructions**
Use the command below to deploy project, files ready for deployment are stationed at the `build` folder located at the root of the project.
```bash
# build app
npm run build
```
As previously mentioned this project uses Firestore and Firebase's Cloud Storage, register and initialize yours using this [link](https://firebase.google.com/). Copy Firebase's config at `Project Overview > Project settings > config` and paste it in your project's `.env` file.
```bash
# .env file
REACT_APP_API_KEY=#from Firebase config
REACT_APP_API_AUTH_DOMAIN=#from Firebase config
REACT_APP_API_DATABASE_URL=#from Firebase config
REACT_APP_API_PROJECT_ID=#from Firebase config
REACT_APP_API_STORAGE_BUCKET=#from Firebase config
REACT_APP_API_MESSAGING_SENDER_ID=#from Firebase config
REACT_APP_API_APP_ID=#from Firebase config
REACT_APP_API_MEASUREMENT_ID=#from Firebase config
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name
```