// カードカーDオブジェクトクラス
phina.define("ObjectMysticalSpaceTyphoon", {
    superClass: "ObjectItem", //モンスター親クラス継承
  
    // 初期化
    init: function (x, y) {
      this.superInit(
        "mystical_space_typhoon_img",
        "mystical_space_typhoon_ss",
        x, //座標x
        y, //座標y
        10, //速さ
        MYSTICAL_SPACE_TYPHOON_WIDTH, //サイズx
        MYSTICAL_SPACE_TYPHOON_HEIGHT, //サイズy
        "typhoon" //アイテムの種類
      );
    },
  });
  