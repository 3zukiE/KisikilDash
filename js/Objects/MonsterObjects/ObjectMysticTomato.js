// キラー・トマトオブジェクトクラス
phina.define("ObjectMysticTomato", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "mystic_tomato_img",
      "mystic_tomato_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      1400, //攻撃力
      "キラー・トマト", //名前
    );
  },
});
