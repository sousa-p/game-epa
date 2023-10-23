import { addButton } from "./utils/btn.js";

loadSprite("logo", "./../assets/icon/3ds-logo.png")
loadSound("menu_music", "./../assets/audio/menu/menu-music.mp3");

const music = play("menu_music", {
    loop: true,
    paused: false,
});

let volumeValue = JSON.parse(localStorage.getItem("volume")) || 50;
volume(volumeValue / 100);

scene("menu", () => {
    onUpdate(() => setCursor("default"));

    add([
        text('Rhythm'),
        pos(center().sub(130, 230)),
        scale(1.2),
        color(119, 74, 217),
    ]);

    add([
        text('Fight'),
        pos(center().sub(-20, 230)),
        scale(1.2),
        color(80, 242, 242),
    ]);

    add([
        sprite("logo"),
        pos(center().x, center().y-50),
        anchor("center"),
        scale(.4)
    ]);

    addButton("START", vec2(center().x, center().y + 100), () => {
        window.GAME = undefined;
        music.paused = true;
        go("gameStart");
    });
    addButton("GLOVES", vec2(center().x, center().y + 200), () => go("gloves"));
    addButton("CONFIGS", vec2(center().x, center().y + 300), () => go("configs"));
});

go("menu");