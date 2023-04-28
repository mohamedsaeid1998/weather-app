/***************GLOBAL***************/
let Doc = document,
  body = Doc.body,
  content = Doc.getElementById("content"),
  searching = Doc.getElementById("searching"),
  displayData = Doc.getElementById("displayData"),
  todayDate = new Date(),
  tomorrowDate = new Date(),
  afterTomDate = new Date(),
  array = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"];

tomorrowDate.setDate(28)
afterTomDate.setDate(29)

/***************EVENTS***************/
searching.addEventListener("input", function () {
  getNews(searching.value)
})

setInterval(() => {
  let randomNumber = Math.floor(Math.random() * array.length);
  body.style.backgroundImage=`url("../img/${array[randomNumber]}")`
}, 5000);
/**************FUNCTIONS****************/
async function getNews(place) {
  let myData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${place}&days=3`)
  let finalData = await myData.json()

  function display() {
    let data = `<div class="col-md-4">
    <div class="card first">
      <div class=" py-2 px-1 fHead fw-bold px-2 d-flex justify-content-between align-items-center">
        <span>${todayDate.toString().split(" ")[0]}</span>
        <span> ${todayDate.getDate()} ${todayDate.toString().split(" ")[1]}</span>
      </div>
      <div class="content px-2 text-center fBottom">
        <h5 class="my-4"> ${finalData.location.country}: ${finalData.location.name} (NOW)</h5>
        <div class="d-flex justify-content-around justify-align-content-lg-between align-items-center ">
          <p class="display-2 fw-bold">${finalData.current.temp_c}<sup>o</sup>C</p>
          <img class="me-3" src="${finalData.current.condition.icon}">
        </div>
        <p class="mt-2 text-primary ">${finalData.current.condition.text}</p>
        <ul class="list-unstyled d-flex justify-content-center align-items-center">
          <li><i class="fa-solid fa-droplet"></i> ${finalData.current.humidity}%</li>
          <li class="mx-4"><i class="fa-solid fa-wind"></i> ${finalData.current.wind_kph} Km/h</li>
          <li><i class="fa-regular fa-compass"></i> ${finalData.current.wind_dir}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-4">
  <div class="card border ">
    <div class=" py-2 px-1 fw-bold sHead d-flex justify-content-center align-items-center">
      <span>Fri</span>
    </div>
    <div class="content px-2 sBottom text-center">
      <img class="mt-5 mb-2 " src="${finalData.forecast.forecastday[1].day.condition.icon}">
      <p class="h3 fw-bold">${finalData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
      <p class="mt-1">${finalData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
      <p class="mt-3 mb-5 text-primary">${finalData.forecast.forecastday[1].day.condition.text}</p>
    </div>
  </div>
</div>
<div class="col-md-4">
<div class="card border-none ">
  <div class=" py-2 px-1 fw-bold tHead d-flex justify-content-center align-items-center">
    <span>Sat</span>
  </div>
  <div class="content px-2 tBottom text-center">
    <img class="mt-5 mb-2 " src="${finalData.forecast.forecastday[2].day.condition.icon}">
    <p class="h3 fw-bold">${finalData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
    <p class="mt-1">${finalData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
    <p class="mt-3 mb-5 text-primary">${finalData.forecast.forecastday[2].day.condition.text}</p>
  </div>
</div>
</div>
    `
    content.innerHTML = data;
  }
  display()
}

getNews("cairo")

  // ***************** BY BUTTON (CLICK) ********************

// displayData.addEventListener("click",function(){  
//   getNews(searching.value)
// })