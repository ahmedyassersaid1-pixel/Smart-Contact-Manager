const modal = new bootstrap.Modal(document.getElementById("addContactModal"));

var myBtn = document.getElementById("sunmitBtn");
var avatarInput = document.getElementById("avatarInput");
var firstNameInput = document.getElementById("firstName");
var phoneInput = document.getElementById("phone");
var mailInput = document.getElementById("mail");
var addressInput = document.getElementById("address");
var relationInput = document.getElementById("relation");
var messageInput = document.getElementById("message");
var content = document.getElementById("content");
var total = document.getElementById("total");
var fav = document.getElementById("fav");
var emergency = document.getElementById("emergency");
var checkFavorite = document.getElementById("checkFavorite");
var checkEmergency = document.getElementById("checkEmergency");

var contacts;
var mood = "normal";
var updateIndex;

if (localStorage.getItem("contacts") === null) {
  contacts = [];
} else {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  displayContact();
  getFavorite();
  getEmergency();
}

function creatContact() {
  if (
    firstNameInput.classList.contains("is-valid") &&
    phoneInput.classList.contains("is-valid") &&
    mailInput.classList.contains("is-valid")
  ) {
    // ///////
    if (mood === "normal") {
      var contactInfo = {
        name: firstNameInput.value,
        phone: phoneInput.value,
        mail: mailInput.value,
        adress: addressInput.value,
        relation: relationInput.value,
        message: messageInput.value,
        favorite: checkFavorite.checked,
        emergency: checkEmergency.checked,
        imageProfile: `./Images/${avatarInput.files[0]?.name || "avatar-4.jpg"}`,
      };

      contacts.push(contactInfo);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      clear();
      // alert
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: " has been added successfully",
        draggable: true,
        timer: 1500,
        showConfirmButton: false,
      });
      modal.hide();

      // display fun
      displayContact();
      getFavorite();
      getEmergency();
    } else {
      contacts[updateIndex].name = firstNameInput.value;
      contacts[updateIndex].phone = phoneInput.value;
      contacts[updateIndex].mail = mailInput.value;
      contacts[updateIndex].adress = addressInput.value;
      contacts[updateIndex].relation = relationInput.value;
      contacts[updateIndex].message = messageInput.value;
      displayContact();
      localStorage.setItem("contacts", JSON.stringify(contacts));
      mood = "normal";
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("addContactModal"),
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: " Contact has been updated successfully.",
        draggable: true,
        timer: 1500,
        showConfirmButton: false,
      });
      modal.hide();
    }
  } else {
    console.log("not valid");
    Swal.fire({
      icon: "error",
      title: "Invalid Data",
      text: "Something went wrong!",
      showConfirmButton: false,
    });
  }
}

