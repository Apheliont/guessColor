/**
 * Created by Aphel on 09.09.2016.
 */

function init ()
{
    var isHard = true;

    var newColorBtn = document.getElementById("newColorsBtn");

    var hardOrEasyBtns = document.querySelectorAll(".hardOrEasy");
    for (var i = 0; i < hardOrEasyBtns.length; i++)
    {
        hardOrEasyBtns[i].addEventListener('click', function() {
            hardOrEasyBtns[0].classList.remove("clicked");
            hardOrEasyBtns[1].classList.remove("clicked");
            this.textContent === "Hard" ? isHard = true: isHard = false;
            newGame(isHard);
        });
    }
    newGame(isHard);
    newColorBtn.addEventListener('click', function() {return newGame(isHard);});

}

function colorGenerate()        /* генератор случайных цветов */
{
    var rgb = "rgb(";
    for (var i = 0; i < 3; i++)
    {
        var rndColor = Math.floor(Math.random()*256);
        rgb += String(rndColor);
        if (i === 2)
        {
            rgb += ")";
        } else {
            rgb += ", ";
        }

    }
    return rgb;
}

function newGame (isHard)
{
    if (!isHard)
    {
        document.getElementById("hardMode").classList.add("invisible");
    } else {
        document.getElementById("hardMode").classList.remove("invisible");
    }
    document.querySelector("#newColorsBtn").textContent = "New Colors";
    document.querySelector(".firstRow").style.background = "#3D8EFF";
    var rgbViewer = document.getElementById("rgbNeedToBeFind");
    var colorSquares = document.querySelectorAll(".lastRows:not(.invisible) button");
    var colorArray = [];
    var tempColor;

    for(var i = 0; i < colorSquares.length; i++)
    {
        tempColor = colorGenerate();
        colorSquares[i].style.background = tempColor;
        colorArray.push(tempColor);
        colorSquares[i].classList.remove("tryagain");
        colorSquares[i].classList.remove("match");
        colorSquares[i].classList.remove("win");
        colorSquares[i].addEventListener('click', checkAnswer);
    }
    var messageToPlayer = document.getElementById("message");
    messageToPlayer.textContent = "";
    rgbViewer.textContent = colorArray[Math.floor(Math.random()*colorArray.length)];

}

function checkAnswer () {

    var rgbViewer = document.getElementById("rgbNeedToBeFind");
    var wrongAnsArr = ["Try again!", "Nope", "Wrooong!", "Looseer", "No"];
    var messageToPlayer = document.getElementById("message");
    var timeoutID;
    if(this.style.background == rgbViewer.textContent)
    {
        win(this.style.background);

        messageToPlayer.textContent = "Correct!";
        this.classList.add("match");

    } else {
        messageToPlayer.textContent = wrongAnsArr[Math.floor(Math.random()*wrongAnsArr.length)];
        messageToPlayer.classList.add ("messageDisplay");
        timeoutID = setTimeout(function(){
            messageToPlayer.textContent = "";
            messageToPlayer.classList.remove ("messageDisplay");
        }, 1000);

        this.classList.add("tryagain");
    }

}

function win (background)
{
    var colorSquares = document.querySelectorAll(".lastRows:not(.invisible) button");
    document.querySelector("#newColorsBtn").textContent = "Play again?";
    document.querySelector(".firstRow").style.background = background;

    for(var i = 0; i < colorSquares.length; i++)
    {
        colorSquares[i].style.background = background;
        colorSquares[i].classList.add("win");
    }
}

window.addEventListener('load', init);