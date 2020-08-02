## Getting Started

Before you can run the server you need a `.env` file. This will contain the uri of your MongoDB server. An example of the contents of the `.env` file is:

```
MONGO_DB_URI=mongodb://localhost:27017/codenames
```
After that's setup you can run the following:

### `npm start`

This will run a nodemon that will launch the GraphQL server on port 4000.