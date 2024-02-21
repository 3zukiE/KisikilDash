// クリベーオブジェクトクラス
phina.define("ObjectKuribeh", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "kuribeh_img",
      "kuribeh_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      300, //攻撃力
      "クリベー", //名前
    );
  },
});
