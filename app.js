console.log("hey");
console.log(moment())
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

  $(".btn").on("click", function (){
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
        
       console.log( snapshot.val().trainName);

        var myTableRow = $("<tr>");
        var myTable1 = $("<td>"+ snapshot.val().trainName+"</td>");
        var myTable2 = $("<td>"+ snapshot.val().destination+"</td>");
        var myTable3 = $("<td>"+ snapshot.val().frequency+"</td>");
        var myTable4 = $("<td>"+ snapshot.val().trainTime+"</td>");

        myTableRow.append(myTable1);
        myTableRow.append(myTable2);
        myTableRow.append(myTable3);
        myTableRow.append(myTable4);


$("#target").append(myTableRow);




    });
  

