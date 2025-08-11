const playerStates = {   // статы игрока
    level: 1,
    strength: 10,
    armor: 3,
    health: 30,
    maxHealth: 30,
    currentExperience: 0,
    maxExperience: 10,
    strengthBoostTurns: 0,
    armorBoostTurns: 0,
    isDefending: false,
    inCombat: false,
    isAlive: true,
    avatar: "images/kopatych-rest.webp",
    altRest: "Копатыч на отдыхе",
    avatarArmed: "images/kopatych-armed.jpg",
    altArmed: "Копатыч в боевой готовности",
};

const inventoryStates = {    //инвентарь
    heal: 1,
    power: 1,
    defence: 1,
};

const inventoryItemsTypes = ["heal", "power", "defence",];

const enemies = [     // массив с антагонистами (ну и нпс тоже тут)
    {
        location: "Kopatych-house",
        name: "Некультурный сорняк",
        nameGenitive: "Некультурному сорняку",
        avatar: "images/nekulturniy.jpg",
        alt: "Некультурный сорняк в огороде Копатыча",
        health: 30,
        maxHealth: 30,
        armor: 2,
        strength: 5,
        xpReward: 5,
        isAlive: true,
        defeated: false,
    },
    {
        location: "Nyusha-house",
        name: "Хищный цветок",
        nameGenitive: "Хищному цветку",
        avatar: "images/hishniy.jpg",
        alt: "Хищный цветок в доме Нюши",
        health: 50,
        maxHealth: 50,
        armor: 3,
        strength: 7,
        xpReward: 10,
        isAlive: true,
        defeated: false,
    },
    {
        location: "Losyash-house",
        name: "Инопланетный сорняк",
        nameGenitive: "Инопланетному сорняку",
        avatar: "images/inoplanetniy.jpg",
        alt: "Инопланетный сорняк в доме Лосяша",
        health: 100,
        maxHealth: 100,
        armor: 5,
        strength: 10,
        xpReward: 20,
        isAlive: true,
        defeated: false,
    },
    {
        location: "Sovunya-house",
        name: "Совунья",
        avatar: "images/Sovunya.webp",
        alt: "Совунья в безопасной зоне",
    },
];

const locations = {                   // локации
    "Sovunya-house": {
        name: "дом Совуньи",
        background: "images/Sovunya-house.webp",
        alt: "Домик Совуньи",
        isSafeZone: true,
        description: "Копатыч вернулся пить чай с Совуньей и отдыхать.<br>Твоё здоровье восстановлено!",
    },
    "Kopatych-house": {
        name: "дом Копатыча",
        background: "images/kopatych-house.webp",
        alt: "Огород Копатыча",
        isSafeZone: false,
        description: "Копатыч отправился к себе домой, но обнаружил на огороде заросли Некультурного сорняка! Он очень быстро размножается, так не пойдёт! Приступаем к прополке!<br>Твой ход!",
    },
    "Nyusha-house": {
        name: "дом Нюши",
        background: "images/nyusha-house.webp",
        alt: "Домик Нюши",
        isSafeZone: false,
        description: "Нюша в отчаянии просит тебя помочь ей избавиться от Хищного цветка, которого она вырастила случайно по незнанию. У него и зубы есть, укуси меня пчела!<br>Твой ход!",
    },
    "Losyash-house": {
        name: "дом Лосяша",
        background: "images/losyash-house.webp",
        alt: "Домик Лосяша",
        isSafeZone: false,
        description: "Лосяш тщательно выращивал свой Инопланетный сорняк до тех пор, пока он не начал светиться по ночам. Теперь он хочет избавиться от него как можно быстрее. Ты только посмотри на его шипы! Будь осторожнее!<br>Твой ход!",
    },
};

const startDescription = "Копатыч пьёт чай с Совуньей. Отдыхай и ни в чем себе не отказывай!<br>Безопасная зона.";

// прописываем доступ к DOM
const bodyElement = document.body;   // для смены фона
const restart = document.getElementById("restart-button");  // кнопка для перезапуска игры

// интерфейс игрока
const playerXpBar = document.getElementById("player-xp-bar");
const playerHpBar = document.getElementById("player-hp-bar");

const playerAvatar = document.querySelector(".avatar.player img");

const playerLevel = document.getElementById("player-level");
const playerStrength = document.getElementById("player-strength");
const playerArmor = document.getElementById("player-armor");
const playerMaxHealth = document.getElementById("player-health-total");
const playerTotalExperience = document.getElementById("player-xp-total");

// интерфейс инвентаря
const inventoryItemButtons = document.querySelectorAll(".inventory-item"); //кнопки инвентаря(для подсветки сразу всех)

