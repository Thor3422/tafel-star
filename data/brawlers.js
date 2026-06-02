// ========== COMPLETE BRAWLERS DATABASE ==========
const BRAWLERS_DATA = [
    // STARTING BRAWLER
    { id: 1, name: "Shelly", rarity: "Starting", emoji: "🐢", hp: 3600, damage: 1400, speed: 3, ability1: "Buckshot", ability2: "Shell Armor", color: "#66BB6A" },
    
    // RARE
    { id: 2, name: "Colt", rarity: "Rare", emoji: "🤠", hp: 2800, damage: 1120, speed: 3.5, ability1: "Six-Shooters", ability2: "Bullet Storm", color: "#AB47BC" },
    { id: 3, name: "Bull", rarity: "Rare", emoji: "🐂", hp: 4000, damage: 1400, speed: 4, ability1: "Charge", ability2: "Rampage", color: "#FF6F00" },
    { id: 4, name: "Brock", rarity: "Rare", emoji: "💣", hp: 2800, damage: 1120, speed: 3, ability1: "Rocket Launcher", ability2: "Rocket Rain", color: "#EC407A" },
    { id: 5, name: "Nita", rarity: "Rare", emoji: "🐻", hp: 3600, damage: 1400, speed: 3, ability1: "Bear", ability2: "Super Bear", color: "#8D6E63" },
    { id: 6, name: "Jessie", rarity: "Rare", emoji: "🔧", hp: 3400, damage: 1200, speed: 3, ability1: "Turret", ability2: "Sharpshooter", color: "#FF9800" },
    { id: 7, name: "Dynamike", rarity: "Rare", emoji: "🧨", hp: 3200, damage: 1400, speed: 2.5, ability1: "Dynamite", ability2: "Hot Potato", color: "#FDD835" },
    { id: 8, name: "Bo", rarity: "Rare", emoji: "🏹", hp: 3600, damage: 1400, speed: 2.5, ability1: "Spread Shot", ability2: "Totem", color: "#26A69A" },
    
    // SUPER RARE
    { id: 9, name: "Rico", rarity: "Super Rare", emoji: "🤖", hp: 3200, damage: 1120, speed: 3.5, ability1: "Bouncy Bullets", ability2: "Super Bouncy", color: "#FFA726" },
    { id: 10, name: "Spike", rarity: "Super Rare", emoji: "🌵", hp: 3200, damage: 1120, speed: 3, ability1: "Cactus", ability2: "Needles", color: "#43A047" },
    { id: 11, name: "Barley", rarity: "Super Rare", emoji: "🍺", hp: 3400, damage: 1200, speed: 2.5, ability1: "Molotov", ability2: "Healing", color: "#E57C3E" },
    { id: 12, name: "Pam", rarity: "Super Rare", emoji: "👵", hp: 4200, damage: 1400, speed: 2.5, ability1: "Shotgun", ability2: "Healing Station", color: "#FFB74D" },
    
    // EPIC
    { id: 13, name: "El Primo", rarity: "Epic", emoji: "🤼", hp: 4200, damage: 1400, speed: 4, ability1: "Fist", ability2: "Suplex", color: "#D32F2F" },
    { id: 14, name: "Mortis", rarity: "Epic", emoji: "⚰️", hp: 3400, damage: 1400, speed: 4.5, ability1: "Coiled Snake", ability2: "Dash Attack", color: "#424242" },
    { id: 15, name: "Tara", rarity: "Epic", emoji: "🔮", hp: 3600, damage: 1400, speed: 3, ability1: "Portal", ability2: "Black Hole", color: "#6A1B9A" },
    { id: 16, name: "Gene", rarity: "Epic", emoji: "👻", hp: 3600, damage: 1400, speed: 3, ability1: "Telekinesis", ability2: "Lamp Pull", color: "#FFB300" },
    { id: 17, name: "Edgar", rarity: "Epic", emoji: "🤺", hp: 3600, damage: 1400, speed: 4.5, ability1: "Blade", ability2: "Super Blade", color: "#1565C0" },
    { id: 18, name: "Piper", rarity: "Epic", emoji: "🎯", hp: 2800, damage: 1120, speed: 2.5, ability1: "Sniper", ability2: "Long Range", color: "#F57F17" },
    { id: 19, name: "Rosa", rarity: "Epic", emoji: "🌹", hp: 4400, damage: 1400, speed: 3, ability1: "Brambles", ability2: "Plant", color: "#558B2F" },
    { id: 20, name: "Poco", rarity: "Epic", emoji: "🎸", hp: 3400, damage: 1200, speed: 3, ability1: "Sound Wave", ability2: "Healing Song", color: "#C62828" },
    
    // MYTHIC
    { id: 21, name: "Gale", rarity: "Mythic", emoji: "💨", hp: 3400, damage: 1200, speed: 3.5, ability1: "Wind Push", ability2: "Blizzard", color: "#0277BD" },
    { id: 22, name: "Emz", rarity: "Mythic", emoji: "💇", hp: 3600, damage: 1400, speed: 3, ability1: "Hairspray", ability2: "Fog", color: "#C2185B" },
    { id: 23, name: "Max", rarity: "Mythic", emoji: "⚡", hp: 3200, damage: 1120, speed: 5, ability1: "Speed Boost", ability2: "Super Speed", color: "#F57F17" },
    { id: 24, name: "Sprout", rarity: "Mythic", emoji: "🌱", hp: 3600, damage: 1400, speed: 2.5, ability1: "Seed", ability2: "Vine Wall", color: "#7CB342" },
    
    // LEGENDARY
    { id: 25, name: "Crow", rarity: "Legendary", emoji: "🐦", hp: 2800, damage: 1120, speed: 4, ability1: "Poison Daggers", ability2: "Swarm", color: "#212121" },
    { id: 26, name: "Sandy", rarity: "Legendary", emoji: "🐱", hp: 3400, damage: 1200, speed: 3, ability1: "Sand Storm", ability2: "Sleep", color: "#E0B957" },
    { id: 27, name: "Bea", rarity: "Legendary", emoji: "🐝", hp: 3400, damage: 1200, speed: 3, ability1: "Bee Sting", ability2: "Charge", color: "#FFD700" },
    { id: 28, name: "Leon", rarity: "Legendary", emoji: "🦁", hp: 2800, damage: 1120, speed: 4.5, ability1: "Invisibility", ability2: "Super Clone", color: "#FFB81C" },
    { id: 29, name: "Nani", rarity: "Legendary", emoji: "🤖", hp: 3200, damage: 1120, speed: 2.5, ability1: "Rocket", ability2: "Drone", color: "#2196F3" },
    { id: 30, name: "Amber", rarity: "Legendary", emoji: "🔥", hp: 3400, damage: 1200, speed: 3, ability1: "Fire", ability2: "Burn", color: "#FF6F00" },
    { id: 31, name: "Byron", rarity: "Legendary", emoji: "⚗️", hp: 3600, damage: 1400, speed: 2.5, ability1: "Poison", ability2: "Heal", color: "#7B1FA2" },
    { id: 32, name: "Squeak", rarity: "Legendary", emoji: "💣", hp: 3200, damage: 1120, speed: 2.5, ability1: "Bubble", ability2: "Bounce", color: "#1565C0" },
    
    // CHROMATIC / ULTRA LEGENDARY (Sample - these rotate)
    { id: 33, name: "Ash", rarity: "Ultra Legendary", emoji: "🏠", hp: 4200, damage: 1400, speed: 3, ability1: "Fireball", ability2: "Protection", color: "#D32F2F" },
    { id: 34, name: "Lola", rarity: "Chromatic", emoji: "💃", hp: 3600, damage: 1400, speed: 3.5, ability1: "Clone", ability2: "Decoy", color: "#E91E63" },
    { id: 35, name: "Fang", rarity: "Chromatic", emoji: "🥋", hp: 3400, damage: 1200, speed: 4.5, ability1: "Kick", ability2: "Flying Kick", color: "#F57F17" },
    { id: 36, name: "Eve", rarity: "Chromatic", emoji: "👩", hp: 3200, damage: 1120, speed: 3, ability1: "Hatch", ability2: "Flying", color: "#7B1FA2" },
    { id: 37, name: "Janet", rarity: "Chromatic", emoji: "👨‍🚀", hp: 3400, damage: 1200, speed: 3.5, ability1: "Jetpack", ability2: "Fly", color: "#0277BD" },
    { id: 38, name: "Bonnie", rarity: "Chromatic", emoji: "🐰", hp: 3600, damage: 1400, speed: 3.5, ability1: "Cannon", ability2: "Bomb", color: "#FF6F00" },
    { id: 39, name: "Grom", rarity: "Chromatic", emoji: "👦", hp: 3600, damage: 1400, speed: 2.5, ability1: "Ball", ability2: "Super Ball", color: "#2196F3" },
    { id: 40, name: "Belle", rarity: "Chromatic", emoji: "💃", hp: 3400, damage: 1200, speed: 3, ability1: "Revolver", ability2: "Mark", color: "#E64A19" },
    
    // MORE BRAWLERS (Adding more to reach closer to 100)
    { id: 41, name: "Colette", rarity: "Chromatic", emoji: "📸", hp: 3200, damage: 1120, speed: 3, ability1: "Camera", ability2: "Snap", color: "#EC407A" },
    { id: 42, name: "Buzz", rarity: "Chromatic", emoji: "⚙️", hp: 5000, damage: 1400, speed: 3, ability1: "Lazier Hook", ability2: "Torpedo", color: "#1976D2" },
    { id: 43, name: "Griff", rarity: "Epic", emoji: "🦅", hp: 3400, damage: 1200, speed: 3.5, ability1: "Coins", ability2: "Money Shot", color: "#1565C0" },
    { id: 44, name: "Mandy", rarity: "Super Rare", emoji: "👸", hp: 3400, damage: 1200, speed: 3, ability1: "Scepter", ability2: "Royal", color: "#F57F17" },
    { id: 45, name: "Maisie", rarity: "Legendary", emoji: "⛵", hp: 3200, damage: 1120, speed: 3.5, ability1: "Anchor", ability2: "Wave", color: "#0277BD" },
    { id: 46, name: "Hank", rarity: "Rare", emoji: "🦣", hp: 4400, damage: 1400, speed: 2.5, ability1: "Stomp", ability2: "Trunk", color: "#7B1FA2" },
    { id: 47, name: "Juju", rarity: "Chromatic", emoji: "🧿", hp: 3400, damage: 1200, speed: 3.5, ability1: "Curse", ability2: "Spell", color: "#212121" },
    { id: 48, name: "Sam", rarity: "Chromatic", emoji: "🔫", hp: 3600, damage: 1400, speed: 3.5, ability1: "Rifle", ability2: "Laser", color: "#D32F2F" },
    { id: 49, name: "Willow", rarity: "Chromatic", emoji: "🌿", hp: 3800, damage: 1300, speed: 2.5, ability1: "Branch", ability2: "Grow", color: "#558B2F" },
    { id: 50, name: "Cordelius", rarity: "Legendary", emoji: "🤴", hp: 3600, damage: 1400, speed: 3, ability1: "Crown", ability2: "Royal Rage", color: "#FFD700" },
];

