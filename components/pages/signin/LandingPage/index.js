// api endpoint

const token = JSON.parse(localStorage.getItem("token"));
const url = "http://localhost:8080/users";
const id = JSON.parse(localStorage.getItem("id"));

//Extracting data from Api
const getDetails = async () => {
  console.log(id);
  const response = await fetch(url);
  const posts = await response.json();
  console.log(posts);
  return posts;
};
//Working with data
async function showDetails() {
  const posts = await getDetails();
  console.log(posts);
  if (posts) {
    //posts.forEach(element => {
    //console.log(posts[0].id);
    //const html=`${element.id}<br/>`;
    //document.querySelector('#details');//insertAdjacentHTML("beforeend",html)
    const table = `<table class="table">
            <thead>
            <tr>
              <td>Name</td>
              <td>Blood Group</td>
              <td>Email</td>
              <td>More Details</td>
            </tr>
            <thead>
            <tbody>
            ${posts
              .map(
                (posts) =>
                  `<tr>
                    <td class="name">${posts.name}</td>
                    <td class="blood">${posts.blood.concat(
                      " ",
                      posts.rh == "pos" ? "+" : "-"
                    )}</td>
                    <td class="contact">${posts.email}</td>
                    <td class = "more-details" id="details-more"><button class=${
                      posts.id !== id ? "disabled" : "enabled"
                    }><a href = "./ProfilePage/index.html"> 
                    More Details</a></button></td>
                </tr>`
              )
              .join("\n")}
                </tbody>
                </table>`;
    document.querySelector("#table").innerHTML = table;
  }
}

const home = document.getElementById("home");
const articles = document.getElementById("articles");
const portfolio = document.getElementById("portfolio");
const about = document.getElementById("about");
const contact = document.getElementById("contact");
const signout = document.getElementById("signout");

home.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
});

articles.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
});

portfolio.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
});

about.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
});

contact.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
});

signout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
});

if (token) showDetails();
else {
  alert("Please Login first to Move on !");
  window.location.href = "../index.html";
}
