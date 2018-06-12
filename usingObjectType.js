import express from 'express';
import graphqlHTTP from 'express-graphql';
import {GraphQLObjectType, GraphQLString, GraphQLSchema} from 'graphql';


//User type

let userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    name: { type: GraphQLString},
    city: { type: GraphQLString}
  }
});

//A fake datastore for users
let userData = {
  'Pooja': {
    name: 'Pooja',
    city: 'Bangalore'
  },
  'Anna': {
    name: 'Anna',
    city: 'Chennai'
  }
}

//Query type
let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        name: { type: GraphQLString }
      },
      resolve: ( _ , {name} ) => { //args.name or es6 destructuring gives {name}
        return name ? userData[name] : userData;
      }
    }
  }
});

//Schema
let schema = new GraphQLSchema({query: queryType});


let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(4000, () => {
  console.log("App running on PORT 4000");
});
