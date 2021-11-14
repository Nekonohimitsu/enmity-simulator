const MAX_CUMULATIVE_ENMITY = 30000;
const MAX_VOLATILE_ENMITY = 30000;
const FLASH_VE = 1280;
const FLASH_CE = 180;

combatActive = false;

/*
* Class representing an Enmity Action
*/
class EnmityAction {

    constructor(name, ve, ce, jobs, targetType) {
        this.name = name;
        this.ve = ve;
        this.ce = ce;
        this.jobs = jobs;
        this.targetType = targetType;
    }
}

const jobs = {
    PLD: "Paladin",
    WHM: "White Mage",
    RUN: "Runefencer",
    NIN: "Ninja",
    BLU: "Blue Mage",
    WAR: "Warrior",
};

const targetTypes = {
    SELF: "Self",
    ENEMY: "Enemy",
    PLAYER: "Player",
    AOE_ENEMY: "AoE Enemy",
    AOE_PLAYER: "AoE Player"
}

const enmityActions = [
    new EnmityAction("Elemental Sforzo", 7200, 1800, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Flash", 1280, 180, [jobs.PLD, jobs.WHM, jobs.RUN], targetTypes.ENEMY),
    new EnmityAction("Invincible",7200,1, [jobs.PLD], targetTypes.SELF),
    new EnmityAction("Provoke",1800,1, [jobs.WAR], targetTypes.ENEMY),
    new EnmityAction("Gambit",1280,640, [jobs.RUN], targetTypes.ENEMY),
    new EnmityAction("Palisade",1800,900, [jobs.PLD], targetTypes.SELF),
    new EnmityAction("Rayke",1260,640, [jobs.RUN], targetTypes.ENEMY),
    new EnmityAction("Jettatura",1020,180, [jobs.BLU], targetTypes.AOE_ENEMY),
    new EnmityAction("Vallation",900,450, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Pflug",900,450, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Valiance",900,450, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Battuta",900,450, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Liement",900,450, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Foil",880,320, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Shield Bash",900,450, [jobs.PLD], targetTypes.ENEMY),
    new EnmityAction("Sentinel",900,0, [jobs.PLD], targetTypes.SELF),
    new EnmityAction("Reprisal",640,0, [jobs.PLD], targetTypes.SELF),
    new EnmityAction("Majesty",340,0, [jobs.PLD], targetTypes.SELF),
    new EnmityAction("Rampart",320,320, [jobs.PLD], targetTypes.AOE_PLAYER),
    new EnmityAction("Yonin",600,1, [jobs.NIN], targetTypes.SELF),
    new EnmityAction("Geist Wall",320,320, [jobs.BLU], targetTypes.AOE_ENEMY),
    new EnmityAction("Stinking Gas",320,320, [jobs.BLU], targetTypes.AOE_ENEMY),
    new EnmityAction("Blank Gaze",320,320, [jobs.BLU], targetTypes.ENEMY),
    new EnmityAction("Soporific",320,320, [jobs.BLU], targetTypes.AOE_ENEMY),
    new EnmityAction("Sheep Song",320,320, [jobs.BLU], targetTypes.AOE_ENEMY),
    new EnmityAction("Swordplay",320,160, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Embolden",320,160, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("One for All",320,160, [jobs.RUN], targetTypes.AOE_PLAYER),
    new EnmityAction("Venom Shell",320,1, [jobs.BLU], targetTypes.AOE_ENEMY),
    new EnmityAction("Sound Blast",320,1, [jobs.BLU], targetTypes.AOE_ENEMY),
    new EnmityAction("Chaotic Eye",320,1, [jobs.BLU], targetTypes.ENEMY),
    new EnmityAction("Migawari: Ichi",300,1, [jobs.NIN], targetTypes.SELF),
    new EnmityAction("Kakka: Ichi",300,1, [jobs.NIN], targetTypes.SELF),
    new EnmityAction("Myoshu: Ichi",300,1, [jobs.NIN], targetTypes.SELF),
    new EnmityAction("Odyllic Subterfuge",318,1, [jobs.RUN], targetTypes.SELF),
    new EnmityAction("Warcry",300,1, [jobs.WAR], targetTypes.AOE_PLAYER),
    new EnmityAction("Chain Affinity",300,1, [jobs.BLU], targetTypes.SELF),
    new EnmityAction("Burst Affinity",300,1, [jobs.BLU], targetTypes.SELF),
    new EnmityAction("Refueling",300,1, [jobs.BLU], targetTypes.SELF),
    new EnmityAction("Metallic Body",300,1, [jobs.BLU], targetTypes.SELF),
    new EnmityAction("Divine Emblem",320,0, [jobs.PLD], targetTypes.SELF),
    new EnmityAction("Monomi: Ichi",240,80, [jobs.NIN], targetTypes.SELF),
    new EnmityAction("Hojo: Ni",240,80, [jobs.NIN], targetTypes.ENEMY),
    new EnmityAction("Aisha: Ichi",240,80, [jobs.NIN], targetTypes.ENEMY),
    new EnmityAction("Cover",300,1, [jobs.PLD], targetTypes.PLAYER),
    new EnmityAction("Fealty",300,1, [jobs.PLD], targetTypes.SELF),
    new EnmityAction("Chivalry",300,1, [jobs.PLD], targetTypes.SELF),
    new EnmityAction("Yurin: Ichi",240,80, [jobs.NIN], targetTypes.ENEMY),
    new EnmityAction("Awful Eye",180,1, [jobs.BLU], targetTypes.AOE_ENEMY),
    new EnmityAction("Utsusemi",160,0, [jobs.NIN], targetTypes.SELF),
    new EnmityAction("Hojo: Ichi",100,20, [jobs.NIN], targetTypes.ENEMY),
    new EnmityAction("Kurayami",100,20, [jobs.NIN], targetTypes.ENEMY),
    new EnmityAction("Dokumori: Ichi",100,20, [jobs.NIN], targetTypes.ENEMY),
    new EnmityAction("Phalanx",160,0, [jobs.PLD, jobs.PLD], targetTypes.SELF),
    new EnmityAction("Holy Circle",20,1, [jobs.PLD], targetTypes.AOE_PLAYER),
    new EnmityAction("Jubaku: Ichi",100,20, [jobs.NIN], targetTypes.ENEMY),
    new EnmityAction("MP Drainkiss",0,320, [jobs.BLU], targetTypes.ENEMY),
];

var volatile_enmity = {
};

var cumulative_enmity = {
};

function adjustVolatileEnmity(playerName, newValue) {
    if (newValue > MAX_VOLATILE_ENMITY) {
        newValue = MAX_VOLATILE_ENMITY;
    }
    volatile_enmity[playerName] = newValue;
    let veElement = document.getElementById(playerName + "ve")
    if (veElement) { 
        veElement.innerText = volatile_enmity[playerName];
    }
}

function getVolatileEnmity(playerName) {
    return volatile_enmity[playerName];
}

function adjustCumulativeEnmity(playerName, newValue) {
    if (newValue > MAX_CUMULATIVE_ENMITY) {
        newValue = MAX_CUMULATIVE_ENMITY;
    }
    cumulative_enmity[playerName] = newValue;
    let ceElement = document.getElementById(playerName + "ce");
    if (ceElement) {
        ceElement.innerText = getCumulativeEnmity(playerName);
    }
}

function getCumulativeEnmity(playerName) {
    return cumulative_enmity[playerName];    
}

function adjustEnmity(playerName, actionCE, actionVE) {
    let enmityMod = document.getElementById(playerName + "Enmity")?.value;
    let ve = getVolatileEnmity(playerName);
    let ce = getCumulativeEnmity(playerName);

    if (enmityMod == 0) {
        ve += actionVE;
        ce += actionCE;

    } else {
        ve += (actionVE * (1 + (enmityMod/100)));
        ce += (actionCE * (1 + (enmityMod/100)));
    }

    adjustCumulativeEnmity(playerName, ce);
    adjustVolatileEnmity(playerName, ve);
}

function partyHasEnmity() {
    for(playerName in cumulative_enmity) {
        if (getCumulativeEnmity(playerName) != 0) {
            return true;
        }
    }
    return false;
}

function performAction(playerName) {
    let actionNameSelected = document.getElementById("actionInput" + playerName).value;
    let messageToUser = document.getElementById("MessageToUser");
    let actionSelected = enmityActions.find((action) => action.name == actionNameSelected);
    updateCombatLog(playerName, actionSelected.name);

    switch(actionSelected.targetType) {
        case targetTypes.SELF:
            if (getCumulativeEnmity(playerName) == 0) {
                messageToUser.textContent = "Notice: This action was performed, but yielded no enmity because it has not been initialized."
                return;
            }
            adjustEnmity(playerName, actionSelected.ce, actionSelected.ve);
            break;
        case targetTypes.ENEMY:
            adjustEnmity(playerName, actionSelected.ce, actionSelected.ve);
            break;
        case targetTypes.PLAYER:
            let selectedPlayer = prompt("Please enter target player name", "");
            if (selectedPlayer == null || selectedPlayer == "" || !(selectedPlayer in volatile_enmity)) {
                selectedPlayer = playerName;
                alert("Player name does not exist. Self-targeting.")
            }
            if (getCumulativeEnmity(selectedPlayer) == 0 && getCumulativeEnmity(playerName) == 0) {
                messageToUser.textContent = "Notice: This action was performed, but yielded no enmity because neither you nor the targeted player have enmity."
                return;
            }
            adjustEnmity(playerName, actionSelected.ce, actionSelected.ve);
            break;
        case targetTypes.AOE_PLAYER:
            let numberOfPlayers = Object.keys(cumulative_enmity).length;
            if (!partyHasEnmity()) {
                messageToUser.textContent = "Notice: This action was performed,  but yielded no enmity because noone in the party has enmity."
                return;
            }
            adjustEnmity(playerName, actionSelected.ce * numberOfPlayers, actionSelected.ve * numberOfPlayers);
            break;
        case targetTypes.AOE_ENEMY:
            adjustEnmity(playerName, actionSelected.ce, actionSelected.ve);
            break;
    }
}

function triggetCombat() {
    combatActive = true;
}

function updateCombatLog(playerName, actionName) {
    let combatLog = document.getElementById("CombatLog");
    combatLog.textContent = combatLog.textContent + "\n" + playerName + " has performed " + actionName + "."; 
}

function createActionButton(baseRow, playerName) {
    let selectActionInput = document.createElement("select");
    selectActionInput.name = "actionInput" + playerName;
    selectActionInput.id = selectActionInput.name;
    selectActionInput.style = "margin:2px"

    for(const action of enmityActions) {
        let newAction = document.createElement("option");
        newAction.value = action.name;
        newAction.innerText = action.name;
        selectActionInput.appendChild(newAction);
    }

    let actionButton = document.createElement("button");
    actionButton.innerText = "Perform Action";
    actionButton.onclick = function(){performAction(playerName)};
    actionButton.style = "margin:2px"

    baseRow.appendChild(selectActionInput);
    baseRow.appendChild(actionButton);
}

function createPlayerRow() {
    let parentDiv = document.getElementById("basePlayerTable");
    let playerNameInput = document.getElementById("newPlayerName");
    let playerName = playerNameInput.value;

    if (playerName == "" || playerName in volatile_enmity) {
        return;
    }

    adjustVolatileEnmity(playerName, 0);
    adjustCumulativeEnmity(playerName, 0);

    let baseRow = document.createElement("tr");

    let name = document.createElement("td");
    name.innerText = playerName;

    let enmity = document.createElement("td");
    let enmityInput = document.createElement("input");
    enmityInput.id = playerName + "Enmity";
    enmityInput.style = "width:90%";
    enmityInput.value = 0;
    enmity.appendChild(enmityInput);

    let ce = document.createElement("td");
    ce.innerText = getCumulativeEnmity(playerName);
    ce.id = playerName + "ce";

    let ve = document.createElement("td");
    ve.innerText = getVolatileEnmity(playerName);
    ve.id = playerName + "ve";

    baseRow.appendChild(name);
    baseRow.appendChild(enmity);
    baseRow.appendChild(ce);
    baseRow.appendChild(ve);

    createActionButton(baseRow, playerName);

    parentDiv.appendChild(baseRow);
}
