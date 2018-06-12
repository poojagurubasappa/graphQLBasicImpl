import express from 'express';
import {buildSchema} from 'graphql';
import graphqlHTTP from 'express-graphql';

let app = express();


let schema = buildSchema(`
    type Query {
      name: String,
      city: String,
      hobbies(first: Int): [String]
    }
`);

//Resolver functions for the fields name and city, hobbies.
//Read the arguments to hobbies as args.
let root = { name: () => 'Pooja',
  city: () => 'Bangalore',
  hobbies: (args) => {
    let first = args.first;
    let hobs = ['read', 'sketch', 'paint', 'sing'];
    return first ? hobs.slice(0, first) : hobs;
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, ()=>{
  console.log("App running on PORT 3000");
})
