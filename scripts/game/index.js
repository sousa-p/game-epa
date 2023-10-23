import { addButton } from "../utils/btn.js";

loadSound("count", "../../assets/audio/gameplay/count.mp3")

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
        
        window.GAME = {
            SPEED: 1,
            POINTS: 0,
        };
        
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
        scale(1),
        anchor("center"),
        pos(vec2(106.25, 360)),
        color(GREEN)
    ]);

    const rightBtn = add([
        rect(212.5, 750),
        area(),
        scale(1),
        anchor("center"),
        pos(vec2(317, 360)),
        color(WHITE)
    ]);
    
    rightBtn.onClick(() => {
        shake(7);
        gloveRight.tween(gloveRight.pos, center(), window.GAME.GLOVE.speed, (p) => gloveRight.pos = p, easings.easeOutBounce)
        wait(window.GAME.GLOVE.speed, () => {
            gloveRight.tween(gloveRight.pos, vec2(center().x + 100, 620), window.GAME.GLOVE.speed / 3, (p) => gloveRight.pos = p)
        });
    });
    
    leftBtn.onClick(() => {
        shake(7);
        gloveLeft.tween(gloveLeft.pos, center(), window.GAME.GLOVE.speed, (p) => gloveLeft.pos = p, easings.easeOutBounce)
        wait(window.GAME.GLOVE.speed, () => {
            gloveLeft.tween(gloveLeft.pos, vec2(center().x - 100, 620), window.GAME.GLOVE.speed/3, (p) => gloveLeft.pos = p)
        });
    });
    
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
        circle(115),
        pos(center()),
        color(BLACK),
        anchor("center")
    ])
    
    const enemyLeftGlove = add([
        circle(55),
        pos(center().x - 100, center().y + 25),
        color(RED),
        anchor("center")
    ]);

    const enemyRightGlove = add([
        circle(55),
        pos(center().x + 100, center().y + 25),
        color(RED),
        anchor("center")
    ])
    
    const pause = add([
        text("PAUSE"),
        color(BLACK),
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
    
    addButton("GIVE UP", vec2(center().x, center().y + 100), () => go("menu"));
    
    add([
        text("PAUSED", {
            size: 64
        }),
        anchor("center"),
        pos(center().sub(0, 130))
    ]);
});