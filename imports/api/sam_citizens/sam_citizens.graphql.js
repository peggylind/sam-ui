export default `\
type SamCitizen {
  _id: String!
  member: String
  age: String
  race: String
  total_income: String
  coords: [Float]
  limit: Int
}

type Query {
  samcity2(limit:Int,member:String,race:String,dist:Float,coords:[Float]):[SamCitizen]
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
