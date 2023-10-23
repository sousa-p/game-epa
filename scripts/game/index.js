import { addButton } from "../utils/btn.js";

loadSound("count", "../../assets/audio/gameplay/count.mp3");
loadSprite("enemyLeftGlove", "../../assets/sprts/enemy/gloves/enemy-left-gloves.png");
loadSprite("enemyRightGlove", "../../assets/sprts/enemy/gloves/enemy-right-gloves.png");
loadSprite("alertAttackLeft", "../../assets/sprts/screen-elements/alert-attack-left.png");
loadSprite("alertAttackRight", "../../assets/sprts/screen-elements/alert-attack-right.png");



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
        const enemies = [
            {
                NAME: 'nerdy',
                LIFE: 50,
                PUNCH_PERIOD: .7
            },
            {
                NAME: 'bigas',
                LIFE: 30,
                PUNCH_PERIOD: .4
            },
            {
                NAME: 'laura',
                LIFE: 20,
                PUNCH_PERIOD: 1
            },
        ];

        window.GAME = {
            SPEED: 1,
            PUCHING: false,
            PUCH: false,
            HITS: 0,
            ENEMY: enemies[Math.floor(Math.random() * enemies.length)],
        };

        loadSprite("enemyDeath", `../../assets/sprts/enemy/${window.GAME.ENEMY.NAME}/expressions/${window.GAME.ENEMY.NAME}-death.png`);
        loadSprite("enemyDefault", `../../assets/sprts/enemy/${window.GAME.ENEMY.NAME}/expressions/${window.GAME.ENEMY.NAME}-default.png`);
        loadSprite("enemyDamageLeft", `../../assets/sprts/enemy/${window.GAME.ENEMY.NAME}/expressions/${window.GAME.ENEMY.NAME}-damage-left.png`);
        loadSprite("enemyDamageRight", `../../assets/sprts/enemy/${window.GAME.ENEMY.NAME}/expressions/${window.GAME.ENEMY.NAME}-damage-right.png`);

        window.GAME.GLOVE = JSON.parse(localStorage.getItem("glove")) || { name: "Common", type: "default", speed: .1, life: 5, id: 0 };


        loadSprite("gloveLeft", `../../assets/sprts/gloves/${window.GAME.GLOVE.type}-gloves/${window.GAME.GLOVE.type}-left.png`);
        loadSprite("gloveRight", `../../assets/sprts/gloves/${window.GAME.GLOVE.type}-gloves/${window.GAME.GLOVE.type}-right.png`);
        loadSound("music", `../../assets/audio/gameplay/music-${musicSelected}.mp3`);

        window.GAME.MUSIC = play("music", {
            loop: true,
        });
    } else {
        window.GAME.MUSIC.paused = false;
    }

    function hit() {
        shake(25);
        addKaboom(center());
        window.GAME.GLOVE.life -= 1;
        life.text = "X ".repeat(window.GAME.GLOVE.life);

        if (!window.GAME.GLOVE.life) {
            go("gameOver");
        }
    }

    function attackAlert(dir) {
        window.GAME.PUCHING = (dir) ? 'right' : 'left';

        const alertSprt = (dir)
            ? add([
                sprite("alertAttackRight"),
                area(),
                scale(.7),
                anchor("center"),
                pos(vec2(317, 360)),
                z(100)
            ])
            : add([
                sprite("alertAttackLeft"),
                area(),
                anchor("center"),
                scale(.7),
                pos(vec2(106.25, 360)),
                z(100)
            ]);

        wait(window.GAME.ENEMY.PUNCH_PERIOD, () => {
            destroy(alertSprt);
            
            (!window.GAME.PUNCH) ? hit() : window.GAME.HITS += 1;
            
            window.GAME.PUNCH = false;
            window.GAME.ENEMY.PUNCH_PERIOD -= window.GAME.HITS / 1000;
            if (window.GAME.HITS >= window.GAME.ENEMY.LIFE) {
                enemyBody.use(sprite("enemyDeath"));

                wait(2, () => {
                    go('win');
                });
            } else {
                wait(window.GAME.ENEMY.PUNCH_PERIOD, () => {
                    attackAlert(Math.round(Math.random()));
                });
            }
        });
    }

    wait(window.GAME.ENEMY.PUNCH_PERIOD, () => {
        attackAlert(Math.round(Math.random()));
    });

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
            if (window.GAME.HITS < window.GAME.ENEMY.LIFE) enemyBody.use(sprite("enemyDefault"));
        });
    }

    leftBtn.onClick(() => {
        if (window.GAME.PUCHING === 'left') {
            window.GAME.PUNCH = true
            shake(10);
            gloveLeft.tween(gloveLeft.pos, center(), window.GAME.GLOVE.speed, (p) => gloveLeft.pos = p, easings.easeOutBounce)
            wait(window.GAME.GLOVE.speed, () => {
                enemyDamage('Left');
                gloveLeft.tween(gloveLeft.pos, vec2(center().x - 100, 620), window.GAME.GLOVE.speed / 2, (p) => gloveLeft.pos = p)
            });
        } else {
            hit();
        }
    });

    rightBtn.onClick(() => {
        if (window.GAME.PUCHING === 'right') {
            window.GAME.PUNCH = true;
            shake(10);
            gloveRight.tween(gloveRight.pos, center(), window.GAME.GLOVE.speed, (p) => gloveRight.pos = p, easings.easeOutBounce)
            wait(window.GAME.GLOVE.speed, () => {
                enemyDamage('Right');
                gloveRight.tween(gloveRight.pos, vec2(center().x + 100, 620), window.GAME.GLOVE.speed / 2, (p) => gloveRight.pos = p)
            });
        } else {
            hit();
        }
    });

    add([
        sprite("enemyLeftGlove"),
        pos(center().x - 100, center().y + 50),
        anchor("center"),
        scale(.8)
    ]);

    add([
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
    });

    const life = add([
        text("X ".repeat(window.GAME.GLOVE.life)),
        color(WHITE),
        pos(30, 130)
    ]);
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