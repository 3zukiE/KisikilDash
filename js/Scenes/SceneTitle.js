// TitleScene クラスを定義
phina.define("SceneTitle", {
  superClass: "phina.display.DisplayScene",
  init: function (option) {
    this.superInit(option);
    // 背景色を指定
    this.backgroundColor = "#222";

    // ユーザー入力を格納する配列
    var userInput = [];

    // 隠しコマンドを実行したかどうか
    var KONAMIcommandFlag = 0;

    // 背景画像
    var titleBackground = Sprite("title_background_img");
    titleBackground.addChildTo(this);
    titleBackground.x = this.gridX.center();
    titleBackground.y = this.gridY.center();

    // クリボー
    var titleKuriboh = Sprite("title_kuriboh_img");
    titleKuriboh.addChildTo(this);
    titleKuriboh.x = this.gridX.center();
    titleKuriboh.y = this.gridY.center();

    // キスキル
    var titleKisikil = Sprite("title_kisikil_img");
    titleKisikil.addChildTo(this);
    titleKisikil.x = this.gridX.center();
    titleKisikil.y = this.gridY.center();

    // タイトルロゴ
    var titleLogo = Sprite("title_logo_img");
    titleLogo.addChildTo(this);
    titleLogo.x = this.gridX.center(-3);
    titleLogo.y = this.gridY.center(-2.3);

    // バージョンラベル
    var versionLabel = Label({
      text: "Ver: " + g_version + "\nX: @3zukiE",
      fontSize: 24,
      fill: "white",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      x: this.gridX.center(-6.2),
      y: this.gridY.center(8),
    }).addChildTo(this);
    versionLabel.setOrigin(1, 1)

    // プレイボタン
    var titlePlayButton = Sprite("title_play_button_img");
    titlePlayButton.addChildTo(this);
    titlePlayButton.setPosition(this.gridX.center(-3), this.gridY.center(4));
    titlePlayButton.setInteractive(true);

    // ボタンクリックした時の処理
    titlePlayButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("enter2_se", false);
      this.parent.exit();
    };

    // チュートリアルボタン
    var titleTutorialButton = Sprite("title_tutorial_button_img");
    titleTutorialButton.addChildTo(this);
    titleTutorialButton.setPosition(this.gridX.center(3), this.gridY.center(4));
    titleTutorialButton.setInteractive(true);

    titleTutorialButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("enter_se", false);
      // ポーズシーンをpushする
      this.parent.app.pushScene(SceneTutorial());
    };

    // ギャラリーボタン
    var titleGalleryButton = Sprite("title_gallery_button_img");
    titleGalleryButton.addChildTo(this);
    titleGalleryButton.setPosition(this.gridX.center(), this.gridY.center(6.5));
    titleGalleryButton.setInteractive(true);
    if (OFF === g_GalleryViewFlag){
      titleGalleryButton.setInteractive(false);
      titleGalleryButton.alpha = 0;
    }

    titleGalleryButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("enter2_se", false);
      this.parent.exit("sceneGallery",{KONAMIcommandFlag : KONAMIcommandFlag});
    };

    //更新
    this.update = function () {
      //キー入力
      const key = this.app.keyboard;

      // プレイ
      if (key.getKeyDown("f")) {
        MySoundManager.prototype.MyPlaySound("enter2_se", false);
        this.exit();
      }
      if (key.getKeyDown("enter")) {
        MySoundManager.prototype.MyPlaySound("enter2_se", false);
        this.exit();
      }
      if (key.getKeyDown("space")) {
        MySoundManager.prototype.MyPlaySound("enter2_se", false);
        this.exit();
      }

      // チュートリアル
      if (key.getKeyDown("j")) {
        MySoundManager.prototype.MyPlaySound("enter_se", false);
        this.app.pushScene(SceneTutorial());
      }

      // ギャラリー
      if (key.getKeyDown("g")) {
        if (ON === g_GalleryViewFlag) {
          MySoundManager.prototype.MyPlaySound("enter2_se", false);
          this.exit("sceneGallery",{KONAMIcommandFlag : KONAMIcommandFlag});
        }
      }
    };

    this.on("keyup", function (e) {
      // ユーザー入力を配列に追加する
      userInput.push(e.keyCode);

      // 配列の長さを制限することで、最新のユーザー入力だけを保持する
      userInput.splice(
        -KONAMIcommand.length - 1,
        userInput.length - KONAMIcommand.length
      );

      // ユーザー入力が隠しコマンドと一致する場合にギャラリーボタンを表示する
      if (JSON.stringify(userInput) === JSON.stringify(KONAMIcommand)) {
        MySoundManager.prototype.MyPlaySound("enter3_se", false);
        g_GalleryViewFlag = ON;
        KONAMIcommandFlag = 1;
      }
      if (ON === g_GalleryViewFlag){
        titleGalleryButton.setInteractive(true);
        titleGalleryButton.alpha = 1;
      }
    });

    // サウンド初期化
    MySoundManager.prototype.init(true);
    // BGM再生
    MySoundManager.prototype.MyPlaySound("title_bgm", true);

    // ゲームシーンで使用する値の初期化
    g_score = 0;
  },
});
