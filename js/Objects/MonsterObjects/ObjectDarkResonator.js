// ダーク・リゾネーターオブジェクトクラス
phina.define("ObjectDarkResonator", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "dark_resonator_img",
      "dark_resonator_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      1300, //攻撃力
      "ダーク・リゾネーター", //名前
    );
  },
});
