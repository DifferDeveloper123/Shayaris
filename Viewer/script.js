// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn584F7hYUNmhvm_0w3mejvM5QE42cGgM",
  authDomain: "shayaris-1008.firebaseapp.com",
  projectId: "shayaris-1008",
  storageBucket: "shayaris-1008.appspot.com",
  messagingSenderId: "254955221579",
  appId: "1:254955221579:web:8ab406aea41445b310d3ce",
  databaseURL: "https://shayaris-1008-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Load Shayaris from Firebase
function loadShayaris() {
  
  database.ref('shayaris').once('value', (snapshot) => {
    const shayaris = snapshot.val();
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.innerHTML = "";
    for (let key in shayaris) {
      const shayari = shayaris[key];
      const carouselItem = document.createElement('div');
      carouselItem.classList.add("card","swiper-slide");
      const content = document.createElement('div');
      content.classList.add("card-content");
      const des = document.createElement('p');
      des.classList.add("description");
      des.textContent = shayari.text;
      des.style.whiteSpace = 'pre-line';
      const butt = document.createElement('button');
      butt.classList.add("button");
      butt.onclick= ()=>{
        window.localStorage.setItem("s001", shayari.text);
        window. open ("/Download", "_self")
      }
      butt.innerHTML = "Download";
      
      content.appendChild(des);
      content.appendChild(butt);
      carouselItem.appendChild(content);
      carouselInner.appendChild(carouselItem);
    }
  });
}

// Load Shayaris when the page loads
window.onload = loadShayaris;
