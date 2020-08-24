## Getting Started

This server is using the [Apollo Server Lambda](https://www.apollographql.com/docs/apollo-server/v1/servers/lambda/) framework. Before you can run the server you need a `.env` file. This will contain the uri of your MongoDB server. An example of the contents of the `.env` file is:

```
MONGO_DB_URI=mongodb://localhost:27017/codenames
```

Additionally you'll need to setup Serverless and the AWS CLI as described below.

## Serverless
For our server we use [Serverless](https://www.serverless.com/) to deploy to AWS. You should create an account with Serverless and follow their [setup instructions](https://www.serverless.com/framework/docs/getting-started/). For local development we use the [Serverless Offline](https://github.com/dherault/serverless-offline) plugin.

## AWS
Our server is also leveraging AWS Lambdas. Before you can deploy you need to do the following:
- Setup an AWS account
- [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
- [Configure the AWS CLI with user credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

After that's setup you can run the following:

### `npm start`

This will run the Serverless Offline plugin that will launch the GraphQL server on port 4000.