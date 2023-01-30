const city = document.querySelector(".city-input");
const submitBtn = document.querySelector("#btn");
const cities = document.querySelector(".cities");
const form = document.querySelector(".form");
const message = document.querySelector(".message");

let cityArr = [];

document.addEventListener("submit", (e) => {
  e.preventDefault();

  city.focus();

  // console.log(cityInput);
  getDatas();
  form.reset();
});

const getDatas = async () => {
  let cityInput = city.value;
  const apiKey = "43f3d3471358a0770f15f24ec227b978";
  const url = ` http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric `;

  try {
    const responsive = await fetch(url);
    if (!responsive.ok) {
      throw new Error("There is an error here!!!");
    }
    const data = await responsive.json();
    console.log(data);
    getValues(data);
  } catch (error) {
    if (city.value === "") {
      message.innerText = `Please enter a city name`;
      // message.classList.toggle("message")
      setTimeout(() => {
        message.innerText = "";
      }, 2000);
    } else {
      console.log(error);
    }
  }

  //todo fetch
};

const getValues = (value) => {
  const Country = value.sys.country;
  const mainTemp = Math.round(value.main.temp);
  const cityId = value.id;
  const city = value.name;
  const WeatherDesc = value.weather[0].description;
  const Image = value.weather[0].icon;
  const cities = document.querySelector(".cities");

  if (cityArr.includes(cityId)) {
    message.innerText = `You have checked this city before`;
    // message.classList.toggle("message")
    setTimeout(() => {
      message.innerText = "";
    }, 2000);
  } else {
    // cityArr.push(cityId)  or

    cityArr = [cityId, ...cityArr];

    cities.innerHTML += `
    <li class="card col-lg-6 col-md-4 g-6" style="width: 18rem;">
    <img src="./icons/${Image}.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h2 class="card-title">${city} <sup class="country  text-bg-info">${Country}</sup></h2>
      <h1 class="card-text display-1">${mainTemp} <sup>°C</sup></h1>
      <h4>${WeatherDesc}</h4>
      <a href="https://openweathermap.org/find?q=${city}" class="btn btn-info">More info</a>
    </div>
  </li>
  
  `;
    message.innerText = "";
  }
};
