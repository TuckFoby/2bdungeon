///Chat Box////
const socket = io(); // connect to the server
const chatboxMessages = document.getElementById('chatbox-messages');
const inputField = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const username = document.getElementById('username').value;

// send message to the server
sendButton.addEventListener('click', sendMessage);
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = inputField.value.trim();
    if (message) {
        socket.emit('chat message', { username, message });
        inputField.value = '';
    }
}

socket.on('chat history', (history) => {
    const messagesContainer = document.getElementById('chatbox-messages');
    history.forEach(({ username, message, timestamp }) => {
        const msgEl = document.createElement('div');
        msgEl.textContent = `[${new Date(timestamp).toLocaleTimeString()}] ${username}: ${message}`;
        messagesContainer.appendChild(msgEl);
    });
});

socket.on('chat message', ({ username, message, timestamp }) => {
    const messagesContainer = document.getElementById('chatbox-messages');
    const msgEl = document.createElement('div');
    msgEl.textContent = `[${new Date(timestamp).toLocaleTimeString()}] ${username}: ${message}`;
    messagesContainer.appendChild(msgEl);

    // autoscrolls to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('roll message', ({ username, target, rolls, successes, timestamp }) => {
    const rollsOutput = rolls.map((roll, index) => `Dice ${index + 1} = ${roll}`).join(', ');
    const message = `[${new Date(timestamp).toLocaleTimeString()}] ${username}: 🎲 Target: ${target}, Rolls: ${rollsOutput}, Successes: ${successes}`;
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatboxMessages.appendChild(messageElement);
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
});

document.addEventListener('DOMContentLoaded', () => {
    loadFromMongo();
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('save-button').addEventListener('click', async () => {
        saveToMongo();
    });
})

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('load-button').addEventListener('click', async () => {
        loadFromMongo();
    });
})

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
        const checkbox = tagCheckBoxes[key];
        tagCheckBoxes[key] = checkbox.checked ? "True" : "False"; // replace element with value depending on if
    }); //                                                           checkbox was checked our not

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
                'x-csrf-token': document.querySelector('input[name="_csrf"]').value
            },
            body: JSON.stringify({ stats }),
            credentials: 'same-origin'
        });
    
        if (response.ok) {
            const result = await response.json(); // optional
            console.log("Stats saved:", result);
            alert('Stats saved successfully.');
        } else {
            const error = await response.json();
            console.error("Server error response:", error);
            alert('Error saving stats; server rejected the request.');
        }
    } catch (error) {
        console.error("Fetch failed:", error);
        alert('Error saving stats; could not reach "/saveStats"');
    }
}

function collectWeapons(stats) {
    // Select all rows in the weapons table
    const rows = document.querySelectorAll('.weapons-table tbody tr');

    rows.forEach((row, index) => {
        // Generate a unique property name for each row, e.g., `weprow1`, `weprow2`, etc.
        const rowKey = `weprow${index + 1}`;

        // Collect the row's data
        const wepNameInput = row.querySelector('input[name="wep-name"]');
        const wepSkillInput = row.querySelector('select[name="wep-skill"]');
        const wepTargetNumInput = row.querySelector('input[name="wep-target-number"]');
        const wepTAGInput = row.querySelector('input[name="wep-tag"]');
        const wepDamageInput = row.querySelector('input[name="wep-damage"]');
        const wepEffectsInput = row.querySelector('select[name="wep-effects"]');
        const wepTypesInput = row.querySelector('select[name="wep-types"]');
        const wepRangeInput = row.querySelector('select[name="wep-range"]');
        const wepQualitiesInput = row.querySelector('select[name="wep-qualities"]');
        const wepAmmoInput = row.querySelector('select[name="wep-ammo"]');
        const wepWeightInput = row.querySelector('input[name="wep-weight"]');

        if (wepNameInput) {
            // Helper function to collect selected values from a multi-select dropdown
            const getSelectedValues = (selectElement) => {
                return Array.from(selectElement.options)
                    .filter(option => option.selected)
                    .map(option => option.value);
            };

            // Add a new property to the `stats` object for the current row
            stats[rowKey] = {
                wepName: wepNameInput.value || '',
                wepSkill: wepSkillInput?.value || '',
                wepTargetNum: wepTargetNumInput?.value || 0,
                wepTAG: wepTAGInput?.checked || false,
                wepDamage: wepDamageInput?.value || 0,
                wepEffects: wepEffectsInput ? getSelectedValues(wepEffectsInput) : [],
                wepType: wepTypesInput?.value || '',
                wepRange: wepRangeInput?.value || '',
                wepQualities: wepQualitiesInput ? getSelectedValues(wepQualitiesInput) : [],
                wepAmmo: wepAmmoInput?.value || '',
                wepWeight: wepWeightInput?.value || 0
            };

            console.log('Adding weapon:', rowKey, stats[rowKey]);
        }
    });
}



