const configs = localStorage.getItem("configs") || { "volume": 75 }

scene("configs", () => {
  add([
    text("Configurations", {
      size: 48
    }),
    pos(center().sub(158,260))
  ])
});

go('configs')