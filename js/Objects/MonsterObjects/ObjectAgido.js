// アギドオブジェクトクラス
phina.define("ObjectAgido", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "agido_img",
      "agido_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      1500, //攻撃力
      "アギド", //名前
    );
  },
});
