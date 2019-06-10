

// ///////////////////////////////////////////////////////////////////////////////////////
//                                     //GOOGLE API SECTION
// //////////////////////////////////////////////////////////////////////////////////////
//Geolocation 
// var marker
// var parkLocations = [
//     {name: "FreedomPark", lat: 35.193978, lng: -80.842636}
//     // [name: "Frazier Park, lat: 35.232251, lng: -80.858032"],
//     // [name: "Revolution Park, lat: 35.214758, lng: -80.876093"],
//     // ["Southside Park, 35.207150, -80.872784"],
//     // ["Bryant Park, 35.227278, -80.870150"],
//     // ["Kirk Farm Park, 35.321008, -80.731887"],
//     // ["Nevin Community Park, 35.302511, -80.834128"],
//     // ["Renaissance Park, 35.180768, -80.907574"]
// ]
function initMap() {
  var mapCenter = {lat: 35.227085, lng: -80.843124}
  map = new google.maps.Map(document.getElementById('google-maps-display'), {
    center: mapCenter,
    zoom: 11
  });   

  // var marker = new google.maps.Marker({
  //   position: parkLocations.lat.lng,
  //   map: map,
  //   title: "FreedomPark",
  //   optimized: false
  // }); 

// Create the search box and link it to the UI element.

var input = document.getElementById('location-SearchBox');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});

var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }

  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});

infoWindow = new google.maps.InfoWindow;

  //Try HTML5 geolocation.
  function geolocation (){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: We could not find your location.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

}geolocation()
}

// function newLocation(newLat,newLng)
// {
// 	map.setCenter({
// 		lat : newLat,
// 		lng : newLng
// 	});
// }

// google.maps.event.addDomListener(window, 'load', initMap);

// //Setting Location with jQuery
// $(document).ready(function ()
// {
//     $("#parkLocation").on('click', function ()
//     {
// 	  newLocation(48.1293954,11.556663);
// 	});

// 	$("#2").on('click', function ()
//     {
// 	  newLocation(40.7033127,-73.979681);
// 	});

//     $("#3").on('click', function ()
//     {
// 	  newLocation(55.749792,37.632495);
// 	});
// });








//Markers to create Hover-Over
//   var marker = new google.maps.Marker({
//     position: pos,
//     map: map,
//     draggable: true
// });

// var searchBox = new google.maps.places.SearchBox(document.getElementById('location-SearchBox'));

// google.maps.event.addDomListener(searchBox, 'places_changed', function() {
//         var places = searchBox.getPlaces();
//         var bounds = new google.maps.LatLngBounds();
//         var i, place;

//         for (i = 0; place = places[i]; i++) {
//             bounds.extend(place.geometry.location);
//             marker.setPosition(place.geometry.location);
//         }
//         map.fitBounds(bounds);
//         map.setZoom(12);
//     })
// ///////////////////////////////////////////////////////////////////////////////////////
//                                     //FIREBASE SECTION
// //////////////////////////////////////////////////////////////////////////////////////


// window.onload = function() {
//  /*There are 2 inputs and 1 button on the homepage.  
         
// //     Button 1 - #submit     
// //         On "click" needs to authenticate user and password. 

// // */
// //creates a variable to store input from form
//      var user = $('#user').val();
//      var password = $('#password').val();
//      console.log(user);
//      console.log(password);


// /////////////////////////////////////////////////////////////////////////////


// //creates a variable to store input from form for button 1.
//     var eventCreator = $('#squadLeader').val();
//     var eventName = $('#inputEventName').val();
//     var dateTime = $('#DT').val();
//     var location = $('#location').val();
//     var eventDescription = $('#eventDescription').val();
//     var teamRoster = $('#roster').val();

//     console.log(eventCreator);
//     console.log(eventName);
//     console.log(dateTime);
//     console.log(location);
//     console.log(eventDescription);
//     console.log(teamRoster)

//     //creates a variable to store input from form for button 2.
//     var search = $('#searchInput').val();
//     console.log(search);


// ///////////////////////////////////////////////////////////////////////////////////////
//                                   //GOOGLE API SECTION
// //////////////////////////////////////////////////////////////////////////////////////
 
// //Geolocation
// var map, infoWindow;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('google-maps-display'), {
//     center: {lat: 35.227, lng: -80.843},
//     zoom: 6
//   });
//   infoWindow = new google.maps.InfoWindow;

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }


  ///////////////////////////////////////////////////////////////////////////////////////
  //YELP API SECTION
  //////////////////////////////////////////////////////////////////////////////////////
