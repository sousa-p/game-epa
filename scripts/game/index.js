scene("game", () => {
    const leftBtn = add([
        rect(212.5, 750),
        area(),
        scale(1),
        anchor("center"),
        pos(vec2(106.25, 360)),
        color(BLACK)
    ]);

    const rightBtn = add([
        rect(212.5, 750),
        area(),
        scale(1),
        anchor("center"),
        pos(vec2(317, 360)),
        color(WHITE)
    ]);
});
go("menu");