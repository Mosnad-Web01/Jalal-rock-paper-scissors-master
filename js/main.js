const rules = document.querySelector('.rule');
const close = document.querySelector('.close');
const ruleBox = document.querySelector('.rule-box');
const choices = document.querySelectorAll('.btn');
const game = document.querySelector('#triangle');
const userChoice = document.querySelector('.user-choice');
const userSelects = document.querySelector('.user-selected');
const compSelects = document.querySelector('.comp-selected');
const result = document.querySelector('.result');
const gameEnd = document.querySelector('.game-end');
const btnPlay = document.querySelector('.btn-play');

rules.addEventListener('click',()=>{
    ruleBox.style.display = "flex";
    rules.style.zIndex = -1;
    game.style.zIndex = -1;
});

close.addEventListener('click',()=>{
    ruleBox.style.display = "none";
    rules.style.zIndex = 0;
    game.style.zIndex = 0;
});

choices.forEach((choice,i)=>{
    choice.addEventListener('click',()=>{
        game.style.display = 'none';
        userChoice.style.display = 'flex';
        choiceStep(i);
        setTimeout(() => {
            CompChoiceStep(i);
            document.querySelector('#removeComp').style.display = 'none';     
        }, 2000);
    })
})


const choiceStep = (i) =>{
    const selectionImg = document.createElement('div');
    selectionImg.classList.add('selection-img');
    selectionImg.style.zIndex = -1;
    userSelects.append(selectionImg);  
    choices[i].classList.add('active');
    const copyUserChoice = choices[i].cloneNode();
    const copyUserChoiceChild = choices[i].children[0].cloneNode();
    copyUserChoice.appendChild(copyUserChoiceChild);
    selectionImg.append(copyUserChoice);
}

const CompChoiceStep = (i) =>{
    const selectionImg = document.createElement('div');
    selectionImg.classList.add('selection-img');
    selectionImg.style.zIndex = -1;
    compSelects.append(selectionImg);
    const indx = Math.floor(Math.random()*3);
    const copyChoice = choices[indx].cloneNode();
    const copyChoiceChild = choices[indx].children[0].cloneNode();
    copyChoice.classList.add('active');
    copyChoice.appendChild(copyChoiceChild)
    selectionImg.append(copyChoice);
    const userChoice = choices[i].id;
    const CompChoice = ['paper','scissors','rock'];
    CompChoice[indx];
    winProcess(userChoice,CompChoice[indx]);
}

const ScoreCollect = document.querySelector('#Score-collect');
let a = 0;

const winProcess = (userChoice,CompChoice) =>{
    let userCondition = true;
    setTimeout(() => {
        gameEnd.style.display = 'flex';
        ScoreCollect.innerHTML = a;
    }, 1000);
    if(userChoice === CompChoice){
       result.innerHTML = 'you draw';
    }else{
        if(userChoice === "paper"){
            userCondition =  CompChoice === 'rock'? true : false;
            userCondition == true? result.innerHTML = 'you win': result.innerHTML = 'you lose';
            userCondition == true?  ScoreCollect.innerHTML = a++ : ScoreCollect.innerHTML = a--;
        }else if(userChoice === "rock"){
            userCondition =  CompChoice === 'scissors'? true : false;
            userCondition == true? result.innerHTML = 'you win':  result.innerHTML = 'you lose';
            userCondition == true?  ScoreCollect.innerHTML = a++ : ScoreCollect.innerHTML = a--;
        }else{
            userCondition =  CompChoice === 'paper'? true : false;
            userCondition == true? result.innerHTML = 'you win':  result.innerHTML = 'you lose';
            userCondition == true?  ScoreCollect.innerHTML = a++ : ScoreCollect.innerHTML = a--;
        }
        if(a < 0){
            a = 0;
        }

    }

}

btnPlay.addEventListener('click',()=>{
    gameEnd.style.display = 'none';
    result.innerHTML = 'Play On Move'
    userChoice.style.display = 'none';
    game.style.display = 'flex';
    document.querySelector('#removeComp').style.display = 'block'; 
    userSelects.children[1].remove();
    compSelects.children[2].remove();
    for(let i = 1;i < 4;i++){
        game.children[i].classList.remove('active');
    };
})