function collectAmmo(stats) {
    const rows = document.querySelectorAll('.ammo-table tbody tr');

    rows.forEach((row, index) => {
        // generate a unique property name for each row, e.g., `row1`, `row2`
        const rowKey = `ammorow${index + 1}`;

        // collect the row's data
        const ammoSelect = row.querySelector('select[name="gearAmmo"]');
        const ammoQuantity = row.querySelector('input[name="ammo-quantity"]');

        if (ammoSelect && ammoQuantity) {
            // add a new property to the `stats` object for the current row
            stats[rowKey] = {
                ammo: ammoSelect.value || "No Ammo Selected",
                quantity: parseInt(ammoQuantity.value, 10) || 0,
            };

            if (stats[rowKey].quantity > 100) {
                stats[rowKey].note = "High quantity"; // Add a note for high quantity
            }

            console.log('Adding ammo:', rowKey);
        }
    })
}

function collectGear(stats) {
    //collect from gear table
    const rows = document.querySelectorAll('.gear-table tbody tr');
    rows.forEach((row, index) => {
        // generate a unique property name for each row, e.g., `row1`, `row2`
        const rowKey = `gearrow${index + 1}`;

        // collect the row's data
        const gearInput = row.querySelector('input[name="gear-item"]');
        const amountInput = row.querySelector('input[name="gear-amount"]');
        const weightInput = row.querySelector('input[name="gear-weight"]');

        if (gearInput && weightInput) {
            stats[rowKey] = {
                gear: gearInput.value || 0,
                amount: amountInput.value || 0,
                weight: parseInt(weightInput.value, 10) || 0, // weight quantity
            };

            if (stats[rowKey].quantity > 100) {
                stats[rowKey].note = "High quantity"; // add a note for high quantity
            }

            console.log('Adding gear:', rowKey);
        }



    }, []);
}

function collectPerks(stats) {
    //collect from perk table
    const rows = document.querySelectorAll('.perks-table tbody tr');
    rows.forEach((row, index) => {
        // generate a unique property name for each row, e.g., `row1`, `row2`
        const rowKey = `perkrow${index + 1}`;

        const perkNameInput = row.querySelector('input[name="perk-name"]');
        const perkRankInput = row.querySelector('input[name="perk-rank"]');
        const perkEffectInput = row.querySelector('textarea[name="perk-effect"]');

        if (perkNameInput && perkRankInput && perkEffectInput) {
            stats[rowKey] = {
                perkName: perkNameInput.value || 0,
                perkRank: perkRankInput.value || 0,
                perkEffect: perkEffectInput.value || 0,
            };

            if (stats[rowKey].quantity > 100) {
                stats[rowKey].note = "High quantity"; // add a note for high quantity
            }

            console.log('Adding perk:', rowKey);
        }

    }, []);
}

