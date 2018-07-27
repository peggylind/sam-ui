export default {
  Query: {
    async user(obj, args, { user }) {
      return await user || {};
    }
  },
  User: {
    email: user => user.emails[0].address
  }
};
