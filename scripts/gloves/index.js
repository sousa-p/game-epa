import { addButton } from "../utils/btn.js";
loadSprite("luva-1.1", "../../assets/sprts/gloves/default-gloves/glove01-left-sprite.png")
loadSprite("luva-1.2", "../../assets/sprts/gloves/default-gloves/glove01-right-sprite.png")

loadSprite("luva-2.1", "../../assets/sprts/gloves/classic-gloves/glove02-left-sprite.png")
loadSprite("luva-2.2", "../../assets/sprts/gloves/classic-gloves/glove02-right-sprite.png")

loadSprite("luva-3.1", "../../assets/sprts/gloves/vip-gloves/glove03-left-sprite.png")
loadSprite("luva-3.2", "../../assets/sprts/gloves/vip-gloves/glove03-right-sprite.png")

const glovesData = {
    "luva-1": [
        { sprite: "luva-1.1", nome: "Luva Padrao" },
        { sprite: "luva-1.2", nome: "luva Padrao2" }
    ],
    "luva-2": [
        { sprite: "luva-2.1", nome: "luva Classica" },
        { sprite: "luva-2.2", nome: "luva Classica" }
    ],
    "luva-3": [
        { sprite: "luva-3.1", nome: "luva Vip" },
        { sprite: "luva-3.2", nome: "luva Vip" }
    ]
};

let indexLuva = 0;
let luva_esquerda;
let luva_direita;
let nome_luva;

function changeGlove(acao) {
    indexLuva += acao;

    if (indexLuva < 0) {
        indexLuva = Object.keys(glovesData).length - 1;
    } else if (indexLuva >= Object.keys(glovesData).length) {
        indexLuva = 0;
    }

    if (luva_esquerda || luva_direita || nome_luva) {
        destroy(luva_esquerda);
        destroy(luva_direita);
        destroy(nome_luva);
    }

    const luvaAtual = Object.keys(glovesData)[indexLuva];
    const luvas = glovesData[luvaAtual];

    luva_esquerda = add([
        sprite(luvas[0].sprite),
        pos(center().x - 90, center().y - 100),
        outline(4),
        scale(0.1),
    ]);

    luva_direita = add([
        sprite(luvas[1].sprite),
        pos(center().x, center().y - 100),
        outline(4),
        scale(0.1),
    ]);

    nome_luva = add([
        text(luvas[0].nome),
        pos(center().x / 2, 130),
        scale(1.1),
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
    ]);

    changeGlove(0);
    addButton("Ant", vec2(55, 300), () => changeGlove(-1), [85, 40]);
    addButton("Pro", vec2(370, 300), () => changeGlove(1), [85, 40]);

    addButton("Use", vec2(center().x, 500), () => go("game"));
});

go("menu");
