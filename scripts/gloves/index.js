import { addButton } from "../utils/btn.js";

const glovesData = [
    { name: "Common", type: "default", speed: .1, life: 5, id: 0 },
    { name: "Classic", type: "classic", speed: .08, life: 3, id: 1 },
    { name: "V I P", type: "vip", speed: .05, life: 1, id: 2 }
];

glovesData.forEach(glove => {
    loadSprite(glove.type, `../../assets/sprts/gloves/${glove.type}-gloves/${glove.type}-preview.png`);
});

scene("gloves", () => {
    const selectedGlove = JSON.parse(localStorage.getItem("glove")) || glovesData[0];
    let idGlove = selectedGlove.id;
    let glove = add([
        sprite(glovesData[idGlove].type),
        pos(center().x - 90, center().y - 100),
        outline(4),
    ]);

    onUpdate(() => setCursor("default"));
    add([
        text('Gloves', {
            size: 72
        }),
        pos(center().x, center().y - 250),
        anchor("center"),
        color(119, 74, 217),
    ]);

    const nameGlove = add([
        text(glovesData[idGlove].name),
        pos(center().x, center().y - 200),
        anchor("center"),
        color(80, 242, 242),
    ]);

    function changeGlove(action = 0) {
        idGlove += action;

        if (idGlove < 0) idGlove = glovesData.length - 1;
        else if (idGlove >= glovesData.length) idGlove = 0;

        destroy(glove)

        glove = add([
            sprite(glovesData[idGlove].type),
            pos(center().x - 90, center().y - 100),
            outline(4),
        ]);

        nameGlove.text = glovesData[idGlove].name;
    }

    changeGlove();
    addButton("<", vec2(55, 350), () => changeGlove(-1), [85, 40], [0, 0, 0], 3, [242, 53, 211], 28, [242, 53, 211], "arial");
    addButton(">", vec2(370, 350), () => changeGlove(1), [85, 40], [0, 0, 0], 3, [242, 53, 211], 28, [242, 53, 211], "arial");

    addButton("Use", vec2(center().x, 600), () => {
        let nSelectedGlove = glovesData[idGlove];
        localStorage.setItem("glove", JSON.stringify(nSelectedGlove));
        go("menu");
    });
});
