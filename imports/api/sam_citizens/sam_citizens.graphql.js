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

extend type Query {
  samcity: [SamCitizen]
  samcity20k(limit:Int,member:String):[SamCitizen]
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