function loadWeapons(stats) {
    const weaponKeys = Object.keys(stats).filter(key => key.startsWith('weprow'));
    const weapons = weaponKeys.map(key => stats[key]);

    const rows = document.querySelectorAll('.weapons-table tbody tr');

    // iterate through each row and set the values
    rows.forEach((row, index) => {
        const weapon = weapons[index];

        if (weapon) {
            row.querySelector('input[name="wep-name"]').value = weapon.wepName || '';
            row.querySelector('select[name="wep-skill"]').value = weapon.wepSkill || '';
            row.querySelector('input[name="wep-target-number"]').value = weapon.wepTargetNum || 0;
            row.querySelector('input[name="wep-tag"]').checked = weapon.wepTAG === true;
            row.querySelector('input[name="wep-damage"]').value = weapon.wepDamage || 0;

            // set multiple-select values for effects
            const effectsSelect = row.querySelector('select[name="wep-effects"]');
            if (effectsSelect) {
                Array.from(effectsSelect.options).forEach(option => {
                    option.selected = weapon.wepEffects && weapon.wepEffects.includes(option.value);
                });
            }

            row.querySelector('select[name="wep-types"]').value = weapon.wepType || '';
            row.querySelector('input[name="wepRate"]').value = weapon.wepRate || 0;
            row.querySelector('select[name="wep-range"]').value = weapon.wepRange || '';

            const qualitiesSelect = row.querySelector('select[name="wep-qualities"]');
            if (qualitiesSelect) {
                Array.from(qualitiesSelect.options).forEach(option => {
                    option.selected = weapon.wepQualities && weapon.wepQualities.includes(option.value);
                });
            }

            const ammoSelect = row.querySelector('select[name="wep-ammo"]');
            if (ammoSelect) {
                Array.from(ammoSelect.options).forEach(option => {
                    option.selected = weapon.wepAmmo && weapon.wepAmmo.includes(option.value);
                });
            }

            row.querySelector('input[name="wep-weight"]').value = weapon.wepWeight || 0;
        } else {
            // clear the row if no weapon data is available
            row.querySelector('input[name="wep-name"]').value = '';
            row.querySelector('select[name="wep-skill"]').value = '';
            row.querySelector('input[name="wep-target-number"]').value = 0;
            row.querySelector('input[name="wep-tag"]').checked = false;
            row.querySelector('input[name="wep-damage"]').value = 0;
            row.querySelector('select[name="wep-types"]').value = '';
            row.querySelector('input[name="wepRate"]').value = 0;
            row.querySelector('select[name="wep-range"]').value = '';

            const effectsSelect = row.querySelector('select[name="wep-effects"]');
            if (effectsSelect) {
                Array.from(effectsSelect.options).forEach(option => {
                    option.selected = false;
                });
            }

            const qualitiesSelect = row.querySelector('select[name="wep-qualities"]');
            if (qualitiesSelect) {
                Array.from(qualitiesSelect.options).forEach(option => {
                    option.selected = false;
                });
            }

            const ammoSelect = row.querySelector('select[name="wep-ammo"]');
            if (ammoSelect) {
                Array.from(ammoSelect.options).forEach(option => {
                    option.selected = false;
                });
            }

            row.querySelector('input[name="wep-weight"]').value = 0;
        }
    });
}

