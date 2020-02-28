//what we need?
//1. Make player 1(x) and player 2 (o) Player.make(name);
//2. Make move method that take current gameboard and set x or o on it  Gameboard.move(3);
//3. Maker inner function that check end of game
//4. Make a move changer

//create our gameboard



const playerFactory = () => {
    let playerId = 0;

    return function(){
        playerId++;
        if(playerId == 1){
            return {token : 'x', playerId, currentMove: true}
        } else {
            return {token : 'o', playerId, currentMove: false}
        }
    }
}




//make game module
let Game = (() => {
    const playerMake = playerFactory();

    
    //add event on field click

    let gameOver = 0;
    console.log(!gameOver);

    document.addEventListener('click', (e) => {
        if (!gameOver){
            let id = e.toElement.dataset.id;
            if(id) makeMove(id, e.toElement);
        }
    })

    let o = '<span class="dot"><span class="inner-dot"></span></span>';
    let x = "<div class='left-line'></div><div class='right-line'></div>";

    const button = document.getElementById('button');
    const h2 = document.querySelector('h2');

    button.addEventListener('click', () => {
        refreshGame();
    })
    
    //players ini
    let player1 = playerMake();
    let player2 = playerMake();
    const changeMove = () => {
        player1.currentMove = !player1.currentMove;
        player2.currentMove = !player1.currentMove;
    }

    function winAction(player){
        //block user input
        gameOver = 1;
        
        button.style.display ='inline';
        h2.innerHTML = `${player.token} win!`;
    }


    //gameboard init

    let gameBoard = ['.','.','.','.','.','.','.','.','.'];

    // Move from any player
    const makeMove = (n, element) => {
        if(gameBoard[n] == 'o' || gameBoard[n] == 'x'){
            console.log('Choose another field');
        } else{
            let player = player1.currentMove == true ? player1 : player2;
            boardRefresh(player, n);
            console.log(gameBoard[0],gameBoard[1],gameBoard[2]);
            console.log(gameBoard[3],gameBoard[4],gameBoard[5]);
            console.log(gameBoard[6],gameBoard[7],gameBoard[8]);
            checkWinner(player);
            changeMove();
        }
    }

    //draw tokens on field

    const boardRefresh = (player,n) => {
        gameBoard[n] = player.token;

        const fieldDiv = document.querySelector(`div[data-id="${n}"]`);
        
        fieldDiv.innerHTML = (player.token == 'o') ? o : x;
        console.log(player.token);

    }

    function refreshGame(){
        for(let i in gameBoard){
            gameBoard[i] = '.';
        }
        let nodeList = document.querySelectorAll('.grid-item');

        for (i = 0; i < nodeList.length; i++) {
            nodeList[i].innerHTML = '';
        }

        gameOver = 0;
        button.style.display ='none';
        h2.innerHTML = ``;
    }
    
//check is there a winner

    const checkWinner = (player) => {

        if(gameBoard[0] == 'x' && gameBoard[1] == 'x' && gameBoard[2] == 'x' ||
            gameBoard[3] == 'x' && gameBoard[4] == 'x' && gameBoard[5] == 'x' ||
            gameBoard[6] == 'x' && gameBoard[7] == 'x' && gameBoard[8] == 'x' ||
            gameBoard[0] == 'x' && gameBoard[3] == 'x' && gameBoard[6] == 'x' ||
            gameBoard[1] == 'x' && gameBoard[4] == 'x' && gameBoard[7] == 'x' ||
            gameBoard[2] == 'x' && gameBoard[5] == 'x' && gameBoard[8] == 'x' ||
            gameBoard[0] == 'x' && gameBoard[4] == 'x' && gameBoard[8] == 'x' ||
            gameBoard[2] == 'x' && gameBoard[4] == 'x' && gameBoard[6] == 'x'){
            winAction(player);
        }

        if(gameBoard[0] == 'o' && gameBoard[1] == 'o' && gameBoard[2] == 'o' ||
            gameBoard[3] == 'o' && gameBoard[4] == 'o' && gameBoard[5] == 'o' ||
            gameBoard[6] == 'o' && gameBoard[7] == 'o' && gameBoard[8] == 'o' ||
            gameBoard[0] == 'o' && gameBoard[3] == 'o' && gameBoard[6] == 'o' ||
            gameBoard[1] == 'o' && gameBoard[4] == 'o' && gameBoard[7] == 'o' ||
            gameBoard[2] == 'o' && gameBoard[5] == 'o' && gameBoard[8] == 'o' ||
            gameBoard[0] == 'o' && gameBoard[4] == 'o' && gameBoard[8] == 'o' ||
            gameBoard[2] == 'o' && gameBoard[4] == 'o' && gameBoard[6] == 'o'){
            winAction(player);
        }     

    }
        
    return {makeMove,
    player1,
    player2,
    changeMove};
    

})();



//console.log(winner);



