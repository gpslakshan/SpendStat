import pkg from "passport-jwt";
import User from "../models/user.js";
import "dotenv/config";

const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const user = await User.findById(jwt_payload._id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};
