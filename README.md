# Letterboxd-Clone
"Letterboxd Clone" is a web application built using MongoDB, Express, Node.js, and EJS with API integration through Axios, specifically utilizing TMDb (The Movie Database) API. The project aims to replicate the features of the popular movie review website, Letterboxd. Users can create accounts, search for movies, add movies to their personal watchlists, rate and review movies, and interact with other users through a comment system. The application utilizes TMDb's RESTful API to retrieve and display movie data, making it easy to keep the site updated with the latest movie releases. The code is designed to be modular and extensible, making it easy for other developers to contribute and add new features.

## Installation:
1. Clone the project from the Github repository by running the command `git clone <repository url>` in your terminal.
2. Run `npm install` to install all the necessary dependencies.
3. Change the value of `<your_api_key>` in the `server.js` file to be your API key from TMDB (The Movie Database). You can get an API key by creating an account at https://www.themoviedb.org/documentation/api.
## Running the Project:
5. After installation, run npm start to start the application.
6. Open your web browser and navigate to http://localhost:3500 to access the application.

# Homepage (Using  TMDb API to display popular, upcoming, and now playing movies)
![screencapture-127-0-0-1-3500-2023-02-14-21_21_26-min](https://user-images.githubusercontent.com/90688030/218765721-e4c053d9-4585-4322-bf44-7b21bd6a4ed4.png)

# Search Page (Using TMDb API to display the search result)
![screencapture-127-0-0-1-3500-search-2023-02-14-21_24_27](https://user-images.githubusercontent.com/90688030/218766204-4cfd498e-45d3-47f7-99fa-9f2d70c197d5.png)

# Movie Info Page (Using TMDb API to display all the data of the movie)
![screencapture-127-0-0-1-3500-film-everything-everywhere-all-at-once-2022-2023-02-14-21_40_37](https://user-images.githubusercontent.com/90688030/218770260-6556d36b-d01d-4381-bd5f-b503478d2afa.png)


# Registration Page (Using MongoDB to store the user's data)
![screencapture-127-0-0-1-3500-create-account-2023-02-14-21_32_51](https://user-images.githubusercontent.com/90688030/218768648-9d62c654-ed5a-4255-86e3-16fa95572663.png)

# Login Page (Check the user data if it does exist in the database)
![screencapture-127-0-0-1-3500-sign-in-2023-02-14-21_35_24](https://user-images.githubusercontent.com/90688030/218769420-3ba2cd3a-5ec1-4e7a-aa7b-756c900ece9b.png)

