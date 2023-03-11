# Letterboxd-Clone

"Letterboxd Clone" is a web application built using MongoDB, Express, Node.js, and EJS with API integration through Axios, specifically utilizing TMDb (The Movie Database) API. The project aims to replicate the features of the popular movie review website, Letterboxd. Users can create accounts, search for movies, add movies to their personal watchlists, rate and review movies, and interact with other users through a comment system. The application utilizes TMDb's RESTful API to retrieve and display movie data, making it easy to keep the site updated with the latest movie releases. The code is designed to be modular and extensible, making it easy for other developers to contribute and add new features.

## Important Note
I want to clarify that this project is solely for educational purposes and I don't intend to launch the website as a live platform. I respect the intellectual property of Letterboxd and its team and if they request for the repository to be taken down, I'll do it promptly.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for the testing purpose.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm (Node Package Manager)
- [MongoDB](https://www.mongodb.com/)

### Installation:

1. Clone the project from the Github repository by running the command:
```bash
git clone https://github.com/Sorracha-A/Letterboxd-Clone
```

2. Navigate to the project's root directory in your terminal.

3. Install all the necessary dependencies by running:
```bash
npm install
```

4. Start MongoDB on your local machine.

5. Create a `.env` file in the root directory of the project with the following environment variables.
```bash
PORT=your-port-number
MONGODB_URI=mongodb://localhost:<port>/<db-name>
TMDB_API_KEY=your-api-key
SECRET=your-session-secret
```
You can get an API key by creating an account at https://www.themoviedb.org/documentation/api.

### Running the Project:
6. After installation, to start the application, run:
```bash
npm start
```

7. Open your web browser and navigate to `http://localhost:<port>` (port that you specified in the `.env`) to access the application.

## Feature
- User authentication: sign up, login. ✅
- Browse movies: view popular, now playing, upcoming, and top rated movies. ✅
- Search for movies: search by title. ✅
- Movie details: view movie information, cast, directors, reviews, and etc. ✅
- Review movies: rate movies and write reviews. (TBU) 🛠️
- Lists: create and manage movie lists. ✅
- User profile: view user's activity, statistics, and lists. (TBU) 🛠️
- Admin panel: manage movies, users, and reviews. (TBU) 🛠️

## APIs Used
TMDb API - The Movie Database API for retrieving movie data

## Built With
- MongoDB - A NoSQL document-oriented database
- Express - A web application framework for Node.js
- Node.js - A JavaScript runtime built on Chrome's V8 JavaScript engine
- EJS - A templating language for generating HTML markup with JavaScript
- Axios - A promise-based HTTP client for making API requests

### Author
Sorracha Aiemmeesri


# Preview

## Homepage (Using  TMDb API to display popular, upcoming, and now playing movies)
![screencapture-127-0-0-1-3500-2023-02-14-21_21_26-min](https://user-images.githubusercontent.com/90688030/218765721-e4c053d9-4585-4322-bf44-7b21bd6a4ed4.png)

## Search Page (Using TMDb API to display the search result)
![screencapture-127-0-0-1-3500-search-2023-02-14-21_24_27](https://user-images.githubusercontent.com/90688030/218766204-4cfd498e-45d3-47f7-99fa-9f2d70c197d5.png)

## Movie Info Page (Using TMDb API to display all the data of the movie)
![screencapture-127-0-0-1-3500-film-everything-everywhere-all-at-once-2022-2023-02-14-21_40_37](https://user-images.githubusercontent.com/90688030/218770260-6556d36b-d01d-4381-bd5f-b503478d2afa.png)


## Registration Page (Using MongoDB to store the user's data)
![screencapture-127-0-0-1-3500-create-account-2023-02-14-21_32_51](https://user-images.githubusercontent.com/90688030/218768648-9d62c654-ed5a-4255-86e3-16fa95572663.png)

## Login Page (Check the user data if it does exist in the database)
![screencapture-127-0-0-1-3500-sign-in-2023-02-14-21_35_24](https://user-images.githubusercontent.com/90688030/218769420-3ba2cd3a-5ec1-4e7a-aa7b-756c900ece9b.png)

## Add a movie list
https://user-images.githubusercontent.com/90688030/224469453-36b015d7-b890-407a-b616-7c9b9d7cb995.mov








