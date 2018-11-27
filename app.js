console.log("hey");



// Initialize Firebase
var config = {
  apiKey: "AIzaSyDt5IAbDJIcr3i8f3iaenNA76EcX4TCT9k",
  authDomain: "train-scheduler-95194.firebaseapp.com",
  databaseURL: "https://train-scheduler-95194.firebaseio.com",
  projectId: "train-scheduler-95194",
  storageBucket: "train-scheduler-95194.appspot.com",
  messagingSenderId: "1008020140505"
};
firebase.initializeApp(config);

var database = firebase.database();


var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";
var clickCounter = 0;

$(".btn").on("click", function () {
  event.preventDefault();

  trainName = $("#TrainName").val().trim();
  destination = $("#destination").val().trim();
  frequency = $("#frequency").val().trim();
  firstTime = $("#trainTime").val().trim();


  clickCounter++;

  database.ref().push({
    "trainName": trainName,
    "destination": destination,
    "frequency": frequency,
    "firstTime": firstTime,

  });
});


database.ref().on("child_added", function (snapshot) {

  console.log(snapshot.val());

  
  var tFrequency = parseInt(snapshot.val().frequency);

  // Time is 3:30 AM
  var firstTime = snapshot.val().firstTime;
  

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var myTableRow = $("<tr>");
  var myTable1 = $("<td>" + snapshot.val().trainName + "</td>");
  var myTable2 = $("<td>" + snapshot.val().destination + "</td>");
  var myTable3 = $("<td>" + snapshot.val().frequency + "</td>");
  var myTable4 = $("<td>" +  moment(nextTrain).format("hh:mm") + "</td>");
  var myTable5 = $("<td>" + tMinutesTillTrain + "</td>");

  myTableRow.append(myTable1);
  myTableRow.append(myTable2);
  myTableRow.append(myTable3);
  myTableRow.append(myTable4);
  myTableRow.append(myTable5);


  $("#target").append(myTableRow);

});

// MOMENT
console.log(moment());

var randomDate = moment("02/14/2001", "MM/DD/YYYY");
console.log(randomDate);

