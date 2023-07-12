import pkg from "passport-jwt";
import User from "../models/user.js";

const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      const user = User.findById(jwt_payload._id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};
