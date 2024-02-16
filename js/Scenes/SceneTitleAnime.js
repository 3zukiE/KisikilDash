// TitleAnimeScene クラスを定義
phina.define("SceneTitleAnime", {
  superClass: "phina.display.DisplayScene",
  init: function (option) {
    this.superInit(option);
    // 背景色を指定
    this.backgroundColor = "#222";

    this.shapeBlackStartFlag = ON;
    this.shapeBlackEndFlag = OFF;
    this.titleLogoStartFlag = OFF;
    this.titleLogoEndFlag = OFF;
    this.titleKisikilStartFlag = OFF;
    this.titleKisikilEndFlag = OFF;
    this.titleKuribohStartFlag = OFF;
    this.titleKuribohEndFlag = OFF;
    this.shapeWhiteStartFlag = OFF;
    this.shapeWhiteEndFlag = OFF;

    this.shapeWhiteAlphaFlag = OFF;

    // 背景画像
    var titleBackground = Sprite("title_background_img");
    titleBackground.addChildTo(this);
    titleBackground.x = this.gridX.center();
    titleBackground.y = this.gridY.center();

    // クリボー
    var titleKuriboh = Sprite("title_kuriboh_img");
    titleKuriboh.addChildTo(this);
    titleKuriboh.x = this.gridX.center(-5);
    titleKuriboh.y = this.gridY.center();

    titleKuriboh.update = function () {
      if (OFF === this.parent.titleKuribohEndFlag) {
        if (ON === this.parent.titleKuribohStartFlag) {
          this.x += 60;
          if (this.parent.gridX.center() <= this.x) {
            this.x = this.parent.gridX.center();
            this.parent.titleKuribohEndFlag = ON;
          }
        }
      }
    };

    // キスキル
    var titleKisikil = Sprite("title_kisikil_img");
    titleKisikil.addChildTo(this);
    titleKisikil.x = this.gridX.center(-16);
    titleKisikil.y = this.gridY.center();

    titleKisikil.update = function () {
      if (OFF === this.parent.titleKisikilEndFlag) {
        if (ON === this.parent.titleKisikilStartFlag) {
          this.x += this.parent.gridX.center();
          if (this.parent.gridX.center() <= this.x) {
            this.x = this.parent.gridX.center();
            this.parent.titleKisikilEndFlag = ON;
          }
        }
      }
    };

    // タイトルロゴ
    var titleLogo = Sprite("title_logo_img");
    titleLogo.addChildTo(this);
    titleLogo.x = this.gridX.center(-13);
    titleLogo.y = this.gridY.center(-2.3);

    titleLogo.update = function () {
      if (OFF === this.parent.titleLogoEndFlag) {
        if (ON === this.parent.titleLogoStartFlag) {
          this.x += 40;
          if (this.parent.gridX.center(-3) <= this.x) {
            this.x = this.parent.gridX.center(-3);
            this.parent.titleLogoEndFlag = ON;
          }
        }
      }
    };

    // フェードイン用
    var shapeBlack = Shape({
      width: SCREEN_X, // 横サイズ
      height: SCREEN_Y, // 縦サイズ
      backgroundColor: "black", // 色
    })
      .setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);

    shapeBlack.update = function () {
      if (OFF === this.parent.shapeBlackEndFlag) {
        if (ON === this.parent.shapeBlackStartFlag) {
          this.alpha -= 0.1;
          if (0 >= this.alpha) {
            this.parent.shapeBlackEndFlag = ON;
          }
        }
      }
    };

    // 光らせる用
    var shapeWhite = Shape({
      width: SCREEN_X, // 横サイズ
      height: SCREEN_Y, // 縦サイズ
      backgroundColor: "#ffffe0", // 色
    })
      .setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);
    shapeWhite.alpha = 0;

    shapeWhite.update = function () {
      if (OFF === this.parent.shapeWhiteEndFlag) {
        if (ON === this.parent.shapeWhiteStartFlag) {
          if (OFF === this.parent.shapeWhiteAlphaFlag) {
            this.alpha += 0.25;
            if (1 <= this.alpha) {
              this.parent.shapeWhiteAlphaFlag = ON;
            }
          } else {
            this.alpha -= 0.25;
            if (0 >= this.alpha) {
              this.parent.shapeWhiteEndFlag = ON;
            }
          }
        }
      }
    };

    // 更新
    this.update = function () {
      if (ON === this.shapeBlackEndFlag) {
        this.titleLogoStartFlag = ON;
      }
      if (ON === this.titleLogoEndFlag) {
        this.titleKisikilStartFlag = ON;
      }
      if (ON === this.titleKisikilEndFlag) {
        this.shapeWhiteStartFlag = ON;
      }
      if (ON === this.shapeWhiteEndFlag) {
        this.titleKuribohStartFlag = ON;
      }
      if (ON === this.titleKuribohEndFlag) {
        this.exit();
      }
    };

    // シーンスキップ処理
    this.skipScene = function (e) {
      if (OFF === this.shapeWhiteEndFlag) {
        var shapeWhite = Shape({
          width: SCREEN_X, // 横サイズ
          height: SCREEN_Y, // 縦サイズ
          backgroundColor: "#ffffe0", // 色
        })
          .setPosition(this.gridX.center(), this.gridY.center())
          .addChildTo(this);
        shapeWhite.alpha = 0;

        shapeWhite.update = function () {
          this.alpha += 0.25;
          if (1 <= this.alpha) {
            e.exit();
          }
        };
      }
    };

    // シーンスキップ
    this.on("pointend", function () {
      MySoundManager.prototype.MyPlaySound("enter_se", false);
      this.skipScene(this);
    });
    this.on("keydown", function () {
      MySoundManager.prototype.MyPlaySound("enter_se", false);
      this.skipScene(this);
    });

    // サウンド初期化
    MySoundManager.prototype.init(true);
  },
});
