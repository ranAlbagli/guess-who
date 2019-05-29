'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
    $('.btn-success').click(onStartGuessing)
    // $('.btn-info').click(onUserResponse('yes'));
    // $('.btn-danger').click(onUserResponse('no'));
    createQuestsTree();
}

function onStartGuessing() {
    // hide the game-start section
    $('.game-start').hide()
    renderQuest();
    // show the quest section
    $('.quest').show()
    // init();
}

function renderQuest() {
    // select the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').text(gCurrQuest.txt)
    
}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
        
            //  hide and show new-quest section
            $('.quest').hide()
            $('.new-quest').show()
        }
    } else {
        //  update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // ev.preventDefault();
    //  Get the inputs' values
     var elNewGuess = $('#newGuess').val()
     var elNewQuest = $('#newQuest').val()
    //  Call the service addGuess
    addGuess(elNewQuest, elNewGuess, gLastRes)
    saveToStorage('quests',gQuestsTree)
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gCurrQuest=gQuestsTree;
    gPrevQuest=null;
}

