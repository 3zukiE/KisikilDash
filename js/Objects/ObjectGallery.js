// ギャラリーオブジェクトクラス
phina.define("ObjectGallery", {
  superClass: "phina.display.Sprite",

  // 初期化
  init: function (image) {
    // スプライトの1コマサイズを指定
    this.superInit(image);

    // アニメーション用変数
    var spriteNameArray = ["kisikil", "lilla"];
    // アニメーションのアタッチ
    this.direction = 0;
    var anim = FrameAnimation("gallery_ss").attachTo(this);
    anim.gotoAndPlay(spriteNameArray[this.direction]);

    var flag = 0;
    this.update = function () {
      if (flag === this.direction) {
        if (1 === flag) {
          flag = 0;
        } else {
          flag = 1;
        }
        anim.gotoAndPlay(spriteNameArray[this.direction]);
      }
    };
  },
  });
  