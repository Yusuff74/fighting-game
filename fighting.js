let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

class player{
    constructor(name, health, attackDamage){
        this.name = name
        this.health = health
        this.attackDmg = attackDamage
    }
    strike(player, enemy, attackDmg){
        let damageAmount = Math.ceil(Math.random() * 10)
        enemy.health -= damageAmount

        updateGam(player, enemy, game.isOver)
    }
    heal(player){
       let hpAmount = Math.ceil(Math.random() * 5)
        player.health += hpAmount

        updateGam(p1, p2, game.isOver)

    }
}

const updateGam = (p1, p2, gameState) => {
    p1NameDiv.innerText = p1.name
    p1HealthDiv.innerText = p1.health
    p2NameDiv.innerText = p2.name
    p2HealthDiv.innerText = p2.health

    if (p1.health <= 0 || p2.health <= 0) {
        game.isOver = true
        gameState = game.isOver
        result.innerText = game.declareWinner(gameState, p1, p2)
        return gameState
    }
}


class Game{
    constructor(){
        this.isOver = false
    }

    declareWinner(isOver, p1, p2){
        let message;
        if(this.isOver == true && p1.health <= 0){
            message = `${p2.name} Wins! `
            resultDiv.innerText = message
        }else if(this.isOver == true && p2.health <= 0){
            message = `${p1.name} Wins!`
        }
        return message
    }
    reset(p1, p2){
       p1.health = 100
       p2.health = 100
       this.isOver = false
       resultDiv.innerText = ''
       updateGam(p1, p2, game.isOver)
}
}

let p1 = new player('Yusuf', 100, 10)
let p2 = new player('Computer', 100, 10)



let game = new Game()


// console.log(p1.name)
updateGam(p1, p2, game.isOver)

document.addEventListener('keydown', (e) => {
    if(e.key == 'q' && p2.health >= 0 && game.isOver == false){
        p1.strike(p1, p2, p1.attackDmg)
    }
})

document.addEventListener('keydown', (e) => {
    if(e.key == 'p' && p1.health >= 0 && game.isOver == false){
        p2.strike(p2, p1, p2.attackDmg)
    }
})

document.addEventListener('keydown', (e) => {
    if(e.key == 'a' && p2.health >= 0 && game.isOver == false){
        p1.heal(p1)
    }
})
document.addEventListener('keydown', (e) => {
    if(e.key == 'l' && p1.health >= 0 && game.isOver == false){
        p2.heal(p2)
    }
})

document.getElementById('reset').onclick = () => {
    game.reset(p1, p2)
}