const music = {
    0: new Audio('https://juanantonioleonojeda.github.io/assets/music/TakeOnMe.mp3'),
    1: new Audio('https://juanantonioleonojeda.github.io/assets/music/HoldingOutForAHero.mp3'),
    2: new Audio('https://juanantonioleonojeda.github.io/assets/music/WelcomeToTheJungle.mp3'),
}

const sounds = {
    punch1: new Audio('https://juanantonioleonojeda.github.io/assets/music/sounds/punch1.mp3'),
    miss: new Audio('https://juanantonioleonojeda.github.io/assets/music/sounds/miss.mp3'),
    jump1: new Audio('https://juanantonioleonojeda.github.io/assets/music/sounds/8bit_jump.mp3'),
    jump2: new Audio('../assets/music/sounds/jump.mp3'),
    over: new Audio('../assets/music/sounds/gameover.wav'),
    startscreen: new Audio('../assets/music/sounds/inicio.wav'),
    fall: new Audio('../assets/music/sounds/caida2.wav'),
}

var startButton = document.getElementById('game-start')
startButton.addEventListener('click', function(e) {
    e.stopPropagation()
    startGame()
})

function clearScreen() {
    var board = document.getElementById('main')
    var childs = document.querySelectorAll('#main > *')
    for (let i = 0; i < childs.length; i++) {
        board.removeChild(childs[i])
    }
}

function selectSong() {
    return Math.floor(Math.random() * 3)
}

function gameOver(winner, music, parent) {
    music.pause()
    clearScreen()
    parent.style.background = 'none'
    if (winner === 1) {
        parent.style.background = 'url(../assets/graphics/player1wins.jpg)'
    } else {
        parent.style.background = 'url(../assets/graphics/player2wins.jpg)'
    }
    sounds.over.play()
    var resetButton = document.createElement('button')
    resetButton.addEventListener('click', startGame)
    resetButton.innerText = 'Play Again'
    parent.appendChild(resetButton)
}

function startGame() {
    clearScreen()
    var ost = music[selectSong()]
    ost.volume = 0.05
    ost.play()
    var isPlaying = true
    var parent = document.getElementById('main')
    parent.style.background = 'url(../assets/graphics/Background2.gif)'
    parent.style.backgroundPositionX = '-200px'
    parent.style.backgroundRepeat = 'no-repeat'
    var lives1 = document.createElement('div')
    var lives2 = document.createElement('div')
    lives1.setAttribute('id', 'life-container1')
    lives2.setAttribute('id', 'life-container2')
    lives1.innerHTML = '<div class=life1></div><div class=life1></div><div class=life1></div>'
    lives2.innerHTML = '<div class=life2></div><div class=life2></div><div class=life2></div>'
    var plat1 = new Platform(500, 75, 150, 300)
    var player1 = new Player(30, 40, 350, 260, 1)
    var player2 = new Player(30, 40, 450, 260, 2)
    var lava = new Lava(800, 100, 0, 500)
    var livesArray1 = document.getElementsByClassName('life1')
    var livesArray2 = document.getElementsByClassName('life2')
    parent.appendChild(lives2)
    parent.appendChild(lives1)
    parent.appendChild(plat1.sprite)
    parent.appendChild(player1.sprite)
    parent.appendChild(player2.sprite)
    parent.appendChild(lava.sprite)

    window.addEventListener('keydown', function (e) {
        switch (e.key.toLowerCase()) {
            case 'd':
                player1.direction = 1
                break
            case 'a':
                player1.direction = -1
                break
            case 'w':
                if (!player1.jumping) {
                    sounds.jump1.play()
                    player1.jumping = true
                }
                break
            case 's':
                if (!player1.attacking) {
                    player1.attack(player2)
                }
                break
            case ' ':
                if (isPlaying) {
                    ost.pause()
                    isPlaying = false
                } else {
                    ost.play()
                    isPlaying = true
                }
        }
    })

    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowRight':
                player2.direction = 1
                break
            case 'ArrowLeft':
                player2.direction = -1
                break
            case 'ArrowUp':
                if (!player2.jumping) {
                    sounds.jump2.play()
                    player2.jumping = true
                }
                break
            case 'ArrowDown':
                if (!player1.attacking) {
                    player2.attack(player1)
                }
                break
        }
    })

    window.addEventListener('keyup', function (e) {
        if (e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 'd')
            player1.direction = 0
    })

    window.addEventListener('keyup', function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
            player2.direction = 0
    })

    let platformTimerin10sec
    function platformReduceIn10sec() {
        platformTimerin10sec = setTimeout(function() {
            plat1.reduce()
        }, 10000)
    }
    platformReduceIn10sec()


    var timerId = setInterval(function () {
        player1.moveX(player2, plat1)
        player1.moveY(plat1, player2)
        if (!player1.jumping) {
            player1.walkSprite()
        }

        player2.moveX(player1, plat1)
        player2.moveY(plat1, player1)
        if (!player2.jumping) {
            player2.walkSprite()
        }

        player2.moveHit(player1)
        player1.moveHit(player2)
        player1.lookAt(player2)
        player2.lookAt(player1)

        lava.grow()
        
        if (player1.collideLava(600 - lava.height)) {
            sounds.fall.play()
            plat1.reduceStop()
            plat1.reset()
            clearTimeout(platformTimerin10sec)
            player1.missLife(lives1, livesArray1, player2)
            platformReduceIn10sec()
        }
        
        if (player2.collideLava(600 - lava.height)) {
            sounds.fall.play()
            plat1.reduceStop()
            plat1.reset()
            clearTimeout(platformTimerin10sec)
            player2.missLife(lives2, livesArray2, player1)
            platformReduceIn10sec()
        }

        if (player1.isDead()) {
            clearInterval(timerId)
            gameOver(player2.playernum, ost, parent)
        }

        if (player2.isDead()) {
            clearInterval(timerId)
            gameOver(player1.playernum, ost, parent)
        }
    }, 50)


}


var canvas = document.getElementById('main')
canvas.addEventListener('click', function(e) {
    e.stopPropagation()
    sounds.startscreen.play()
})