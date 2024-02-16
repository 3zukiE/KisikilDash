// ギャラリーオブジェクトクラス
phina.define("ObjectGalleryMonster", {
  superClass: "phina.display.Sprite",
  
  // 初期化
  init: function (image,ss,anime) {
    // スプライトの1コマサイズを指定
    this.superInit(image);
  
    // アニメーションのアタッチ
    var anim = FrameAnimation(ss).attachTo(this);
    anim.gotoAndPlay(anime);
  },
});
  