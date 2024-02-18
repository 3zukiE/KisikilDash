// ResultScene クラスを定義
phina.define("SceneResult", {
  superClass: "phina.display.DisplayScene",
  init: function (option) {
    this.superInit(option);
    // 背景色を指定
    this.backgroundColor = "#222";

    // ツイートしてくれ
    this.tweetFlg = OFF;

    // 背景画像
    var listResultBack = [
      "result_back_EF_img", // ランクF
      "result_back_EF_img", // ランクE
      "result_back_CD_img", // ランクD
      "result_back_CD_img", // ランクC
      "result_back_CD_img", // ランクB
      "result_back_CD_img", // ランクA
      "result_back_S_img", // ランクS
    ];
    var result_back = Sprite(listResultBack[g_level]);
    result_back.addChildTo(this);
    result_back.setOrigin(0, 0);

    // ギャラリーボタン
    var GalleryButton = Sprite("title_gallery_button_img");
    GalleryButton.addChildTo(this);
    GalleryButton.setPosition(this.gridX.center(-5), this.gridY.center(6.3));
    if (OFF === g_GalleryViewFlag){
      GalleryButton.setInteractive(false);
      GalleryButton.alpha = 0;
    }

    GalleryButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("enter2_se", false);
      this.parent.exit("sceneGallery");
    };

    // ギャラリー鎖ボタン（というか画像）
    var listGalleryChainTweetButton = [
      "result_gallery_chain_rank_img", // ランクF
      "result_gallery_chain_rank_img", // ランクE
      "result_gallery_chain_rank_img", // ランクD
      "result_gallery_chain_rank_img", // ランクC
      "result_gallery_chain_tweet_img", // ランクB
      "result_gallery_chain_tweet_img", // ランクA
      "result_gallery_chain_tweet_img", // ランクS
    ];
    var GalleryChainTweetButton = Sprite(listGalleryChainTweetButton[g_level]);
    GalleryChainTweetButton.addChildTo(this);
    GalleryChainTweetButton.setPosition(this.gridX.center(-5), this.gridY.center(5.2));

    // タイトルボタン
    var titleButton = Sprite("result_title_button_img");
    titleButton.addChildTo(this);
    titleButton.setPosition(this.gridX.center(0.7), this.gridY.center(6.3));
    titleButton.setInteractive(true);

    // ボタンクリックした時の処理
    titleButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("cancel_se", false);
      this.parent.exitScene(this.parent);
    };

    // ツイートボタン
    var tweetButton = Sprite("result_tweet_button_img");
    tweetButton.addChildTo(this);
    tweetButton.setPosition(this.gridX.center(5.2), this.gridY.center(6.3));
    tweetButton.setInteractive(true);

    // ツイートボタンクリックした時の処理
    tweetButton.onclick = function () {
      this.parent.tweet();
    };
    this.tweet = function () {
      this.tweetFlg = ON;
      MySoundManager.prototype.MyPlaySound("enter_se", false);
      var text =
        "無料同人ゲーム #キスキルダッシュ でScore: {0}点でrank: {1}を獲得したよ！\n敗北要因: {2}(ATK:{3})\n\nみんなもプレイしてみよう！\n".format(
          g_score,
          g_rank,
          option.deathName,
          option.atk
        );
      var url = phina.social.Twitter.createURL({
        text: text,
        hashtags: ["遊戯王", "フリーゲーム"],
        url: "https://3zukie.github.io/KisikilDash/",
      });

      // 新規ウィンドウで開く場合（OS・端末によっては制限があってダメかも？）
      window.open(url, "share window", "width=480, height=320");

      // 新規タブで開く場合
      // var childWindow = window.open("about:blank");
      // childWindow.location.href = url;
    };

    // スコアラベル
    var scoreLabel = Label({
      text: "スコア：" + g_score + "点",
      fontSize: 48,
      fill: "white",
      x: this.gridX.center(3),
      y: this.gridY.center(-4),
    }).addChildTo(this);

    // ランクラベル
    var rankLabel = Label({
      text: "ランク：",
      fontSize: 48,
      fill: "white",
      x: this.gridX.center(1),
      y: this.gridY.center(-2.6),
    }).addChildTo(this);

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
      this.gridX.center(3.5),
      this.gridY.center(-0.8),
    )

    // 死因ラベル
    var causeOfDeath = "";
    if (option.gameEndType === 0){
      causeOfDeath = "...？？？に";
    } else if (option.gameEndType === 1){
      causeOfDeath = "に";
    } else if (option.gameEndType === 2){
      causeOfDeath = "を攻撃して";
    } else if (option.gameEndType === 3){
      causeOfDeath = "を回避して";
    }

    var causeOfDeathLabel = Label({
      text: option.deathName + "(ATK:" + option.atk + ")\n" + causeOfDeath + "やられた！",
      fontSize: 30,
      fill: "white",
      x: this.gridX.center(3),
      y: this.gridY.center(2.8),
    }).addChildTo(this);

    // ネクストラベル
    var nextScoreLabel = Label({
      text: "次のランクまで：あと" + g_nextScore + "点",
      fontSize: 30,
      fill: "white",
      x: this.gridX.center(3),
      y: this.gridY.center(4.2),
    });

    if (LEVEL_7 === g_level) {
      if (0 >= g_nextScore) {
        nextScoreLabel.text = "Congratulation!";
      } else {
        nextScoreLabel.text = "制作者スコアまで：あと" + g_nextScore + "点";
      }
    }

    nextScoreLabel.addChildTo(this);

    // シーン遷移フェードアウト
    this.exitScene = function (e) {
      var shape = Shape({
        width: SCREEN_X, // 横サイズ
        height: SCREEN_Y, // 縦サイズ
        backgroundColor: "#222", // 色
      })
        .setPosition(e.gridX.center(), e.gridY.center())
        .addChildTo(e);
      shape.alpha = 0;

      shape.update = function () {
        this.alpha += 0.5;
        MySoundManager.prototype.SetVolumeMyPlaySound(
          0.1 - (0.1 * this.alpha) / 2,
          true
        );
        if (1 <= this.alpha) {
          e.exit();
        }
      };
    };

    //更新
    this.update = function () {
      // Bランク以上取得かつツイートボタン押下でギャラリー表示
      if (ON === this.tweetFlg){
        this.app.pushScene(SceneThankYou());
        this.tweetFlg = OFF;
        if ("S" === g_rank || "A" === g_rank || "B" === g_rank){
          GalleryChainTweetButton.alpha = 0;
          g_GalleryViewFlag = ON;
        }
      }
      if (ON === g_GalleryViewFlag){
        GalleryButton.setInteractive(true);
        GalleryButton.alpha = 1;
        GalleryChainTweetButton.alpha = 0;
      }


      //キー入力
      const key = this.app.keyboard;

      // 終了
      if (key.getKeyDown("escape")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        this.exitScene(this);
      }
      if (key.getKeyDown("enter")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        this.exitScene(this);
      }
      if (key.getKeyDown("space")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        this.exitScene(this);
      }

      // ツイート
      if (key.getKeyDown("t")) {
        this.tweet();
      }

      // ギャラリー
      if (key.getKeyDown("g")) {
        if (ON === g_GalleryViewFlag) {
          MySoundManager.prototype.MyPlaySound("enter2_se", false);
          this.exit("sceneGallery");
        }
      }
    };

    // サウンド初期化
    MySoundManager.prototype.init(true);
    // BGM再生
    MySoundManager.prototype.MyPlaySound("result_bgm", true);
  },
});