function loadAmmo(stats) {
    const ammoKeys = Object.keys(stats).filter(key => key.startsWith('ammorow'));
    const ammoDataArray = ammoKeys.map(key => stats[key]);

    const ammoRows = document.querySelectorAll('.ammo-table tbody tr');

    // iterate through each row and set the values
    ammoRows.forEach((row, index) => {
        const ammoData = ammoDataArray[index];
        if (ammoData) {
            const ammoType = ammoData.ammo || '';

            // debug: Log to check ammoType and available options
            //console.log("Setting ammo type:", ammoType);
            //console.log("Available options:", Array.from(row.querySelector('select[name="gearAmmo"]').options).map(option => option.value));

            const selectField = row.querySelector('select[name="gearAmmo"]');
            if (selectField) {
                const matchingOption = Array.from(selectField.options).find(option => option.value === ammoType);
                if (matchingOption) {
                    selectField.value = ammoType;
                } else {
                    console.warn(`Ammo type ${ammoType} not found in dropdown options`);
                    selectField.value = ''; // default to empty if no match
                }
            }

            const quantityField = row.querySelector('input[name="ammo-quantity"]');
            if (quantityField) {
                quantityField.value = ammoData.quantity || 0;
            }
        } else {
            const selectField = row.querySelector('select[name="gearAmmo"]');
            if (selectField) selectField.value = '';
            
            const quantityField = row.querySelector('input[name="ammo-quantity"]');
            if (quantityField) quantityField.value = 0;
        }
    });
}

function loadGear(stats) {
    // transform stats to extract gear rows into an array
    const gearKeys = Object.keys(stats).filter(key => key.startsWith('gearrow'));
    const gearDataArray = gearKeys.map(key => stats[key]);

    const gearRows = document.querySelectorAll('.gear-table tbody tr');

    // iterate through each row and set the values
    gearRows.forEach((row, index) => {
        const gearData = gearDataArray[index];

        if (gearData) {
            row.querySelector('input[name="gear-item"]').value = gearData.gear || '';
            row.querySelector('input[name="gear-amount"]').value = gearData.amount || 0;
            row.querySelector('input[name="gear-weight"]').value = gearData.weight || 0;
        } else {
            row.querySelector('input[name="gear-item"]').value = '';
            row.querySelector('input[name="gear-item"]').value = 0;
            row.querySelector('input[name="gear-weight"]').value = 0;
        }
    });
}


function loadPerks(stats) {
    const perkKeys = Object.keys(stats).filter(key => key.startsWith('perkrow'));
    const perkDataArray = perkKeys.map(key => stats[key]);

    const perkRows = document.querySelectorAll('.perks-table tbody tr');

    // iterate through each row and set the values
    perkRows.forEach((row, index) => {
        const perkData = perkDataArray[index];

        if (perkData) {
            const perkNameField = row.querySelector('input[name="perk-name"]');
            if (perkNameField) perkNameField.value = perkData.perkName || '';

            const perkRankField = row.querySelector('input[name="perk-rank"]');
            if (perkRankField) perkRankField.value = perkData.perkRank || 1;

            const perkEffectField = row.querySelector('textarea[name="perk-effect"]');
            if (perkEffectField) perkEffectField.value = perkData.perkEffect || '';
        } else {
            const perkNameField = row.querySelector('input[name="perk-name"]');
            if (perkNameField) perkNameField.value = '';

            const perkRankField = row.querySelector('input[name="perk-rank"]');
            if (perkRankField) perkRankField.value = 1;

            const perkEffectField = row.querySelector('textarea[name="perk-effect"]');
            if (perkEffectField) perkEffectField.value = '';
        }
    });
}

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

    // calculate successes
    rolls.forEach((roll) => {
        if (roll === 1) successes += 2;
        else if (roll <= target) successes++;
    });

    // append message to the chatbox
    socket.emit('roll message', {
        username,
        target,
        rolls,
        successes,
        timestamp: Date.now()
    });
    
    if (reSave) {
        saveToMongo();
    }
}

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

