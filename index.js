localStorage.removeItem("token");
localStorage.removeItem("id");
localStorage.removeItem("redirect");

const red = JSON.stringify(Date.now());
document.getElementById("donate").addEventListener("click", () => {
  localStorage.setItem("redirect", red);
});

document.getElementById("donate-1").addEventListener("click", () => {
  localStorage.setItem("redirect", red);
});

document.getElementById("donate-2").addEventListener("click", () => {
  localStorage.setItem("redirect", red);
});
