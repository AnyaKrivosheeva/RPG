const playerStates = {   // статы игрока
    level: 1,
    strength: 10,
    armor: 5,
    health: 30,
    maxHealth: 30,
    currentExperience: 0,
    maxExperience: 10,
    isDefending: false,
    inCombat: false,
    avatar: "images/kopatych-rest.webp",
    altRest: "Копатыч на отдыхе",
    avatarArmed: "images/kopatych-armed.jpg",
    altArmed: "Копатыч в боевой готовности",
};

const inventoryStates = {    //инвентарь
    heal: 1,
    power: 1,
    defence: 1,
}

const enemies = [     // массив с антагонистами (ну и нпс тоже тут)
    {
        location: "Kopatych-house",
        name: "Некультурный сорняк",
        avatar: "images/nekulturniy.jpg",
        alt: "Некультурный сорняк в огороде Копатыча",
        health: 30,
        maxHealth: 30,
        armor: 2,
        strength: 3,
        xpReward: 5,
        isAlive: true,
        defeated: false,
    },
    {
        location: "Nyusha-house",
        name: "Хищный цветок",
        avatar: "images/hishniy.jpg",
        alt: "Хищный цветок в доме Нюши",
        health: 50,
        maxHealth: 50,
        armor: 3,
        strength: 5,
        xpReward: 10,
        isAlive: true,
        defeated: false,
    },
    {
        location: "Losyash-house",
        name: "Инопланетный сорняк",
        avatar: "images/inoplanetniy.jpg",
        alt: "Инопланетный сорняк в доме Лосяша",
        health: 100,
        maxHealth: 100,
        armor: 5,
        strength: 7,
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


// функция обновления UI персонажа
function updatePlayerUI() {
    playerLevel.textContent = playerStates.level;
    playerStrength.textContent = playerStates.strength;
    playerArmor.textContent = playerStates.armor;
    playerMaxHealth.textContent = playerStates.maxHealth;
    playerTotalExperience.textContent = playerStates.currentExperience;

    if (playerStates.inCombat) {
        playerAvatar.src = playerStates.avatarArmed;
        playerAvatar.alt = playerStates.altArmed;
    } else {
        playerAvatar.src = playerStates.avatar;
        playerAvatar.alt = playerStates.altRest;
    }

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
    const currentEnemy = enemies.find(enemy => enemy.location === location);  //получаем текущего врага

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

// функция смены локации
function changeLocation(locationKey) {
    const location = locations[locationKey];   // получаем объект локации

    currentLocation.textContent = location.name;
    bodyElement.style.backgroundImage = `url(${location.background})`;
    eventsLog.innerHTML = location.description;

    playerStates.inCombat = !location.isSafeZone; // устанавливаем флагдля определения безопасная зона или нет

    if (location.isSafeZone) {
        actionButtonsContainer.style.display = "none";
    } else {
        actionButtonsContainer.style.display = "flex";
    };

    updatePlayerUI();
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
});