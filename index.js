import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

import * as Auth from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {
  doc,
  setDoc,
  getFirestore,
  getDocs,
  collection,
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
const db = getFirestore();

const getEvents = async () => {
  const data = [];
  const snapshot = await getDocs(collection(db, "events"));
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

const init = async () => {
  const data = await getEvents();
  let eventsHtml = "";
  data.forEach((event) => (eventsHtml += getEventHTML(event)));
  const eventsContainer = document.getElementById("events-movies");
  eventsContainer.innerHTML = eventsHtml;
};

const getEventHTML = (event) => {
  return `<div class="col-3 card-container">
            <div class="card">
                <img
                    class="card-image img-fluid"
                    src="${event.image}"
                    alt=""
                />
                <div class="card-body">
                <h2>${event.title}</h2>
                <p>${event.description}</p>
                <p>
                    <button class="btn btn-primary">BUY</button>
                </p>
                </div>
            </div>
        </div>`;
};

init();
