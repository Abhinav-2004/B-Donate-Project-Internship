const red = JSON.stringify(Date.now());

document.getElementById("donate").addEventListener("click", () => {
  localStorage.setItem("redirect", red);
});
