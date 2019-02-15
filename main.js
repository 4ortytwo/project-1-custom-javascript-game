$(document).ready(() => {
    var myInterval;
    //collect state
    var scoreSp = $('#scoreSpan');
    var score = 0;
    $('#overlay').toggle(); //landing screen mode
    $('#startScreen').append(`<div id='start-game-btn-start-div'><button id='start-game-btn-start' type='submit'>NEW GAME</button></div>`);
    //player var, find height and width
    
    var playerWidth = $('#player').width();
    var playerHeight = $('#player').height();

    var computer = $('.computer');
    //shorten jQuery tags
    var modal = $('#id01'); //mesage modal
    var close = $('#closeButton');
    var input = $('#input');
    //words - array of ojects with words for questions
    var words = [
        {word: 'array'},
        {word: 'variable'},
        {word: 'function'},
        {word: 'web-dev'},
        {word: 'developer'},
        {word: 'internet'},
        {word: 'text editor'},
        {word: 'Ironhack'},
        {word: 'admission'},
        {word: 'design'},
        {word: 'laptop'},
        {word: 'JavaScript'},
        {word: 'object'},
        {word: 'promise'},
        {word: 'ES6'},
        {word: 'pizza'},
        {word: 'coffee'},
        {word: 'Amsterdam'},
        {word: 'computer'},
        {word: 'Jurgen Tonneyck'},
        {word: 'Klingon'},
        {word: 'Kido'},
        {word: 'Gijs'},
        {word: 'Arthur'},
        {word: 'Yoda Conditions'},
        {word: 'Brackets'},
        {word: 'Report'},
        {word: 'Programming'},
        {word: 'Refactoring'},
        {word: 'String'},
        {word: 'Linter'},
        {word: 'Doctype'},
        {word: 'Ninja'},
        {word: 'Production'},
        {word: 'Rubber duck'},
        {word: 'LESS TALKING MORE CODING'},
        {word: 'Help'},
        {word: 'Disturb your neighbour'},
        {word: 'colour picker'},
        {word: 'increment'},
        {word: 'Almudena'}
        // {word: ''},


    ];
    var word = '';
    var progressBar = $('#progressBar');
    //score span
    
    scoreSp.text(score);
    //INITIAL START SCREEN BUTTON 
    $("#start-game-btn-start").click(function(){
        $('#startScreen').toggle();
        $('#overlay').toggle();
        $('#start-game-btn-start-div').remove();
        lives = 3;
        score = 0;
        // let computer game elements appear on screen randomly
        myInterval = setInterval(() => {
            var computers = $(".computer")
            if (computers.length < 4) {
                var posx = (Math.random() * ($('#background').width()-45)).toFixed();
                var posy = (Math.random() * ($('#background').height()-45)).toFixed();
                $(newComputer).css({
                    'position': 'absolute',
                    'left': posx + 'px',
                    'top': posy + 'px',
                    'height': 13 + '%',
                }).appendTo('#computers');
    
                $(".computer:last")[0].top = parseInt(posy);
                $(".computer:last")[0].bottom = parseInt(posy) + $(".computer:last").height();
                $(".computer:last")[0].right = parseInt(posx) + $(".computer:last").height();
                $(".computer:last")[0].left = parseInt(posx);
                computers = $(".computer");
            }
        }, 5000);
    });
    //END INITIAL START SCREEN BUTTON

    /* restart button */ 
    $("#start-game-btn").click(function(){
        $('#container').css({
            'z-index': 0,
            'position': 'static',
            'background-image': ``,
            'background-repeat': '',
        });
        $('#overlay').toggle();
    });
    /* end restart button */ 

    //lives and GAMEOVER
    var lives = 3;
    var removeLife = (()=> {
    if (lives > 1) {
        $('#health').children().last().remove(); 
        lives-=1;
    }
    else {
        $('#container').css({
            'z-index': 999,
            'position': 'relative',
            'background-image': `url('/img/gameover3.jpg')`,
            'background-repeat': 'no-repeat',
        });

        $('#overlay').toggle();
        clearInterval(myInterval);
        $(document).off("keydown");
        //TODO:create a button to start a new game
        $('#container').append(`<div id='start-game-btn-div'><button id='start-game-btn' type='submit'>NEW GAME</button></div>`);
        //start here
        $("#start-game-btn").click(function(){
            $('#container').css({
                'z-index': 0,
                'position': 'static',
                'background-image': ``,
                'background-repeat': '',
            });
            $('#overlay').toggle();
            $('#start-game-btn-div').remove();
            lives = 3;
            score = 0;
            scoreSp.text(score);
            for (let i = 0; i < computers.length; i++) {
                computers[i].remove();
                computers.splice(i, 1);
            }
            $('#health').append(`<img src="img/heart.png" alt='heart'>`);
            $('#health').append(`<img src="img/heart.png" alt='heart'>`);
            myInterval = setInterval(() => {
                var computers = $(".computer")
                if (computers.length < 4) {
                    var posx = (Math.random() * ($('#background').width()-45)).toFixed();
                    var posy = (Math.random() * ($('#background').height()-45)).toFixed();
                    console.log('newcomp');
                    $(newComputer).css({
                        'position': 'absolute',
                        'left': posx + 'px',
                        'top': posy + 'px',
                        'height': 13 + '%',
                    }).appendTo('#computers');
        
        
                    $(".computer:last")[0].top = parseInt(posy);
                    $(".computer:last")[0].bottom = parseInt(posy) + $(".computer:last").height();
                    $(".computer:last")[0].right = parseInt(posx) + $(".computer:last").height();
                    $(".computer:last")[0].left = parseInt(posx);
                    computers = $(".computer");
                }
            }, 5000);
        });
        //end here
        }
    })

    //create random position and var for newComputer,append it to the container
   
    //var computersArray = document.getElementsByClassName('computer'); $('.computer')
    var newComputer = `<img src='/img/computer2.png' alt='computer' class='computer'>`;

    //function on animationend of progress bar
    progressBar.on('animationend', function () {
        word = words[Math.floor(Math.random() * words.length)];
        console.log(word);
        $('#inputSpan').text(`${word['word'].toUpperCase()}`);
        $('#input').attr('placeholder', `${word['word'].toUpperCase()}`);
        modal.css('display', 'block');
        $('#input').focus();
        $('#player').toggle();
        progressBar.toggleClass('animate');
        $(document).off("keydown");
    });


    $("#submit").click(function (e) {
        e.preventDefault();
        //hide modal
        modal.css('display', 'none');
        if (input.val().toUpperCase() == word.word.toUpperCase()) {if(input.val().toUpperCase() == 'jurgen tonneyck'.toUpperCase()){score+=10;}else{score+=1;}} else{removeLife();}
        //reset input value
        input.val('');
        //bring back the player
        $('#player').toggle();
        //update score
        scoreSp.text(score);
        //call the keyDownHandler
        $(document).keydown(keyDownHandler);
    })


    //keyDownHandler -- movement, creation of Player-Computer-Position variables and right+bottom position calculcation
    var keyDownHandler = (e) => {
        //create position vars for player and computer
        var playerPosition = $('#player').position();
        var computerPosition = $(".computer").position();

        playerPosition.right = playerPosition.left + playerWidth;
        playerPosition.bottom = playerPosition.top + playerHeight;

        switch (e.key) {
            case 'w':
                if (checkBorderTop()) {
                $('#player').css('top', playerPosition.top - 20 + 'px');
                break;}else{break;}
            case 's':
                if (checkBorderBot()) {
                    $('#player').css('top', playerPosition.top + 20 + 'px');
                break;} else{break;}
                case 'a':
                if (checkBorderLeft()) {
                $('#player').css('left', playerPosition.left - 20 + 'px');
                $('#player img').css('transform', 'scaleX(-1)');
                break;}else{break;}
            case 'd':
                if (checkBorderRight()) {
                $('#player').css('left', playerPosition.left + 20 + 'px');
                $('#player img').css('transform', 'scaleX(+1)');
                break;}else{break;}
        }

        if(e.key == "w" || (e.key == "s") || (e.key == "a") || (e.key == "d")) {
            var computers = $('.computer');
            var collisionIndex = arrayCollisionDetect(computers,playerPosition);
            if (collisionIndex > -1) {
                progressBar.toggleClass('animate');
                $(progressBar).on('animationend', function () {
                    computers[collisionIndex].remove();
                })
            }
            
        }

    }
    $(document).keydown(keyDownHandler);
    
    close.click(() => {
        $("#submit").trigger("click")
    })

    /* helper functions */
    function arrayCollisionDetect(arrayOfComputers, player) {
        for(let i = 0; i < arrayOfComputers.length; i+=1) {
            if(collision(arrayOfComputers[i],player)) {
                return i;
            }
        }
        return -1
    }
    function collision(a, b) {
        return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
    }
    // check borders on each side
    function checkBorderLeft () {
        if ($('#player').position().left < 0) {

            return false;
        }return true
    }
    function checkBorderRight () {
        if (($('#player').position().left + $('#player').width()) > $('#background').width()) {
            return false;
        }return true
    }
    function checkBorderTop () {
        if ($('#player').position().top < 0) {
            return false;
        }return true
    }
    function checkBorderBot () {
        if (($('#player').position().top + $('#player').height()) > $('#background').height()) {
            return false;
        }return true
    }
});


