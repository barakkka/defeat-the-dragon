const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const healthText = document.querySelector('#healthText');
const xpText = document.querySelector('#xpText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealth = document.querySelector('#monsterHealth');
const outerbox = document.querySelector('.outer');
const wasted = document.querySelector('#wasted');

let health = 100;
let xp = 0;
let gold = 50;
let weaponIndex = 0;
let currentWeapon;
let monsterIndex = 0;
let monsterLife = 0;
let monsterArr = [0, 0, 0];

const weapons = [
    {name: "Stick", power: 10},
    {name: "Dagger", power: 70},
    {name: "Claw hammer", power: 100},
    {name: "Sword", power: 200}
];

const locations = [
    {
        name: "store",
        "button contents": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, townSquare],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button contents": ["Fight Slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, townSquare],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "townSquare",
        "button contents": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. Win the game by defeating the Great Dragon!!"
    },
    {
        name: "attack",
        "button contents": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, townSquare],
        text: "You are fighting a monster"
    },
    {
        name: "Kill",
        "button contents": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [townSquare, townSquare, easterEgg],
        text: "The monster screams AAARRGH! As it dies. \n You also gained some experience points and gold"
    },
    {
        name: "Lose",
        "button contents": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [replay, replay, replay],
        text: "Wasted ☠️"
    },
    {
        name: "easterEgg",
        "button contents": ["2", "8", "Go to town square"],
        "button functions": [two, eight, townSquare],
        text: "Hurrayy!! You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    },
    {
        name: "Kill",
        "button contents": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [townSquare, townSquare, townSquare],
        text: "The monster screams AAARRGH! As it dies from your "+ weapons[weaponIndex].name +". \n You also gained some experience points and gold"
    },
    {
        name: "Win",
        "button contents": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [replay, replay, replay],
        text: "CONGRATULATIONS..You defeat the dragon! YOU WIN THE GAME! 🎉"
    }

]

const monsters = [
    {
        name: "slime",
        life: 50,
        attack: 10
    },
    {
        name: "franged beast",
        life: 150,
        attack: 50
    },
    {
        name: "dragon",
        life: 300,
        attack: 120
    }
]

let myInventory = ["stick"];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

healthText.innerText = health;
xpText.innerText = xp;
goldText.innerText = gold;


