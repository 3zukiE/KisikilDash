// アイテム親クラス
phina.define("ObjectItem", {
  superClass: "phina.display.Sprite",

  // 初期化
  init: function (image, spriteSheet, x, y, speed, sizeX, sizeY, item) {
    this.superInit(image);

    this.setOrigin(0, 1);
    //this.setSize(sizeX, sizeY);
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.alpha = 1;
    this.flag = MONSTER_NORMAL;
    this.speed = (MONSTER_BASE_SPEED * g_MonsterSpeedMag) / 1.1;
    this.item = item;
    this.typhoon = 0;

    // アニメーションのアタッチ
    var anim = FrameAnimation(spriteSheet).attachTo(this);
    anim.gotoAndPlay("idle");

    this.update = function () {
      switch (this.flag) {
        case MONSTER_NORMAL:
          this.x -= this.speed;
          break;
        default:
          break;
      }
    };
  },

  judge: function (clickState) {
    if (NO_CLICK === clickState) {
      // 取得
      if ("horn" === this.item) {
        if (g_deathLine >= this.x) {
          g_hornFlg = 1;
          this.remove();
        }
      } else if ("typhoon" === this.item) {
        if (0 === this.typhoon) {
          if (g_hitLine - this.sizeX >= this.x) {
            this.typhoon = 1;
            g_typhoonFlg = 1;
          }
        }
        // 画面外に消えたら削除
        if (0 - this.sizeX >= this.x) {
          this.remove();
        }
      }
    } else {
      if ("horn" === this.item) {
        if (g_hitLine >= this.x) {
          if (RIGHT === clickState) {
            g_hornFlg = 1;
            this.remove();
          }
        }
      }
    }
  },
});