// TROPHY ROAD REWARDS (Milestones)
const TROPHY_ROAD = [
    { trophies: 10, reward: "500 Coins", emoji: "🪙" },
    { trophies: 25, reward: "1000 Coins", emoji: "🪙" },
    { trophies: 50, reward: "50 Stars", emoji: "⭐" },
    { trophies: 100, reward: "New Brawler Box", emoji: "🎁" },
    { trophies: 150, reward: "2000 Coins", emoji: "🪙" },
    { trophies: 200, reward: "Legendary Box", emoji: "🎁" },
    { trophies: 300, reward: "3000 Coins + Skin", emoji: "🎨" },
    { trophies: 500, reward: "Mega Box", emoji: "🎁" },
    { trophies: 750, reward: "5000 Coins", emoji: "🪙" },
    { trophies: 1000, reward: "Ultimate Reward!", emoji: "👑" },
];

// RANKS BY TROPHIES
const RANKS = [
    { name: "Bronze", minTrophies: 0, maxTrophies: 99, emoji: "🥉" },
    { name: "Silver", minTrophies: 100, maxTrophies: 249, emoji: "🥈" },
    { name: "Gold", minTrophies: 250, maxTrophies: 499, emoji: "🥇" },
    { name: "Platinum", minTrophies: 500, maxTrophies: 799, emoji: "💎" },
    { name: "Diamond", minTrophies: 800, maxTrophies: 1199, emoji: "💠" },
    { name: "Master", minTrophies: 1200, maxTrophies: 1999, emoji: "👑" },
    { name: "Legend", minTrophies: 2000, maxTrophies: 9999, emoji: "⭐" },
];

// LOOT BOX TYPES
const BOX_TYPES = {
    common: { emoji: "📦", name: "Common Box", rarity: "Common", color: "#90A4AE" },
    rare: { emoji: "💎", name: "Rare Box", rarity: "Rare", color: "#1976D2" },
    epic: { emoji: "🎁", name: "Epic Box", rarity: "Epic", color: "#7B1FA2" },
    legendary: { emoji: "👑", name: "Legendary Box", rarity: "Legendary", color: "#FFD700" },
};

// LOOT REWARDS
const LOOT_REWARDS = [
    { type: "coins", amount: 50 },
    { type: "coins", amount: 100 },
    { type: "coins", amount: 200 },
    { type: "stars", amount: 5 },
    { type: "stars", amount: 10 },
    { type: "brawler", chance: 0.3 },
    { type: "skin", chance: 0.2 },
];
