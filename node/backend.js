var admin = require("firebase-admin");

var serviceAccount = require("./movie-project-4a105-firebase-adminsdk-xpvyt-cf14597975.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://movie-project-4a105-default-rtdb.europe-west1.firebasedatabase.app",
});
