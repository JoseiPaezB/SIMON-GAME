var level=0; 
var gamePattern=[];
var userClickedPattern=[];

var buttonColors=["red","blue","green","yellow"];

var randomChosenColor=buttonColors[nextSequence()];
var gameStarted = false; // Bandera para verificar si el juego ha comenzado


$(document).keypress(function() {
    if (!gameStarted) { // Solo inicia el juego si no ha comenzado
       
        gameStarted = true;
        nextSequence();
         // Muestra el nivel inicial
        // Cambia el estado a verdadero
    }
});


function nextSequence() {
    level++; // Incrementa el nivel primero
    $("h1").text("Level " + level);
    
    
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColor = buttonColors[randomNumber]; // Ahora se define aquí
    gamePattern.push(randomChosenColor); // Agrega el color al patrón del juego

    // Comprueba si el color existe y lo anima
    if ($("#" + randomChosenColor).length > 0) {
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
        console.log($("#" + randomChosenColor));
        var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
        audio.play(); 
    }
}

$("div[type='button']").click(function(){
    userChosenColor=$(this).attr("id");
    
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

    

})

function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern=[];
        }
        
    }else{
        console.log("wrong");
        var wrongAudio = new Audio ("sounds/wrong.mp3");
        wrongAudio.play(); 
        $("body").addClass("game-over");
        
        // Remover clase "game-over" después de 200ms
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
       


    }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    gameStarted=false;
}