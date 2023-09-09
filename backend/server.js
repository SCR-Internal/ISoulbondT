const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/config');
let cookieSession = require('cookie-session');
const passport = require('passport');
const port = process.env.PORT || 5000;
const genNFTRoute = require('./routes/genNFTRoute');
const faucetRoute = require('./routes/faucetRoute');
const socialRoute = require('./routes/socialRoute');
require('./models/User');
require('./services/passport');

// connect with mongo db
mongoose.connect(
  keys.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Cross-port' },
  () => {
    console.log('connnected to mongo DB');
  },
);

app.use(
  cookieSession({
    maxAge: 30 * 86400 * 1000,
    keys: [keys.KEY_SESSION],
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app);
app.use('/nft', genNFTRoute);
app.use('/faucet', faucetRoute);
app.use('/social', socialRoute);
app.listen(port, () => {
  console.log(`Node server started in port ${port}`);
});
