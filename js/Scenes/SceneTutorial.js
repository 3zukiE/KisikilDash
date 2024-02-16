// TutorialSceneクラスを定義
phina.define("SceneTutorial", {
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

    // ここにチュートリアル用の画像を表示
    var tuto = ObjectTutorial("tutorial_img").addChildTo(this);
    tuto.x = this.gridX.center();
    tuto.y = this.gridY.center();

    // jpボタン
    var jpButton = Button({
      width: this.gridX.width / 8, // 横サイズ
      height: this.gridY.width / 8, // 縦サイズ
      text: "Jp",
      fontSize: 60, // 文字サイズ
      fontWeight: "bold",
      fontColor: "black", // 文字色
      fill: "orange", // ボタン色
      cornerRadius: 35, // 角丸み
    })
      .addChildTo(this)
      .setPosition(this.gridX.center(7), this.gridY.center(-6));
    jpButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("enter_se", false);
      tuto.direction = 0;
    };

    // enボタン
    var enButton = Button({
      width: this.gridX.width / 8, // 横サイズ
      height: this.gridY.width / 8, // 縦サイズ
      text: "En",
      fontSize: 60, // 文字サイズ
      fontWeight: "bold",
      fontColor: "black", // 文字色
      fill: "blue", // ボタン色
      cornerRadius: 35, // 角丸み
    })
      .addChildTo(this)
      .setPosition(this.gridX.center(7), this.gridY.center(-3.5));
    enButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("enter_se", false);
      tuto.direction = 1;
    };

    // キャンセルボタン
    var cancelButton = Button({
      width: this.gridX.width / 10, // 横サイズ
      height: this.gridY.width / 10, // 縦サイズ
      text: "×",
      fontSize: 60, // 文字サイズ
      fontWeight: "bold",
      fontColor: "black", // 文字色
      fill: "red", // ボタン色
      cornerRadius: 35, // 角丸み
    })
      .addChildTo(this)
      .setPosition(this.gridX.center(-6.5), this.gridY.center(-6));

    cancelButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("cancel_se", false);
      MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
      // 自身を取り除く
      this.parent.exit();
    };

    //更新
    this.update = function () {
      //キー入力
      const key = this.app.keyboard;

      // チュートリアル終了
      if (key.getKeyDown("enter")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
        this.exit();
      }
      if (key.getKeyDown("escape")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
        this.exit();
      }
      if (key.getKeyDown("space")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        MySoundManager.prototype.SetVolumeMyPlaySound(0.2, true);
        this.exit();
      }

      // 日本語チュートリアル画像に変更
      if (key.getKeyDown("j")) {
        MySoundManager.prototype.MyPlaySound("enter_se", false);
        tuto.direction = 0;
      }
      if (key.getKeyDown("left")) {
        MySoundManager.prototype.MyPlaySound("enter_se", false);
        tuto.direction = 0;
      }

      // 英語チュートリアル画像に変更
      if (key.getKeyDown("e")) {
        MySoundManager.prototype.MyPlaySound("enter_se", false);
        tuto.direction = 1;
      }
      if (key.getKeyDown("right")) {
        MySoundManager.prototype.MyPlaySound("enter_se", false);
        tuto.direction = 1;
      }
    };

    // サウンド小さくする
    MySoundManager.prototype.SetVolumeMyPlaySound(0.05, true);
  },
});
