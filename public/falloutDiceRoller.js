///////////////////////////////////////
newAP = 0;

function setAP(AP){
    newAP = AP;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadStats').click();
});

function reload(){
    document.getElementById('loadStats').click();
}

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
            document.getElementById('character-name').textContent = stats.characterName || '';
            document.getElementById('Strength').textContent = stats.Strength || 0;
            document.getElementById('Perception').textContent = stats.Perception || 0;
            document.getElementById('Endurance').textContent = stats.Endurance || 0;
            document.getElementById('Charisma').textContent = stats.Charisma || 0;
            document.getElementById('Intelligence').textContent = stats.Intelligence || 0;
            document.getElementById('Agility').textContent = stats.Agility || 0;
            document.getElementById('Luck').textContent = stats.Luck || 0;
            document.getElementById('APTotal').textContent = stats.APTotal || 0;

            document.getElementById('Athletics').textContent = stats.Athletics || 0;
            document.getElementById('Barter').textContent = stats.Barter || 0;
            document.getElementById('Big Guns').textContent = stats['Big Guns'] || 0;
            document.getElementById('Energy Weapons').textContent = stats['Energy Weapons'] || 0;
            document.getElementById('Explosives').textContent = stats.Explosives || 0;
            document.getElementById('Lockpick').textContent = stats.Lockpick || 0;
            document.getElementById('Medicine').textContent = stats.Medicine || 0;
            document.getElementById('Melee Weapons').textContent = stats['Melee Weapons'] || 0;
            document.getElementById('Pilot').textContent = stats.Pilot || 0;
            document.getElementById('Repair').textContent = stats.Repair || 0;
            document.getElementById('Science').textContent = stats.Science || 0;
            document.getElementById('Small Guns').textContent = stats['Small Guns'] || 0;
            document.getElementById('Sneak').textContent = stats.Sneak || 0;
            document.getElementById('Speech').textContent = stats.Speech || 0;
            document.getElementById('Survival').textContent = stats.Survival || 0;
            document.getElementById('Throwing').textContent = stats.Throwing || 0;
            document.getElementById('Unarmed').textContent = stats.Unarmed || 0;

        } else {
            console.error('Failed to retrieve stats.');
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
    }

})


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollForSkill(attributeValue, skillValue, outputDivId) {

    APValue = parseInt(document.getElementById('AP').value || 0);
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

        document.getElementById(outputDivId).innerHTML = `<p>Target: ${target}</p>
                                                          <p>Roll Results: Dice 1 = ${diceRoll1}, Dice 2 = ${diceRoll2} </p>
                                                          <p>Number of Successes: ${successes}</p>`;
    }
    else if (APValue == 1) {
        reSave = true

        //record new AP value after subtracting consumed AP and then set field value back to 0
        setAP(document.getElementById('AP').value);
        document.getElementById('AP').value = 0;
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

        //record new AP value after subtracting consumed AP and then set field value back to 0
        setAP(document.getElementById('AP').value);
        document.getElementById('AP').value = 0;
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

        //record new AP value after subtracting consumed AP and then set field value back to 0
        setAP(document.getElementById('AP').value);
        document.getElementById('AP').value = 0;
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

        //record new AP value after subtracting consumed AP and then set field value back to 0
        setAP(document.getElementById('AP').value);
        document.getElementById('AP').value = 0;
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

        //record new AP value after subtracting consumed AP and then set field value back to 0
        setAP(document.getElementById('AP').value);
        document.getElementById('AP').value = 0;
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

        //record new AP value after subtracting consumed AP and then set field value back to 0
        setAP(document.getElementById('AP').value);
        document.getElementById('AP').value = 0;
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
        saveNewAP()
        reload();
    }
}

///////////////////////////////////////

document.getElementById('Athletics-button').addEventListener('click', (e) => {

    const skill = parseInt(document.getElementById('Athletics').textContent || 0);

    const attri = parseInt(document.getElementById('Strength').textContent || 0);

    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Barter-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Barter').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Charisma').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Big Guns-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Big Guns').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Endurance').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Energy Weapons-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Energy Weapons').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Perception').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Explosives-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Explosives').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Perception').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Lockpick-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Lockpick').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Perception').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Medicine-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Medicine').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Intelligence').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Melee Weapons-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Melee Weapons').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Strength').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Pilot-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Pilot').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Perception').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Repair-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Repair').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Intelligence').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Science-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Science').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Intelligence').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Small Guns-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Small Guns').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Agility').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Sneak-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Sneak').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Agility').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Speech-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Speech').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Charisma').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Survival-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Survival').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Endurance').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Throwing-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Throwing').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Agility').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});

document.getElementById('Unarmed-button').addEventListener('click', (e) => {
    const skill = parseInt(document.getElementById('Unarmed').textContent || 0, 10);
    const attri = parseInt(document.getElementById('Strength').textContent || 0, 10);
    rollForSkill(attri, skill, 'output-div');
});


async function saveNewAP() {
    try {
        const response = await fetch('/getStats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const stats = await response.json();

            console.log('APTotal:', stats.APTotal);
            console.log('AP Consumed:', newAP);
            const finalAP = parseInt(stats.APTotal)-parseInt(newAP); 
            // Update APTotal in the stats object
            stats.APTotal = finalAP >= 0 ? finalAP : 0;

            document.getElementById('AP').textContent = stats.APTotal;
            console.log(stats);
            // Send updated stats back to the server
            const updateResponse = await fetch('/saveStats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({stats}), // Send stats as a flat object
            });

            if (updateResponse.ok) {
                console.log('APTotal updated successfully:', stats.APTotal);
            } else {
                console.error('Failed to update APTotal on the server.');
            }
        } else {
            console.error('Failed to retrieve stats.');
        }
    } catch (error) {
        console.error('Error fetching or updating stats:', error);
    }
}



