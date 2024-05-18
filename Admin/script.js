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
  
  // Save Shayari to Firebase
  function saveShayari() {
    const shayariText = document.getElementById('shayariInput').value;
    if (shayariText.trim() !== "") {
      const newShayariKey = database.ref().child('shayaris').push().key;
      database.ref('shayaris/' + newShayariKey).set({
        text: shayariText
      });
      document.getElementById('shayariInput').value = "";
      loadShayaris();
    }
  }
  
  function checkit(){
    if(document.getElementById("id").value == "raj@developerrvsr"){
      if(document.getElementById("password").value == "ram@rameti123"){
        window.localStorage.setItem("logged", 'true');
        document.getElementById("popup").style.display = "none";
      }else{
        document.getElementById("password").value = "wrong";
        setTimeout(() => {
          document.getElementById("password").value = "";
        }, 500);
      }
    }else{
      document.getElementById("id").value = "wrong";
      setTimeout(() => {
        document.getElementById("id").value = "";
      }, 500);
    }
    return false
  }

  // Load Shayaris from Firebase
  function loadShayaris() {
    if(window.localStorage.getItem("logged")!=='true'){
      document.getElementById("popup").style.display = "block";
    }
    database.ref('shayaris').once('value', (snapshot) => {
      const shayaris = snapshot.val();
      const adminShayariList = document.getElementById('adminShayariList');
      adminShayariList.innerHTML = "";
      for (let key in shayaris) {
        const shayari = shayaris[key];
        const adminShayariItem = document.createElement('div');
        adminShayariItem.className = 'admin-shayari-item';
        const shayariText = document.createElement('div');
        shayariText.className = 'edit-shayari-input';
        shayariText.textContent = shayari.text;
        const editButton = document.createElement('button');
        editButton.classList.add("e");
        editButton.innerHTML = '<i class="fa-light fa-pencil"></i>';
        editButton.onclick = () => openEditModal(key, shayari.text);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add("d");
        deleteButton.innerHTML = '<i class="fa-regular fa-trash"></i>';
        deleteButton.onclick = () => deleteShayari(key);
        adminShayariItem.appendChild(shayariText);
        adminShayariItem.appendChild(editButton);
        adminShayariItem.appendChild(deleteButton);
        adminShayariList.appendChild(adminShayariItem);
      }
    });
  }
  
  // Open Edit Modal
  function openEditModal(key, text) {
    document.getElementById('editShayariInput').value = text;
    document.getElementById('editModal').style.display = 'block';
    document.getElementById('editModal').setAttribute('data-key', key);
  }
  
  // Close Edit Modal
  function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
  }
  
  // Submit Edit Shayari
  function submitEditShayari() {
    const key = document.getElementById('editModal').getAttribute('data-key');
    const newText = document.getElementById('editShayariInput').value;
    if (newText.trim() !== "") {
      database.ref('shayaris/' + key).set({
        text: newText
      });
      closeEditModal();
      loadShayaris();
    }
  }
  
  // Delete Shayari
  function deleteShayari(key) {
    database.ref('shayaris/' + key).remove();
    loadShayaris();
  }
  
  // Load Shayaris when the page loads
  window.onload = loadShayaris;
  