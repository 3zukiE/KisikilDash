// 一角獣のホーンオブジェクトクラス
phina.define("ObjectHorn", {
  superClass: "ObjectItem", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "horn_of_the_unicorn_img",
      "horn_of_the_unicorn_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      HORN_OF_THE_UNICORN_WIDTH, //サイズx
      HORN_OF_THE_UNICORN_HEIGHT, //サイズy
      "horn" //アイテムの種類
    );
  },
});
