
///Chat Box////
const socket = io(); // Connect to the server
const chatboxMessages = document.getElementById('chatbox-messages');
const inputField = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

// Username fetched from server (via template rendering)
const username = document.getElementById('username').value;

// Send message to the server
sendButton.addEventListener('click', sendMessage);
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = inputField.value.trim();
    if (message) {
        socket.emit('chat message', { username, message }); // Emit the message and username to the server
        inputField.value = ''; // Clear the input field
    }
}

// Receive messages from the server
socket.on('chat message', ({ username, message }) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${message}`;
    chatboxMessages.appendChild(messageElement);

    // Scroll to the bottom
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
});
///////////////////////////////////////
async function saveToMongo() {

    const tagCheckBoxes = {
        tagAthletics: document.getElementById("tag-athletics"),
        tagBarter: document.getElementById("tag-barter"),
        tagBigGuns: document.getElementById("tag-big-guns"),
        tagEnergyWeapons: document.getElementById("tag-energy-weapons"),
        tagExplosives: document.getElementById("tag-explosives"),
        tagLockpick: document.getElementById("tag-lockpick"),
        tagMedicine: document.getElementById("tag-medicine"),
        tagMeleeWeapons: document.getElementById("tag-melee-weapons"),
        tagPilot: document.getElementById("tag-pilot"),
        tagRepair: document.getElementById("tag-repair"),
        tagScience: document.getElementById("tag-science"),
        tagSmallGuns: document.getElementById("tag-small-guns"),
        tagSneak: document.getElementById("tag-sneak"),
        tagSpeech: document.getElementById("tag-speech"),
        tagThrowing: document.getElementById("tag-throwing"),
        tagUnarmed: document.getElementById("tag-unarmed"),
        tagSurvival: document.getElementById("tag-survival"),
    }

    Object.keys(tagCheckBoxes).forEach(key => {
        const checkbox = tagCheckBoxes[key]; // access tagCheckBoxes elements
        tagCheckBoxes[key] = checkbox.checked ? "True" : "False"; // replace element with value depending on if-
    }); // -checkbox was checked our not

    //console.log(tagCheckBoxes) // check that values are updated

    stats = {
        characterName: document.getElementById('character-name').value,
        XPEarned: document.getElementById('xp-earned').value || 0,
        XPNextLevel: document.getElementById('xp-next-level').value || 0,
        Origin: document.getElementById('origin').value || 0,
        Level: document.getElementById('level').value || 0,

        Strength: document.getElementById('Strength').value || 0,
        Perception: document.getElementById('Perception').value || 0,
        Endurance: document.getElementById('Endurance').value || 0,
        Charisma: document.getElementById('Charisma').value || 0,
        Intelligence: document.getElementById('Intelligence').value || 0,
        Agility: document.getElementById('Agility').value || 0,
        Luck: document.getElementById('Luck').value || 0,

        Athletics: document.getElementById('Athletics').value || 0,
        Barter: document.getElementById('Barter').value || 0,
        'Big Guns': document.getElementById('Big Guns').value || 0,
        'Energy Weapons': document.getElementById('Energy Weapons').value || 0,
        Explosives: document.getElementById('Explosives').value || 0,
        Lockpick: document.getElementById('Lockpick').value || 0,
        Medicine: document.getElementById('Medicine').value || 0,
        'Melee Weapons': document.getElementById('Melee Weapons').value || 0,
        Pilot: document.getElementById('Pilot').value || 0,
        Repair: document.getElementById('Repair').value || 0,
        Science: document.getElementById('Science').value || 0,
        'Small Guns': document.getElementById('Small Guns').value || 0,
        Sneak: document.getElementById('Sneak').value || 0,
        Speech: document.getElementById('Speech').value || 0,
        Survival: document.getElementById('Survival').value || 0,
        Throwing: document.getElementById('Throwing').value || 0,
        Unarmed: document.getElementById('Unarmed').value || 0,

        tagAthletics: tagCheckBoxes.tagAthletics,
        tagBarter: tagCheckBoxes.tagBarter,
        tagBigGuns: tagCheckBoxes.tagBigGuns,
        tagEnergyWeapons: tagCheckBoxes.tagEnergyWeapons,
        tagExplosives: tagCheckBoxes.tagExplosives,
        tagLockpick: tagCheckBoxes.tagLockpick,
        tagMedicine: tagCheckBoxes.tagMedicine,
        tagMeleeWeapons: tagCheckBoxes.tagMeleeWeapons,
        tagPilot: tagCheckBoxes.tagPilot,
        tagRepair: tagCheckBoxes.tagRepair,
        tagScience: tagCheckBoxes.tagScience,
        tagSmallGuns: tagCheckBoxes.tagSmallGuns,
        tagSneak: tagCheckBoxes.tagSneak,
        tagSpeech: tagCheckBoxes.tagSpeech,
        tagThrowing: tagCheckBoxes.tagThrowing,
        tagUnarmed: tagCheckBoxes.tagUnarmed,
        tagSurvival: tagCheckBoxes.tagSurvival,

        meleeDamage: document.getElementById('melee-damage').value || 0,
        defense: document.getElementById('defense').value || 0,
        initiative: document.getElementById('initiative').value || 0,
        luckPoints: document.getElementById('luck-points').value || 0,
        APTotal: document.getElementById('ap-total').value ||0,

        //left arm
        leftArmPhysDR: document.getElementById('left-arm-phys-dr').value || 0,
        leftArmRadDR: document.getElementById('left-arm-rad-dr').value || 0,
        leftArmEnDR: document.getElementById('left-arm-en-dr').value || 0,
        leftArmHP: document.getElementById('left-arm-hp').value || 0,

        headPhysDR: document.getElementById('head-phys-dr').value || 0,
        headRadDR: document.getElementById('head-rad-dr').value || 0,
        headEnDR: document.getElementById('head-en-dr').value || 0,
        headHP: document.getElementById('head-hp').value || 0,

        rightArmPhysDR: document.getElementById('right-arm-phys-dr').value || 0,
        rightArmRadDR: document.getElementById('right-arm-rad-dr').value || 0,
        rightArmEnDR: document.getElementById('right-arm-en-dr').value || 0,
        rightArmHP: document.getElementById('right-arm-hp').value || 0,

        leftLegPhysDR: document.getElementById('left-leg-phys-dr').value || 0,
        leftLegRadDR: document.getElementById('left-leg-rad-dr').value || 0,
        leftLegEnDR: document.getElementById('left-leg-en-dr').value || 0,
        leftLegHP: document.getElementById('left-leg-hp').value || 0,

        rightLegPhysDR: document.getElementById('right-leg-phys-dr').value || 0,
        rightLegRadDR: document.getElementById('right-leg-rad-dr').value || 0,
        rightLegEnDR: document.getElementById('right-leg-en-dr').value || 0,
        rightLegHP: document.getElementById('right-leg-hp').value || 0,

        torsoPhysDR: document.getElementById('torso-phys-dr').value || 0,
        torsoRadDR: document.getElementById('torso-rad-dr').value || 0,
        torsoEnDR: document.getElementById('torso-en-dr').value || 0,
        torsoHP: document.getElementById('torso-hp').value || 0,

        currentCarryWeight: document.getElementById('current-carry-weight').value || 0,
        maxCarryWeight: document.getElementById('max-carry-weight').value || 0

        //APTotal: document.getElementById('APTotal').value || 0,
    };

    //collect from ammo table
    collectWeapons(stats);
    collectAmmo(stats);
    collectGear(stats);
    collectPerks(stats);

    console.log(stats);

    //STATS.PUSH IS NOT A FUNCTION!

    // Log the array to verify the results
    //console.log(ammoData);


    try {
        const response = await fetch('/saveStats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stats }),
        });

        if (response.ok) {
            alert('Stats saved successfully.');
        } else {
            alert('Error saving stats; Response JSON not normal');
        }
    } catch (error) {
        alert('Error saving stats; could not fetch "/saveStats"');
    }
}


///////////////////////////////////////
/*
document.addEventListener('DOMContentLoaded', () => async () => {
    document.getElementById('loadStats').click();
});

document.getElementById('loadStats').addEventListener('click', async () => {
    try {
        const response = await fetch('/getStats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const stats = await response.json();
            // Update the DOM with the retrieved stats
            document.getElementById('character-name').value = stats.characterName || '';
            document.getElementById('Strength').value = stats.Strength || 0;
            document.getElementById('Perception').value = stats.Perception || 0;
            document.getElementById('Endurance').value = stats.Endurance || 0;
            document.getElementById('Charisma').value = stats.Charisma || 0;
            document.getElementById('Intelligence').value = stats.Intelligence || 0;
            document.getElementById('Agility').value = stats.Agility || 0;
            document.getElementById('Luck').value = stats.Luck || 0;
            document.getElementById('Athletics').value = stats.Athletics || 0;
            document.getElementById('Barter').value = stats.Barter || 0;
            document.getElementById('Big Guns').value = stats['Big Guns'] || 0;
            document.getElementById('Energy Weapons').value = stats['Energy Weapons'] || 0;
            document.getElementById('Explosives').value = stats.Explosives || 0;
            document.getElementById('Lockpick').value = stats.Lockpick || 0;
            document.getElementById('Medicine').value = stats.Medicine || 0;
            document.getElementById('Melee Weapons').value = stats['Melee Weapons'] || 0;
            document.getElementById('Pilot').value = stats.Pilot || 0;
            document.getElementById('Repair').value = stats.Repair || 0;
            document.getElementById('Science').value = stats.Science || 0;
            document.getElementById('Small Guns').value = stats['Small Guns'] || 0;
            document.getElementById('Sneak').value = stats.Sneak || 0;
            document.getElementById('Speech').value = stats.Speech || 0;
            document.getElementById('Survival').value = stats.Survival || 0;
            document.getElementById('Throwing').value = stats.Throwing || 0;
            document.getElementById('Unarmed').value = stats.Unarmed || 0;
            document.getElementById('APTotal').value = stats.APTotal || 0;

        } else {
            console.error('Failed to retrieve stats.');
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
    }

})
*/

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollForSkill(attributeValue, skillValue, APValue, skillID) {
    reSave = false;

    const chatboxMessages = document.getElementById('chatbox-messages');

    function appendMessage(target, diceRolls, successes) {
        const rollsOutput = diceRolls.map((roll, index) => `Dice ${index + 1} = ${roll}`).join(', ');
        const message = `
            <p>${username}: Target: ${target}. Roll Results: ${rollsOutput}. Number of Successes: ${successes}</p>
        `;

        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbox-message');
        messageElement.innerHTML = message;
        chatboxMessages.appendChild(messageElement);

        // Scroll to the bottom of the chatbox
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }

    const rolls = [];
    let successes = 0;
    const target = attributeValue + skillValue;

    if (APValue === 0) {
        rolls.push(getRandomInt(1, 20), getRandomInt(1, 20));
    } else if (APValue === 1) {
        reSave = true;
        rolls.push(getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20));
        document.getElementById(`${skillID}-ap`).value = 0;
        document.getElementById('ap-total').value -= 1;
    } else if (APValue === 2) {
        reSave = true;
        rolls.push(getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20));
        document.getElementById(`${skillID}-ap`).value = 0;
        document.getElementById('ap-total').value -= 2;
    } else if (APValue === 3) {
        reSave = true;
        rolls.push(getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20));
        document.getElementById(`${skillID}-ap`).value = 0;
        document.getElementById('ap-total').value -= 3;
    } else if (APValue === 4) {
        reSave = true;
        rolls.push(getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20));
        document.getElementById(`${skillID}-ap`).value = 0;
        document.getElementById('ap-total').value -= 4;
    } else if (APValue === 5) {
        reSave = true;
        rolls.push(getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20));
        document.getElementById(`${skillID}-ap`).value = 0;
        document.getElementById('ap-total').value -= 5;
    } else if (APValue === 6) {
        reSave = true;
        rolls.push(getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20), getRandomInt(1, 20));
        document.getElementById(`${skillID}-ap`).value = 0;
        document.getElementById('ap-total').value -= 6;
    }

    // Calculate successes
    rolls.forEach((roll) => {
        if (roll === 1) successes += 2;
        else if (roll <= target) successes++;
    });

    // Append message to the chatbox
    appendMessage(target, rolls, successes);

    if (reSave) {
        saveToMongo();
    }
}


////OLD rollForSkill////
/*
function rollForSkill(attributeValue, skillValue, APValue, outputDivId) {

    //APValue = parseInt(document.getElementById('APButton').value || 0);
    reSave = false
    if (APValue == 0) {
        const diceRoll1 = getRandomInt(1, 20);
        const diceRoll2 = getRandomInt(1, 20);

        const target = attributeValue + skillValue;

        let successes = 0;

        if (diceRoll1 == 1) successes += 2;
        else if (diceRoll1 <= target) successes++;
        if (diceRoll2 == 1) successes += 2;
        else if (diceRoll2 <= target) successes++;

        const message = `
        <p>Target: ${target}, Roll Results: Dice 1 = ${diceRoll1}, Dice 2 = ${diceRoll2}. Number of Successes: ${successes}</p>`;

        // Append the message to the chatbox
        const chatboxMessages = document.getElementById('chatbox-messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbox-message');
        messageElement.innerHTML = message;
        chatboxMessages.appendChild(messageElement);                                                    
    }
    else if (APValue == 1) {
        reSave = true
        document.getElementById('APButton').value = 0;
        document.getElementById('APTotal').value -= 1;
        const diceRoll1 = getRandomInt(1, 20);
        const diceRoll2 = getRandomInt(1, 20);
        const diceRoll3 = getRandomInt(1, 20);

        const target = attributeValue + skillValue;

        let successes = 0;

        if (diceRoll1 == 1) successes += 2;
        else if (diceRoll1 <= target) successes++;
        if (diceRoll2 == 1) successes += 2;
        else if (diceRoll2 <= target) successes++;
        if (diceRoll3 == 1) successes += 2;
        else if (diceRoll3 <= target) successes++;

        document.getElementById(outputDivId).innerHTML = `<p>Target: ${target}</p>
                                                          <p>Roll Results: Dice 1 = ${diceRoll1}, Dice 2 = ${diceRoll2}, Dice 3 = ${diceRoll3} </p>
                                                          <p>Number of Successes: ${successes}</p>`;
    }
    else if (APValue == 2) {
        reSave = true
        document.getElementById('APButton').value = 0;
        document.getElementById('APTotal').value -= 2;
        const diceRoll1 = getRandomInt(1, 20);
        const diceRoll2 = getRandomInt(1, 20);
        const diceRoll3 = getRandomInt(1, 20);
        const diceRoll4 = getRandomInt(1, 20);

        const target = attributeValue + skillValue;

        let successes = 0;

        if (diceRoll1 == 1) successes += 2;
        else if (diceRoll1 <= target) successes++;
        if (diceRoll2 == 1) successes += 2;
        else if (diceRoll2 <= target) successes++;
        if (diceRoll3 == 1) successes += 2;
        else if (diceRoll3 <= target) successes++;
        if (diceRoll4 == 1) successes += 2;
        else if (diceRoll4 <= target) successes++;

        document.getElementById(outputDivId).innerHTML = `<p>Target: ${target}</p>
                                                          <p>Roll Results: Dice 1 = ${diceRoll1}, Dice 2 = ${diceRoll2}, Dice 3 = ${diceRoll3} </p>
                                                          <p>Dice 4 = ${diceRoll4}<p>
                                                          <p>Number of Successes: ${successes}</p>`;
    }
    else if (APValue == 3) {
        reSave = true
        document.getElementById('APButton').value = 0;
        document.getElementById('APTotal').value -= 3;
        const diceRoll1 = getRandomInt(1, 20);
        const diceRoll2 = getRandomInt(1, 20);
        const diceRoll3 = getRandomInt(1, 20);
        const diceRoll4 = getRandomInt(1, 20);
        const diceRoll5 = getRandomInt(1, 20);

        const target = attributeValue + skillValue;

        let successes = 0;

        if (diceRoll1 == 1) successes += 2;
        else if (diceRoll1 <= target) successes++;
        if (diceRoll2 == 1) successes += 2;
        else if (diceRoll2 <= target) successes++;
        if (diceRoll3 == 1) successes += 2;
        else if (diceRoll3 <= target) successes++;
        if (diceRoll4 == 1) successes += 2;
        else if (diceRoll4 <= target) successes++;
        if (diceRoll5 == 1) successes += 2;
        else if (diceRoll5 <= target) successes++;

        document.getElementById(outputDivId).innerHTML = `<p>Target: ${target}</p>
                                                          <p>Roll Results: Dice 1 = ${diceRoll1}, Dice 2 = ${diceRoll2}, Dice 3 = ${diceRoll3} </p>
                                                          <p>Dice 4 = ${diceRoll4}, Dice 5 = ${diceRoll5}<p>
                                                          <p>Number of Successes: ${successes}</p>`;
    }
    else if (APValue == 4) {
        reSave = true
        document.getElementById('APButton').value = 0;
        document.getElementById('APTotal').value -= 4;
        const diceRoll1 = getRandomInt(1, 20);
        const diceRoll2 = getRandomInt(1, 20);
        const diceRoll3 = getRandomInt(1, 20);
        const diceRoll4 = getRandomInt(1, 20);
        const diceRoll5 = getRandomInt(1, 20);
        const diceRoll6 = getRandomInt(1, 20);

        const target = attributeValue + skillValue;

        let successes = 0;

        if (diceRoll1 == 1) successes += 2;
        else if (diceRoll1 <= target) successes++;
        if (diceRoll2 == 1) successes += 2;
        else if (diceRoll2 <= target) successes++;
        if (diceRoll3 == 1) successes += 2;
        else if (diceRoll3 <= target) successes++;
        if (diceRoll4 == 1) successes += 2;
        else if (diceRoll4 <= target) successes++;
        if (diceRoll5 == 1) successes += 2;
        else if (diceRoll5 <= target) successes++;
        if (diceRoll6 == 1) successes += 2;
        else if (diceRoll6 <= target) successes++;

        document.getElementById(outputDivId).innerHTML = `<p>Target: ${target}</p>
                                                          <p>Roll Results: Dice 1 = ${diceRoll1}, Dice 2 = ${diceRoll2}, Dice 3 = ${diceRoll3} </p>
                                                          <p>Dice 4 = ${diceRoll4}, Dice 5 = ${diceRoll5}, Dice 6 = ${diceRoll6}<p>
                                                          <p>Number of Successes: ${successes}</p>`;
    }
    else if (APValue == 5) {
        reSave = true
        document.getElementById('APButton').value = 0;
        document.getElementById('APTotal').value -= 5;

        const diceRoll1 = getRandomInt(1, 20);
        const diceRoll2 = getRandomInt(1, 20);
        const diceRoll3 = getRandomInt(1, 20);
        const diceRoll4 = getRandomInt(1, 20);
        const diceRoll5 = getRandomInt(1, 20);
        const diceRoll6 = getRandomInt(1, 20);
        const diceRoll7 = getRandomInt(1, 20);

        const target = attributeValue + skillValue;

        let successes = 0;

        if (diceRoll1 == 1) successes += 2;
        else if (diceRoll1 <= target) successes++;
        if (diceRoll2 == 1) successes += 2;
        else if (diceRoll2 <= target) successes++;
        if (diceRoll3 == 1) successes += 2;
        else if (diceRoll3 <= target) successes++;
        if (diceRoll4 == 1) successes += 2;
        else if (diceRoll4 <= target) successes++;
        if (diceRoll5 == 1) successes += 2;
        else if (diceRoll5 <= target) successes++;
        if (diceRoll6 == 1) successes += 2;
        else if (diceRoll6 <= target) successes++;
        if (diceRoll7 == 1) successes += 2;
        else if (diceRoll7 <= target) successes++;

        document.getElementById(outputDivId).innerHTML = `<p>Target: ${target}</p>
                                                          <p>Roll Results: Dice 1 = ${diceRoll1}, Dice 2 = ${diceRoll2}, Dice 3 = ${diceRoll3} </p>
                                                          <p>Dice 4 = ${diceRoll4}, Dice 5 = ${diceRoll5}, Dice 6 = ${diceRoll6}, Dice 7 = ${diceRoll7}<p>
                                                          <p>Number of Successes: ${successes}</p>`;
    }
    else if (APValue == 6) {
        reSave = true
        document.getElementById('APButton').value = 0;
        document.getElementById('APTotal').value -= 6;
        const diceRoll1 = getRandomInt(1, 20);
        const diceRoll2 = getRandomInt(1, 20);
        const diceRoll3 = getRandomInt(1, 20);
        const diceRoll4 = getRandomInt(1, 20);
        const diceRoll5 = getRandomInt(1, 20);
        const diceRoll6 = getRandomInt(1, 20);
        const diceRoll7 = getRandomInt(1, 20);
        const diceRoll8 = getRandomInt(1, 20);

        const target = attributeValue + skillValue;

        let successes = 0;

        if (diceRoll1 == 1) successes += 2;
        else if (diceRoll1 <= target) successes++;
        if (diceRoll2 == 1) successes += 2;
        else if (diceRoll2 <= target) successes++;
        if (diceRoll3 == 1) successes += 2;
        else if (diceRoll3 <= target) successes++;
        if (diceRoll4 == 1) successes += 2;
        else if (diceRoll4 <= target) successes++;
        if (diceRoll5 == 1) successes += 2;
        else if (diceRoll5 <= target) successes++;
        if (diceRoll6 == 1) successes += 2;
        else if (diceRoll6 <= target) successes++;
        if (diceRoll7 == 1) successes += 2;
        else if (diceRoll7 <= target) successes++;
        if (diceRoll8 == 1) successes += 2;
        else if (diceRoll8 <= target) successes++;

        document.getElementById(outputDivId).innerHTML = `<p>Target: ${target}</p>
                                                          <p>Roll Results: Dice 1 = ${diceRoll1}, Dice 2 = ${diceRoll2}, Dice 3 = ${diceRoll3} </p>
                                                          <p>Dice 4 = ${diceRoll4}, Dice 5 = ${diceRoll5}, Dice 6 = ${diceRoll6}, Dice 7 = ${diceRoll7}<p>
                                                          <p>Dice 8 = ${diceRoll8}<p>
                                                          <p>Number of Successes: ${successes}</p>`;
    }
    if (reSave == true) {
        saveToMongo()
    }
}
*/
///////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const skills = [
        { id: 'Athletics', attribute: 'Strength' },
        { id: 'Barter', attribute: 'Charisma' },
        { id: 'Big-Guns', attribute: 'Endurance' },
        { id: 'Energy-Weapons', attribute: 'Perception' },
        { id: 'Explosives', attribute: 'Perception' },
        { id: 'Lockpick', attribute: 'Perception' },
        { id: 'Medicine', attribute: 'Intelligence' },
        { id: 'Melee-Weapons', attribute: 'Strength' },
        { id: 'Pilot', attribute: 'Perception' },
        { id: 'Repair', attribute: 'Intelligence' },
        { id: 'Science', attribute: 'Intelligence' },
        { id: 'Small-Guns', attribute: 'Agility' },
        { id: 'Sneak', attribute: 'Agility' },
        { id: 'Speech', attribute: 'Charisma' },
        { id: 'Survival', attribute: 'Endurance' },
        { id: 'Throwing', attribute: 'Agility' },
        { id: 'Unarmed', attribute: 'Strength' }
    ];

    skills.forEach(({ id, attribute }) => {
        const button = document.getElementById(`${id}-roll-button`);
        if (button) {
            button.addEventListener('click', (e) => {
                console.log(`${id}-ap`);
                const skill = parseInt(document.getElementById(id).value || 0);
                const attri = parseInt(document.getElementById(attribute).value || 0);
                const AP = parseInt(document.getElementById(`${id}-ap`).value || 0);

                rollForSkill(attri, skill, AP, id);
            });
        } else {
            console.warn(`Button with ID '${id}-roll-button' not found.`);
        }
    });
});


/*
document.getElementById('athletics-roll-button').addEventListener('click', (e) => {

    const skill = parseInt(document.getElementById('Athletics').value || 0);

    const attri = parseInt(document.getElementById('Strength').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Barter-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Barter').value || 0);

    const attri = parseInt(document.getElementById('Charisma').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Big Guns-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Big Guns').value || 0);

    const attri = parseInt(document.getElementById('Endurance').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Energy Weapons-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Energy Weapons').value || 0);

    const attri = parseInt(document.getElementById('Perception').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Explosives-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Explosives').value || 0);

    const attri = parseInt(document.getElementById('Perception').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Lockpick-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Lockpick').value || 0);

    const attri = parseInt(document.getElementById('Perception').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Medicine-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Medicine').value || 0);

    const attri = parseInt(document.getElementById('Intelligence').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Melee Weapons-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Melee Weapons').value || 0);

    const attri = parseInt(document.getElementById('Strength').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Pilot-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Pilot').value || 0);

    const attri = parseInt(document.getElementById('Perception').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Repair-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Repair').value || 0);

    const attri = parseInt(document.getElementById('Intelligence').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Science-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Science').value || 0);

    const attri = parseInt(document.getElementById('Intelligence').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Small Guns-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Small Guns').value || 0);

    const attri = parseInt(document.getElementById('Agility').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Sneak-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Sneak').value || 0);

    const attri = parseInt(document.getElementById('Agility').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Speech-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Speech').value || 0);

    const attri = parseInt(document.getElementById('Charisma').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Survival-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Survival').value || 0);

    const attri = parseInt(document.getElementById('Endurance').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Throwing-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Throwing').value || 0);

    const attri = parseInt(document.getElementById('Agility').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Unarmed-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Unarmed').value || 0);

    const attri = parseInt(document.getElementById('Strength').value || 0);

    rollForSkill(attri, skill, 'output-div');
});

*/