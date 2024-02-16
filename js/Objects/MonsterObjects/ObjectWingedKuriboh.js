// ハネクリボーオブジェクトクラス
phina.define("ObjectWingedKuriboh", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "winged_kuriboh_img",
      "winged_kuriboh_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      300, //サイズx
      300, //サイズy
      300, //攻撃力
      "ハネクリボー", //名前
    );
  },
});
