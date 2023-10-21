setBackground(255, 255, 255)

loadSprite("start", "../../sprites/start_button.png")
loadSprite("gloves", "../../sprites/gloves_Button.png")
loadSprite("leader", "../../sprites/leaderboards_Button.png")
loadSprite("logo", "../../sprites/logo.png")
loadSprite("nome", "../../sprites/game_name.png")

const screenWidth = width();
const screenHeight = height();

const LAYOUT = [
    [
        "                      ",
        "           n          ",
        "                      ",
        "                      ",
        "                      ",
        "          =           ",
        "                      ",
        "                      ",
        "                      ",
        "                      ",
        "                      ",
        "          s           ",
        "                      ",
        "                      ",
        "          g           ",
        "                      ",
        "          l           ",
    ],
]

const larguraSprites = {
    "start": 236,
    "gloves": 173,
    "leader": 173,
    "logo": 94,
    "nome": 176,
};

const CONFIG = {
    tileWidth: 1,
    tileHeight: 30,
    tiles: {
        "s": () => [
            sprite("start"),
            area(),
            pos((screenWidth / 2 - larguraSprites["start"] / 2), 1),
        ],
        "g": () => [
            sprite("gloves"),
            area(),
            pos((screenWidth / 2 - larguraSprites["gloves"] / 2), 1),
        ],
        "l": () => [
            sprite("leader"),
            area(),
            pos((screenWidth / 2 - larguraSprites["leader"] / 2), 1),
        ],
        "=": () => [
            sprite("logo"),
            area(),
            pos((screenWidth / 2 - larguraSprites["logo"] / 2), 1),
        ],
        "n": () => [
            sprite("nome"),
            area(),
            pos((screenWidth / 2 - larguraSprites["nome"] / 2), 1),
        ],
    },
};

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
    const pag = addLevel(LAYOUT[levelId ?? 0], CONFIG)

    onClick("start", () => {
        go("");
    });

    onClick("gloves", () => {
        go("");
    });

    onClick("leader", () => {
        go("");
    });
})

scene("lose", () => {
    add([
        text("You Lose"),
    ])
    onKeyPress(() => go("game"))
})

scene("win", () => {
    add([
        text("You Win"),
    ])
    onKeyPress(() => go("game"))
})

go("game")