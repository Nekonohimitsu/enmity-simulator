const MAX_CUMULATIVE_ENMITY = 30000;
const MAX_VOLATILE_ENMITY = 30000;
const FLASH_VE = 1280;
const FLASH_CE = 180;
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

var cumlative_enmity = {
};

function adjustVolatileEnmity(playerName, newValue) {
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
    cumlative_enmity[playerName] = newValue;
    let ceElement = document.getElementById(playerName + "ce");
    if (ceElement) {
        ceElement.innerText = cumlative_enmity[playerName];
    }
}

function getCumulativeEnmity(playerName) {
    return cumlative_enmity[playerName];    
}

function performFlash(playerName) {
    let enmityMod = document.getElementById(playerName + "Enmity")?.value;
    let ve = 0;
    let ce = 0;

    if (enmityMod == 0) {
        ve += FLASH_VE;
        ce += FLASH_CE;

    } else {
        ve += (FLASH_VE * (1 + (enmityMod/100)));
        ce += (FLASH_CE * (1 + (enmityMod/100)));
    }

    adjustCumulativeEnmity(playerName, ce);
    adjustVolatileEnmity(playerName, ve);
}

function performAction(playerName, actionName) {
    //If Player, pop-up to ask which player selecting
//     SELF: "Self",
//     ENEMY: "Enemy",
//     PLAYER: "Player", -- who?
//     AOE_ENEMY: "AoE Enemy",
//     AOE_PLAYER: "AoE Player"

}

function createActionButton(baseRow, playerName) {
    let selectActionInput = document.createElement("select");
    selectActionInput.name = "actionInput";
    selectActionInput.id = selectActionInput.name;
    selectActionInput.style = "margin:2px"

    for(const action of enmityActions) {
        let newAction = document.createElement("option");
        newAction.value = action;
        newAction.innerText = action.name;
        selectActionInput.appendChild(newAction);
    }

    let actionButton = document.createElement("button");
    actionButton.innerText = "Perform Action";
    actionButton.onclick = function(){performFlash(playerName)};
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

    volatile_enmity[playerName] = 0;
    cumlative_enmity[playerName] = 0;

    let baseRow = document.createElement("tr");

    let name = document.createElement("td");
    name.innerText = playerName;

    let enmity = document.createElement("td");
    let enmityInput = document.createElement("input");
    enmityInput.id = playerName + "Enmity";
    enmityInput.style = "width:95%";
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

    createActionButton(baseRow);

    parentDiv.appendChild(baseRow);
}
