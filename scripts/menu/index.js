import { addButton } from "../utils/btn.js";

loadSprite("cog", "../../assets/sprts/menu/cogIcon.svg")
loadSprite("logo", "../../assets/icon/3ds-logo.png")
loadSound("menu_music", "../../assets/audio/menu/menu-music.mp3");

const music = play("menu_music", {
    loop: true,
    paused: false,
});

let volumeValue = JSON.parse(localStorage.getItem("volume")) || 50;
volume(volumeValue / 100);

scene("menu", () => {
    onUpdate(() => setCursor("default"));

    const config = add([
        sprite("cog"),
        pos(340, 20),
        area()
    ]);

    config.onClick(() => {
        go('configs');
    })


    config.onHoverUpdate(() => {
        setCursor("pointer");
    })

    add([
        text('Rhythm'),
        pos(center().sub(130, 260)),
        scale(1.2),
        color(119, 74, 217),
    ]);

    add([
        text('Fight'),
        pos(center().sub(-20, 260)),
        scale(1.2),
        color(80, 242, 242),
    ]);

    add([
        sprite("logo"),
        pos(center().x, center().y-125),
        anchor("center"),
        scale(.4)
    ]);

    addButton("START", vec2(center().x, center().y), () => {
        go("gameStart");
        music.paused = true;
    });
    addButton("GLOVES", vec2(center().x, center().y + 100), () => go("gloves"));
    addButton("RANKING", vec2(center().x, center().y + 200), () => go("leaderboard"));
});

go("menu");