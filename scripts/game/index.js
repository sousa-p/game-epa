import { addButton } from "../utils/btn.js";

loadSound("count", "../../assets/audio/gameplay/count.mp3")
loadSprite("enemyLeftGlove", "../../assets/sprts/enemy/gloves/enemy-left-gloves.png")
loadSprite("enemyRightGlove", "../../assets/sprts/enemy/gloves/enemy-right-gloves.png")


scene("gameStart", () => {
    play("count", {
        paused: false
    });

    const count = ['THREE', 'TWO', 'ONE', 'GO'];

    const timer = add([
        text("", {
            size: 48
        }),
        anchor("center"),
        pos(center())
    ]);

    count.forEach((c, id) => {
        wait(id, () => {
            timer.text = c
        });
    });
    wait(count.length, () => {
        go("onGame");
    })
});

scene("onGame", () => {
    if (!window.GAME) {
        const musicSelected = Math.round(Math.random() + 1);
        const enemies = ['nerdy', 'bigas'];

        window.GAME = {
            SPEED: 1,
            POINTS: 0,
            ENEMY: enemies[Math.floor(Math.random() * enemies.length)]
        };

        loadSprite("enemyDeath", `../../assets/sprts/enemy/${window.GAME.ENEMY}/expressions/${window.GAME.ENEMY}-death.png`);
        loadSprite("enemyDefault", `../../assets/sprts/enemy/${window.GAME.ENEMY}/expressions/${window.GAME.ENEMY}-default.png`);
        loadSprite("enemyDamageLeft", `../../assets/sprts/enemy/${window.GAME.ENEMY}/expressions/${window.GAME.ENEMY}-damage-left.png`);
        loadSprite("enemyDamageRight", `../../assets/sprts/enemy/${window.GAME.ENEMY}/expressions/${window.GAME.ENEMY}-damage-right.png`);

        window.GAME.GLOVE = JSON.parse(localStorage.getItem("glove")) || { name: "Common", type: "default", id: 0 };

        
        loadSprite("gloveLeft", `../../assets/sprts/gloves/${window.GAME.GLOVE.type}-gloves/${window.GAME.GLOVE.type}-left.png`);
        loadSprite("gloveRight", `../../assets/sprts/gloves/${window.GAME.GLOVE.type}-gloves/${window.GAME.GLOVE.type}-right.png`);
        loadSound("music", `../../assets/audio/gameplay/music-${musicSelected}.mp3`);

        window.GAME.MUSIC = play("music", {
            loop: true,
        });
    } else {
        window.GAME.MUSIC.paused = false;
    }

    const leftBtn = add([
        rect(212.5, 750),
        area(),
        outline(8, WHITE),
        scale(1),
        anchor("center"),
        pos(vec2(106.25, 360)),
        color(BLACK)
    ]);

    const rightBtn = add([
        rect(212.5, 750),
        area(),
        outline(8, WHITE),
        scale(1),
        anchor("center"),
        pos(vec2(317, 360)),
        color(BLACK)
    ]);

    const gloveLeft = add([
        sprite("gloveLeft"),
        scale(.2),
        anchor("center"),
        pos(vec2(center().x - 100, 620)),
        timer(),
        z(50)
    ]);

    const gloveRight = add([
        sprite("gloveRight"),
        scale(.2),
        anchor("center"),
        pos(vec2(center().x + 100, 620)),
        timer(),
        z(50)
    ]);

    const enemyBody = add([
        sprite("enemyDefault"),
        scale(.2),
        pos(center()),
        anchor("center"),
        timer()
    ]);

    function enemyDamage(dir) {
        enemyBody.use(sprite(`enemyDamage${dir}`));
        enemyBody.wait(1, () => {
            enemyBody.use(sprite("enemyDefault"));
        });
    }

    leftBtn.onClick(() => {
        shake(10);
        gloveLeft.tween(gloveLeft.pos, center(), window.GAME.GLOVE.speed, (p) => gloveLeft.pos = p, easings.easeOutBounce)
        wait(window.GAME.GLOVE.speed, () => {
            enemyDamage('Left');
            gloveLeft.tween(gloveLeft.pos, vec2(center().x - 100, 620), window.GAME.GLOVE.speed / 2, (p) => gloveLeft.pos = p)
        });
    });

    rightBtn.onClick(() => {
        shake(10);
        gloveRight.tween(gloveRight.pos, center(), window.GAME.GLOVE.speed, (p) => gloveRight.pos = p, easings.easeOutBounce)
        wait(window.GAME.GLOVE.speed, () => {
            enemyDamage('Right');
            gloveRight.tween(gloveRight.pos, vec2(center().x + 100, 620), window.GAME.GLOVE.speed / 2, (p) => gloveRight.pos = p)
        });
    });

    const enemyLeftGlove = add([
        sprite("enemyLeftGlove"),
        pos(center().x - 100, center().y + 50),
        anchor("center"),
        scale(.8)
    ]);

    const enemyRightGlove = add([
        sprite("enemyRightGlove"),
        pos(center().x + 100, center().y + 50),
        anchor("center"),
        scale(.8)
    ])

    const pause = add([
        text("PAUSE"),
        color(119, 74, 217),
        pos(300, 130),
        area()
    ]);

    pause.onClick(() => {
        go("pause");
    })
});

scene("pause", () => {
    window.GAME.MUSIC.paused = true;


    addButton("CONTINUE", vec2(center().x, center().y), () => go("gameStart"));

    addButton("GIVE UP", vec2(center().x, center().y + 100), () => {
        window.GAME = undefined;
        go("menu");
    });

    add([
        text("PAUSED", {
            size: 64
        }),
        anchor("center"),
        pos(center().sub(0, 130))
    ]);
});