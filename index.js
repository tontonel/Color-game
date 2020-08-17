var level = 1;
var colorPath = [];
var colorLevel  = 1;
var startGame = false;
var lose = false;
var colors = ["red", "blue", "green", "yellow"];
$("body").keypress (function (event){
     if ((event.key === 'a' ||  event.key === 'A') && !startGame)
        game ();
    else if (startGame && lose)
    {
        $("body").removeClass ("game-over");
        lose = false;
        crateColor();
        //game ();
    }
});
function game ()
{
    startGame = true;
    crateColor();
    $(".btn").click(function() {
            var clickedColor = $(this).attr ("id");
            //console.log (colorLevel + " " + colorPath.length);
            //console.log (clickedColor +  " " + colorPath[colorLevel - 1]);
            playsound (clickedColor);
            if (colorLevel <= colorPath.length)
                if (clickedColor == colorPath[colorLevel - 1])
                    colorLevel++;
                else
                    game_over ();
            if (!lose)
                if (colorLevel > colorPath.length)
                {
                    level++;
                    setTimeout(function () {
                      crateColor();
                  }, 500);
                }
    });
}
function crateColor ()
{
    colorLevel = 1;
    $ ("#level-title").text ("level " + level);
    var randomColor = Math.random () * 4;
    randomColor = Math.floor (randomColor);
    colorPath.push (colors[randomColor]);
    //console.log (colorPath[colorPath.length - 1]);
    highlightBox (colors[randomColor]);
}
function highlightBox (color)
{
    $("#" + color).addClass ("pressed");
    setTimeout(function(){
        $("#" + color).removeClass ("pressed");
    }, 200);
}
function playsound (audio)
{
    var sound = new Audio ("sounds/" + audio + ".mp3");
    sound.play ();
}
function game_over ()
{
    $("body").addClass ("game-over");
    playsound("wrong");
    $ ("#level-title").text ("you lose press any key");
    colorPath = [];
    lose = true;
    level = 1;
}