function displayContact() {
  if (contacts.length === 0) {
    content.innerHTML = `
      <div class="contact-icon mb-3 rounded-3 d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-address-book fs-2"></i>
      </div>
      <h3>No contacts found</h3>
      <p class="mb-0 mt-1">Click "Add Contact" to get started</p>
    `;

    total.textContent = 0;
    return;
  }
  var cartona = "";
  var starIcon;
  var heartIcon;
  var star = "";
  var heart = "";
  var heartDown = "";

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].favorite == true) {
      starIcon = `<i class="fa-solid fa-star text-warning"></i>`;
      star = `<div class="image-icon position-absolute d-flex justify-content-center align-items-center rounded-circle p-1 bg-warning ">
                        <i class="fa-solid fa-star text-white"></i>
                      </div>`;
    } else {
      starIcon = `<i class="fa-regular fa-star text-gray"></i>`;
      star = "";
    }
    if (contacts[i].emergency == true) {
      heartIcon = `<i class="fa-solid fa-heart-pulse text-danger"></i>`;
      heart = `<div class="heart-icon position-absolute d-flex justify-content-center align-items-center rounded-circle p-1  ">
                        <i class="fa-solid fa-heart-pulse text-white"></i>
                      </div>`;
      heartDown = `<div class="bg-5 heart-down d-flex align-items-center">
                      <i class="fa-solid fa-heart-pulse col-pink"></i>
                      <span class="ms-2">Emergency</span>
                    </div>`;
    } else {
      heartIcon = `<i class="fa-regular fa-heart text-gray"></i>`;
      heart = "";
      heartDown = "";
    }
    cartona += `
    
            <div class="col-12 col-md-6 ">
              <div class="item rounded-4">
                <div class="cont p-3 pb-2 bg-white rounded-top-4">
                  <div class="d-flex align-content-center gap-3">
                    <div  class="imge position-relative">
                      <img
                        class="w-100 rounded-3 "
                        src="${contacts[i].imageProfile}"
                        alt=""
                      />
                      ${star}
                      ${heart}
                    </div>
                    <div class="txt">
                      <h3>${contacts[i].name}</h3>
                      <div class="d-flex align-items-center gap-2">
                        <div
                          class="icon bg-1 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-phone text-blue"></i>
                        </div>
                        <p class="mb-0">${contacts[i].phone}</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="one d-flex align-items-center gap-2 mb-3">
                      <div
                        class="icon-two bg-2 d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-envelope text-pur"></i>
                      </div>
                      <p class="mb-0">${contacts[i].mail}</p>
                    </div>
                    <div class="two d-flex align-items-center gap-2 mb-3">
                      <div
                        class="icon-two bg-3 d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-location-dot text-green"></i>
                      </div>
                      <p class="mb-0">${contacts[i].adress}</p>
                    </div>
                    <div  class="d-flex gap-2">
                    <span class="three bg-4 ">
                      <span class="icon-three"> ${contacts[i].relation} </span>
                    </span>
                    ${heartDown}
                    </div>
                  </div>
                </div>
                <div
                  class="foot border-top rounded-bottom-4 d-flex align-items-center justify-content-between"
                >
                  <div class="left d-flex align-items-center gap-2">
                    <div
                      class="foot-icon foot-icon-1 d-flex justify-content-center align-items-center"
                    >
                      <a href="tel:${contacts[i].phone}"><i class="fa-solid fa-phone text-green"></i></a>
                    </div>
                    <div
                      class="foot-icon foot-icon-2 d-flex justify-content-center align-items-center"
                    >
                    <a href="mailto:${contacts[i].mail}"><i class="fa-solid fa-envelope text-pur"></i></a>
                      
                    </div>
                  </div>
                  <div class="right d-flex align-items-center gap-2">
                    <div
                      class="foot-icon foot-icon-3 d-flex justify-content-center align-items-center"
                    >
                    <button id="star" onclick="setFavorite(${i})" class="border-0 trans-bg"> ${starIcon}</button>
                    </div>
                    <div
                      class="foot-icon foot-icon-33 d-flex justify-content-center align-items-center"
                    >
                      <button onclick="setEmergency(${i})" class="border-0 trans-bg">${heartIcon}</button>
                    </div>
                    <div
                      class="foot-icon foot-icon-4 d-flex justify-content-center align-items-center"
                    >
                    <button class="border-0 trans-bg" onclick="setUpdate(${i})">
                      <i class="fa-solid fa-pen text-gray"></i>
                      </button>
                      </div>
                    <div
                      class="foot-icon foot-icon-5 d-flex justify-content-center align-items-center"
                    >
                      <button class="border-0 trans-bg" onclick="deleteContact(${i})">
                      <i class="fa-solid fa-trash text-gray"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
    `;
  }
  content.innerHTML = cartona;
  total.textContent = contacts.length;
}
function deleteContact(index) {
  // alert

  Swal.fire({
    title: "Are you sure?",
    text: `Are you sure you want to delete ${contacts[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C62222",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // delete contact
      contacts.splice(index, 1);
      displayContact();
      getFavorite();
      getEmergency();
      localStorage.setItem("contacts", JSON.stringify(contacts));

      Swal.fire({
        title: "Delete Contact!",
        text: "Are you sure you want to delete ahmed? This action cannot be undone.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}
function searchContact(element) {
  var cartona = "";
  var starIcon;
  var heartIcon;
  var star = "";
  var heart = "";
  var heartDown = "";
  var word = element.value;

  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].name.toLowerCase().includes(word.toLowerCase()) ||
      contacts[i].phone.toLowerCase().includes(word.toLowerCase()) ||
      contacts[i].mail.toLowerCase().includes(word.toLowerCase())
    ) {
      console.log("find");
      if (contacts[i].favorite == true) {
        starIcon = `<i class="fa-solid fa-star text-warning"></i>`;
        star = `<div class="image-icon position-absolute d-flex justify-content-center align-items-center rounded-circle p-1 bg-warning ">
                        <i class="fa-solid fa-star text-white"></i>
                      </div>`;
      } else {
        starIcon = `<i class="fa-regular fa-star text-gray"></i>`;
        star = "";
      }
      if (contacts[i].emergency == true) {
        heartIcon = `<i class="fa-solid fa-heart-pulse text-danger"></i>`;
        heart = `<div class="heart-icon position-absolute d-flex justify-content-center align-items-center rounded-circle p-1  ">
                        <i class="fa-solid fa-heart-pulse text-white"></i>
                      </div>`;
        heartDown = `<div class="bg-5 heart-down d-flex align-items-center">
                      <i class="fa-solid fa-heart-pulse col-pink"></i>
                      <span class="ms-2">Emergency</span>
                    </div>`;
      } else {
        heartIcon = `<i class="fa-regular fa-heart text-gray"></i>`;
        heart = "";
        heartDown = "";
      }
      cartona += `
    
            <div class="col-12 col-md-6">
              <div class="">
                <div class="cont p-3 pb-2 bg-white rounded-top-3">
                  <div class="d-flex align-content-center gap-3">
                    <div  class="imge position-relative">
                      <img
                        class="w-100 rounded-3 "
                        src="${contacts[i].imageProfile}"
                        alt=""
                      />
                      ${star}
                      ${heart}
                    </div>
                    <div class="txt">
                      <h3>${contacts[i].name}</h3>
                      <div class="d-flex align-items-center gap-2">
                        <div
                          class="icon bg-1 d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-phone text-blue"></i>
                        </div>
                        <p class="mb-0">${contacts[i].phone}</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="one d-flex align-items-center gap-2 mb-3">
                      <div
                        class="icon-two bg-2 d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-envelope text-pur"></i>
                      </div>
                      <p class="mb-0">${contacts[i].mail}</p>
                    </div>
                    <div class="two d-flex align-items-center gap-2 mb-3">
                      <div
                        class="icon-two bg-3 d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-location-dot text-green"></i>
                      </div>
                      <p class="mb-0">${contacts[i].adress}</p>
                    </div>
                    <div  class="d-flex gap-2">
                    <span class="three bg-4 ">
                      <span class="icon-three"> ${contacts[i].relation} </span>
                    </span>
                    ${heartDown}
                    </div>
                  </div>
                </div>
                <div
                  class="foot border-top rounded-bottom-3 d-flex align-items-center justify-content-between"
                >
                  <div class="left d-flex align-items-center gap-2">
                    <div
                      class="foot-icon foot-icon-1 d-flex justify-content-center align-items-center"
                    >
                      <a href="tel:${contacts[i].phone}"><i class="fa-solid fa-phone text-green"></i></a>
                    </div>
                    <div
                      class="foot-icon foot-icon-2 d-flex justify-content-center align-items-center"
                    >
                    <a href="mailto:${contacts[i].mail}"><i class="fa-solid fa-envelope text-pur"></i></a>
                      
                    </div>
                  </div>
                  <div class="right d-flex align-items-center gap-2">
                    <div
                      class="foot-icon foot-icon-3 d-flex justify-content-center align-items-center"
                    >
                    <button id="star" onclick="setFavorite(${i})" class="border-0 trans-bg"> ${starIcon}</button>
                    </div>
                    <div
                      class="foot-icon foot-icon-33 d-flex justify-content-center align-items-center"
                    >
                      <button onclick="setEmergency(${i})" class="border-0 trans-bg">${heartIcon}</button>
                    </div>
                    <div
                      class="foot-icon foot-icon-4 d-flex justify-content-center align-items-center"
                    >
                    <button class="border-0 trans-bg" onclick="setUpdate(${i})">
                      <i class="fa-solid fa-pen text-gray"></i>
                      </button>
                      </div>
                    <div
                      class="foot-icon foot-icon-5 d-flex justify-content-center align-items-center"
                    >
                      <button class="border-0 trans-bg" onclick="deleteContact(${i})">
                      <i class="fa-solid fa-trash text-gray"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
    `;
    }
  }
  if (cartona === "") {
    cartona = `
    <div class="col-12 text-center">
      <div class="contact-icon mb-3 rounded-3 d-flex justify-content-center align-items-center mx-auto">
        <i class="fa-solid fa-address-book fs-2"></i>
      </div>

      <h3>No contacts found</h3>
      <p class="mb-0 mt-1">Click "Add Contact" to get started</p>
    </div>
  `;
  }
  content.innerHTML = cartona;
  total.textContent = contacts.length;
}
function clear() {
  firstNameInput.value = null;
  phoneInput.value = null;
  mailInput.value = null;
  addressInput.value = null;
  relationInput.value = null;
  messageInput.value = null;
}
function setUpdate(index) {
  mood = "update";
  updateIndex = index;
  firstNameInput.value = contacts[index].name;
  phoneInput.value = contacts[index].phone;
  mailInput.value = contacts[index].mail;
  addressInput.value = contacts[index].adress;
  relationInput.value = contacts[index].relation;
  messageInput.value = contacts[index].message;

  modal.show();
}

function setFavorite(index) {
  if (contacts[index].favorite == false) {
    contacts[index].favorite = true;
  } else {
    contacts[index].favorite = false;
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
  getFavorite();
  displayContact();
}

function getFavorite() {
  var cartone = "";
  var favorite = document.getElementById("favorites");
  var favorit = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].favorite == true) {
      cartone += `
    <div class="fav-gen rounded-3 mb-3">
      <div class="row align-items-center">
        <div class="col-3">
          <div class="image rounded-3">
            <img class="w-100 rounded-3" src="${contacts[i].imageProfile}" alt="" />
          </div>
        </div>
        <div class="col-6">
          <div class="txt">
            <div class="">
              <h3 class="mb-0">${contacts[i].name}</h3>
              <p class="mb-0">${contacts[i].phone}</p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="tel d-flex justify-content-center align-items-center rounded-3">
            <a href="tel:01095317149">
              <i class="fa-solid fa-phone"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    `;
      favorit++;
    }
    if (cartone == "") {
      fav.innerHTML = `
        <p class="text-center rounded-bottom-4">No favorites yet</p>
  `;
    } else {
      fav.innerHTML = cartone;
    }
  }
  favorite.textContent = favorit;
}

function setEmergency(index) {
  if (contacts[index].emergency == false) {
    contacts[index].emergency = true;
  } else {
    contacts[index].emergency = false;
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContact();
  getEmergency();
}
function getEmergency() {
  var cartone = "";
  var emergencyCount = document.getElementById("emergencyCount");
  var emerg = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].emergency == true) {
      cartone += `
    <div class="fav-gen rounded-3 mb-3">
      <div class="row align-items-center">
        <div class="col-3">
          <div class="image rounded-3">
            <img class="w-100 rounded-3" src="${contacts[i].imageProfile}" alt="" />
          </div>
        </div>
        <div class="col-6">
          <div class="txt">
            <div class="">
              <h3 class="mb-0">${contacts[i].name}</h3>
              <p class="mb-0">${contacts[i].phone}</p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="tel d-flex justify-content-center align-items-center rounded-3">
            <a href="tel:01095317149">
              <i class="fa-solid fa-phone"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    `;
      emerg++;
    }
    if (cartone == "") {
      emergency.innerHTML = `
<p class="text-center rounded-bottom-4">
    No emergency contacts
</p>
  `;
    } else {
      emergency.innerHTML = cartone;
    }
  }
  emergencyCount.textContent = emerg;
}
var regex = {
  firstName: /^[A-Za-z\s]{2,50}$/,
  phone: /^01[0125][0-9]{8}$/,
  mail: /^[^\s@]+@(gmail|yahoo|hotmail)\.(com|net)$/,
};
function validateInputs(element) {
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
