const token = JSON.parse(localStorage.getItem("token"));

if (token === undefined || token === null) {
  alert("Please Login First To Donate !");
  window.location.replace("../signin/index.html");
}
