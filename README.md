# MajorProject 

This is the repository for `MajorProject`, a web application project that utilizes various modern web technologies and services. Live [Link](https://clone-airbnb-vxyg.onrender.com)

## Table of Contents

-   [Description](#description)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Configuration](#configuration)
-   [Scripts](#scripts)
 

## Description

This project is a web application built using Node.js and Express, featuring user authentication, file storage, and geolocation services. It integrates several third-party libraries and services to enhance functionality.

## Technologies Used

-   **Node.js**: JavaScript runtime environment.
-   **Express**: Web framework for Node.js.
-   **EJS**: Embedded JavaScript templating.
-   **MongoDB**: NoSQL database for data storage.
-   **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
-   **Passport**: Authentication middleware for Node.js.
-   **Connect-Flash**: Flash message middleware for Express.
-   **Connect-Mongo**: MongoDB session store for Express.
-   **Cookie-Parser**: Middleware to parse cookies.
-   **Dotenv**: Module to load environment variables from a `.env` file.
-   **Multer**: Middleware for handling `multipart/form-data`.
-   **Cloudinary**: Cloud service for image and video storage.
-   **Mapbox SDK**: Geolocation services.
-   **Joi**: Data validation library.
-   **Method-Override**: Middleware to use HTTP verbs such as PUT or DELETE.
-   **Path**: Utility module for working with file and directory paths.

## Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/yourusername/majorproject.git
    cd majorproject
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

## Usage

1. **Start the application**:

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Configuration

1. **Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:

    ```env
    MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    DATABASE_URL=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    ```

2. **Node Version**:
   Ensure you are using Node.js version specified in the `engines` field of `package.json`:
    ```json
    "engines": {
        "node": "22.1.0"
    }
    ```

## Scripts

-   **Start the application**:

    ```sh
    npm start
    ```

-   **Test**:
    ```sh
    npm test
    ```

 
