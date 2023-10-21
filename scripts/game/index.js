import { addButton } from "../utils/btn.js";
scene("game", () => {

    onUpdate(() => setCursor("default"));

    addButton("esquerda", vec2(106.25, 360), () => go("game"), [212.5, 720], [255,0,0], 0, [255, 255, 255], 28, [255, 255, 255]);
    addButton("direita", vec2(317, 360), () => go("game"), [212.5, 720], [0, 0, 255], 0, [255, 255, 255], 28, [255, 255, 255]);

});
go("menu");