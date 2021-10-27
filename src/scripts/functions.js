const MAX_CUMULATIVE_ENMITY = 30000;
const MAX_VOLATILE_ENMITY = 30000;
const FLASH_VE = 1280;
const FLASH_CE = 180;

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

    let flashButton = document.createElement("button");
    flashButton.innerText = "Flash Enemy";
    flashButton.onclick = function(){performFlash(playerName)};

    baseRow.appendChild(name);
    baseRow.appendChild(enmity);
    baseRow.appendChild(ce);
    baseRow.appendChild(ve);
    baseRow.appendChild(flashButton);

    parentDiv.appendChild(baseRow);
}