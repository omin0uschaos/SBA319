# README.MD for MoodAMP Application

MoodAMP is a music application designed to match your mood with the perfect playlist. From creating and editing songs and playlists to exploring music curated for every emotion, MoodAMP offers a unique experience for music lovers. Follow the instructions below to set up and start using MoodAMP.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed locally or access to a MongoDB Atlas cluster
- An internet browser

### Initial Setup

1. **Clone the Repository:**
   Clone this repository to your local machine using `git clone`, followed by the repository URL.

2. **Install Dependencies:**
   Navigate to the root directory of the cloned repository in your terminal and run `npm install` to install the required dependencies.

3. **Create .env File:**
   Inside the root directory, create a `.env` file to store your environment variables. You need to define the following variables:
   - `PORT`: The port number on which the application will run (e.g., 3000).
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret key for JWT token generation and verification. You can generate a random key at [GRC's Passwords](https://www.grc.com/passwords) or choose any string you prefer.

Example `.env` content:
```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
JWT_SECRET=YourRandomSecretKeyHere
```

4. **Populate the Database:**
   Before using the app, you need to populate the database with sample data.
   - Start the application by running `node server.mjs` in the terminal.
   - Open your web browser and go to `localhost:<PORT>/seed` to seed the users and songs collections.
   - Next, navigate to `localhost:<PORT>/seedplaylist` to seed the playlists collection.

5. **Create and use Index:**
   After populating your database with the initial seed data, you can create an index on the title field of the songs collection to improve query performance, especially for operations that sort or search songs by title.

    1. Create Index on Song Titles:

        Navigate to localhost:<PORT>/songs/create-title-index in your web browser. This operation creates an index on the title field of the songs collection, allowing for faster retrieval of songs based on their titles.

    2.Test the Index:

        To verify the performance improvement and functionality of the index, go to localhost:<PORT>/songs/sort-by-title. This page will display all songs sorted by their title, utilizing the newly created index for efficient sorting.

Now, your app is ready to use with full functionality.

### Features

MoodAMP offers various features for its users:

- **User Authentication:** Register as a new user or log in with existing credentials.
- **Song Management:** Add new songs, edit song details, and delete songs from the database.
- **Playlist Creation:** Playlists are auto-generated based on the mood of songs.
- **Music Discovery:** Explore playlists curated for different moods.
- **Dynamic Content:** Experience dynamic content rendering based on user authentication status.

### Sample Data for Quick Login

If you prefer not to create an account, you can use the usernames and passwords provided in the sample data to log in and explore MoodAMP.

### Validation

MoodAMP uses MongoDB JSON Schema validation for `songs` and `users` collections to ensure data integrity.

- **Songs Validation:**
  To ensure that each song has a valid title, artist, duration, mood, and link, the following JSON schema is applied to the `songs` collection:

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": [
      "title",
      "artist",
      "duration",
      "mood",
      "link"
    ],
    "properties": {
      "title": {
        "bsonType": "string",
        "description": "must be a string and is required"
      },
      "artist": {
        "bsonType": "string",
        "description": "must be a string and is required"
      },
      "duration": {
        "bsonType": "int",
        "minimum": 0,
        "description": "must be an integer greater than or equal to 0 and is required"
      },
      "mood": {
        "bsonType": "string",
        "enum": [
          "Happy",
          "Sad",
          "Energetic",
          "Chill",
          "Romantic",
          "Melancholic",
          "Motivational",
          "Relaxed",
          "Angry",
          "Hopeful",
          "Nostalgic",
          "Peaceful",
          "Excited",
          "Dreamy",
          "Reflective"
        ],
        "description": "can only be one of the enum values and is required"
      },
      "link": {
        "bsonType": "string",
        "description": "must be a string and is required"
      }
    }
  }
}
```

- **Users Validation:**
  To ensure that each user has a valid username and password, the following JSON schema is applied to the `users` collection:

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": [
      "username",
      "password"
    ],
    "properties": {
      "username": {
        "bsonType": "string",
        "description": "must be a string and is required"
      },
     

 "password": {
        "bsonType": "string",
        "description": "must be a string and is required"
      }
    }
  }
}
```

- **Validation Test:**
  To test the validation rules, navigate to `/songs/validationtest` in your browser. This route attempts to add an invalid song to the database and returns the validation error.

### Conclusion

MoodAMP is a comprehensive music platform offering a rich set of features for music lovers. Follow the setup instructions to start exploring music tailored to every mood. Enjoy creating, managing, and discovering music with MoodAMP.