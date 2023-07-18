const token = JSON.parse(localStorage.getItem("token"));
const url = "http://localhost:8080/users";
const Localid = JSON.parse(localStorage.getItem("id"));
const url2 = "http://localhost:8080/donation_form";

//Extracting data from Api
const getDetails = async () => {
  //console.log(id);
  const response = await fetch(url);
  const posts = await response.json();
  //console.log(posts);
  return posts;
};

const getDonationDetails = async () => {
  console.log(Localid);
  const response = await fetch(url2);
  const posts2 = await response.json();
  const item = posts2.find((el) => el.userId === Localid);
  //console.log(posts2);
  return item;
};

//Working with data
async function showDetails() {
  const posts = await getDetails();
  //console.log(posts);
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].id === Localid) {
      //console.log(posts[i].id);
      const name = posts[i].name;
      const email = posts[i].email;
      const blood = posts[i].blood;
      const rh = posts[i].rh;
      const address = posts[i].address;
      const img = posts[i].image_url;
      const content = `
        <div>
            <div class="upper">
                <div class="profile-image">
                    <img src = ${img} alt="err"/>
                </div>
                <div class="display-name">
                    <span>${name}</span>
                    <div class="middle">
                    <div class="about">
                        <div class="email">
                        <span class="about-query">
                            Email - 
                        </span>
                        <span class="about-result">
                            ${email}
                        </span>
                    </div>

                    <div class="address">
                        <span class="about-query">Address - </span>
                        <span class="about-result">${address}</span>
                    </div>

                </div>
            </div>
                </div>
                <div class="display-blood">
                    <span class="blood-heading">Blood Group</span>    
                    <span class="blood-type">${blood.concat(
                      " ",
                      rh == "pos" ? "+" : "-"
                    )}
                    </span>
                </div>
                </div>
                
                
            

        <div>
      `;
      document.querySelector("#datadiv").innerHTML = content;
    }
  }
}

async function showDonationDetails() {
  const posts2 = await getDonationDetails();
  if (posts2 !== undefined) {
    const name_form = posts2.name;
    const email_form = posts2.email;
    const bloodtype_form = posts2.bloodtype;
    const dob_form = posts2.dob;
    const address1_form = posts2.address.address1;
    const address2_form = posts2.address.address2;
    const city_form = posts2.address.city;
    const state_form = posts2.address.state;
    const country_form = posts2.address.country;
    const gender_form = posts2.gender;
    const donated_before_form = posts2.donated;
    const disease_before_form = posts2.disease;
    console.log(name_form);
    console.log(email_form);

    const content2 = `
        <div class="donationdiv">
          <div class="heading">
              <span class="first">Donation Records</span>
              <span class="second">&nbsp &nbsp(Details of Last form Filled by this account)</span>
          </div>
          <div class="donation-form-display"> 
            <div class="upper">  
              <div class="block">
              <span class="query">Name - </span>
              <span class="result">${name_form} </span>
              </div>
              <div class="block">
              <span class="query">Email - </span>
              <span class="result">${email_form} </span>
              </div>
              <div class="block">
              <span class="query">DOB - </span>
              <span class="result">${dob_form} </span>
              </div>
            </div>

            <div class="middle">  
              <div class="block">
              <span class="query">Address - </span>
              <span class="result">${address1_form}, ${address2_form}</span>
              </div>
              <div class="block">
              <span class="query">City - </span>
              <span class="result">${city_form} </span>
              </div>
              <div class="block">
              <span class="query">State - </span>
              <span class="result">${state_form} </span>
              </div>
              <div class="block">
              <span class="query">Country - </span>
              <span class="result">${country_form} </span>
              </div>
            </div>

            <div class="lower">  
              <div class="block">
              <span class="query">Gender - </span>
              <span class="result">${gender_form} </span>
              </div>
              <div class="block">
              <span class="query">Has donated Blood before - </span>
              <span class="result">${donated_before_form} </span>
              </div>
              <div class="block">
              <span class="query">Has some disease before - </span>
              <span class="result">${disease_before_form} </span>
              </div>
            </div>

          </div>
        </div>
      `;
    document.querySelector("#donationdiv").innerHTML = content2;
  } else {
    const content2 = `
        <div class="donationdiv-not-found">
          <div class="heading">
              <span class="first">No Donation Records Found</span>
              <span class="second">&nbsp &nbsp(You haven't Donated with us)</span>
          </div>
        </div>
      `;
    document.querySelector("#donationdiv").innerHTML = content2;
  }
}

if (token) {
  showDetails();
  showDonationDetails();
} else {
  alert("Please Login first to Move on !");
  window.location.href = "../../index.html";
}
