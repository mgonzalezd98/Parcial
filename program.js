var map = L.map('map').setView([4.62235840945871, -74.11584574862977], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function loadpolygon(){

    let myData = await fetch('Colon.geojson');
    let mypolygon = await myData.json();

    L.geoJSON(mypolygon,
        {
            style:{
                color:'red'
            }
        }
    ).addTo(map);
}

loadpolygon();

async function loadpoint(){

    let myData1 = await fetch('arboles_Colon.geojson');
    let mypoint = await myData1.json();

    L.geoJSON(mypoint,
        {
            style:{
                color:'blue'
            }
        }
    ).addTo(map);
}

loadpoint();

let btnTrees = document.getElementById('btnTrees');

btnTrees.addEventListener('click', ()=> alert("Hola"));