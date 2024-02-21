// クリビーオブジェクトクラス
phina.define("ObjectKuribee", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "kuribee_img",
      "kuribee_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      300, //攻撃力
      "クリビー", //名前
    );
  },
});
