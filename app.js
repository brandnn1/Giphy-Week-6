//attaches a function to the document website. Sets a variable of animals
$(document).ready(function() {
  //sets variable animals to equal various values
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];
//creates a new function with 3 parameters to pass - arrayToUse, classToAdd and areaToAddTo
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    
    $(areaToAddTo).empty();
    //for loop which cycles through the length of the array to use 
    for (var i = 0; i < arrayToUse.length; i++) {
      //Adds a button
      var a = $("<button>");
      //Adds class of classToAdd
      a.addClass(classToAdd);
      //adds data type of arrayToUse equal to the input value currently being sent through the loop
      a.attr("data-type", arrayToUse[i]);
      //passes the text value of the iteration being circled through
      a.text(arrayToUse[i]);
      //appends the new button to areaToAddTo
      $(areaToAddTo).append(a);
    }

  }
//sets a listenere for a click on the animal-button class
  $(document).on("click", ".animal-button", function() {
    //removes content in the animals id 
    $("#animals").empty();
    //removes the active class from the anima-button class
    $(".animal-button").removeClass("active");
    //adds a class of the new button clicked as active
    $(this).addClass("active");
    
    //sets a variable of type to equal the data-type of the button clicked
    var type = $(this).attr("data-type");
    //sets the queryURL to the api call with the type variable inserted.
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

      //ajax api call
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        //sets a variable as results to equal the api call response. 
        var results = response.data;
        //sets a for loop which will continue until i is no longer less than the results length
        for (var i = 0; i < results.length; i++) {
          //sets a variable to equal a new div with the class of animal-item
          var animalDiv = $("<div class=\"animal-item\">");
          //sets the variable rating to equal the rating of the current results iterations
          var rating = results[i].rating;
          //creates a p tag in html and adds the text Rating plus the variable value
          var p = $("<p>").text("Rating: " + rating);
          //sets the variable animated to equal the images fixed height from the current results iteration 
          var animated = results[i].images.fixed_height.url;
          //sets the variable still to equal the images fixed height still from the current results iteration
          var still = results[i].images.fixed_height_still.url;

          //sets the variable animalImage to an image tag
          var animalImage = $("<img>");
          //sets the variable to have a source equal to the still variable
          animalImage.attr("src", still);
          //sets the variable to have a an attribute of data-still equal to the still variable
          animalImage.attr("data-still", still);
          //sets the variable to have an attribute of data-animate equal to the animated variable
          animalImage.attr("data-animate", animated);
          //sets the variable to a data state of still
          animalImage.attr("data-state", "still");
          //adds a class to the variable of animal-image
          animalImage.addClass("animal-image");

          //appends the p variable to the animalDiv  variable
          animalDiv.append(p);
          //appends the now p-tag plus rest of information animalImage variable to the animalDiv variable
          animalDiv.append(animalImage);

          //finally appends the animalDiv variable to the html id animals
          $("#animals").append(animalDiv);
        }
      });
  });

  //sets an on click listenere against the animal-image class
  $(document).on("click", ".animal-image", function() {
    //sets a variable of state to equal the data-state of the animal image clicked
    var state = $(this).attr("data-state");
    //check the state. If it is equal to still then
    if (state === "still") {
      // changes the attribute source to equal the data-animate attribute
      $(this).attr("src", $(this).attr("data-animate"));
      //changes the attribute data-state to equal animate
      $(this).attr("data-state", "animate");
    }
    else {
      //otherwise it sets the attribute source to equal data-still
      $(this).attr("src", $(this).attr("data-still"));
      //and sets the data-state to still
      $(this).attr("data-state", "still");
    }
  });
  //adds an on click listener against the add-animal id
  $("#add-animal").on("click", function(event) {
    //first thing it does is prevents the default action from occuring on the event click
    event.preventDefault();
    //sets a variable newAnimal to equal the value of the element specified. In this case it's looking for the value at the zero index (eq(0)) of input 
    var newAnimal = $("input").eq(0).val();
    //checks if the length of the variable is greater than 2 (if you enter 2 characters, a new button will not be create)
    if (newAnimal.length > 2) {
      //if it is great than 2 characters, the newAnimal value is pushed to the animals value
      animals.push(newAnimal);
    }
    //then populate buttons is run with the parameters equal to the animals value with animal-button class and #animal-buttons as the id to addToAreaTo
    populateButtons(animals, "animal-button", "#animal-buttons");

  });
  //runs populate buttons with the same parameters as above
  populateButtons(animals, "animal-button", "#animal-buttons");
});
