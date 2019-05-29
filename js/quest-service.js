var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    var quests = loadFromStorage('quests')

    if (!quests) {
        quests = createQuest('Male?');
        quests.yes = createQuest('Gandhi');
        quests.no = createQuest('Rita');
    }
    gQuestsTree = quests;
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveToStorage('quests', gQuestsTree)
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the prev, curr global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, res) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    gPrevQuest[res] = createQuest(newQuestTxt)

    gPrevQuest[res].yes = createQuest(newGuessTxt)

    gPrevQuest[res].no = createQuest(gCurrQuest.txt)

}


function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    console.log(key);

    return JSON.parse(localStorage.getItem(key))

}