function update(location){
    button1.innerText = location["button contents"][0];
    button2.innerText = location["button contents"][1];
    button3.innerText = location["button contents"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goStore(){
    update(locations[0]);
}
function goCave(){
    update(locations[1]);
} 
function townSquare(){
    outerbox.classList.remove('redbox');
    outerbox.classList.remove('gradient');
    update(locations[2]);
    monsterStats.style.visibility = 'hidden';
    monsterStats.style.position = 'absolute';
    button3.classList.remove('hiddenGem');
}

function fightSlime(){
    monsterIndex = 0;
    monsterLife = monsters[monsterIndex].life;
    update(locations[3]);
    monsterStats.style.visibility = 'visible';
    monsterStats.style.position = 'relative';
    monsterName.innerText = monsters[monsterIndex].name;
    monsterHealth.innerText = monsters[monsterIndex].life;
    
    outerbox.classList.add('redbox');

    if(monsterArr[monsterIndex] > 1){
        text.innerText += "\n You have already defeated the slime, This time you will only get 12 gold and no experience points"
    }
    else{
        text.innerText += "\nMonster Attack Power(MAP): " + monsters[monsterIndex].attack + " HP per hit!\n Watch Out, You might MISS";
    }

}
function fightBeast(){
    monsterIndex = 1;
    monsterLife = monsters[monsterIndex].life;
    update(locations[3]);
    monsterStats.style.visibility = 'visible';
    monsterStats.style.position = 'relative';
    monsterName.innerText = monsters[monsterIndex].name;
    monsterHealth.innerText = monsters[monsterIndex].life;
    outerbox.classList.add('redbox');

    if(monsterArr[monsterIndex] > 1){
        text.innerText += "\n You have already defeated the slime, This time you will only get 12 gold and no experience points"
    }
    else{
        text.innerText += "\nMonster Attack Power(MAP): " + monsters[monsterIndex].attack + " HP per hit!\n Watch Out, You might MISS";
    }
}
function fightDragon(){
    monsterIndex = 2;
    monsterLife = monsters[monsterIndex].life;
    update(locations[3]);
    monsterStats.style.visibility = 'visible';
    monsterStats.style.position = 'relative';
    monsterName.innerText = monsters[monsterIndex].name;
    monsterHealth.innerText = monsters[monsterIndex].life;
    outerbox.classList.add('redbox');

    if(monsterArr[monsterIndex] > 1){
        text.innerText += "\n You have already defeated the slime, This time you will only get 12 gold and no experience points"
    }
    else{
        text.innerText += "\nMonster Attack Power(MAP): " + monsters[monsterIndex].attack + " HP per hit!\n Watch Out, You might MISS";
    }
}
function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else{
        text.innerText = "You are out of Gold! Go work harder and Come back later!";
    }
}
function buyWeapon(){
    if(weaponIndex < 3){
        if(gold >= 30){
            weaponIndex++;
            text.innerText = "You have just purchased a " + weapons[weaponIndex].name + "\nYour " + weapons[weaponIndex].name + "'s attack power is : " + weapons[weaponIndex].power + "HP per hit!";
            gold -= 30;
            goldText.innerText = gold;
            myInventory.push(weapons[weaponIndex].name);
        }
        else{
            text.innerText = "You do not have enough Gold to make the purchase!"
        }
    }
    else{
        text.innerText = "You already have the most powerful weapon";
    }
    
}

function attack(){
    if(Math.floor(Math.random() * 10) === 2){
        text.innerText = "Haha..You miss!";
        health -= monsters[monsterIndex].attack;
        healthText.innerText = health;
        if(health <= 0){
            lose();
            text.innerText += "\n Haha..You miss!";
            wasted.classList.add('wastedClass');
        }
    }
    else{
        text.innerText = "You are fighting a monster";
        if(health <= monsters[monsterIndex].attack){
            healthText.innerText = 0;
            wasted.classList.add('wastedClass');
            lose();
        }
        else if(monsterLife <= weapons[weaponIndex].power){
            monsterLife = 0;
            monsterHealth.innerText = monsterLife;
            health -= monsters[monsterIndex].attack;
            healthText.innerText = health;
            if(monsterIndex === 0){
                monsterArr[monsterIndex]++;
                if(monsterArr[monsterIndex] > 1){
                    gold += 12;
                    goldText.innerText = gold;
                }
                else{
                    xp += 2;
                    gold += 50;
                    goldText.innerText = gold;
                    xpText.innerText = xp;
                }
                outerbox.classList.remove('redbox');
                update(locations[7]);
            }
            else if(monsterIndex === 1){
                monsterArr[monsterIndex]++;
                if(monsterArr[monsterIndex] > 1){
                    gold += 30;
                    goldText.innerText = gold;
                }
                else{
                    xp += 2;
                    gold += 70;
                    goldText.innerText = gold;
                    xpText.innerText = xp;
                }
                outerbox.classList.remove('redbox');
                update(locations[4]);
                button3.classList.add('hiddenGem');
            }
            else if(monsterIndex === 2){
                monsterArr[monsterIndex]++;
                if(monsterArr[monsterIndex] > 1){
                    gold += 40;
                    goldText.innerText = gold;
                }
                else{
                    xp += 4;
                    gold += 100;
                    goldText.innerText = gold;
                    xpText.innerText = xp;
                }
                outerbox.classList.remove('redbox');
                update(locations[8]);
            }
        }
        else{
            health -= monsters[monsterIndex].attack;
            monsterLife -= weapons[weaponIndex].power;
            monsterHealth.innerText = monsterLife;
            healthText.innerText = health;
        }
    }
    
}
function dodge(){
    text.innerText = "You dodge an attack from the "+ monsters[monsterIndex].name;
}
function run(){
    update(locations[2]);
}
function lose(){
    monsterStats.style.visibility = 'hidden';
    monsterStats.style.position = 'absolute'; 
    update(locations[5]);
}
function replay(){
    update(locations[2]);
    monsterStats.style.visibility = 'hidden';
    monsterStats.style.position = 'absolute';
    health = 100;
    gold = 50;
    xp = 0;
    weaponIndex = 0;
    monsterArr[0] = 0;
    monsterArr[1] = 0;
    monsterArr[2] = 0;
    healthText.innerText = health;
    goldText.innerText = gold;
    xpText.innerText = xp;
    wasted.classList.remove('wastedClass');
    outerbox.classList.remove('redbox');
}
function easterEgg(){
    monsterStats.style.visibility = 'hidden';
    monsterStats.style.position = 'absolute';
    update(locations[6]);
    wasted.classList.remove('wastedClass');
    button3.classList.remove('hiddenGem');
    outerbox.classList.add('gradient');
}
function two(){
    let found = false;
    let temp;
    text.innerText = "You picked 2. Here are the random numbers: "
    for(let i = 0; i < 10; i++){
        temp = Math.floor(Math.random() * 11)
        if(temp === 2){
            found = true;
        }
        text.innerText += "\n" + temp;
    }
    if(temp){
        text.innerText += "\nRight! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    }
    else{
        text.innerText += "\nWrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health;
    }
    if(health <= 0 ){
        lose();
    }
}
function eight(){
    let found = false;
    let temp;
    text.innerText = "You picked 8. Here are the random numbers: "
    for(let i = 0; i < 10; i++){
        temp = Math.floor(Math.random() * 11);
        text.innerText += "\n" + temp;
        
        if(temp === 8){
            found = true;
        }
    }
    if(temp){
        text.innerText += "\nRight! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    }
    else{
        text.innerText += "\nWrong! You lose 10 health!"
        health -= 100;
        healthText.innerText = health;
    }
    if(health <= 0 ){
        lose();
    }
}