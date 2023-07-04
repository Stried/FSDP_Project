// // let map;

// import Locations = require("../../../../server/models/Locations");

// // async function initMap() {
// //     const { Map } = await google.maps.importLibrary("maps");

// //     map = new Map(document.getElementById("map"), {
// //         center: { lat: -34.397, lng: 150.644 },
// //         zoom: 8,
// //     });
// // }

// // initMap();

// async function initMap() {
//     const { Map } = await google.maps.importLibrary("maps");
//     const locationsdb = Locations.findAll

//     const mapList = list();

//     for (i in mapList) {
//         map = new Map(document.getElementById("map"), {
//             center: { lat: i.latAxis, lng: i.lngAxis },
//             zoom: 8,
//         });
//     }

//     return (
//         <div id="map"></div>
//     )
// }