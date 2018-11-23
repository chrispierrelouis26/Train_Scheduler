console.log("hey");


var config = {
    apiKey: "AIzaSyDHyJpsZ4AGl3ignOVHoqhKGokHmt5DVio",
    authDomain: "my-train-dc076.firebaseapp.com",
    databaseURL: "https://my-train-dc076.firebaseio.com",
    projectId: "my-train-dc076",
    storageBucket: "",
    messagingSenderId: "554027630833"
    
}
  firebase.initializeApp(config);
  var database = firebase.database();


  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";



    database.ref("/train_name").on("value", function (snapshot) {
        
       
       
       console.log( snapshot.val().train_name);

        var myTableRow = $("<tr>");
        var myTable1 = $("<td>"+ snapshot.val().train_name+"</td>");
        var myTable2 = $("<td>"+  snapshot.val().train_destination+"</td>");
        var myTable3 = $("<td>"+ snapshot.val().train_firstTrain+"</td>");
        var myTable4 = $("<td>"+ snapshot.val().train_frequency+"</td>");

        myTableRow.append(myTable1);
        myTableRow.append(myTable2);
        myTableRow.append(myTable3);
        myTableRow.append(myTable4);


$("#target").append(myTableRow);




    });
  

    $(document).ready(function () {


        $(".btn").on("click", function (e) {
            e.preventDefault();
            trainName = $("#trainName").val();
            destination = $("#destination").val();
            firstTrain = $("#firstTrain").val();
            frequency = $("#frequency").val();



            database.ref("/train_name").push({
                train_name: trainName,
                train_destination: destination,
                train_firstTrain: firstTrain,
                train_frequency: frequency,
            });

        })

    })

