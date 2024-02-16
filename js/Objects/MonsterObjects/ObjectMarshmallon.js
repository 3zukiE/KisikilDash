// マシュマロンオブジェクトクラス
phina.define("ObjectMarshmallon", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "marshmallon_img",
      "marshmallon_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      300, //攻撃力
      "マシュマロン", //名前
    );
  },
});
