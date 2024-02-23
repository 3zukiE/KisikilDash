// 宝玉獣ルビー・カーバンクルオブジェクトクラス
phina.define("ObjectCrystalBeastRubyCarbuncle", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "crystal_beast_ruby_carbuncle_img",
      "crystal_beast_ruby_carbuncle_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      300, //攻撃力
      "宝玉獣ルビー・カーバンクル", //名前
    );
  },
});
