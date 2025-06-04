const lenis = new Lenis({
  lerp: 0.15, // Controls the smoothness (lower is smoother)
  wheelMultiplier: 1, // Adjusts scroll speed
  smooth: true,
  smoothTouch: true, // Enables smooth scrolling on touch devices
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);












const cardsRow = document.querySelector(".cards-row");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((country) => {
      // console.log(Object.values(country.languages[0]));
      // console.log(country.cioc)
      // if (country.borders) {
      //       console.log(country.borders);
      //   }

      let cardDiv = document.createElement("div");
      cardDiv.className = "col-lg-3 col-md-6";
      cardDiv.innerHTML = `
        
    
        <a  href="/country.html?name=${country.name.common}" class="card">
                <div class="img-div">  

              <img
                class="card-image"
                src="${country.flags.svg}"
                alt=""
              />
                </div>
               <div class="card-text px-3 py-4">
                <p class="card-title py-2 ">${country.name.common}</p>
                <p><b> Population:</b> ${country.population.toLocaleString(
                  "en-PK"
                )} </p>
                <p><b> Region: </b>  ${country.region}</p>
                <p><b> Capital:</b>  ${country.capital}</p>
               </div>   
        </a>
      
        `;

      cardsRow?.append(cardDiv);
    });
  });

// Country Side code

function makingEachCountry() {
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get("name");

  if (countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let countryTitle = document.querySelector(".country-title");
        let countryImage = document.querySelector(".country-img");
        let nativeName = document.querySelector(".native-name");
        let countryPopulation = document.querySelector(".country-population");
        let countryRegion = document.querySelector(".country-region");
        let countrySubRegion = document.querySelector(".country-SubRegion");
        let countryCapital = document.querySelector(".country-capital");
        let countryTLD = document.querySelector(".country-tld");
        let countryCurrency = document.querySelector(".country-currency");
        let countryLanguages = document.querySelector(".country-languages");

        // console.log(data[0]);
        // console.log(Object.values(data[0].name?.nativeName)[0].common)

        countryTitle.innerHTML = data[0].name?.common;
        countryImage.src = data[0].flags.svg;

        if (data[0].name.nativeName) {
          nativeName.innerHTML = Object.values(
            data[0].name.nativeName
          )[0].common;
        }

        countryPopulation.innerHTML = data[0].population;
        countryRegion.innerHTML = data[0].region;

        if (data[0].subregion) {
          countrySubRegion.innerHTML = data[0].subregion;
        }

        if (data[0].capital) {
          countryCapital.innerHTML = data[0].capital;
        }
        if (data[0].tld) {
          countryTLD.innerHTML = data[0].tld;
        }
        if (data[0].currencies) {
          countryCurrency.innerHTML = Object.values(data[0].currencies)[0].name;
        }

        if (data[0].languages) {
          countryLanguages.innerHTML = Object.values(data[0].languages).join(
            " , "
          );
        }

        let eachBorderCountry = document.querySelector(
          ".each-border-countries"
        );

        if (data[0].borders) {
          data[0].borders.forEach((each) => {
            fetch(`https://restcountries.com/v3.1/alpha/${each}`)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                let borderAnchor = document.createElement("a");
                borderAnchor.className = "border-country";
                borderAnchor.href = `/country.html?name=${data[0].name?.common}`;

                borderAnchor.innerHTML = data[0].name?.common;
                eachBorderCountry.append(borderAnchor);
              });
          });
        }
      });
  }
}
makingEachCountry();

let borderCountries = document.querySelectorAll(".border-country");

borderCountries.forEach((borderCountry) => {
  borderCountry.addEventListener("click", () => {
    makingEachCountry();
  });
});

// Search  code

let filterBtn = document.querySelector(".search-input");

let cardsContainer = document.querySelector(".cards-row");

filterBtn?.addEventListener("change", () => {
  cardsContainer.innerHTML = " ";

  fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let filteredData = data.filter((each) => {
        return each.name?.common
          .toLowerCase()
          .includes(`${filterBtn.value.toLowerCase()}`);
      });

      filteredData?.forEach((country) => {
        let cardDiv = document.createElement("div");
        cardDiv.className = "col-lg-3 col-md-6";
        cardDiv.innerHTML = `
       

        <a  href="/country.html?name=${country.name.common}" class="card">
                <div class="img-div">  

              <img
                class="card-image"
                src="${country.flags.svg}"
                alt=""
              />
                </div>
               <div class="card-text px-3 py-4">
                <p class="card-title py-2 ">${country.name.common}</p>
                <p><b> Population:</b> ${country.population.toLocaleString(
                  "en-PK"
                )} </p>
                <p><b> Region: </b>  ${country.region}</p>
                <p><b> Capital:</b>  ${country.capital}</p>
               </div>   
        </a>
       
        `;

        cardsRow?.append(cardDiv);
      });
    });
});

// Filter code

let filterOpt = document.querySelector(".filter");

filterOpt?.addEventListener("change", (e) => {
  cardsContainer.innerHTML = " ";
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let filteredData = data.filter((each) => {
        return each.region.includes(`${e.target.value}`);
      });

      filteredData?.forEach((country) => {
        let cardDiv = document.createElement("div");
        cardDiv.className = "col-lg-3 col-md-6";
        cardDiv.innerHTML = `
          

        <a  href="/country.html?name=${country.name.common}" class="card">
                <div class="img-div">  

              <img
                class="card-image"
                src="${country.flags.svg}"
                alt=""
              />
                </div>
               <div class="card-text px-3 py-4">
                <p class="card-title py-2 ">${country.name.common}</p>
                <p><b> Population:</b> ${country.population.toLocaleString(
                  "en-PK"
                )} </p>
                <p><b> Region: </b>  ${country.region}</p>
                <p><b> Capital:</b>  ${country.capital}</p>
               </div>   
        </a>
              
        `;

        cardsRow?.append(cardDiv);
      });
    });
});

// Dark and Light Mode

const darkMode = document.querySelector('.dark-mode');
const backBtn = document.querySelector('.back-btn');


const savedMode = localStorage.getItem('darkMode') || 'light';
if (savedMode === 'dark') enableDarkMode();


darkMode.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode-active')) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

function enableDarkMode() {
  document.body.classList.add('dark-mode-active');
  darkMode.innerHTML = '<i class="fa-regular fa-sun"></i> Light Mode';
  if (backBtn) {
    backBtn.style.color="white"
  }
  localStorage.setItem('darkMode', 'dark');
}

function disableDarkMode() {
  document.body.classList.remove('dark-mode-active');
  darkMode.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode';
  if (backBtn) {
    backBtn.style.color="black"
  }
  localStorage.setItem('darkMode', 'light');
}

// shimmer



// spinner
let spinner =document.querySelector(".spiner");
            window.addEventListener('load', ()=> {
              if (spinner) {   
                spinner.style.display = 'none';
              }
  
});