const healthPotionButton = document.getElementById("health-potion");     //кнопки для взаимодействия
const strengthPotionButton = document.getElementById("strength-potion");
const defencePotionButton = document.getElementById("defence-potion");

const healthPotionCount = document.getElementById("health-potion-amount");  //счетчики количества
const strengthPotionCount = document.getElementById("strength-potion-amount");
const defencePotionCount = document.getElementById("defence-potion-amount");

// интерфейс врага
const enemyName = document.querySelector(".enemy-name");
const enemyAvatar = document.querySelector(".avatar.enemy img");

const enemyHpBar = document.getElementById("enemy-hp-bar");

const enemyStatsBlock = document.querySelector(".game-container .character-container .character-wrapper .avatar-and-stats.right .stats");
const restDescription = document.querySelector(".rest-description");

const enemyHpTotal = document.getElementById("enemy-hp-total");
const enemyArmor = document.getElementById("enemy-armor");
const enemyStrength = document.getElementById("enemy-strength");
const enemyReward = document.getElementById("reward");

// кнопки действий
const actionButtonsContainer = document.querySelector(".action-buttons-container");

const attackButton = document.getElementById("attack");
const defenseButton = document.getElementById("defense");
const useItemButton = document.getElementById("useItem");

// интерфейс контейнера с локациями
const currentLocation = document.querySelector(".current-location");  // название текущей локации

const locationButtons = document.querySelectorAll(".location-button"); // кнопки смены локации

// журнал событий
const eventsLog = document.querySelector(".events");

// другие глобальные переменные
let currentLocationKey = "Sovunya-house";
let currentEnemy = null;


// функция обновления UI персонажа
function updatePlayerUI() {
    playerLevel.textContent = playerStates.level;
    playerStrength.textContent = getCurrentStrength();
    playerArmor.textContent = getCurrentArmor();
    playerMaxHealth.textContent = playerStates.maxHealth;
    playerTotalExperience.textContent = playerStates.currentExperience;

    if (playerStates.inCombat) {
        playerAvatar.src = playerStates.avatarArmed;
        playerAvatar.alt = playerStates.altArmed;
    } else {
        playerAvatar.src = playerStates.avatar;
        playerAvatar.alt = playerStates.altRest;
    }

    if (playerStates.isAlive === false) {
        playerHpBar.style.width = "0%";
        playerHpBar.style.backgroundColor = "rgba(205, 15, 15, 0);";
    };

    const xpPercent = (playerStates.currentExperience / playerStates.maxExperience) * 100;
    const hpPercent = (playerStates.health / playerStates.maxHealth) * 100;

    playerXpBar.style.width = `${xpPercent}%`;
    playerHpBar.style.width = `${hpPercent}%`;
};

// функция обновления UI инвентаря
function updateInventoryUI() {
    healthPotionCount.textContent = inventoryStates.heal;
    strengthPotionCount.textContent = inventoryStates.power;
    defencePotionCount.textContent = inventoryStates.defence;
}

// функция обновления UI врага
function updateEnemyUI(location) {
    currentEnemy = enemies.find(enemy => enemy.location === location);  //получаем текущего врага

    if (!currentEnemy || location === "Sovunya-house") {    // если текущий враг- совунья,то показываем блок отдыха
        enemyName.textContent = currentEnemy?.name ?? "Совунья";
        enemyAvatar.src = currentEnemy?.avatar ?? "images/Sovunya.webp";
        enemyAvatar.alt = currentEnemy?.alt ?? "Совунья на отдыхе";
        enemyHpBar.style.backgroundColor = "#cd0f0f00";
        enemyAvatar.style.marginTop = "";

        enemyStatsBlock.style.display = "none";
        restDescription.style.display = "block";
        return;
    }

    if (currentEnemy.isAlive === false & currentEnemy.defeated === true) {
        enemyHpBar.style.width = "0%";
        enemyHpBar.style.backgroundColor = "rgba(205, 15, 15, 0);";
    };

    enemyStatsBlock.style.display = "block";
    restDescription.style.display = "none";

    enemyName.textContent = currentEnemy.name;
    enemyAvatar.src = currentEnemy.avatar;
    enemyAvatar.alt = currentEnemy.alt;

    const hpPercent = (currentEnemy.health / currentEnemy.maxHealth) * 100;
    enemyHpBar.style.width = `${hpPercent}%`;
    enemyHpBar.style.backgroundColor = "#cd0f0f";
    enemyAvatar.style.marginTop = "10px";

    enemyHpTotal.textContent = currentEnemy.maxHealth;
    enemyArmor.textContent = currentEnemy.armor;
    enemyStrength.textContent = currentEnemy.strength;
    enemyReward.textContent = currentEnemy.xpReward;
};

