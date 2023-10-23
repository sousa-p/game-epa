import { addButton } from "../utils/btn.js";

scene("gameOver", () => {
  addButton("RETRY", vec2(center().x, center().y + 100), () => {
    go("gameStart")
    window.GAME = undefined;
  });

  addButton("GIVE UP", vec2(center().x, center().y + 200), () => {
    go("menu");
  });

  add([
    text("GAME OVER", {
      size: 64
    }),
    anchor("center"),
    pos(center().sub(0, 130))
  ]);
});