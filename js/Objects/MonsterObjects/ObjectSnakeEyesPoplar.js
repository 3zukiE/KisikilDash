// クリッターオブジェクトクラス
phina.define("ObjectSnakeEyesPoplar", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "snake_eyes_poplar_img",
      "snake_eyes_poplar_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      700, //攻撃力
      "蛇眼の炎燐", //名前
    );
  },
});
