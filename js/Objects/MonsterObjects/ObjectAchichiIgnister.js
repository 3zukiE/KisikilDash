// アチチ@イグニスターオブジェクトクラス
phina.define("ObjectAchichiIgnister", {
  superClass: "ObjectMonster", //モンスター親クラス継承

  // 初期化
  init: function (x, y) {
    this.superInit(
      "achichi_ignister_img",
      "achichi_ignister_ss",
      x, //座標x
      y, //座標y
      10, //速さ
      150, //サイズx
      150, //サイズy
      800, //攻撃力
      "アチチ@イグニスター", //名前
    );
  },
});
