// ハロハロオブジェクトクラス
phina.define("ObjectHalloHallo", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "hallohallo_img",
      "hallohallo_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      800, //攻撃力
      "ハロハロ", //名前
    );
  },
});
