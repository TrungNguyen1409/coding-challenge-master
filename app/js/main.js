const btn = document.getElementById('btn');

btn.addEventListener('click', function onClick(event) {
  document.body.style.color = 'darkgreen';
   event.target.style.color = 'salmon';

 /*  const getData = () => {
    return fetch('http://localhost:3000')
    .then(res => res.json())
    .then(data => console.log(data));
  } */
});



// api url
const api_url = 
      "http://localhost:3000";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
          <th>Name</th>
          <th>City</th>
          <th>Language</th>
          <th>Phone</th>
          <th>Gender<th>
          <th>Info<th>
          <th>CarBrand<th>
          <th>Driven(km)<th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.list) {
        tab += `<tr> 
    <td>${r.driverName} </td>
    <td>${r.driverCityOrigin}</td>
    <td>${r.driverLanguage}</td> 
    <td>${r.driverPhone}</td>
    <td>${r.driverGender}</td> 
    <td>${r.driverInfo}</td> 
    <td>${r.carMake}</td> 
    <td>${r.kmDriven}</td> 

</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("driver").innerHTML = tab;
}