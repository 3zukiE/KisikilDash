// うにの軍貫オブジェクトクラス
phina.define("ObjectGunkanSushipUni", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "gunkan_suship_uni_img",
      "gunkan_suship_uni_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      900, //攻撃力
      "うにの軍貫", //名前
    );
  },
});