async function loadFromMongo() {

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
            document.getElementById('character-name').value = stats.characterName;
            document.getElementById('xp-earned').value = stats.XPEarned || 0;
            document.getElementById('xp-next-level').value = stats.XPNextLevel || 0;
            document.getElementById('origin').value = stats.Origin || 0;
            document.getElementById('level').value = stats.Level || 0;

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


            document.getElementById('tag-athletics').checked = stats.tagAthletics === "True";
            document.getElementById('tag-barter').checked = stats.tagBarter === "True";
            document.getElementById('tag-big-guns').checked = stats.tagBigGuns === "True";
            document.getElementById('tag-energy-weapons').checked = stats.tagEnergyWeapons === "True";
            document.getElementById('tag-explosives').checked = stats.tagExplosives === "True";
            document.getElementById('tag-lockpick').checked = stats.tagLockpick === "True";
            document.getElementById('tag-medicine').checked = stats.tagMedicine === "True";
            document.getElementById('tag-melee-weapons').checked = stats.tagMeleeWeapons === "True";
            document.getElementById('tag-pilot').checked = stats.tagPilot === "True";
            document.getElementById('tag-repair').checked = stats.tagRepair === "True";
            document.getElementById('tag-science').checked = stats.tagScience === "True";
            document.getElementById('tag-small-guns').checked = stats.tagSmallGuns === "True";
            document.getElementById('tag-sneak').checked = stats.tagSneak === "True";
            document.getElementById('tag-speech').checked = stats.tagSpeech === "True";
            document.getElementById('tag-throwing').checked = stats.tagThrowing === "True";
            document.getElementById('tag-unarmed').checked = stats.tagUnarmed === "True";
            document.getElementById('tag-survival').checked = stats.tagSurvival === "True";

            document.getElementById('melee-damage').value = stats.meleeDamage;
            document.getElementById('defense').value = stats.defense;
            document.getElementById('initiative').value = stats.initiative;
            document.getElementById('luck-points').value = stats.luckPoints;
            document.getElementById('ap-total').value = stats.APTotal;

            document.getElementById('left-arm-phys-dr').value = stats.leftArmPhysDR || 0;
            document.getElementById('left-arm-rad-dr').value = stats.leftArmRadDR || 0;
            document.getElementById('left-arm-en-dr').value = stats.leftArmEnDR || 0;
            document.getElementById('left-arm-hp').value = stats.leftArmHP || 0;

            document.getElementById('head-phys-dr').value = stats.headPhysDR || 0;
            document.getElementById('head-rad-dr').value = stats.headRadDR || 0;
            document.getElementById('head-en-dr').value = stats.headEnDR || 0;
            document.getElementById('head-hp').value = stats.headHP || 0;

            document.getElementById('right-arm-phys-dr').value = stats.rightArmPhysDR || 0;
            document.getElementById('right-arm-rad-dr').value = stats.rightArmRadDR || 0;
            document.getElementById('right-arm-en-dr').value = stats.rightArmEnDR || 0;
            document.getElementById('right-arm-hp').value = stats.rightArmHP || 0;

            document.getElementById('left-leg-phys-dr').value = stats.leftLegPhysDR || 0;
            document.getElementById('left-leg-rad-dr').value = stats.leftLegRadDR || 0;
            document.getElementById('left-leg-en-dr').value = stats.leftLegEnDR || 0;
            document.getElementById('left-leg-hp').value = stats.leftLegHP || 0;

            document.getElementById('right-leg-phys-dr').value = stats.rightLegPhysDR || 0;
            document.getElementById('right-leg-rad-dr').value = stats.rightLegRadDR || 0;
            document.getElementById('right-leg-en-dr').value = stats.rightLegEnDR || 0;
            document.getElementById('right-leg-hp').value = stats.rightLegHP || 0;

            document.getElementById('torso-phys-dr').value = stats.torsoPhysDR || 0;
            document.getElementById('torso-rad-dr').value = stats.torsoRadDR || 0;
            document.getElementById('torso-en-dr').value = stats.torsoEnDR || 0;
            document.getElementById('torso-hp').value = stats.torsoHP || 0;

            document.getElementById('current-carry-weight').value = stats.currentCarryWeight || 0;
            document.getElementById('max-carry-weight').value = stats.maxCarryWeight || 0;

            loadWeapons(stats);
            loadAmmo(stats);
            loadGear(stats);
            loadPerks(stats);


        } else {
            console.error('Failed to retrieve stats.');
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
    }

}