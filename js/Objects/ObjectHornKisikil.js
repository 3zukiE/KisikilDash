// ホーンキスキルオブジェクトクラス
phina.define("ObjectHornKisikil", {
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
    var anim = FrameAnimation("main_horn_kisikil_ss").attachTo(this);
    anim.gotoAndPlay(spriteNameArray[this.direction]);

    this.update = function () {
      // 装備状態かどうか
      if (ON === g_hornKisikilFlag) {
        this.alpha = 1;
      } else {
        this.alpha = 0;
      }

      // 更新
      if (1 === this.updateStateFlag) {
        // キスキル初期化
        this.updateStateFlag = 0;
        this.AnimationFrame = 0;

        // モンスターを倒したときのモンスターの高さに合わせる
        // モンスターを倒していないときは地面に合わせる
        this.y = this.killedMonsterY;
        this.killedMonsterY = g_groundLine;

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

      // 避けたときの自力アニメーション(仮)★★★
      // if (KISIKIL_DODGE === this.direction) {
      //   this.AnimationFrame++;
      //   if (1 === this.AnimationFrame) {
      //     this.alpha = 0.5;
      //   } else if (2 === this.AnimationFrame) {
      //     this.alpha = 0;
      //   } else if (3 === this.AnimationFrame) {
      //     this.alpha = 0.5;
      //   } else {
      //     this.alpha = 1;
      //     this.dodgeAnimation = 0;
      //     this.direction = KISIKIL_DASH;
      //   }
      // }

      // 攻撃の自力アニメーション(仮)★★★
      if (KISIKIL_ATTACK === this.direction) {
        this.AnimationFrame++;
        if (3 < this.AnimationFrame) {
          this.y = g_groundLine;
          this.AnimationFrame = 0;
          this.direction = KISIKIL_DASH;
        }
      }

      // 攻撃の自力アニメーション(仮)★★★
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
