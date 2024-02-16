// カードカー・Dオブジェクトクラス
phina.define("ObjectCardcarD", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "cardcar_d_img",
      "cardcar_d_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      800, //攻撃力
      "カードカー・D", //名前
    );
  },
});
