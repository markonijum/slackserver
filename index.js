import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';
import models from './models';

const server = new ApolloServer({ typeDefs, resolvers, context: { models, user: { id: 1 } } });

const app = express();
server.applyMiddleware({ app });

models.sequelize.sync().then(function() {

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );

  });

