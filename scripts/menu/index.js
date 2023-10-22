import { addButton } from "../utils/btn.js";

loadSprite("cog", "../../assets/sprts/menu/cogIcon.svg")
loadSound("main_music", "../../assets/audio/menu/menu-music.mp3")

scene("menu", () => {
    onUpdate(() => setCursor("default"));

    const config = add([
        sprite("cog"),
        pos(340, 20),
        area()
    ]);

    const music = play("main_music", {
        loop: true,
        paused: false,
    })

    config.onClick(() => {
        go('configs');
    })


    config.onHoverUpdate(() => {
        setCursor("pointer");
    })

    add([
        text('Rhythm'),
        pos(center().sub(120, 260)),
        scale(1.2),
        color(119, 74, 217),
    ]);
    add([
        text('Fight'),
        pos(center().sub(-30, 260)),
        scale(1.2),
        color(80, 242, 242),
    ]);
    addButton("START", vec2(center().x, center().y), () => go("game"));
    addButton("GLOVES", vec2(center().x, center().y + 100), () => go("gloves"));
    addButton("RANKING", vec2(center().x, center().y + 200), () => go("leaderboard"));
});

go("menu");