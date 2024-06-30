// Array containing the four possible button colors
const buttonColors = ["red", "blue", "green", "yellow"];

// Array to store the sequence of colors generated by the game
let gamePattern = [];

// Array to store the sequence of colors clicked by the user
let userClickedPattern = [];

// Boolean flag to track whether the game has started
let started = false;

// Variable to keep track of the current game level
let level = 0;

// Event listener to detect when a key is pressed to start the game
document.addEventListener('keypress', (event) => {
  // Check if the game has not started yet
  if (!started) {
    // Update the level title to show the current level (initially Level 0)
    document.querySelector("#level-title").textContent = `Level ${level}`;
    
    // Call the function to generate the next sequence in the game pattern
    nextSequence();
    
    // Set the started flag to true to indicate that the game has started
    started = true;
  }
});

// Event listener for button clicks
$(".btn").click(function () {
  // Get the id of the clicked button, which corresponds to its color (e.g., "red")
  const userChosenColor = this.id;
  
  // Handle the button click by processing the chosen color
  handleButtonClick(userChosenColor);
});

// Function to handle button clicks
function handleButtonClick(color) {
  // Log the color chosen by the user to the console for debugging
  console.log(`User clicked: ${color}`);
  
  // Add the clicked color to the user's pattern array
  userClickedPattern.push(color);
  
  // Play the sound associated with the clicked color
  playSound(color);
  
  // Animate the button press visually
  animatePress(color);
  
  // Check the user's answer to see if it matches the game pattern
  checkAnswer(userClickedPattern.length - 1);
}

// Function to simulate a button press (used for debugging or automation)
function pressButton(color) {
  // Programmatically trigger the click event on the button with the specified color
  $("#" + color).click();
}

// Function to generate the next sequence in the game pattern
function nextSequence() {
  // Clear the user's pattern array for the new level
  userClickedPattern = [];
  
  // Increment the level by 1
  level++;
  
  // Update the level title to show the current level
  document.querySelector("#level-title").textContent = `Level ${level}`;
  
  // Generate a random number between 0 and 3 (inclusive)
  const randomNumber = Math.floor(Math.random() * 4);
  
  // Select a random color from the buttonColors array using the random number
  const randomChosenColor = buttonColors[randomNumber];
  
  // Add the selected color to the game pattern array
  gamePattern.push(randomChosenColor);

  // Log the current game pattern to the console for debugging
  console.log(`Game pattern: ${gamePattern}`);
  
  // Animate the button for the selected color by fading it in and out
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
  // Play the sound associated with the selected color
  playSound(randomChosenColor);
}

// Function to play sound for a given color name
function playSound(name) {
  // Create a new audio object using the sound file associated with the color
  const audio = new Audio("sounds/" + name + ".mp3");
  
  // Play the sound
  audio.play();
}

// Function to animate button press
function animatePress(currentColor) {
  // Add the "pressed" class to the button to apply a visual effect
  $("#" + currentColor).addClass("pressed");
  
  // Remove the "pressed" class after 100 milliseconds to remove the visual effect
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  // Compare the user's pattern with the game pattern at the current level
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    
    // If the user's pattern matches the game pattern and is complete
    if (userClickedPattern.length === gamePattern.length) {
      // Wait 1 second and then generate the next sequence
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // If the user's pattern does not match the game pattern
    console.log("Wrong");
    
    // Play the wrong sound to indicate a mistake
    playSound("wrong");
    
    // Apply the "game-over" class to the body to apply a visual effect
    $("body").addClass("game-over");
    
    // Remove the "game-over" class after 200 milliseconds to remove the visual effect
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    
    // Update the level title to show the game over message and prompt to restart
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
    
    // Call the function to restart the game
    startOver();
  }
}

// Function to restart the game
function startOver() {
  // Log the restart action to the console for debugging
  console.log("Starting over");
  
  // Reset the level to 0
  level = 0;
  
  // Clear the game pattern array
  gamePattern = [];
  
  // Set the started flag to false to indicate that the game has not started
  started = false;
}
