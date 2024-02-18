// クリッターオブジェクトクラス
phina.define("ObjectSangan", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "sangan_img",
      "sangan_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      1000, //攻撃力
      "クリッター", //名前
    );
  },
});
