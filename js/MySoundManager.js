// サウンド管理用 クラスを定義
phina.namespace(function () {
  phina.define("MySoundManager", {
    superClass: "phina.display.DisplayScene",
    init: function (isReset) {
      this.superInit();

      SoundManager.setVolumeMusic(0.2);
      SoundManager.setVolume(0.2);
      if (isReset == true) {
        SoundManager.stopMusic();
        this.playBGM = null;
        this.playSE = null;
      }
    },

    // 音データの再生
    // @todo: SE鳴らしてる間はBGMの音量を小さくする処理しようと思ったけど、SE終了判定取る方法なさそう……
    // @todo: 終了判定見つかったら実装する
    MyPlaySound: function (playName, isBGM) {
      if (isBGM == true) {
        // BGM指定の場合はBGMのためループ再生を行う
        this.playBGM = SoundManager.playMusic(playName);
      } else {
        // 指定なし、BGM指定では無い場合SE再生を行う
        this.playSE = SoundManager.play(playName);
      }
    },

    SetVolumeMyPlaySound: function (volume, isBGM) {
      if (isBGM == true) {
        // BGM指定の場合はBGMのためループ再生を行う
        SoundManager.setVolumeMusic(volume);
      } else {
        // 指定なし、BGM指定では無い場合SE再生を行う
        SoundManager.setVolume(volume);
      }
    },
  });
});
