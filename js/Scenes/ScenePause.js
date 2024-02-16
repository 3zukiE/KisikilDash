// PauseSceneクラスを定義
phina.define("ScenePause", {
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

    Label({
      text: "Pause", // 表示文字
      fill: "white", // 文字色
      stroke: "red", // 枠色
      strokeWidth: 1, // 枠太さ
      fontSize: 30, // 文字サイズ
    })
      .setPosition(this.gridX.center(), this.gridY.center()) // 座標設定（(16,16)で画面右下）
      .addChildTo(this); // 現在のページに対してこのラベルを追加する

    // this.onclick = function () {
    //   // 自身を取り除く
    //   MySoundManager.prototype.MyPlaySound("pause_se", false);
    //   MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
    //   this.exit();
    // };

    // シーン遷移
    this.on("pointend", function () {
      if (ON === this.exitFlag) {
        MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
        this.exit();
      }
    });

    // シーン遷移
    this.on("keyup", function () {
      if (ON === this.exitFlag) {
        MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
        this.exit();
      }
    });
    

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
