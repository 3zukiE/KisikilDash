// ResultAnimeScene クラスを定義
phina.define("SceneResultAnime", {
  superClass: "phina.display.DisplayScene",
  init: function (option) {
    this.superInit(option);
    // 背景色を指定
    this.backgroundColor = "#222";

    this.scoreStartFlag = ON;
    this.scoreEndFlag = OFF;
    this.rankStartFlag = OFF;
    this.rankEndFlag = OFF;
    this.shapeWhiteStartFlag = OFF;
    this.shapeWhiteEndFlag = OFF;

    this.rankAnimeFlag = OFF;
    this.shapeWhiteAlphaFlag = OFF;

    this.score = SCORE_LEVEL_1;
    var elapsedTime = 0;
    // スコアの増加量
    var scoreIncreasePerSecond = g_score / 100;

    // 背景画像
    var listResultBack = [
      "result_back_EF_img", // ランクF
      "result_back_EF_img", // ランクE
      "result_back_EF_img", // ランクD
      "result_back_CD_img", // ランクC
      "result_back_CD_img", // ランクB
      "result_back_CD_img", // ランクA
      "result_back_CD_img", // ランクS
    ];
    var result_back = Sprite(listResultBack[g_level]);
    result_back.addChildTo(this);
    result_back.setOrigin(0, 0);

    // スコアラベル
    var scoreLabel = Label({
      text: "スコア：" + Math.floor(this.score) + "点", // スコアを整数で表示
      fontSize: 48,
      fill: "white",
      x: this.gridX.center(3),
      y: this.gridY.center(-4),
    }).addChildTo(this);

    scoreLabel.update = function () {
      this.text = "スコア：" + Math.floor(this.parent.score) + "点"; // スコアを整数で表示
      if (OFF === this.parent.scoreEndFlag) {
        if (this.parent.score < g_score) {
          this.parent.score += scoreIncreasePerSecond * elapsedTime;
        } else {
          // 目標スコアを超えないようにする
          this.parent.score = Math.min(this.parent.score, g_score);
          MySoundManager.prototype.MyPlaySound("result_se", false);
          this.parent.scoreEndFlag = ON;
        }
      }
    };

    // ランクラベル
    var rankLabel = Label({
      text: "ランク：",
      fontSize: 48,
      fill: "white",
      x: this.gridX.center(1),
      y: this.gridY.center(-2.6),
    }).addChildTo(this);

    rankLabel.update = function () {
      if (ON === this.parent.rankStartFlag) {
        if (OFF === this.parent.rankAnimeFlag) {
          rankLabel.alpha = 1;
          this.parent.rankAnimeFlag = ON;
          this.parent.rankAnime(this);
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
      if (ON === this.scoreEndFlag) {
        this.rankStartFlag = ON;
      }
      if (ON === this.rankEndFlag) {
        this.shapeWhiteStartFlag = ON;
      }
      if (ON === this.shapeWhiteEndFlag) {
        this.exit({gameEndType : option.gameEndType, deathName : option.deathName, atk : option.atk});
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
            e.exit({gameEndType : option.gameEndType, deathName : option.deathName, atk : option.atk});
          }
        };
      }
    };

    // ランクアニメーション処理
    this.rankAnime = function (e) {
      var self = this; // `this` の参照を一時変数に格納
      // ランク画像
      var result_font = [
        "result_font_F_img", // ランクF
        "result_font_E_img", // ランクE
        "result_font_D_img", // ランクD
        "result_font_C_img", // ランクC
        "result_font_B_img", // ランクB
        "result_font_A_img", // ランクA
        "result_font_S_img", // ランクS
      ];
      var resultFont = Sprite(result_font[g_level]);
      resultFont.addChildTo(this);
      resultFont.setPosition(
        this.gridX.center(6),
        this.gridY.center(-6),
      )
      resultFont.scaleX = 6;
      resultFont.scaleY = 6;

      resultFont.tweener.clear()
      .to(
        {
          x: this.gridX.center(3.5),
          y: this.gridY.center(-1),
          rotation: 720,
          scaleX: 1,
          scaleY: 1,
        },
        1000
      )
      .call(function () {
        MySoundManager.prototype.MyPlaySound("result_se", false);
        // thisじゃダメだったけどself使ったらいけた
        self.rankEndFlag = ON;
      });
    };

    // シーンスキップ
    this.on("pointend", function () {
      MySoundManager.prototype.MyPlaySound("result_se", false);
      this.skipScene(this);
    });
    this.on("keydown", function () {
      MySoundManager.prototype.MyPlaySound("result_se", false);
      this.skipScene(this);
    });
    // 経過時間を更新するイベントリスナーを登録
    this.on("enterframe", function (e) {
      elapsedTime += e.app.ticker.deltaTime / 500; // スコアの再生にどれくらい時間をかけるか
    });

    // サウンド初期化
    MySoundManager.prototype.init(true);
  },
});
