// GalleryScene クラスを定義
phina.define("SceneGallery", {
  superClass: "phina.display.DisplayScene",
  init: function (option) {
    this.superInit(option);
    // 背景色を指定
    this.backgroundColor = "#222";
    var Galley_order = 0;
    var galleryMonster = null;

    // 背景画像
    var gallery_back = ObjectGallery("gallery_img");
    gallery_back.addChildTo(this);
    gallery_back.setOrigin(0, 0);

    // タイトルボタン
    var titleButton = Button({
      text: " ",
      width: this.gridX.width / 6.5, // 横サイズ
      height: this.gridY.width / 16, // 縦サイズ
      fill: "blue", // ボタン色
    });
    titleButton.addChildTo(this);
    titleButton.setOrigin(0, 0);
    titleButton.alpha = 0;
    titleButton.setPosition(this.gridX.center(-8), this.gridY.center(-8));
    titleButton.setInteractive(true);

    // ボタンクリックした時の処理
    titleButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("cancel_se", false);
      this.parent.exit();
    };

    // 戻るボタン
    var returnButton = Sprite("gallery_button_img");
    returnButton.addChildTo(this);
    returnButton.setPosition(this.gridX.center(-6.7), this.gridY.center(-1));
    returnButton.setInteractive(false);
    returnButton.alpha = 0;

    returnButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("enter4_se", false);
      Galley_order -= 1;
      this.parent.popMonster();
    };

    // 進むボタン
    var nextButton = Sprite("gallery_button_img");
    nextButton.addChildTo(this);
    nextButton.scaleX = -1;
    nextButton.setPosition(this.gridX.center(6.7), this.gridY.center(-1));
    nextButton.setInteractive(true);
    nextButton.alpha = 1;

    nextButton.onclick = function () {
      MySoundManager.prototype.MyPlaySound("enter4_se", false);
      Galley_order += 1;
      this.parent.popMonster();
    };

    // ギャラリーの順番に応じた文字列を表示する処理
    var AM = phina.asset.AssetManager;
    var GalleryMonsterTextData = AM.get("json", "gallery_monster_text").data
      .monster;
    var GalleryCommentTextData = AM.get("json", "gallery_comment_text").data
      .comment;

    // ギャラリー最初に表示する文字
    var galleryFirstLabel = Label({
      text: "何でも許せる人向けのオマケ画面です。\n左右の矢印キーでゲーム中で使われた\nモンスター等の情報を見ていけます。\n\n　　 ※キスリラが喋るので苦手な人は注意",
      fontSize: 36,
      fill: "black",
      x: this.gridX.center(),
      y: this.gridY.center(-1),
    }).addChildTo(this);

    // モンスターのラベル
    var galleryMonsterLabel = Label({
      text: GalleryMonsterTextData[Galley_order].text,
      fontSize: 40,
      fill: "black",
      x: this.gridX.center(2.1),
      y: this.gridY.center(-1.5),
    }).addChildTo(this);

    // コメントのラベル
    var galleryCommentLabel = Label({
      text: GalleryCommentTextData[Galley_order].text,
      fontSize: 36,
      fill: "black",
      x: this.gridX.center(0.2),
      y: this.gridY.center(5.7),
    }).addChildTo(this);

    // popMonsterの定義
    this.popMonster = function () {
      if (0 === Galley_order) {
        galleryMonster.remove();
        return;
      }
      if (galleryMonster) {
        // galleryMonster が定義されているか確認
        galleryMonster.remove(); // remove() メソッドを使用する前に存在を確認
      }
      galleryMonster = ObjectGalleryMonster(
        GalleryMonsterTextData[Galley_order].image,
        GalleryMonsterTextData[Galley_order].ss,
        GalleryMonsterTextData[Galley_order].anime
      );
      galleryMonster.addChildTo(this);
      galleryMonster.setPosition(
        this.gridX.center(-2.2),
        this.gridY.center(-1.5)
      );
      galleryMonster.setScale(1.5, 1.5);

      // キスキルのサイズ調整
      if(GalleryMonsterTextData[Galley_order].image === "main_kisikil_img"){
        galleryMonster.setPosition(
          this.gridX.center(-1.5),
          this.gridY.center(-3)
        );
        galleryMonster.setScale(1, 1);
      }

      // サンキューキスキルのサイズ調整
      if(GalleryMonsterTextData[Galley_order].image === "thank_you_img"){
        galleryMonster.setPosition(
          this.gridX.center(),
          this.gridY.center(-1.6)
        );
        galleryMonster.setScale(1, 1);
      }
    };

    //更新
    this.update = function () {
      if (1 <= Galley_order) {
        returnButton.setInteractive(true);
        returnButton.alpha = 1;
        galleryFirstLabel.alpha = 0;
      } else {
        returnButton.setInteractive(false);
        returnButton.alpha = 0;
        galleryFirstLabel.alpha = 1;
      }

      if (GalleryMonsterTextData.length - 1 > Galley_order) {
        nextButton.setInteractive(true);
        nextButton.alpha = 1;
      } else {
        nextButton.setInteractive(false);
        nextButton.alpha = 0;
      }

      if ("kisikil" === GalleryCommentTextData[Galley_order].name) {
        gallery_back.direction = 0;
        galleryMonsterLabel.text = GalleryMonsterTextData[Galley_order].text;
        galleryCommentLabel.text = GalleryCommentTextData[Galley_order].text;
      } else {
        gallery_back.direction = 1;
        galleryMonsterLabel.text = GalleryMonsterTextData[Galley_order].text;
        galleryCommentLabel.text = GalleryCommentTextData[Galley_order].text;
      }

      // 隠しコマンドから入ったら文言変化
      if (1 === option.KONAMIcommandFlag && 0 === Galley_order){
        galleryCommentLabel.text = "隠しコマンドを見つけたの！？\nやるね！";
      };

      //キー入力
      const key = this.app.keyboard;

      // 戻る
      if (0 !== Galley_order) {
        if (key.getKeyDown("f")) {
          MySoundManager.prototype.MyPlaySound("enter4_se", false);
          Galley_order -= 1;
          this.popMonster();
        }
        if (key.getKeyDown("left")) {
          MySoundManager.prototype.MyPlaySound("enter4_se", false);
          Galley_order -= 1;
          this.popMonster();
        }
      }

      // 進む
      if (GalleryMonsterTextData.length - 1 !== Galley_order) {
        if (key.getKeyDown("j")) {
          MySoundManager.prototype.MyPlaySound("enter4_se", false);
          Galley_order += 1;
          this.popMonster();
        }
        if (key.getKeyDown("right")) {
          MySoundManager.prototype.MyPlaySound("enter4_se", false);
          Galley_order += 1;
          this.popMonster();
        }
      }

      // 終了
      if (key.getKeyDown("escape")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        this.exit();
      }
      if (key.getKeyDown("enter")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        this.exit();
      }
      if (key.getKeyDown("space")) {
        MySoundManager.prototype.MyPlaySound("cancel_se", false);
        this.exit();
      }
    };

    // サウンド初期化
    MySoundManager.prototype.init(true);
    // BGM再生
    MySoundManager.prototype.MyPlaySound("gallery_bgm", true);
  },
});
