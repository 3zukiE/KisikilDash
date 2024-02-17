// ツイートありがとう　拡散に感謝
phina.define("SceneThankYou", {
  // 継承
  superClass: "phina.display.DisplayScene",
  // 初期化
  init: function () {
    // 親クラス初期化
    this.superInit({
      width: SCREEN_X,
      height: SCREEN_Y,
    });
    // 背景を半透明化
    this.backgroundColor = "rgba(0, 0, 0, 0.7)";


    // お礼イラスト
    var thankYouKisikil = Sprite("thank_you_img");
    thankYouKisikil.addChildTo(this);
    thankYouKisikil.x = this.gridX.center();
    thankYouKisikil.y = this.gridY.center();


    this.onclick = function () {
      // 自身を取り除く
      MySoundManager.prototype.MyPlaySound("pause_se", false);
      MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
      this.exit();
    };

    //更新
    this.update = function () {
      //キー入力
      const key = this.app.keyboard;
      // 終了
      if (key.getKeyDown("enter")) {
        MySoundManager.prototype.MyPlaySound("pause_se", false);
        MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
        this.exit();
      }
      // 終了
      if (key.getKeyDown("escape")) {
        MySoundManager.prototype.MyPlaySound("pause_se", false);
        MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
        this.exit();
      }
      // 終了
      if (key.getKeyDown("space")) {
        MySoundManager.prototype.MyPlaySound("pause_se", false);
        MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
        this.exit();
      }
    };

    // サウンド小さくする
    MySoundManager.prototype.SetVolumeMyPlaySound(0.05, true);
  },
});
