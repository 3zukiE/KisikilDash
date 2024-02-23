// キスキルオブジェクトクラス
phina.define("ObjectKisikil", {
  superClass: "phina.display.Sprite",

  // 初期化
  init: function (image) {
    // スプライトの1コマサイズを指定
    this.superInit(image);
    this.updateStateFlag = 0;
    this.killedMonsterY = g_groundLine;
    this.direction = KISIKIL_IDLE;
    this.AnimationFrame = 0;

    // アニメーション用変数
    var spriteNameArray = [
      "idle",
      "dash",
      "attack",
      "attack2",
      "dodge",
      "death",
      "stolen",
      "typhoon",
    ];

    // アニメーションのアタッチ
    var anim = FrameAnimation("main_kisikil_ss").attachTo(this);
    anim.gotoAndPlay(spriteNameArray[this.direction]);

    this.update = function () {
      if (1 === this.updateStateFlag) {
        // キスキル初期化
        this.updateStateFlag = 0;
        this.AnimationFrame = 0;

        // モンスターを倒したときのモンスターの高さに合わせる
        // モンスターを倒していないときは地面に合わせる
        this.y = this.killedMonsterY;
        this.killedMonsterY = g_groundLine;

        // 攻撃モーションのSE再生
        if (KISIKIL_ATTACK === this.direction) {
          MySoundManager.prototype.MyPlaySound("attack_se", false);
        }

        // 攻撃モーション2のSE再生
        if (KISIKIL_ATTACK2 === this.direction) {
          MySoundManager.prototype.MyPlaySound("attack2_se", false);
        }

        // 回避モーションのSE再生
        if (KISIKIL_DODGE === this.direction) {
          var randDodge = Math.randint(0, 100);
          if (50 > randDodge) {
            MySoundManager.prototype.MyPlaySound("dodge_se", false);
          } else {
            MySoundManager.prototype.MyPlaySound("dodge2_se", false);
          }
        }

        // アニメーション再生
        anim.gotoAndPlay(spriteNameArray[this.direction]);
      }

      // 死んだときの自力アニメーション
      if (KISIKIL_DEATH === this.direction) {
        if (15 > this.AnimationFrame) {
          this.y -= 2;
        } else if (20 > this.AnimationFrame) {
        } else {
          this.y += this.AnimationFrame;
        }
        this.AnimationFrame++;
      }

      // 攻撃の自力アニメーション
      if (KISIKIL_ATTACK === this.direction) {
        this.AnimationFrame++;
        if (3 < this.AnimationFrame) {
          this.y = g_groundLine;
          this.AnimationFrame = 0;
          this.direction = KISIKIL_DASH;
        }
      }

      // 攻撃2の自力アニメーション
      if (KISIKIL_ATTACK2 === this.direction) {
        this.AnimationFrame++;
        if (3 < this.AnimationFrame) {
          this.y = g_groundLine;
          this.AnimationFrame = 0;
          this.direction = KISIKIL_DASH;
        }
      }
    };
  },
});
