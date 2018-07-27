export default `\
type User {
  _id: String
  email: String
}

type Query {
  user: User
}
`;
