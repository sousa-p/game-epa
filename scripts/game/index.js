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
    const music = Math.round(Math.random() + 1);
    const glove = JSON.parse(localStorage.getItem("glove")) || { name: "Common", type: "default", id: 0 };

    const game = {
        SPEED: 1,
        POINTS: 0,
    }

    loadSprite("gloveLeft", `../../assets/sprts/gloves/${glove.type}-gloves/${glove.type}-left.png`);
    loadSprite("gloveRight", `../../assets/sprts/gloves/${glove.type}-gloves/${glove.type}-right.png`);
    loadSound("music", `../../assets/audio/gameplay/music-${music}.mp3`);

    play("music", {
        loop: true,
        paused: false,
    })

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
        gloveRight.tween(gloveRight.pos, center(), glove.speed, (p) => gloveRight.pos = p, easings.easeOutBounce)
        wait(glove.speed, () => {
            gloveRight.tween(gloveRight.pos, vec2(center().x + 100, 620), glove.speed / 3, (p) => gloveRight.pos = p)
        });
    });

    leftBtn.onClick(() => {
        shake(7);
        gloveLeft.tween(gloveLeft.pos, center(), glove.speed, (p) => gloveLeft.pos = p, easings.easeOutBounce)
        wait(glove.speed, () => {
            gloveLeft.tween(gloveLeft.pos, vec2(center().x - 100, 620), glove.speed/3, (p) => gloveLeft.pos = p)
        });
    });

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

    const gloveLeft = add([
        sprite("gloveLeft"),
        scale(.2),
        anchor("center"),
        pos(vec2(center().x - 100, 620)),
        timer()
    ]);

    const gloveRight = add([
        sprite("gloveRight"),
        scale(.2),
        anchor("center"),
        pos(vec2(center().x + 100, 620)),
        timer()
    ]);
    

});