// функция для записи сообщений в журнал
function logEvent(message) {
    eventsLog.innerHTML += `<br>${message}<br>`;
    eventsLog.scrollTop = eventsLog.scrollHeight;  // для прокрутки вниз
};

// функция смены локации
function changeLocation(locationKey) {
    const location = locations[locationKey];   // получаем объект локации
    currentLocationKey = locationKey;  // записываем в глобальную переменную текущую локацию

    currentLocation.textContent = location.name;
    bodyElement.style.backgroundImage = `url(${location.background})`;
    logEvent(location.description);

    playerStates.inCombat = !location.isSafeZone; // устанавливаем флагдля определения безопасная зона или нет

    if (location.isSafeZone) {
        actionButtonsContainer.style.display = "none";
        playerStates.health = playerStates.maxHealth;
    } else {
        actionButtonsContainer.style.display = "flex";
    };

    updatePlayerUI();

    const enemy = enemies.find(enemy => enemy.location === locationKey); // находим врага в локации
    if (enemy && enemy.maxHealth) {      // и сбрасываем его статы
        enemy.health = enemy.maxHealth;
        enemy.isAlive = true;
        enemy.defeated = false;
    };

    updateEnemyUI(locationKey);
    updateInventoryUI();
};

// обработчик клика на кнопки локаций
locationButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeLocation(button.id);
    })
});

// загрузка стартового состояния игры
document.addEventListener("DOMContentLoaded", () => {
    changeLocation("Sovunya-house");
    eventsLog.innerHTML = `${startDescription}<br>`;
});

// функция перезапуска игры
function restartGame() {
    let restart = confirm("Ты уверен, что хочешь перезапустить игру? Весь прогресс будет потерян!");

    if (!restart) return;

    playerStates.level = 1;        // сброс статов игрока
    playerStates.strength = 10;
    playerStates.armor = 3;
    playerStates.health = 30;
    playerStates.maxHealth = 30;
    playerStates.currentExperience = 0;
    playerStates.maxExperience = 10;
    playerStates.strengthBoostTurns = 0;
    playerStates.armorBoostTurns = 0;
    playerStates.isDefending = false;
    playerStates.inCombat = false;
    playerStates.avatar = "images/kopatych-rest.webp";

    inventoryStates.heal = 1;     //сброс инвентаря
    inventoryStates.power = 1;
    inventoryStates.defence = 1;

    enemies.forEach(enemy => {          // сброс статов врагов
        if (enemy.maxHealth) {
            enemy.health = enemy.maxHealth;
            enemy.isAlive = true;
            enemy.defeated = false;
        }
    });

    locationButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "#0493c9";
        button.style.cursor = "pointer";
    });

    changeLocation("Sovunya-house");     //смена локации на стартовую
    eventsLog.innerHTML = "";
    eventsLog.innerHTML = `${startDescription}<br>`;
};

// обработчик для кнопки рестарт
restart.addEventListener("click", () => {
    restartGame();
});

// функция атаки врага
function attackEnemy() {
    currentEnemy = enemies.find(enemy => enemy.location === currentLocationKey);  // находим текущего врага по локации

    if (!currentEnemy) return;

    const damageToEnemy = Math.max(getCurrentStrength() - currentEnemy.armor, 1);  // высчитываем урон
    currentEnemy.health = currentEnemy.health - damageToEnemy;   // высчитываем текущее здоровье врага

    updateEnemyUI(currentLocationKey);      // обновляем интерфейс врага
    updateEffectAfterTurn();

    logEvent(`Ты наносишь ${damageToEnemy} урона ${currentEnemy.nameGenitive}!`);

    if (currentEnemy.health <= 0) {
        EnemyIsDefeated();
    } else {
        attackPlayer();
    }
};

// функция ответной атаки врага
function attackPlayer() {
    let damageToPlayer;

    if (playerStates.isDefending === true) {
        damageToPlayer = Math.max(currentEnemy.strength - (getCurrentArmor() + 2), 1);

        playerStates.isDefending = false;
    } else {
        damageToPlayer = Math.max(currentEnemy.strength - getCurrentArmor(), 1);  //высчитываем урон игроку
    };

    playerStates.health = playerStates.health - damageToPlayer;     // перезаписываем статы героя
    updatePlayerUI();
    updateEffectAfterTurn();

    logEvent(`${currentEnemy.name} нанёс тебе ${damageToPlayer} очков урона!`);

    if (playerStates.health <= 0) {
        gameOver();
    } else {
        logEvent(`Твой ход!`);
    };
};

