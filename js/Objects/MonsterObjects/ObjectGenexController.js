// ジェネクス・コントローラーオブジェクトクラス
phina.define("ObjectGenexController", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "genex_controller_img",
      "genex_controller_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      1400, //攻撃力
      "ジェネクス・コントローラ", //名前
    );
  },
});
