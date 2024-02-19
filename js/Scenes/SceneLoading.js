// LoadingScene クラスを定義
phina.define("SceneLoading", {
  superClass: "phina.display.DisplayScene",

  init: function (options) {
    this.superInit(options);
    var self = this;
    var count = 0;
    this.loopKisikilFlag = OFF;
    this.exitFlag = OFF;
    var kisikil_loading = null;
    // this.backgroundColor = "#F1E6EF";

    // view
    var baseLayer = phina.display.DisplayElement(options).addChildTo(this);
    var labelTap = null; // ラベル変数を外で定義し、初期値を null に設定

    // ローディングキスキル生成処理
    var MakeLoadingKisikil = function (e) {
      if (OFF === self.loopKisikilFlag) {
        // ロード用キスキル画像生成用配列
        var listKisikilLoading = [
          "loading_1_img",
          "loading_2_img",
          "loading_3_img",
          "loading_4_img",
          "loading_5_img",
        ];
        kisikil_loading = phina.display
          .Sprite(listKisikilLoading[count])
          .addChildTo(baseLayer); // kisikil_loading を再定義
        kisikil_loading.x = self.gridX.center();
        kisikil_loading.y = self.gridY.center();

        kisikil_loading.tweener
          .clear()
          .wait(800)
          .call(function () {
            if (3 === count) {
              count = 0;
              kisikil_loading.remove();
              MakeLoadingKisikil();
            } else if (4 === count) {
              count = 0;
              kisikil_loading.remove();
              MakeLoadingKisikil();
            } else {
              count += 1;
              kisikil_loading.remove();
              MakeLoadingKisikil();
            }
          });
        if (2 === count) {
          if (!labelTap) {
            // ラベルが存在しない場合にのみ生成
            labelTap = phina.display
              .Label({
                text: "Tap!",
              })
              .addChildTo(baseLayer)
              .setPosition(baseLayer.width * 0.4, baseLayer.height * 0.4);
          }
        } else {
          if (labelTap) {
            labelTap.remove(); // ラベルを削除
            labelTap = null; // ラベル変数を null に設定
          }
        }
      }
    };
    this.on("pointend", function () {
      if (count === 2) {
        count = 4; // countを4に設定
        kisikil_loading.remove();
        MakeLoadingKisikil();
        labelTap = phina.display
          .Label({
            text: "Great!",
          })
          .addChildTo(baseLayer)
          .setPosition(baseLayer.width * 0.4, baseLayer.height * 0.4);
      }
    });

    this.MakeLoadingKisikil = MakeLoadingKisikil; // MakeLoadingKisikil をインスタンスメソッドとして設定
    this.MakeLoadingKisikil(); // 最初に呼び出す

    // ラベル
    var label = phina.display
      .Label({
        text: "読み込み中。スマホはちょっと時間かかるかも...\n※横持ち推奨",
      })
      .addChildTo(baseLayer)
      .setPosition(this.width * 0.5, this.height * 0.2);
    label.tweener
      .clear()
      .setLoop(1)
      .to({ alpha: 0 }, 500)
      .to({ alpha: 1 }, 500);

    // ゲージ
    var gauge = phina.ui
      .Gauge({
        value: 0,
        gaugeColor: "#41E564",
      })
      .setPosition(this.width * 0.5, this.height * 0.8)
      .addChildTo(baseLayer);
    gauge.animationTime = 10000;

    // フロー
    var flows = [];

    // ローダー処理
    var loader = phina.asset.AssetLoader();
    var loaderFlow = phina.util.Flow(function (resolve) {
      // 進行
      loader.onprogress = function (e) {
        // console.log(e)
        gauge.value = e.progress * 80;
      };

      // ロード完了
      loader.onload = function () {
        resolve("loader loaded!");
      };
    });
    flows.push(loaderFlow);
    loader.load(MAIN_ASSET);

    // 時間稼ぎ用の仮処理
    var otherFlow = phina.util.Flow(function (resolve) {
      setTimeout(function () {
        resolve("owari!");
      }, 500);
    });
    flows.push(otherFlow);

    // タッチラベル
    var touchLabel = Label({
      text: "Tap or AnyKey", // 表示文字
      fill: "black", // 文字色
      strokeWidth: 6, // 枠太さ
      fontSize: 100, // 文字サイズ
    })
      .setPosition(this.gridX.center(), this.gridY.center()) // 座標設定
      .addChildTo(this); // 現在のページに対してこのラベルを追加する
    touchLabel.alpha = 0;

    // 危険ラベル
    var cautionLabel = Label({
      text: "※音が出ます", // 表示文字
      fill: "black", // 文字色
      strokeWidth: 1, // 枠太さ
      fontSize: 30, // 文字サイズ
    })
      .setOrigin(1, 1) // 原点座標設定（(1,1)で右下）
      .setPosition(this.gridX.span(16), this.gridY.span(16)) // 座標設定（(16,16)で画面右下）
      .addChildTo(this); // 現在のページに対してこのラベルを追加する
    cautionLabel.alpha = 0;

    // 全て終わったら
    phina.util.Flow.all(flows).then(function (args) {
      // シーン遷移可能状態にする
      self.exitFlag = ON;

      //ゲージ即座に100％に
      gauge.animationTime = 1;
      gauge.value = 100;

      //キスキルの生成をストップ
      self.loopKisikilFlag = ON;
      count = 10000;
      if (labelTap) {
        labelTap.remove(); // ラベルを削除
        labelTap = null; // ラベル変数を null に設定
      }

      label.text = "LOAD COMPLETE!";
      label.tweener
        .clear()
        .to({ alpha: 0 }, 100)
        .to({ alpha: 1 }, 100)
        .to({ alpha: 0 }, 100)
        .to({ alpha: 1 }, 100)
        .to({ alpha: 0 }, 100)
        .to({ alpha: 1 }, 100)
        .wait(700)
        .call(function () {
          touchLabel.alpha = 1;
          cautionLabel.alpha = 1;
          // 明滅させる
          touchLabel.tweener
            .clear()
            .setLoop(true)
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 1000);

          // baseLayer.tweener
          //   .clear()
          //   .by({ alpha: -1, y: -70 }, 300, "easeInQuad")
          //   .wait(300)
          //   .call(function () {
          //     // self.replaceScene(scene);
          //     //self.app.popScene();
          //     self.flare("loaded");
          //   });
        });
    });

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

    // シーン遷移
    this.on("pointend", function () {
      if (ON === this.exitFlag) {
        MySoundManager.prototype.MyPlaySound("enter_se", false);
        this.exitScene(this);
      }
    });

    // シーン遷移
    this.on("keyup", function () {
      if (ON === this.exitFlag) {
        MySoundManager.prototype.MyPlaySound("enter_se", false);
        this.exitScene(this);
      }
    });

    // モバイルでの再生制限アンロックのため、画面タッチ時にSoundを無音再生
    this.on("enter", function () {
      var event = "touchstart";
      var dom = this.app.domElement;
      dom.addEventListener(
        event,
        (function () {
          return function f() {
            var context = phina.asset.Sound.getAudioContext();
            var buf = context.createBuffer(1, 1, 22050);
            var src = context.createBufferSource();
            src.buffer = buf;
            src.connect(context.destination);
            src.start(0);

            dom.removeEventListener(event, f, false);
          };
        })(),
        false
      );
    });

    // サウンド初期化
    MySoundManager.prototype.init(true);
  },
});
