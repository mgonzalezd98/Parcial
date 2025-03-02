var map = L.map('map').setView([4.62235840945871, -74.11584574862977], 16);

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
                color:'red',
                fillColor: "blue",
                fillOpacity: 0.1,
            }
        }
    ).addTo(map);
}

loadpolygon();

let btnTrees = document.getElementById("btnTrees");

btnTrees.addEventListener('click', 
    async function(){
        let response = await fetch("arboles_Colon.geojson");
        let datos = (await response.json());
        //Agregar la capa al mapa
        L.geoJSON(
            datos,
            {
                pointToLayer: (feature, latlong)=>{

                    return L.circleMarker(latlong, {
                        radius:3,
                        fillColor:'green',
                        weight:1,
                        opacity:1,
                        fillOpacity: 0.8,
                    })

                }
            }
        ).addTo(map);

    }
    
)



let btnDistance = document.getElementById("btnDistance");

btnDistance.addEventListener('click', 
    async function(){
        let response = await fetch("arboles_Colon.geojson");
        let datos = await response.json();
        let trees = datos.features.map((myElement, index)=>({
            id: index+1,
            coordinates: myElement.geometry.coordinates
        }));

        
        let distances=[];
        trees.forEach( (treeA)=>{trees.forEach(

            
                (treeB)=>{
                    if(treeA.id != treeB.id){
                        let distance = turf.distance( 
                            turf.point(treeA.coordinates),
                            turf.point(treeB.coordinates),
                        );
                        distances.push(
                            [
                                `Árbol ${treeA.id}`,
                                `Árbol ${treeB.id}`,
                                distance.toFixed(3)                            
                            ]
                        )
                }
            }
            )
        }
        )
        generatePDF(distances, trees.length);
    }
)

function  generatePDF(distances, totalTrees){
    let { jsPDF } = window.jspdf;
    let documentPDF = new jsPDF();
    documentPDF.text("Reporte de arboles barrio Colon",10,10);    
    
    documentPDF.autoTable(
        {
        head: [['Arbol 1', 'Arbol 2', 'Distance']],
        body: distances
        }
    );
    documentPDF.save("Colon.pdf")

}


let btnSiniestros = document.getElementById("btnSiniestros");

btnSiniestros.addEventListener('click', 
    async function(){
        let response = await fetch("siniestros_barrio_Colon.geojson");
        let datos = (await response.json());
        //Agregar la capa al mapa
        L.geoJSON(
            datos,
            {
                pointToLayer: (feature, latlong)=>{

                    return L.circleMarker(latlong, {
                        radius:3,
                        fillColor:'red',
                        weight:1,
                        opacity:1,
                        fillOpacity: 0.8,
                    })

                }
            }
        ).addTo(map);

    }
    
)