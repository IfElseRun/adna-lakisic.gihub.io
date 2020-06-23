//Using JavaScript closure so that variables belong to the local scope
(function() {
    //Using array literal method to create an array instructorsArray
    var instructorsArray = [{
            'image': 'images/julia-van-cleve.png',
            'instructorName': 'Julie Van Cleve'
        },
        {
            'image': 'images/ajay-hemnani.png',
            'instructorName': 'Ajay Hemnani'
        },
        {
            'image': 'images/cameron-pittma.png',
            'instructorName': 'Cameron Pittma'
        },
        {
            'image': 'images/emily-keller.png',
            'instructorName': 'Emilly Keller'
        },
        {
            'image': 'images/james-parkes.png',
            'instructorName': 'James Parkes'
        },
        {
            'image': 'images/richard-kalehoff.png',
            'instructorName': 'Richard Kalehoff'
        },
        {
            'image': 'images/karl-krueger.png',
            'instructorName': 'Karl Krueger'
        },
        {
            'image': 'images/tyler-mcginnis.png',
            'instructorName': 'Tyler Mcginnis'
        }
    ]

    //Shuffle array to shuffle cards every time user wants to play https://github.com/coolaj86/knuth-shuffle

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    //Using concat() method to join two arrays in order to create an array with 16 values
    instructorsArray = instructorsArray.concat(instructorsArray);

    instructorsArray = shuffle(instructorsArray);

    //Naming variables
    var gameTile = document.getElementsByClassName('grid-item');
    var firstTileValue = '';
    var secondTileValue = '';
    var numberOfClicks = '';
    var previous = null;
    var movesCounter = '';
    var triesCounter = 0;
    var startTimer = new Date('August 19,2018  00:00:00');
    var timerInterval = 0;
    var timerActive = false;
    var memoryGame = document.getElementById('main');
    var gameGrid = document.createElement('section');
    var matched = 0;
    var stars = document.querySelectorAll('.fa-star');
    var modal = document.getElementById('myModal');
    gameGrid.setAttribute('class', 'grid-container');
    memoryGame.appendChild(gameGrid);
    //Star rating
    for (var a = 0; a < stars.length; a++) {
        stars[a].style.color = 'yellow';
        stars[a].style.visibility = 'visible';
    }


    //Creating HTML structure for each tile in game grid
    instructorsArray.forEach(function(item, index) {
        var image = item.image;
        var instructorName = item.instructorName;
        var gameTile = document.createElement('div');
        gameTile.classList.add('grid-item');
        gameTile.dataset.instructorName = instructorName;


        var frontTile = document.createElement('div');
        frontTile.classList.add('frontTile');

        var backTile = document.createElement('div');
        backTile.classList.add('backTile');
        backTile.style.backgroundImage = 'url(' + image + ')';

        gameGrid.appendChild(gameTile);
        gameTile.appendChild(frontTile);
        gameTile.appendChild(backTile);

    });

    //Reset Game and play again
    var resetGame = () => {
        firstTileValue = '';
        secondTileValue = '';
        numberOfClicks = '';
        previous = null;
        movesCounter = '';
        startTimer = new Date('August 19,2018  00:00:00');
        clearInterval(timerInterval);
        timerInterval = 0;
        timerActive = false;
        modal.parentNode.removeChild(modal);
        triesCounter = 0;

        var selected = document.querySelectorAll('.selected');
        selected.forEach(gameTile => {
            gameTile.classList.remove('selected');
        });
        var match = document.querySelectorAll('.match');
        match.forEach(gameTile => {
            gameTile.classList.remove('match');
        });
        var numberOfClicks = document.getElementById('numberOfClicks');
        match.forEach(gameTile => {
            document.getElementById('numberOfClicks').value = triesCounter;
        });
        document.getElementById("timer").innerHTML = "";
        instructorsArray = shuffle(instructorsArray);

        for (var a = 0; a < stars.length; a++) {
            stars[a].style.color = 'yellow';
            stars[a].style.visibility = 'visible';
        }
    };
    //Match tiles and if the number of matche tiles is equal to array lenght reset game
    var match = () => {
        var selected = document.querySelectorAll('.selected');
        selected.forEach(gameTile => {
            gameTile.classList.add('match');
            matched++;
        });
        if (matched == gameTile.length) {
            timerActive = false;
            modal.style.display = 'block';
            var starRating = document.querySelector('.stars').innerHTML;
            document.querySelector('.star-rating').innerHTML = starRating;
            document.querySelector('.timeEnd').innerHTML = ("0" + startTimer.getMinutes()).slice(-2) + ':' + ("0" + startTimer.getSeconds()).slice(-2);;

            var span = document.getElementsByClassName('close')[0];
            span.onclick = function() {
                resetGame();
            }

        }
    };
    //Reset Guesses
    var resetGuesses = () => {
        firstTileValue = '';
        secondTileValue = '';
        numberOfClicks = '';
        previous = null;
        movesCounter = '';

        var selected = document.querySelectorAll('.selected');
        selected.forEach(gameTile => {
            gameTile.classList.remove('selected');
        });
    };


    var gridItems = document.querySelectorAll('.grid-item');
    //Event listener
    for (var i = 0; i < gridItems.length; i++) {
        gridItems[i].addEventListener('click', event => {
            if (timerInterval == 0) {
                timerActive = true;
                timerInterval = setInterval(function() {
                    if (timerActive) {
                        startTimer.setSeconds(startTimer.getSeconds() + 1);
                        document.getElementById("timer").innerHTML = ("0" + startTimer.getMinutes()).slice(-2) + ':' + ("0" + startTimer.getSeconds()).slice(-2);
                    }
                }, 1000);
            }
            var clicked = event.target;

            if (
                clicked.nodeName === 'section' ||
                clicked.parentNode.classList.contains('selected') ||
                clicked === previous ||

                clicked.parentNode.classList.contains('match')
            ) {
                return;
            }
            if (numberOfClicks < 2) {
                numberOfClicks++;
                if (numberOfClicks === 1) {
                    firstTileValue = clicked.parentNode.dataset.instructorName;
                    clicked.parentNode.classList.add('selected');
                } else {
                    secondTileValue = clicked.parentNode.dataset.instructorName;
                    clicked.parentNode.classList.add('selected');
                }
                if (firstTileValue && secondTileValue) {
                    triesCounter++;
                    document.getElementById('numberOfClicks').value = triesCounter;
                    //Star rating based on moves
                    if (triesCounter > 12 && triesCounter < 14) {
                        for (a = 0; a < 3; a++) {
                            if (a > 1) {
                                stars[a].style.visibility = 'collapse';
                            }
                        }
                    } else if (triesCounter > 16) {
                        for (a = 0; a < 3; a++) {
                            if (a > 0) {
                                stars[a].style.visibility = 'collapse';
                            }
                        }
                    }

                    if (firstTileValue === secondTileValue) {
                        setTimeout(match, 1000);
                    }
                    setTimeout(resetGuesses, 1000);
                }
                previous = clicked;


            }
        });
    }
})();
//Reload content
function reload() {
    location.reload();
}