window.onload = function(){
  retrieveBusinessInformation();

  var userInputAddress = "Freedom Park";

  function retrieveBusinessInformation() {

    var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=1&location=" + userInputAddress;

    $.ajax({
        url: idQueryUrl,
        method: "GET",
        headers: {
          Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
        }
      })
      .then(function ({
        businesses
      }) {
        var businessId = businesses[0].id;

        var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

        $.ajax({
            url: locationDetailsQueryUrl,
            method: "GET",
            headers: {
              Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
            }
          })
          .then(function (locationDetails) {
            console.log (locationDetails);
            $("#yelp-name").html("Name: " + locationDetails.name);
            $("#yelp-rating").html("Rating: " + locationDetails.rating);
            $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
          })
      })
  };
}


///////////////////////////////////////////////////////////////////////////////////////
                                    //FIREBASE SECTION
//////////////////////////////////////////////////////////////////////////////////////
window.onload = function(){

  var firebaseConfig = {
    apiKey: "AIzaSyCut4P2yrq2ECQWaX5liAQ6luwvuUQVozA",
    authDomain: "project-1-14697.firebaseapp.com",
    databaseURL: "https://project-1-14697.firebaseio.com",
    projectId: "project-1-14697",
    storageBucket: "project-1-14697.appspot.com",
    messagingSenderId: "8693009592",
    appId: "1:8693009592:web:3ffc100f48ce733c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();
console.log("connected")

 $("#create").click(function(event) {

  event.preventDefault()


  // let users = firebase.database().child('users/')
console.log("hey")

    let email = document.querySelector("#createUser")
    let username = document.querySelector("#userName")
    let password = document.querySelector("#createPassword")
    


firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function(user) {
        displayName = username.value // change this back to username.value
        writeUserData(displayName, user) // possibly only need to pass displayName as parameter
    })


})

//Firebase UI signin 

$("#submit").click(function(event) {
  event.preventDefault();
  
  console.log("button clicked")
   let email = document.querySelector("#user")
    let password = document.querySelector("#password")
  
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  
    firebase.auth().onAuthStateChanged(user => {

    if(user) {
      window.location = 'main.html'; //After successful login, user will be redirected to main.html
        }
       
});
  
  })


function writeUserData(displayName, user) { //possibly only need to pass in displayName here
    console.log("we're in")
    firebase.database().ref('users/' + user.uid).set({
        username: displayName,
})



$("#exampleInputEmail1").val("");
$("#exampleUserName").val("");
$("#exampleInputPassword1").val("");
}



// MainPage Add Event:

//converting Event Date and Time
 Date.prototype.toDatetimeLocal = 
    function toDatetimeLocal() {
      var 
        date = this,
        ten = function (i) {
            return (i < 10 ? '0' : '') + i;
        };
        YYYY = date.getFullYear(),
        MM = ten(date.getMonth() + 1),
        DD = ten(date.getDate()),
        HH = ten(date.getHours()),
        II = ten(date.getMinutes()),
        SS = ten(date.getSeconds())
        ;
        return YYYY + "-" + MM + "-" + DD + '' + HH + ':' + II + ':' + SS
    }

document.getElementById("addBtn").addEventListener("click", e => {

    let user = firebase.auth().currentUser;  
    console.log(user)  

    // if(user)
    //     console.log(db.collection("users").doc(user.uid))
    // else
    //     alert('user not logged in')

  let DT = document.getElementById("DT")
  let leaderName = document.querySelector("#squadLeader")
  leaderName = leaderName.value
  let eventDescription = document.querySelector("#eventDescription")
  eventDescription = eventDescription.value
  let eventLocation = document.querySelector("#location")
  eventLocation = eventLocation.value
  let eventName = document.querySelector("#inputEventName")
  eventName = eventName.value
  let eventRef = firebase.database().ref("events")
  let newEventRef = eventRef.push();
  let ISOString = new Date(DT.value).toISOString();
  let finalTime = DT.value = new Date(ISOString).toDatetimeLocal();
  let name = user.displayName
  console.log(finalTime)
  console.log(name)

console.log(eventDescription)


      newEventRef.set({
      
    leader: leaderName,
    name: eventName,
    eventDate: finalTime,
    location: eventLocation,
    description: eventDescription,
    })

});

// var eventRef = ref.child(key)
let eventRef = firebase.database().ref("events")
eventRef.on('child_added', function(childSnapshot){

  
  let eventButton = $("<button>").addClass("eventButton")
  let eventTitle = $("<p>").text(childSnapshot.val().name)
  let eventLeader = $("<p>").text(childSnapshot.val().leader)
  let eventDate = $("<p>").text(childSnapshot.val().eventDate)
  let eventLocation = $("<p>").attr("id", "eventLocation").text(childSnapshot.val().location)

  $(eventButton).append(eventLocation)
  $(eventButton).append(eventDate)
  $(eventButton).append(eventLeader)
  $(eventButton).append(eventTitle)

  $("#event1").prepend(eventButton)





})




firebase.auth().onAuthStateChanged(user => {

  if(user) {
console.log("you're logged in!")     
}
     
});


$(document).on("click", ".eventButton", function () {

  
  let parkLocation = document.getElementById("eventLocation")
  
  console.log($(this).children().first().text());
})

}



