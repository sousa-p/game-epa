import { addButton } from "../utils/btn.js";

scene("win", () => {
  addButton("RETRY", vec2(center().x, center().y + 100), () => {
    go("gameStart")
    window.GAME = undefined;
  });

  addButton("GO MENU", vec2(center().x, center().y + 200), () => {
    go("menu");
  });

  add([
    text("YOU WIN", {
      size: 64
    }),
    anchor("center"),
    pos(center().sub(0, 130))
  ]);
});