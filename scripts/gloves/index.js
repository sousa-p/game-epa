import { addButton } from "../utils/btn.js";

loadSprite("luva-1", "../../assets/sprts/gloves/luva-1.png")
loadSprite("luva-2", "../../assets/sprts/gloves/luva-2.png")
loadSprite("luva-3", "../../assets/sprts/gloves/luva-3.png")

const gloveSprites = ["luva-1", "luva-2", "luva-3"];
const nomeGloves = ["luva um", "luva dois", "luva tres"];
let gloveAtual = 0;
let gloves;
let nomeGlove

function changeGlove(acao) {
    gloveAtual += acao;

    if (gloveAtual < 0) {
        gloveAtual = gloveSprites.length - 1;
    } else if (gloveAtual >= gloveSprites.length) {
        gloveAtual = 0;
    }

    if (gloves || nomeGlove) {
        destroy(gloves);
        destroy(nomeGlove);
    }

    gloves = add([
        sprite(gloveSprites[gloveAtual]),
        pos(center().x - 100, center().y - 150),
        outline(4),
    ]);

    nomeGlove = add([
        text(nomeGloves[gloveAtual]),
        pos(center().x / 2, 130),
        scale(1.5),
        color(80, 242, 242),
    ]);

}

scene("gloves", () => {
    onUpdate(() => setCursor("default"));
    add([
        text('Gloves'),
        pos(center().x / 2, 50),
        scale(2),
        color(119, 74, 217),
    ]);

    add([
        pos(center().x - 100, center().y - 150),
        rect(200, 200),
        outline(1),
        area(),
    ])

    changeGlove(0);
    addButton("Ant", vec2(55, 300), () => changeGlove(-1), [85, 40]);
    addButton("Pro", vec2(370, 300), () => changeGlove(1), [85, 40]);

    addButton("Use", vec2(center().x, 500), () => go("game"));
});

go("menu");