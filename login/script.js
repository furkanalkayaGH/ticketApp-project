// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
// Add Firebase products that you want to use
import * as Auth from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {
  doc,
  setDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3vdChW4WeM0YVLPzizeEO1LtWVmYjhns",
  authDomain: "movie-project-4a105.firebaseapp.com",
  databaseURL:
    "https://movie-project-4a105-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "movie-project-4a105",
  storageBucket: "movie-project-4a105.appspot.com",
  messagingSenderId: "77496325431",
  appId: "1:77496325431:web:1ce411315c1a5d470c76b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = Auth.getAuth(app);
const db = getFirestore();

const navigateHome = () => (window.location = "../index.html");

const checkLogin = () => {
  // const user = auth.currentUser;
  const user = localStorage.getItem("user");
  console.log(user);
  if (user) {
    navigateHome();
  } else {
    // No user is signed in.
  }
};

checkLogin();

$(".form")
  .find("input, textarea")
  .on("keyup blur focus", function (e) {
    var $this = $(this),
      label = $this.prev("label");

    if (e.type === "keyup") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.addClass("active highlight");
      }
    } else if (e.type === "blur") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.removeClass("highlight");
      }
    } else if (e.type === "focus") {
      if ($this.val() === "") {
        label.removeClass("highlight");
      } else if ($this.val() !== "") {
        label.addClass("highlight");
      }
    }
  });

$(".tab a").on("click", function (e) {
  e.preventDefault();

  $(this).parent().addClass("active");
  $(this).parent().siblings().removeClass("active");

  const target = $(this).attr("href");

  $(".tab-content > div").not(target).hide();

  $(target).fadeIn(600);
});

$("#signup-submit").on("click", function (e) {
  signUp();
});

$("#login-submit").on("click", function (e) {
  login();
});

const signUp = async () => {
  const firstName = $("#signup-firstname").val();
  const lastName = $("#signup-firstname").val();
  const email = $("#signup-email").val();
  const password = $("#signup-password").val();

  const data = await Auth.createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", data.user.uid), {
    firstName,
    lastName,
    email,
    uid: data.user.uid,
  });

  localStorage.setItem("user", JSON.stringify(data.user));
  navigateHome();
};

const login = async () => {
  const email = $("#login-email").val();
  const password = $("#login-password").val();
  const data = await Auth.signInWithEmailAndPassword(auth, email, password);
  localStorage.setItem("user", JSON.stringify(data.user));
  navigateHome();
};
