// ビットロンオブジェクトクラス
phina.define("ObjectBitron", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "bitron_img",
      "bitron_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      200, //攻撃力
      "ビットロン", //名前
    );
  },
});
