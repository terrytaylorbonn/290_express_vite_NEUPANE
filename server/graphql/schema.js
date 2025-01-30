//server/graphql/schema.js
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const MyModel = require('../model');

// Define the MyModelType
const MyModelType = new GraphQLObjectType({
    name: 'MyModel',
    fields: {
        field1: { type: GraphQLString },
        field2: { type: GraphQLInt },
        field3: { type: new GraphQLList(GraphQLString) }
    }
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllDocuments: {
            type: new GraphQLList(MyModelType),
            resolve(parent, args) {
                return MyModel.find();
            }
        }
    }
});

// Define the Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createDocument: {
            type: MyModelType,
            args: {
                field1: { type: GraphQLString },
                field2: { type: GraphQLInt },
                field3: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parent, args) {
                const newDocument = new MyModel({
                    field1: args.field1,
                    field2: args.field2,
                    field3: args.field3
                });
                return newDocument.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});