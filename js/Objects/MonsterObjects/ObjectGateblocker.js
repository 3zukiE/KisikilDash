// ゲート・ブロッカーオブジェクトクラス
phina.define("ObjectGateblocker", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "gate_blocker_img",
      "gate_blocker_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      100, //攻撃力
      "ゲート・ブロッカー", //名前
    );
  },
});