// функция конец игры
function gameOver() {
    playerStates.isAlive = false;
    updatePlayerUI();
    logEvent(`Ты надышался химикатов пока атаковал врага.<br>Попробуй начать игру заново!`);

    actionButtonsContainer.style.display = "none";  // скрываем кнопки и блокируем кнопки локаций 
    locationButtons.forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = "#858585";
        button.style.cursor = "no-drop";
    });
};

// функция победы над врагом
function EnemyIsDefeated() {
    currentEnemy.isAlive = false;
    currentEnemy.defeated = true;

    playerStates.currentExperience += currentEnemy.xpReward;
    const randomItem = inventoryItemsTypes[Math.floor(Math.random() * inventoryItemsTypes.length)];
    inventoryStates[randomItem]++;
    logEvent(`Ты победил ${currentEnemy.name}!<br>Получено ${currentEnemy.xpReward} очков опыта!`);
    logEvent(`Ты нашёл: ${getNameToPotions(randomItem)}`);

    updatePlayerUI();
    updateEnemyUI(currentLocationKey);
    updateInventoryUI();

    actionButtonsContainer.style.display = "none"; // скрываем кнопки действий после победы
};

// функция для наименования полученного инвентаря
function getNameToPotions(key) {
    switch (key) {
        case "heal": return "Чай с мёдом";
        case "power": return "Пирожок с вареньем";
        case "defence": return "Респиратор";
        default: return "Неизвестный предмет";
    };
};

// обработчик кнопки "атака"
attackButton.addEventListener("click", () => {
    attackEnemy();
});

// функция защиты
function defence() {
    playerStates.isDefending = true;
    logEvent("Твоя защита увеличена на один ход!");

    attackPlayer();
};

// обработчик для кнопки защиты
defenseButton.addEventListener("click", () => {
    defence();
});

// обработчик кнопки использования предмета
useItemButton.addEventListener("click", () => {
    enableInventoryButtons();   // включаем кнопки инвентаря
});

// навешиваем обработчики на кнопки инвентаря
inventoryItemButtons.forEach(button => {        // по дефолту кнопки заблокированы
    button.disabled = true;
    button.style.backgroundColor = "#186b0442";
    button.style.cursor = "default";

    button.addEventListener("click", () => {
        if (!button.disabled) {            // при клике (если кнопки не заблокированы) вызываем функцию использования предмета
            const itemKey = button.id;
            useItem(itemKey);

            attackPlayer();
        }
    });
});

// функция включения кнопок инвентаря
function enableInventoryButtons() {
    inventoryItemButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "#1fb944d1";
        button.style.cursor = "pointer";
    });
}

//функция отключения кнопок инвентаря
function disableInventoryButtons() {
    inventoryItemButtons.forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = "#186b0442";
        button.style.cursor = "default";
    });
};

//функция использования предмета
function useItem(itemKey) {
    if (!itemKey) return;

    switch (itemKey) {
        case "health-potion":
            playerStates.health = Math.min(playerStates.health + 10, playerStates.maxHealth);
            logEvent("Ты подкрепился чаем с мёдом! +10HP!");
            break;
        case "strength-potion":
            playerStates.strengthBoostTurns = 2;  // ставим счетчик на 2 хода
            logEvent("Ты подкрепился пирожком! +50% к силе на два хода!");
            break;
        case "defence-potion":
            playerStates.armorBoostTurns = 2;  // ставим счетчик на 2 хода
            logEvent("Ты воспользовался респиратором для защиты от химикатов! +50% к броне на 2 хода!");
            break;
        default:
            logEvent("Этот предмет нельзя использовать.");
            break;
    }
    disableInventoryButtons();  // и потом отключаем кнопки
    updatePlayerUI();
    updateEnemyUI(currentLocationKey);
};

//функции получения текущих параметров(учитываем усиления)
function getCurrentStrength() {
    if (playerStates.strengthBoostTurns > 0) {
        return Math.round(playerStates.strength * 1.5);
    }
    return playerStates.strength;
};

function getCurrentArmor() {
    if (playerStates.armorBoostTurns > 0) {
        return Math.round(playerStates.armor * 1.5);
    }
    return playerStates.armor;
};

// функция апдейта счетчиков эффектов
function updateEffectAfterTurn() {
    if (playerStates.strengthBoostTurns > 0) {
        playerStates.strengthBoostTurns--;
    }
    if (playerStates.armorBoostTurns > 0) {
        playerStates.armorBoostTurns--;
    }
};

