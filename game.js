// ========== GAME STATE ==========
let gameState = {
    player: {
        selectedBrawler: null,
        coins: 0,
        stars: 0,
        trophies: 0,
        unlockedBrawlers: [1], // Start with Shelly
        boxes: { common: 0, rare: 0, epic: 0, legendary: 0 },
    },
    game: {
        state: 'menu', // menu, selecting, playing, paused, gameOver
        hp: 100,
        maxHp: 100,
        wave: 1,
        score: 0,
        enemiesDefeated: 0,
        coinsEarned: 0,
        starsEarned: 0,
        trophiesEarned: 0,
        matchStartTime: 0,
    },
    enemies: [],
    currentProblem: null,
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ========== SAVE/LOAD ==========
function saveGame() {
    localStorage.setItem('tafelStarSave', JSON.stringify(gameState.player));
}

function loadGame() {
    const saved = localStorage.getItem('tafelStarSave');
    if (saved) {
        gameState.player = JSON.parse(saved);
    }
    updateProfileDisplay();
}

// ========== SCREEN MANAGEMENT ==========
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// ========== BRAWLER SELECTION ==========
function displayBrawlerGrid() {
    const grid = document.getElementById('brawlerGrid');
    grid.innerHTML = '';
    
    BRAWLERS_DATA.forEach(brawler => {
        const isUnlocked = gameState.player.unlockedBrawlers.includes(brawler.id);
        const card = document.createElement('div');
        card.className = `brawlerCard ${isUnlocked ? '' : 'locked'}`;
        card.onclick = () => {
            if (isUnlocked) {
                gameState.player.selectedBrawler = brawler.id;
                startGame();
            }
        };
        
        card.innerHTML = `
            <div class="brawlerCardInner" style="background: ${brawler.color}40">
                <p class="brawlerEmoji">${brawler.emoji}</p>
                <p class="brawlerName">${brawler.name}</p>
                <p class="brawlerRarity">${brawler.rarity}</p>
                ${!isUnlocked ? '<p class="locked-badge">🔒</p>' : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

// ========== PROFILE DISPLAY ==========
function updateProfileDisplay() {
    document.getElementById('profileCoins').textContent = gameState.player.coins;
    document.getElementById('profileStars').textContent = gameState.player.stars;
    document.getElementById('profileTrophies').textContent = gameState.player.trophies;
    
    const rank = getRankByTrophies(gameState.player.trophies);
    document.getElementById('profileRank').textContent = `${rank.emoji} ${rank.name}`;
    
    displayBoxes();
    displayTrophyRoad();
    displayBrawlerGallery();
}

function getRankByTrophies(trophies) {
    return RANKS.find(r => trophies >= r.minTrophies && trophies <= r.maxTrophies) || RANKS[0];
}

// ========== BOXES SYSTEM ==========
function displayBoxes() {
    const container = document.getElementById('boxesContainer');
    container.innerHTML = '';
    
    Object.keys(BOX_TYPES).forEach(boxType => {
        const count = gameState.player.boxes[boxType] || 0;
        if (count > 0) {
            const box = BOX_TYPES[boxType];
            const div = document.createElement('div');
            div.className = 'boxItem';
            div.innerHTML = `
                <p>${box.emoji}</p>
                <p>${box.name}</p>
                <p>×${count}</p>
                <button class="btn btnSmall" onclick="openBox('${boxType}')">OPEN</button>
            `;
            container.appendChild(div);
        }
    });
}

function openBox(boxType) {
    if (gameState.player.boxes[boxType] > 0) {
        gameState.player.boxes[boxType]--;
        
        // Random reward
        const reward = LOOT_REWARDS[Math.floor(Math.random() * LOOT_REWARDS.length)];
        
        if (reward.type === 'coins') {
            gameState.player.coins += reward.amount;
            alert(`🪙 +${reward.amount} Coins!`);
        } else if (reward.type === 'stars') {
            gameState.player.stars += reward.amount;
            alert(`⭐ +${reward.amount} Stars!`);
        } else if (reward.type === 'brawler') {
            const lockedBrawlers = BRAWLERS_DATA.filter(b => !gameState.player.unlockedBrawlers.includes(b.id));
            if (lockedBrawlers.length > 0) {
                const newBrawler = lockedBrawlers[Math.floor(Math.random() * lockedBrawlers.length)];
                gameState.player.unlockedBrawlers.push(newBrawler.id);
                alert(`🦸 New Brawler Unlocked: ${newBrawler.emoji} ${newBrawler.name}!`);
            }
        }
        
        saveGame();
        displayBoxes();
    }
}

// ========== TROPHY ROAD ==========
function displayTrophyRoad() {
    const list = document.getElementById('trophyRoadList');
    list.innerHTML = '';
    
    TROPHY_ROAD.forEach(milestone => {
        const isUnlocked = gameState.player.trophies >= milestone.trophies;
        const div = document.createElement('div');
        div.className = `trophyMilestone ${isUnlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <p>${isUnlocked ? '✅' : '🔒'} ${milestone.emoji}</p>
            <p class="trophyThreshold">${milestone.trophies} Trophies</p>
            <p class="trophyReward">${milestone.reward}</p>
        `;
        list.appendChild(div);
    });
}

// ========== BRAWLER GALLERY ==========
function displayBrawlerGallery() {
    const grid = document.getElementById('brawlersGalleryGrid');
    grid.innerHTML = '';
    
    gameState.player.unlockedBrawlers.forEach(brawlerId => {
        const brawler = BRAWLERS_DATA.find(b => b.id === brawlerId);
        if (brawler) {
            const card = document.createElement('div');
            card.className = 'brawlerGalleryCard';
            card.innerHTML = `
                <div class="galleryCardInner" style="background: ${brawler.color}40">
                    <p class="galleryEmoji">${brawler.emoji}</p>
                    <p class="galleryName">${brawler.name}</p>
                    <p class="galleryStats">❤️ ${brawler.hp} | ⚔️ ${brawler.damage}</p>
                </div>
            `;
            grid.appendChild(card);
        }
    });
}

// ========== MATH SYSTEM ==========
function generateMathProblem() {
    const difficulty = gameState.player.selectedBrawler <= 10 ? 'easy' : 'medium';
    const min = difficulty === 'easy' ? 1 : 5;
    const max = difficulty === 'easy' ? 9 : 12;
    
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    const op = Math.random() > 0.5 ? '×' : '÷';
    
    let correctAnswer;
    if (op === '×') {
        correctAnswer = num1 * num2;
    } else {
        correctAnswer = num1;
    }
    
    const wrongAnswers = [];
    for (let i = 0; i < 3; i++) {
        let wrong = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 10) + 1);
        while (wrong === correctAnswer || wrongAnswers.includes(wrong) || wrong <= 0) {
            wrong = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 10) + 1);
        }
        wrongAnswers.push(wrong);
    }
    
    const allAnswers = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    return {
        problem: op === '×' ? `${num1} × ${num2} = ?` : `${num1 * num2} ÷ ${num2} = ?`,
        correct: correctAnswer,
        answers: allAnswers,
    };
}

function displayMathProblem() {
    gameState.currentProblem = generateMathProblem();
    document.getElementById('problemText').textContent = gameState.currentProblem.problem;
    
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    
    gameState.currentProblem.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = 'answerBtn';
        btn.textContent = answer;
        btn.onclick = () => handleAnswer(answer);
        container.appendChild(btn);
    });
}

function handleAnswer(answer) {
    const buttons = document.querySelectorAll('.answerBtn');
    buttons.forEach(b => b.disabled = true);
    
    const isCorrect = answer === gameState.currentProblem.correct;
    
    if (isCorrect) {
        buttons.forEach(b => {
            if (parseInt(b.textContent) === answer) b.classList.add('correct');
        });
        document.getElementById('feedback').textContent = '✅ Correct!';
        playSound('correct');
        
        // Deal double damage on correct answer
        gameState.enemies.forEach(e => e.hp -= 20);
    } else {
        buttons.forEach(b => {
            if (parseInt(b.textContent) === answer) b.classList.add('wrong');
        });
        document.getElementById('feedback').textContent = '❌ Wrong!';
        playSound('wrong');
        
        // Half damage on wrong answer
        gameState.enemies.forEach(e => e.hp -= 5);
    }
    
    setTimeout(() => {
        displayMathProblem();
        buttons.forEach(b => b.disabled = false);
        document.getElementById('feedback').textContent = '';
    }, 600);
}

// ========== GAME LOOP ==========
let lastEnemySpawn = 0;
let enemySpawnRate = 2000;

function startGame() {
    gameState.game.state = 'playing';
    gameState.game.hp = 100;
    gameState.game.maxHp = 100;
    gameState.game.wave = 1;
    gameState.game.score = 0;
    gameState.game.enemiesDefeated = 0;
    gameState.game.coinsEarned = 0;
    gameState.game.starsEarned = 0;
    gameState.game.trophiesEarned = 0;
    gameState.game.matchStartTime = Date.now();
    gameState.enemies = [];
    lastEnemySpawn = 0;
    
    const selectedBrawler = BRAWLERS_DATA.find(b => b.id === gameState.player.selectedBrawler);
    document.getElementById('brawlerName').textContent = selectedBrawler.name;
    document.getElementById('playerMaxHp').textContent = selectedBrawler.hp;
    gameState.game.hp = selectedBrawler.hp;
    gameState.game.maxHp = selectedBrawler.hp;
    
    switchScreen('gameArena');
    displayMathProblem();
    playSound('gameStart');
}

function spawnEnemy() {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    if (side === 0) {
        x = Math.random() * canvas.width;
        y = 10;
    } else if (side === 1) {
        x = canvas.width - 10;
        y = Math.random() * canvas.height;
    } else if (side === 2) {
        x = Math.random() * canvas.width;
        y = canvas.height - 10;
    } else {
        x = 10;
        y = Math.random() * canvas.height;
    }
    
    gameState.enemies.push({
        x, y,
        width: 30,
        height: 30,
        hp: 30 + (gameState.game.wave * 10),
        maxHp: 30 + (gameState.game.wave * 10),
        speed: 2 + (gameState.game.wave * 0.5),
    });
}

function updateEnemies() {
    gameState.enemies = gameState.enemies.filter(e => e.hp > 0);
    
    gameState.enemies.forEach(enemy => {
        // Move towards center
        const dx = canvas.width / 2 - enemy.x;
        const dy = canvas.height / 2 - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
            enemy.x += (dx / dist) * enemy.speed;
            enemy.y += (dy / dist) * enemy.speed;
        }
        
        // Damage player on collision
        if (Math.abs(enemy.x - canvas.width / 2) < 50 && Math.abs(enemy.y - canvas.height / 2) < 50) {
            gameState.game.hp -= 0.5;
        }
    });
}

function drawGame() {
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw player (center)
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);
    
    // Draw HP bar
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 - 35, 50 * (gameState.game.hp / gameState.game.maxHp), 5);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(canvas.width / 2 - 25, canvas.height / 2 - 35, 50, 5);
    
    // Draw enemies
    gameState.enemies.forEach(enemy => {
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(enemy.x - 15, enemy.y - 15, 30, 30);
        
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(enemy.x - 15, enemy.y - 25, 30 * (enemy.hp / enemy.maxHp), 5);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(enemy.x - 15, enemy.y - 25, 30, 5);
    });
}

function gameLoop() {
    if (gameState.game.state === 'playing') {
        updateEnemies();
        
        const now = Date.now();
        if (now - lastEnemySpawn > enemySpawnRate) {
            spawnEnemy();
            lastEnemySpawn = now;
        }
        
        const timeElapsed = Math.floor((now - gameState.game.matchStartTime) / 1000);
        document.getElementById('matchTimer').textContent = timeElapsed;
        document.getElementById('playerHp').textContent = Math.ceil(gameState.game.hp);
        document.getElementById('waveCount').textContent = gameState.game.wave;
        
        if (gameState.game.hp <= 0) {
            endGame();
        }
        
        drawGame();
    }
    
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameState.game.state = 'gameOver';
    
    gameState.game.trophiesEarned = 10 + (gameState.game.wave * 5);
    gameState.game.coinsEarned = gameState.game.enemiesDefeated * 25;
    gameState.game.starsEarned = Math.floor(gameState.game.wave / 2);
    
    gameState.player.trophies += gameState.game.trophiesEarned;
    gameState.player.coins += gameState.game.coinsEarned;
    gameState.player.stars += gameState.game.starsEarned;
    gameState.player.boxes.common += 1;
    
    saveGame();
    
    document.getElementById('trophiesWon').textContent = '+' + gameState.game.trophiesEarned;
    document.getElementById('coinsEarned').textContent = '+' + gameState.game.coinsEarned;
    document.getElementById('starsEarned').textContent = '+' + gameState.game.starsEarned;
    document.getElementById('enemiesDefeated').textContent = gameState.enemies.filter(e => e.hp <= 0).length;
    
    switchScreen('gameOverScreen');
    playSound('gameOver');
}

// ========== SOUND EFFECTS ==========
function playSound(name) {
    // Simple placeholder for sounds
    console.log('Playing sound:', name);
}

// ========== EVENT LISTENERS ==========
document.getElementById('playBtn').addEventListener('click', () => {
    displayBrawlerGrid();
    switchScreen('brawlerSelect');
});

document.getElementById('profileBtn').addEventListener('click', () => {
    updateProfileDisplay();
    switchScreen('profileScreen');
});

document.getElementById('brawlersBtn').addEventListener('click', () => {
    updateProfileDisplay();
    switchScreen('brawlersGallery');
});

document.getElementById('trophyBtn').addEventListener('click', () => {
    updateProfileDisplay();
    switchScreen('trophyRoadScreen');
});

document.getElementById('backFromSelect').addEventListener('click', () => switchScreen('mainMenu'));
document.getElementById('backFromProfile').addEventListener('click', () => switchScreen('mainMenu'));
document.getElementById('backFromGallery').addEventListener('click', () => switchScreen('mainMenu'));
document.getElementById('backFromTrophy').addEventListener('click', () => switchScreen('mainMenu'));

document.getElementById('pauseBtn').addEventListener('click', () => {
    gameState.game.state = 'paused';
    switchScreen('pauseMenu');
});

document.getElementById('resumeBtn').addEventListener('click', () => {
    gameState.game.state = 'playing';
    switchScreen('gameArena');
});

document.getElementById('quitBtn').addEventListener('click', () => {
    gameState.game.state = 'menu';
    switchScreen('mainMenu');
});

document.getElementById('playAgainBtn').addEventListener('click', startGame);
document.getElementById('menuBtn').addEventListener('click', () => switchScreen('mainMenu'));

// ========== INITIALIZE ==========
loadGame();
switchScreen('mainMenu');
gameLoop();
