function tellGender() {
  if (document.getElementById("male").checked) return "Male";
  else if (document.getElementById("female").checked) return "Female";
  else return "no_input";
}

function isDonated() {
  if (document.getElementById("yes").checked) return "Yes";
  else if (document.getElementById("no").checked) return "No";
  else return "no_input";
}

function isDisease() {
  if (document.getElementById("yes1").checked) return "Yes";
  else if (document.getElementById("no1").checked) return "No";
  else return "no_input";
}

function isEmail(eemail) {
  for (var i = 0; i < eemail.length; i++)
    if (eemail.charAt(i) === "@") return true;
  return false;
}

function isPhoneNumber(number) {
  if (number.length !== 10) return false;
  for (var i = 0; i < number.length; i++)
    if (
      number.toString().charAt(i) === "+" ||
      number.toString().charAt(i) === "-" ||
      number.toString().charAt(i) === "."
    )
      return false;
  return true;
}

const name1 = document.getElementById("name");
const dob = document.getElementById("DOB");
const blood = document.getElementById("bloodtype");
const email = document.getElementById("email");
const ph_no = document.getElementById("phone");
const address1 = document.getElementById("address1");
const address2 = document.getElementById("address2");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");

const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  const gender = tellGender();
  const donated = isDonated();
  const disease = isDisease();

  const data = {
    name: name1.value,
    dob: dob.value,
    bloodtype: blood.value,
    email: email.value,
    phone: ph_no.value,
    address: {
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      state: state.value,
      country: country.value,
    },
    gender: gender,
    donated: donated,
    disease: disease,
    userId: JSON.parse(localStorage.getItem("id")),
  };

  if (
    name1.value.length === 0 ||
    dob.value.length === 0 ||
    blood.value.length === 0 ||
    email.value.length === 0 ||
    ph_no.value.length === 0 ||
    address1.value.length === 0 ||
    address2.value.length === 0 ||
    city.value.length === 0 ||
    state.value.length === 0 ||
    country.value.length === 0 ||
    gender === "no_input" ||
    donated === "no_input" ||
    disease === "no_input"
  ) {
    alert("All Fields are Mandatory and needs to be Filled accurately !");
    e.preventDefault();
  } else {
    if (!isEmail(email.value) && isPhoneNumber(ph_no.value)) {
      alert("Please Enter a Valid Email !");
      e.preventDefault();
    } else if (!isPhoneNumber(ph_no.value) && isEmail(email.value)) {
      alert("Please Enter a valid 10 Digit Phone Number !");
      e.preventDefault();
    } else if (!isPhoneNumber(ph_no.value) && !isEmail(email.value)) {
      alert("Please Enter a valid Email and a valid 10 Digit Phone Number !");
      e.preventDefault();
    } else {
      fetch("http://localhost:8080/donation_form", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      alert("Donation Form Successfully Submitted !");
    }
  }
});
