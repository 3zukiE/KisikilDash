// ハングリーバーガーオブジェクトクラス
phina.define("ObjectHungryBurger", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "hungry_burger_img",
      "hungry_burger_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      2000, //攻撃力
      "ハングリーバーガー", //名前
    );
  },
});
