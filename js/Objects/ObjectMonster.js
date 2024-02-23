// モンスター親クラス
phina.define("ObjectMonster", {
  superClass: "phina.display.Sprite",

  // 初期化
  init: function (
    image,
    spriteSheet,
    x,
    y,
    speed,
    sizeX,
    sizeY,
    atk,
    monsterName
  ) {
    this.superInit(image);

    this.setOrigin(0, 1);
    //this.setSize(sizeX, sizeY);
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.flag = MONSTER_NORMAL;
    this.speed = MONSTER_BASE_SPEED * g_MonsterSpeedMag;
    this.atk = atk;
    this.rotate = 0;

    // 誰にどうやって倒されたか
    this.monsterName = monsterName;
    this.gameEndType = 0;

    // アニメーションのアタッチ
    var anim = FrameAnimation(spriteSheet).attachTo(this);
    anim.gotoAndPlay("idle");

    this.update = function () {
      switch (this.flag) {
        case MONSTER_NORMAL:
          this.x -= this.speed;
          break;
        case MONSTER_THROUGH:
          this.alpha = 0.4;
          this.x -= this.speed * 6;
          if (g_groundLine > this.y) {
            this.y += this.speed * 8;
            if (g_groundLine < this.y) {
              this.y = g_groundLine;
            }
          }
          break;
        case MONSTER_DEATH:
          this.alpha = 0.4;
          this.x += this.speed * 2.5;
          this.y -= this.speed * 4;
          this.rotate += 90;
          this.setOrigin(0.5, 0.5);
          this.setRotation(this.rotate);
          break;
        case MONSTER_ATTACK:
          break;
        case MONSTER_TREASURE:
          if (OFF === g_treasureStartFlag || ON === g_treasureEndFlag) {
            this.x -= this.speed * 2;
          }
          if (g_groundLine > this.y) {
            this.y += this.speed * 4;
            if (g_groundLine < this.y) {
              this.y = g_groundLine;
            }
          }
          // キスキルの位置まで来たら、お宝を出現させる
          if (g_kisikilLine - this.width / 2 >= this.x) {
            g_treasureStartFlag = ON;
          }
          break;
        default:
          break;
      }
    };
  },

  judge: function (clickState) {
    if (NO_CLICK === clickState) {
      if (
        g_deathLine >= this.x &&
        MONSTER_THROUGH !== this.flag &&
        MONSTER_TREASURE !== this.flag
      ) {
        this.flag = MONSTER_ATTACK;
        this.gameEndType = 1;
      }
    } else {
      if (g_hitLine >= this.x) {
        if (RIGHT === clickState) {
          //攻撃
          if (g_kisikilAtk >= this.atk) {
            this.flag = MONSTER_DEATH;
            g_score += KISIKIL_SCORE;
            g_tempScore += KISIKIL_SCORE;
          } else {
            this.flag = MONSTER_ATTACK;
            this.gameEndType = 2;
          }
        }
        if (LEFT === clickState) {
          //回避
          if (g_kisikilAtk <= this.atk) {
            this.flag = MONSTER_THROUGH;
            g_score += KISIKIL_SCORE;
            g_tempScore += KISIKIL_SCORE;
          } else {
            this.flag = MONSTER_TREASURE;
            this.gameEndType = 3;
          }
        }
      }
    }
  },
});
