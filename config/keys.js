module.exports = {
  mongoURI:
    "mongodb+srv://kumnitinshine29:Qr1X4Kwm7PHivIuo@cluster0.rkwqbc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  dbName: "referral_system",
  secret: "a random text which no one is going to guess...",
  twitter: {
    consumerKey: "YOUR_TWITTER_CONSUMER_KEY",
    consumerSecret: "YOUR_TWITTER_CONSUMER_SECRET",
    callbackURL: "YOUR_TWITTER_CALLBACK_URL",
  },
  google: {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL:
      "https://referral-backend-7osf.onrender.com/auth/google/callback",
  },
  apple: {
    clientID: "YOUR_APPLE_CLIENT_ID",
    teamID: "YOUR_APPLE_TEAM_ID",
    callbackURL: "localhost:5173",
    keyID: "YOUR_APPLE_KEY_ID",
    privateKeyPath: "path/to/your/private/key",
  },
};
