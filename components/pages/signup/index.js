const email = document.getElementById("email");
const pass = document.getElementById("password");
const uname = document.getElementById("name");
const blood_group = document.getElementById("blood_selector");
const rh_selector = document.getElementById("rh-selector");
const submit_form = document.getElementById("submit");
const final_div = document.getElementById("final_reference_div");
const adddress = document.getElementById("address");
const ppic = document.getElementById("images");
const redirect = JSON.parse(localStorage.getItem("redi"));

if (redirect) {
  window.location.replace("../signin/index.html");
  localStorage.removeItem("redi");
}

function isEmail(eemail) {
  for (var i = 0; i < eemail.length; i++)
    if (eemail.charAt(i) === "@") return true;
  return false;
}

let url11 = "";
ppic.addEventListener("change", () => {
  const fr = new FileReader();
  fr.readAsDataURL(ppic.files[0]);
  fr.addEventListener("load", () => {
    url11 = fr.result;
  });
});

submit.addEventListener("click", () => {
  // console.log(ppic.value);
  // console.log(url11);
  const user_data = {
    name: uname.value,
    email: email.value,
    password: pass.value,
    blood: blood_group.value,
    rh: rh_selector.value,
    address: adddress.value,
    image_url:
      ppic.value.length === 0
        ? "../../../../assets/images/demo_profile_pic.png"
        : url11,
  };

  if (
    !isEmail(email.value) ||
    pass.value.length < 6 ||
    uname.length === 0 ||
    adddress.value.length === 0
  ) {
    alert(
      "! Reminder\n --> All Fields are mandatory\n--> Email should be valid\n--> Password length should not be less than 6"
    );
  } else {
    fetch("http://localhost:8080/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((el) => el.email === email.value);
        if (item === undefined) {
          fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user_data),
          })
            .then((res) => res.json())
            .then(() => {
              alert("Registration SuccessFull! Please Proceed to Login");
              localStorage.setItem("redi", 123456);
            });
        } else {
          alert(
            "User Already Exist!\nPlease Login or \nCreate account with another email !"
          );
        }
      });
  }
});

const red = JSON.stringify(Date.now());
document.getElementById("donate").addEventListener("click", () => {
  localStorage.setItem("redirect", red);
});
