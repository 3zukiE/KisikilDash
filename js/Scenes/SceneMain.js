// MainScene クラスを定義
phina.define("SceneMain", {
  superClass: "phina.display.DisplayScene",
  init: function (option) {
    this.superInit(option);

    // タイトルシーンを読み込む
    var loader = phina.asset.AssetLoader();
    loader.load(RESULT_ASSET);

    // 背景色を指定
    this.backgroundColor = "#222";

    // 初期化
    g_groundLine = this.gridY.center(4.7);
    g_flyingLine = this.gridY.center(1.5);
    g_kisikilLine = this.gridX.center(-5.5);
    g_treasureFlag = OFF;
    g_makeMonsterFlag = OFF;
    this.time = 0;
    this.makeMonsterTime = 20;
    g_level = LEVEL_1;
    g_hornKisikilFlag = OFF;
    g_kisikilAtk = 500;
    this.deathName = "バグってます";
    this.gameEndType = 0;
    this.atk = 0;

    // シーン遷移フラグ
    this.exitSceneFlag = OFF;

    // カウントダウンフラグ
    this.countDownFlag = OFF;

    // ゲーム開始フラグ
    this.playGameFlag = OFF;

    // 背景画像
    var mainBackground = Sprite("main_background_img")
      .setOrigin(0, 0)
      .setPosition(0, 0)
      .addChildTo(this);
    mainBackground.update = function () {
      if (ON === this.parent.playGameFlag) {
        mainBackground.x -= 4;
        if (-mainBackground.width + SCREEN_X >= mainBackground.x) {
          mainBackground.x = mainBackground.x + mainBackground.width - SCREEN_X;
        }
      }
    };

    // 地面画像
    var mainGround = Sprite("main_ground_img")
      .setOrigin(0, 0)
      .setPosition(0, 0)
      .addChildTo(this);
    mainGround.update = function () {
      if (ON === this.parent.playGameFlag) {
        mainGround.x -= 20;
        if (-mainGround.width + SCREEN_X >= mainGround.x) {
          mainGround.x = mainGround.x + mainGround.width - SCREEN_X;
        }
      }
    };

    // スコアラベル
    this.scoreLabel = Label({
      text: "",
      fontSize: 48,
      fill: "white",
      x: this.gridX.span(10),
      y: this.gridY.span(1),
    }).addChildTo(this);

    // キスキルステータス変動ラベル
    var kisikilStatusChangeLabel = Label({
      text: "装備破壊！",
      fontSize: 36,
      fill: "white", // 文字色
      stroke: "red", // 枠色
    })
    .setOrigin(0,1)
    .setPosition(g_kisikilLine + 30, g_flyingLine - 30)
    .addChildTo(this);
    kisikilStatusChangeLabel.alpha = 0;

    // 決闘開始オブジェクト
    var mainCountDuel = Sprite("main_count_duel_img")
      .setPosition(this.gridX.center(), this.gridY.center())
      .setScale(0.5,0.5)
      .addChildTo(this);
    mainCountDuel.alpha = 0;

    // カウント1オブジェクト
    var mainCount1 = Sprite("main_count_1_img")
      .setPosition(this.gridX.center() + 100, this.gridY.center())
      .addChildTo(this);
    mainCount1.alpha = 0;

    // カウント2オブジェクト
    var mainCount2 = Sprite("main_count_2_img")
      .setPosition(this.gridX.center() + 100, this.gridY.center())
      .addChildTo(this);
    mainCount2.alpha = 0;

    // カウント3オブジェクト
    var mainCount3 = Sprite("main_count_3_img")
      .setPosition(this.gridX.center() + 100, this.gridY.center())
      .addChildTo(this);
    mainCount3.alpha = 0;

    // キスキルオブジェクト
    var mainKisikil = ObjectKisikil("main_kisikil_img")
      .setOrigin(0.5, 1)
      .addChildTo(this);
    mainKisikil.x = g_kisikilLine;
    mainKisikil.y = g_groundLine;

    // ホーンキスキルオブジェクト
    var mainHornKisikil = ObjectHornKisikil("main_horn_kisikil_img")
      .setOrigin(0.5, 1)
      .addChildTo(this);
    mainHornKisikil.x = g_kisikilLine;
    mainHornKisikil.y = g_groundLine;
    mainHornKisikil.alpha = 0;

    // お宝画像（えっちな意味ではない）
    var treasure = Sprite("treasure_img").addChildTo(this);
    treasure.scaleX = 0.6;
    treasure.scaleY = 0.6;
    treasure.x = g_kisikilLine;
    treasure.y = g_groundLine;
    treasure.alpha = 0;

    treasure.update = function () {
      // お宝を盗まれたらお宝を出現させ、モンスターに追従させる
      if (ON === g_treasureFlag) {
        this.alpha = 1;
        this.x -= MONSTER_BASE_SPEED * g_MonsterSpeedMag * 2;
      }
    };

    // ポーズボタン
    var pauseButton = Button({
      width: this.gridY.width / 10, // 横サイズ
      height: this.gridY.width / 10, // 縦サイズ
      text: "||",
      fontSize: 40, // 文字サイズ
      fontColor: "white", // 文字色
      fontWeight: "bold",
      fill: "skyblue", // ボタン色
      stroke: "blue", // 枠色
      strokeWidth: 5, // 枠太さ
      cornerRadius: 35, // 角丸み
    })
      .setPosition(this.gridX.span(1), this.gridY.span(1))
      .addChildTo(this);
    pauseButton.alpha = 0.95;

    // ポーズボタンクリック
    pauseButton.onpointstart = function () {
      g_pauseFlag = ON;
    };

    // ポーズボタンクリック
    pauseButton.onpointend = function () {
      MySoundManager.prototype.MyPlaySound("pause_se", false);
      g_pauseFlag = OFF;
      // ポーズシーンをpushする
      this.parent.app.pushScene(ScenePause());
    };

    // 当たり判定ボックス
    var hitShape = Shape({
      width: this.gridX.width / 4.8, // 横サイズ
      height: (SCREEN_Y / 3), // 縦サイズ
      backgroundColor: "yellow",
    })
      .setOrigin(0, 1)
      .setPosition(this.gridX.center(-6.7), g_groundLine)
      .addChildTo(this);
    hitShape.alpha = 0.3;

    // 死亡判定ボックス
    var deathShape = Shape({
      width: 1, // 横サイズ
      height: (SCREEN_Y / 3), // 縦サイズ
      backgroundColor: "red",
    })
      .setOrigin(1, 1)
      .setPosition(hitShape.x, g_groundLine)
      .addChildTo(this);
    deathShape.alpha = 0.3;

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
        this.alpha += 0.08;
        MySoundManager.prototype.SetVolumeMyPlaySound(
          0.1 - (0.1 * this.alpha) / 2,
          true
        );
        if (2 <= this.alpha) {
          SoundManager.stopMusic();
          e.exit({gameEndType : gameEndType, deathName : deathName, atk : atk});
        }
      };
    };

    // モンスターグループ
    var monsterGroup = DisplayElement().setPosition(0, 0).addChildTo(this);

    // モンスターランダム生成
    this.makeMonster = function (e) {
      // キスキルがホーン状態かつ一時スコアが2000以上でサイクロン生成
      if (1 === g_hornKisikilFlag && 2000 <= g_tempScore) {
        // サイクロンを生成し、makeMonsterFlagをオフにする
        monster = ObjectMysticalSpaceTyphoon(
          this.gridX.span(16),
          g_groundLine
        ).addChildTo(e);
        g_makeMonsterFlag = OFF;
      } else {
        // モンスター生成時、7%の確率でアイテム出現
        var spawnFlag = Math.randint(0, 99);
        if (92 >= spawnFlag) {
          var monsterFlag = Math.randint(0, 8);
          if (0 === monsterFlag) {
            // ハネクリボー
            monster = ObjectWingedKuriboh(
              this.gridX.span(16),
              g_flyingLine
            ).addChildTo(e);
          } else if (1 === monsterFlag) {
            // クリボー
            monster = ObjectKuriboh(
              this.gridX.span(16),
              g_groundLine
            ).addChildTo(e);
          } else if (2 === monsterFlag) {
            // カードカー・D
            monster = ObjectCardcarD(
              this.gridX.span(16),
              g_groundLine
            ).addChildTo(e);
          } else if (3 === monsterFlag) {
            // ハロハロ
            monster = ObjectHalloHallo(
              this.gridX.span(16),
              g_flyingLine
            ).addChildTo(e);
          } else if (4 === monsterFlag) {
            // ビットロン
            monster = ObjectBitron(
              this.gridX.span(16),
              g_flyingLine
            ).addChildTo(e);
          } else if (5 === monsterFlag) {
            // マシュマロン
            monster = ObjectMarshmallon(
              this.gridX.span(16),
              g_groundLine
            ).addChildTo(e);
          } else if (6 === monsterFlag) {
            // ジェネクス・コントローラー
            monster = ObjectGenexController(
              this.gridX.span(16),
              g_groundLine
            ).addChildTo(e);
          } else if (7 === monsterFlag) {
            // ダーク・リゾネーター
            monster = ObjectDarkResonator(
              this.gridX.span(16),
              g_groundLine
            ).addChildTo(e);
          } else if (8 === monsterFlag) {
            // ゲート・ブロッカー
            monster = ObjectGateblocker(
              this.gridX.span(16),
              g_groundLine
            ).addChildTo(e);
          } else {
            // なし
          }
        } else {
          // アイテムの出現
          if (OFF === g_hornKisikilFlag) {
            // 一角獣のホーンを生成
            monster = ObjectHorn(this.gridX.span(16), g_groundLine).addChildTo(
              e
            );
            g_makeMonsterFlag = OFF;
          } else {
            // すでに取得している場合、クリボーでも出しとくか
            monster = ObjectKuriboh(
              this.gridX.span(16),
              g_groundLine
            ).addChildTo(e);
          }
        }
      }
    };

    // レベル判定
    this.judgeLevel = function () {
      var currentLevel = g_level;

      if (SCORE_LEVEL_7 <= g_score) {
        g_level = LEVEL_7;
        g_rank = RANK_LEVEL_7;
        g_makeMonsterTimeStart = TIME_START_LEVEL_7;
        g_makeMonsterTimeEnd = TIME_END_LEVEL_7;
        g_MonsterSpeedMag = SPEED_LEVEL_7;
        g_nextScore = SCORE_LEVEL_X - g_score;
      } else if (SCORE_LEVEL_6 <= g_score) {
        g_level = LEVEL_6;
        g_rank = RANK_LEVEL_6;
        g_makeMonsterTimeStart = TIME_START_LEVEL_6;
        g_makeMonsterTimeEnd = TIME_END_LEVEL_6;
        g_MonsterSpeedMag = SPEED_LEVEL_6;
        g_nextScore = SCORE_LEVEL_7 - g_score;
      } else if (SCORE_LEVEL_5 <= g_score) {
        g_level = LEVEL_5;
        g_rank = RANK_LEVEL_5;
        g_makeMonsterTimeStart = TIME_START_LEVEL_5;
        g_makeMonsterTimeEnd = TIME_END_LEVEL_5;
        g_MonsterSpeedMag = SPEED_LEVEL_5;
        g_nextScore = SCORE_LEVEL_6 - g_score;
      } else if (SCORE_LEVEL_4 <= g_score) {
        g_level = LEVEL_4;
        g_rank = RANK_LEVEL_4;
        g_makeMonsterTimeStart = TIME_START_LEVEL_4;
        g_makeMonsterTimeEnd = TIME_END_LEVEL_4;
        g_MonsterSpeedMag = SPEED_LEVEL_4;
        g_nextScore = SCORE_LEVEL_5 - g_score;
      } else if (SCORE_LEVEL_3 <= g_score) {
        g_level = LEVEL_3;
        g_rank = RANK_LEVEL_3;
        g_makeMonsterTimeStart = TIME_START_LEVEL_3;
        g_makeMonsterTimeEnd = TIME_END_LEVEL_3;
        g_MonsterSpeedMag = SPEED_LEVEL_3;
        g_nextScore = SCORE_LEVEL_4 - g_score;
      } else if (SCORE_LEVEL_2 <= g_score) {
        g_level = LEVEL_2;
        g_rank = RANK_LEVEL_2;
        g_makeMonsterTimeStart = TIME_START_LEVEL_2;
        g_makeMonsterTimeEnd = TIME_END_LEVEL_2;
        g_MonsterSpeedMag = SPEED_LEVEL_2;
        g_nextScore = SCORE_LEVEL_3 - g_score;
      } else {
        g_level = LEVEL_1;
        g_rank = RANK_LEVEL_1;
        g_makeMonsterTimeStart = TIME_START_LEVEL_1;
        g_makeMonsterTimeEnd = TIME_END_LEVEL_1;
        g_MonsterSpeedMag = SPEED_LEVEL_1;
        g_nextScore = SCORE_LEVEL_2 - g_score;
      }

      // ステージレベル上昇時処理
      if (currentLevel !== g_level) {
        // 0.5秒間のインターバル
        this.makeMonsterTime += 5;

        //ラベル表示
        var levelUpLabel = Label({
          text: "ステージレベル上昇！", // 表示文字
          fill: "white", // 文字色
          stroke: "red", // 枠色
          strokeWidth: 6, // 枠太さ
          fontSize: 50, // 文字サイズ
        })
          .setPosition(this.gridX.center(), this.gridY.center(-5)) // 座標設定
          .addChildTo(this); // 現在のページに対してこのラベルを追加する
        MySoundManager.prototype.MyPlaySound("enter_se", false);

        // 明滅させる
        levelUpLabel.tweener
          .clear()
          .to({ alpha: 0 }, 300)
          .wait(300)
          .to({ alpha: 0.5 }, 150)
          .call(function () {
            MySoundManager.prototype.MyPlaySound("enter_se", false);
          })
          .to({ alpha: 1 }, 150)
          .to({ alpha: 0 }, 300)
          .call(function () {
            levelUpLabel.remove();
          });
      }
    };

    // キスキルの行動
    this.actionKisikil = function (clickState) {
      if (
        KISIKIL_DEATH !== mainKisikil.direction &&
        KISIKIL_STOLEN !== mainKisikil.direction &&
        KISIKIL_IDLE !== mainKisikil.direction &&
        KISIKIL_TYPHOON !== mainKisikil.direction &&
        OFF === g_pauseFlag
      ) {
        if (RIGHT === clickState) {
          // 画面右側をクリック（攻撃）
          // キスキル：アタック
          mainKisikil.direction = KISIKIL_ATTACK;
          mainKisikil.updateStateFlag = 1;
        } else if (LEFT === clickState) {
          // 画面左側をクリック（避ける）
          // キスキル：ドッヂ
          mainKisikil.direction = KISIKIL_DODGE;
          mainKisikil.updateStateFlag = 1;
        }

        // モンスターの判定
        for (let m of monsterGroup.children) {
          if (MONSTER_NORMAL === m.flag) {
            m.judge(clickState);
            if (MONSTER_NORMAL !== m.flag) {
              if (MONSTER_DEATH === m.flag) {
                mainKisikil.killedMonsterY = m.y;
              }
              break;
            }
          }
        }
      }
    };

    // カウントダウン処理
    this.countDown = function () {
      var self = this; // this の値を保存
      // カウントダウン3
      mainCount3.tweener.clear()
      .by(
        {
          alpha: 1,
          x: -100,
        },
        600
      )
      .call(function () {
        MySoundManager.prototype.MyPlaySound("enter4_se", false);
      })
      .wait(200)
      .by(
        {
          alpha: -1,
          x: -100,
        },
        200
      )
      .call(function () {
        mainCount3.remove();
        // カウントダウン2
        mainCount2.tweener.clear()
        .by(
          {
            alpha: 1,
            x: -100,
          },
          600
        )
        .call(function () {
          MySoundManager.prototype.MyPlaySound("enter4_se", false);
        })
        .wait(200)
        .by(
          {
            alpha: -1,
            x: -100,
          },
          200
        )
        .call(function () {
          mainCount2.remove();
          // カウントダウン1
          mainCount1.tweener.clear()
          .by(
            {
              alpha: 1,
              x: -100,
            },
            600
          )
          .call(function () {
            MySoundManager.prototype.MyPlaySound("enter4_se", false);
          })
          .wait(200)
          .by(
            {
              alpha: -1,
              x: -100,
            },
            200
          )
          .call(function () {
            mainCount1.remove();
            // 決闘開始
            mainCountDuel.tweener.clear()
            .by(
              {
                alpha: 1,
                scaleX: 0.8,
                scaleY: 0.8,
              },
              600
            )
            .call(function () {
              MySoundManager.prototype.MyPlaySound("main_bgm", true);
              // ゲーム開始
              self.playGameFlag = ON;
              self.time = 0;
              // 判定ラインを透明化
              hitShape.alpha = 0;
              deathShape.alpha = 0;
              // キスキル：ダッシュ
              mainKisikil.direction = KISIKIL_DASH;
              mainKisikil.updateStateFlag = ON;
              // モンスター生成開始
              g_makeMonsterFlag = ON;
            })
            .wait(400)
            .by(
              {
                alpha: -1,
                scaleX: 2,
                scaleY: 2,
              },
              200
            )
            .call(function () {
              mainCountDuel.remove();
            })
          });
        });
      });
    }

    // ホーン取得時の演出
    this.horn = function () {
      g_makeMonsterFlag = ON;
      g_hornKisikilFlag = ON;
      g_tempScore = 0;
      g_kisikilAtk += 700;
      MySoundManager.prototype.MyPlaySound("enter2_se", false);

      // ラベル表示
      kisikilStatusChangeLabel.text = "ATK700上昇！";
      kisikilStatusChangeLabel.tweener.clear()
      .to({ alpha: 1 }, 400)
      .to({ alpha: 0 }, 100)
      .to({ alpha: 1 }, 400)
      .to({ alpha: 0 }, 100)
      .to({ alpha: 1 }, 400)
      .to({ alpha: 0 }, 100)
      .to({ alpha: 1 }, 400)
      .wait(400)
      .to({ alpha: 0 }, 100);
    }

    // サイクロン演出 サイクロンぶつかったときにやられ顔でくるくる回したい
    this.typhoon = function () {
      mainKisikil.tweener
        .clear()
        .call(function () {
          mainKisikil.direction = KISIKIL_TYPHOON;
          mainKisikil.updateStateFlag = ON;
        })
        .to({ scaleX: -1 }, 100)
        .to({ scaleX: 1 }, 100)
        .to({ scaleX: -1 }, 100)
        .to({ scaleX: 1 }, 100)
        .to({ scaleX: -1 }, 100)
        .to({ scaleX: 1 }, 100)
        .to({ scaleX: -1 }, 100)
        .to({ scaleX: 1 }, 100)
        .call(function () {
          mainKisikil.direction = KISIKIL_DASH;
          mainKisikil.updateStateFlag = ON;
          g_makeMonsterFlag = ON;
          g_kisikilAtk = 500;
        });

      // ラベル表示
      kisikilStatusChangeLabel.text = "装備破壊！";
      kisikilStatusChangeLabel.tweener.clear()
      .to({ alpha: 1 }, 400)
      .to({ alpha: 0 }, 100)
      .to({ alpha: 1 }, 400)
      .to({ alpha: 0 }, 100)
      .to({ alpha: 1 }, 400)
      .to({ alpha: 0 }, 100)
      .to({ alpha: 1 }, 400)
      .wait(400)
      .to({ alpha: 0 }, 100);


      // ホーンが取れていく処理
      if (ON === g_hornKisikilFlag) {
        g_hornKisikilFlag = OFF;
        var hornOfTheUnicorn = Sprite("horn_of_the_unicorn_img")
          .setOrigin(0.5, 0.5)
          .setPosition(g_kisikilLine, g_flyingLine)
          .setScale(0.7, 0.7)
          .addChildTo(this);
        hornOfTheUnicorn.tweener.clear()
        .by(
          {
            x: -20,
            y: -30,
            rotation: 180,
          },
          100
        )
        .setLoop(true);
        // 多分2回目のホーン生成時に1個目のホーンが消える...ま、ええか
        if (0 - hornOfTheUnicorn.sizeX >= hornOfTheUnicorn.x) {
          hornOfTheUnicorn.remove();
        }
      }
    };

    // キスキルの攻撃モーションをランダムに変更する
    this.randAttack = function () {
      if (KISIKIL_ATTACK === mainKisikil.direction) {
        if (50 > Math.randint(0, 100)) {
          mainKisikil.direction = KISIKIL_ATTACK2;
        }
      }
    };

    // キスキルの装備を更新
    this.updateEquipment = function () {
      // ホーンキスキル
      mainHornKisikil.direction = mainKisikil.direction;
      mainHornKisikil.updateStateFlag = mainKisikil.updateStateFlag;
      mainHornKisikil.x = mainKisikil.x;
      mainHornKisikil.y = mainKisikil.y;
      mainHornKisikil.killedMonsterY = mainKisikil.killedMonsterY;
    };

    // 画面クリック
    this.onpointstart = function (e) {
      if (this.gridX.center() < e.pointer.x) {
        // 画面右側をクリック判定
        this.actionKisikil(RIGHT);
      } else {
        // 画面左側をクリック判定
        this.actionKisikil(LEFT);
      }
    };

    this.update = function () {
      // キー入力
      const key = this.app.keyboard;

      // キスキル回避コマンド
      if (key.getKeyDown("f")) {
        this.actionKisikil(LEFT);
      }
      if (key.getKeyDown("left")) {
        this.actionKisikil(LEFT);
      }

      // キスキル攻撃コマンド
      if (key.getKeyDown("j")) {
        this.actionKisikil(RIGHT);
      }
      if (key.getKeyDown("right")) {
        this.actionKisikil(RIGHT);
      }

      // ゲームのポーズ
      if (key.getKeyDown("escape")) {
        MySoundManager.prototype.MyPlaySound("pause_se", false);
        g_pauseFlag = OFF;
        this.app.pushScene(ScenePause());
      }
      if (key.getKeyDown("space")) {
        MySoundManager.prototype.MyPlaySound("pause_se", false);
        g_pauseFlag = OFF;
        this.app.pushScene(ScenePause());
      }

      if (key.getKeyDown("enter")) {
        // デバッグ用★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        deathName = "デバッグで遷移";
        atk = 0;
        gameEndType = 0;
        this.exitScene(this);
      }

      // ヒットラインの更新
      g_hitLine = hitShape.x + hitShape.width;
      // デッドラインの更新
      g_deathLine = hitShape.x;

      // レベルの更新
      this.judgeLevel();

      // 経過秒数を取得
      this.time += this.app.deltaTime;

      // モンスターのデッドライン判定
      for (let m of monsterGroup.children) {
        m.judge(NO_CLICK);
      }

      // キスキルがデスor盗難の場合、全モンスターをストップさせ、ゲーム終了
      if (ON === this.playGameFlag) {
        monsterGroup.children.forEach(function (m) {
          if (MONSTER_ATTACK === m.flag) {
            // キスキル死亡時モンスターの前まで移動
            if (mainKisikil.x < m.x){
              mainKisikil.x = m.x;
            }
            // キスキル：デス
            mainKisikil.direction = KISIKIL_DEATH;
            deathName = m.monsterName;
            gameEndType = m.gameEndType;
            atk = m.atk;


            return;
          }
          if (MONSTER_TREASURE === m.flag) {
            // キスキル：盗難
            mainKisikil.direction = KISIKIL_STOLEN;
            treasure.y -= m.height * m.scaleY; // お宝をモンスターの頭の上に移動
            deathName = m.monsterName;
            gameEndType = m.gameEndType;
            atk = m.atk;
            return;
          }
        });

        if (
          KISIKIL_DEATH === mainKisikil.direction ||
          KISIKIL_STOLEN === mainKisikil.direction
        ) {
          // モンスターストップ
          monsterGroup.children.forEach(function (m) {
            if (MONSTER_NORMAL === m.flag) {
              m.flag = MONSTER_ATTACK;
            }
          });

          mainKisikil.updateStateFlag = ON;
          this.playGameFlag = OFF;
          g_makeMonsterFlag = OFF;
        }
      }

      // モンスター生成
      if (ON === g_makeMonsterFlag) {
        if (this.makeMonsterTime <= this.time / 100) {
          this.time = 0;
          this.makeMonsterTime = Math.randint(
            g_makeMonsterTimeStart,
            g_makeMonsterTimeEnd
          );
          this.makeMonster(monsterGroup);
        }
      }

      // ゲーム開始時、カウントダウン
      if (OFF === this.countDownFlag) {
        this.countDown();
        this.countDownFlag = ON;
      }

      // スコア表示
      this.scoreLabel.text = "スコア： " + g_score;
      // +
      // " レベル： " +
      // g_level +
      // "\n経過秒数/生成秒数:" +
      // (this.time / 1000).toFixed(3) +
      // "/" +
      // this.makeMonsterTime / 10

      // ホーン演出
      if (1 === g_hornFlg) {
        this.horn();
        g_hornFlg = 0;
      }

      // サイクロン演出
      if (1 === g_typhoonFlg) {
        this.typhoon();
        g_typhoonFlg = 0;
      }

      //シーン遷移
      if (KISIKIL_DEATH === mainKisikil.direction) {
        // キスキルが画面外まで落ちたら
        if (this.gridY.width < mainKisikil.y - mainKisikil.height) {
          // 1回だけ実施
          if (OFF === this.exitSceneFlag) {
            this.exitSceneFlag = ON;
            this.exitScene(this);
          }
        }
      }
      if (KISIKIL_STOLEN === mainKisikil.direction) {
        for (let m of monsterGroup.children) {
          if (MONSTER_TREASURE === m.flag) {
            // モンスターが画面外まで逃げたら
            if (0 > m.x + m.width) {
              // 1回だけ実施
              if (OFF === this.exitSceneFlag) {
                this.exitSceneFlag = ON;
                this.exitScene(this);
              }
            }
          }
        }
      }

      // キスキルの攻撃モーションを変更
      this.randAttack();

      // キスキルの装備を更新
      this.updateEquipment();
    };

    // サウンド初期化
    MySoundManager.prototype.init(true);
  },
});
