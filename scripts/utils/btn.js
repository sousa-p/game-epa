export function addButton(
  txt,
  position,
  funcClick,
  bgBtn = [0, 0, 0],
  outlineWidth = 3,
  outlineColor = [242, 53, 211],
  tamanho = [240, 60],
  fontSize = 28,
  fontColor = [242, 53, 211],
  radius = 8
) {
  const btn = add([
      rect(...tamanho, { radius: radius }),
      pos(position),
      area(),
      scale(1),
      anchor("center"),
      outline(outlineWidth, rgb(...outlineColor)),
      color(...bgBtn)
  ]);

  btn.add([
      text(txt, {
          size: fontSize,
      }),
      anchor("center"),
      color(fontColor),
  ]);

	btn.onHoverUpdate(() => {
		btn.scale = vec2(1.2);
		setCursor("pointer");
	})

	btn.onHoverEnd(() => {
		btn.scale = vec2(1);
	})

  btn.onClick(funcClick);

  return btn;
}