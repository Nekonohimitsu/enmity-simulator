const MAX_CUMULATIVE_ENMITY = 30000;
const MAX_VOLATILE_ENMITY = 30000;
var volatile_enmity = {
};

var cumlative_enmity = {
};

function adjustVolatileEnmity(playerName) {
    var currentEnmity = volatile_enmity[playerName];
    if (currentEnmity < 60) {
        volatile_enmity[playerName] = 0;
    } else {
        volatile_enmity[playerName] = currentEnmity - 60;
    }
}

function getVolatileEnmity(playerName) {
    return volatile_enmity[playerName];
}

function adjustCumulativeEnmity(playerName) {

}

function getCumulativeEnmity(playerName) {
    return cumlative_enmity[playerName];
}

function createPlayerRow() {
    let parentDiv = document.getElementById("basePlayerTable");
    let playerNameInput = document.getElementById("newPlayerName");
    let playerName = playerNameInput.value;

    if (playerName == "" || volatile_enmity[playerName]) {
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
    enmity.appendChild(enmityInput);

    let ce = document.createElement("td");
    ce.innerText = getCumulativeEnmity(playerName);

    let ve = document.createElement("td");
    ve.innerText = getVolatileEnmity(playerName);

    baseRow.appendChild(name);
    baseRow.appendChild(enmity);
    baseRow.appendChild(ce);
    baseRow.appendChild(ve);

    parentDiv.appendChild(baseRow);
}