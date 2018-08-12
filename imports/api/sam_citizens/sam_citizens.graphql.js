export default `\
type SamCitizen {
  _id: String!
  one_of: Int
  member: String
  age: Int
  race: String
  coords: [Float]
  limit: Int
}

type Factor {
  factorName: [String]
}

type Query {
  samcity(limit:Int,one_of:Int,member:String,race:String,dist:Float,coords:[Float]):[SamCitizen],
  factorlist(category:String):[Factor]
}

type Mutation {
  createSamCitizen(name: String!): SamCitizen
}
`;

/*
{
    person (
        filter: {
            age: { GT: 18 },
            name: {
                firstName: { EQ: "John" }
            }
        },
        sort: { age: DESC },
        pagination: { limit: 50 }
    ) {
        name {
            lastName
        }
        age
    }
}
*/
