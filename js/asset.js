const KISIKIL_WIDTH = 607;
const KISIKIL_HEIGHT = 339;
const THANK_YOU_WIDTH = 685;
const THANK_YOU_HEIGHT = 317;
const HORN_OF_THE_UNICORN_WIDTH = 82;
const HORN_OF_THE_UNICORN_HEIGHT = 97;
const MYSTICAL_SPACE_TYPHOON_WIDTH = 194;
const MYSTICAL_SPACE_TYPHOON_HEIGHT = 219;
const TREASURE_WIDTH = 71;
const TREASURE_HEIGHT = 75;
const ROUGHKIL_WIDTH = 594;
const ROUGHKIL_HEIGHT = 690;

const AGIDO_WIDTH = 161;
const AGIDO_HEIGHT = 125;
const BITRON_WIDTH = 131;
const BITRON_HEIGHT = 97;
const CARDCAR_D_WIDTH = 165;
const CARDCAR_D_HEIGHT = 73;
const DARK_RESONATOR_WIDTH = 163;
const DARK_RESONATOR_HEIGHT = 145;
const GATE_BLOCKER_WIDTH = 105;
const GATE_BLOCKER_HEIGHT = 131;
const GENEX_CONTROLLER_WIDTH = 143;
const GENEX_CONTROLLER_HEIGHT = 167;
const HALLOHALLO_WIDTH = 99;
const HALLOHALLO_HEIGHT = 118;
const KURIBOH_WIDTH = 86;
const KURIBOH_HEIGHT = 96;
const MARSHMALLON_WIDTH = 114;
const MARSHMALLON_HEIGHT = 130;
const MYSTIC_TOMATO_WIDTH = 84;
const MYSTIC_TOMATO_HEIGHT = 84;
const PURELY_WIDTH = 155;
const PURELY_HEIGHT = 120;
const SANGAN_WIDTH = 120;
const SANGAN_HEIGHT = 85;
const SNAKE_EYES_POPLAR_WIDTH = 156;
const SNAKE_EYES_POPLAR_HEIGHT = 120;
const WINGED_KURIBOH_WIDTH = 158;
const WINGED_KURIBOH_HEIGHT = 104;

// ロード用アセット読み込み
var PREV_ASSET = {
  image: {
    // ローディング
    loading_1_img: "assets/img/loading/loading_1.jpg",
    loading_2_img: "assets/img/loading/loading_2.jpg",
    loading_3_img: "assets/img/loading/loading_3.jpg",
    loading_4_img: "assets/img/loading/loading_4.jpg",
    loading_5_img: "assets/img/loading/loading_5.jpg",
  },
};

// メイン用アセット読み込み
var MAIN_ASSET = {
  // 文字ファイル定義
  json: {
    gallery_monster_text: "assets/text/GalleryMonsterText.json",
    gallery_comment_text: "assets/text/GalleryCommentText.json",
  },
  // 画像ファイル定義
  // jpgもpngも読み込める
  image: {
    // タイトル
    title_gallery_button_img: "assets/img/title/title_gallery_button.png",
    title_play_button_img: "assets/img/title/title_play_button.png",
    title_background_img: "assets/img/title/title_background.jpg",
    title_tutorial_button_img: "assets/img/title/title_tutorial_button.png",
    title_logo_img: "assets/img/title/title_logo.png",
    title_kisikil_img: "assets/img/title/title_kisikil.png",
    title_kuriboh_img: "assets/img/title/title_kuriboh.png",

    // チュートリアル
    tutorial_img: "assets/img/tutorial/tutorial.jpg",

    // ギャラリー
    gallery_img: "assets/img/gallery/gallery.jpg",
    gallery_button_img: "assets/img/gallery/gallery_button.png",
    thank_you_img: "assets/img/gallery/thank_you.png",
    roughkil_img: "assets/img/gallery/roughkil.png",

    // メイン
    main_ground_img: "assets/img/main/main_ground.png",
    main_kisikil_img: "assets/img/main/main_kisikil.png",
    main_horn_kisikil_img: "assets/img/main/main_horn_kisikil.png",
    main_background_img: "assets/img/main/main_background.jpg",
    main_count_1_img: "assets/img/main/main_count_1.png",
    main_count_2_img: "assets/img/main/main_count_2.png",
    main_count_3_img: "assets/img/main/main_count_3.png",
    main_count_duel_img: "assets/img/main/main_count_duel.png",

    // アイテム
    treasure_img: "assets/img/item/treasure.png",
    horn_of_the_unicorn_img: "assets/img/item/horn_of_the_unicorn.png",
    mystical_space_typhoon_img: "assets/img/item/mystical_space_typhoon.png",

    // モンスター
    agido_img: "assets/img/monster/agido.png",
    bitron_img: "assets/img/monster/bitron.png",
    cardcar_d_img: "assets/img/monster/cardcar_d.png",
    dark_resonator_img: "assets/img/monster/dark_resonator.png",
    gate_blocker_img: "assets/img/monster/gate_blocker.png",
    genex_controller_img: "assets/img/monster/genex_controller.png",
    hallohallo_img: "assets/img/monster/hallohallo.png",
    kuriboh_img: "assets/img/monster/kuriboh.png",
    marshmallon_img: "assets/img/monster/marshmallon.png",
    mystic_tomato_img: "assets/img/monster/mystic_tomato.png",
    purely_img: "assets/img/monster/purely.png",
    sangan_img: "assets/img/monster/sangan.png",
    snake_eyes_poplar_img: "assets/img/monster/snake_eyes_poplar.png",
    winged_kuriboh_img: "assets/img/monster/winged_kuriboh.png",
  },
  // スプライト情報定義
  spritesheet: {
    // チュートリアルスプライトシート
    tutorial_ss: {
      // 画像の情報
      frame: {
        width: 1017, // 1コマの横幅
        height: 648, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        jp: {
          // アニメーション名
          frames: [0], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "jp", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 10, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
        en: {
          frames: [1],
          next: "en",
          frequency: 10,
        },
      },
    },

    // ギャラリースプライトシート
    gallery_ss: {
      // 画像の情報
      frame: {
        width: 1280, // 1コマの横幅
        height: 720, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        kisikil: {
          // アニメーション名
          frames: [0], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "kisikil", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 10, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
        lilla: {
          frames: [1],
          next: "lilla",
          frequency: 10,
        },
      },
    },

    // キスキルスプライトシート
    main_kisikil_ss: {
      // 画像の情報
      frame: {
        width: KISIKIL_WIDTH, // 1コマの横幅
        height: KISIKIL_HEIGHT, // 1コマの縦幅
        rows: 5, // 画像内に設定されているコマの縦数
        cols: 5, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [15], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 1, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
        dash: {
          frames: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          next: "dash",
          frequency: 1,
        },
        attack: {
          frames: [5, 6, 7],
          next: "dash",
          frequency: 1,
        },
        attack2: {
          frames: [10, 11, 12],
          next: "dash",
          frequency: 1,
        },
        dodge: {
          frames: [0, 1, 2],
          next: "dash",
          frequency: 1,
        },
        death: {
          frames: [3],
          next: "death",
          frequency: 1,
        },
        stolen: {
          frames: [4],
          next: "stolen",
          frequency: 1,
        },
        typhoon: {
          frames: [3],
          next: "typhoon",
          frequency: 1,
        },
      },
    },

    // ホーンキスキルスプライトシート
    main_horn_kisikil_ss: {
      // 画像の情報
      frame: {
        width: KISIKIL_WIDTH, // 1コマの横幅
        height: KISIKIL_HEIGHT, // 1コマの縦幅
        rows: 5, // 画像内に設定されているコマの縦数
        cols: 5, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [15], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 1, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
        dash: {
          frames: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          next: "dash",
          frequency: 1,
        },
        attack: {
          frames: [5, 6, 7],
          next: "dash",
          frequency: 1,
        },
        attack2: {
          frames: [10, 11, 12],
          next: "dash",
          frequency: 1,
        },
        dodge: {
          frames: [0, 1, 2],
          next: "dash",
          frequency: 1,
        },
        death: {
          frames: [3],
          next: "death",
          frequency: 1,
        },
        stolen: {
          frames: [4],
          next: "stolen",
          frequency: 1,
        },
        typhoon: {
          frames: [3],
          next: "typhoon",
          frequency: 1,
        },
      },
    },

    // お宝スプライトシート
    treasure_ss: {
      // 画像の情報
      frame: {
        width: TREASURE_WIDTH, // 1コマの横幅
        height: TREASURE_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 1, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 0, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
        },

    // 一角獣のホーンスプライトシート
    horn_of_the_unicorn_ss: {
      // 画像の情報
      frame: {
        width: HORN_OF_THE_UNICORN_WIDTH, // 1コマの横幅
        height: HORN_OF_THE_UNICORN_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 1, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 0, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // サイクロンスプライトシート
    mystical_space_typhoon_ss: {
      // 画像の情報
      frame: {
        width: MYSTICAL_SPACE_TYPHOON_WIDTH, // 1コマの横幅
        height: MYSTICAL_SPACE_TYPHOON_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // サンキュースプライトシート
    thank_you_ss: {
      // 画像の情報
      frame: {
        width: THANK_YOU_WIDTH, // 1コマの横幅
        height: THANK_YOU_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 1, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 0, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // ラフキルスプライトシート
    roughkil_ss: {
      // 画像の情報
      frame: {
        width: ROUGHKIL_WIDTH, // 1コマの横幅
        height: ROUGHKIL_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 1, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 0, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // クリボースプライトシート
    kuriboh_ss: {
      // 画像の情報
      frame: {
        width: KURIBOH_WIDTH, // 1コマの横幅
        height: KURIBOH_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // ハネクリボースプライトシート
    winged_kuriboh_ss: {
      // 画像の情報
      frame: {
        width: WINGED_KURIBOH_WIDTH, // 1コマの横幅
        height: WINGED_KURIBOH_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // 蛇眼の炎燐スプライトシート
    snake_eyes_poplar_ss: {
      // 画像の情報
      frame: {
        width: SNAKE_EYES_POPLAR_WIDTH, // 1コマの横幅
        height: SNAKE_EYES_POPLAR_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // アギドスプライトシート
    agido_ss: {
      // 画像の情報
      frame: {
        width: AGIDO_WIDTH, // 1コマの横幅
        height: AGIDO_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // ハネクリボースプライトシート
    sangan_ss: {
      // 画像の情報
      frame: {
        width: SANGAN_WIDTH, // 1コマの横幅
        height: SANGAN_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // カードカー・Dスプライトシート
    cardcar_d_ss: {
      // 画像の情報
      frame: {
        width: CARDCAR_D_WIDTH, // 1コマの横幅
        height: CARDCAR_D_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 1, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 0, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // ハロハロスプライトシート
    hallohallo_ss: {
      // 画像の情報
      frame: {
        width: HALLOHALLO_WIDTH, // 1コマの横幅
        height: HALLOHALLO_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // ビットロンスプライトシート
    bitron_ss: {
      // 画像の情報
      frame: {
        width: BITRON_WIDTH, // 1コマの横幅
        height: BITRON_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // マシュマロンスプライトシート
    marshmallon_ss: {
      // 画像の情報
      frame: {
        width: MARSHMALLON_WIDTH, // 1コマの横幅
        height: MARSHMALLON_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // キラートマトスプライトシート
    mystic_tomato_ss: {
      // 画像の情報
      frame: {
        width: MYSTIC_TOMATO_WIDTH, // 1コマの横幅
        height: MYSTIC_TOMATO_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // マシュマロンスプライトシート
    purely_ss: {
      // 画像の情報
      frame: {
        width: PURELY_WIDTH, // 1コマの横幅
        height: PURELY_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // ダーク・リゾネータースプライトシート
    dark_resonator_ss: {
      // 画像の情報
      frame: {
        width: DARK_RESONATOR_WIDTH, // 1コマの横幅
        height: DARK_RESONATOR_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // ジェネクス・コントローラースプライトシート
    genex_controller_ss: {
      // 画像の情報
      frame: {
        width: GENEX_CONTROLLER_WIDTH, // 1コマの横幅
        height: GENEX_CONTROLLER_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 2, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0, 1], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 7, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },

    // ゲート・ブロッカースプライトシート
    gate_blocker_ss: {
      // 画像の情報
      frame: {
        width: GATE_BLOCKER_WIDTH, // 1コマの横幅
        height: GATE_BLOCKER_HEIGHT, // 1コマの縦幅
        rows: 1, // 画像内に設定されているコマの縦数
        cols: 1, // 画像内に設定されているコマの横数
      },

      // アニメーション情報
      animations: {
        idle: {
          // アニメーション名
          frames: [0], // アニメーションのコマ指定。左上から右下に向かって0,1,2...となる。
          next: "idle", // アニメーション終了後、次の再生アニメ。同じ名前のものを指定するとループ再生になる
          frequency: 0, // コマ毎の間隔(数値が小さいほど早くアニメーションする)
        },
      },
    },
  },
  // 音関連
  sound: {
    // BGM
    title_bgm: "assets/sound/bgm/title_bgm.aac",
    gallery_bgm: "assets/sound/bgm/gallery_bgm.aac",
    main_bgm: "assets/sound/bgm/main_bgm.aac",
    result_bgm: "assets/sound/bgm/result_bgm.aac",
    // SE
    enter_se: "assets/sound/se/enter_se.aac",
    enter2_se: "assets/sound/se/enter2_se.aac",
    enter3_se: "assets/sound/se/enter3_se.aac",
    enter4_se: "assets/sound/se/enter3_se.aac",
    cancel_se: "assets/sound/se/cancel_se.aac",
    pause_se: "assets/sound/se/pause_se.aac",
    attack_se: "assets/sound/se/attack_se.aac",
    attack2_se: "assets/sound/se/attack2_se.aac",
    dodge_se: "assets/sound/se/dodge_se.aac",
    dodge2_se: "assets/sound/se/dodge2_se.aac",
    result_se: "assets/sound/se/result_se.aac",
  },
};

// リザルト用アセット読み込み
var RESULT_ASSET = {
  image: {
    // リザルト
    result_back_S_img: "assets/img/result/result_back_S.jpg",
    result_back_AB_img: "assets/img/result/result_back_AB.jpg",
    result_back_CD_img: "assets/img/result/result_back_CD.jpg",
    result_back_EF_img: "assets/img/result/result_back_EF.jpg",
    result_title_button_img: "assets/img/result/result_title_button.png",
    result_tweet_button_img: "assets/img/result/result_tweet_button.png",
    result_gallery_chain_rank_img: "assets/img/result/result_gallery_chain_rank.png",
    result_gallery_chain_tweet_img: "assets/img/result/result_gallery_chain_tweet.png",
    result_font_S_img: "assets/img/result/result_font_S.png",
    result_font_A_img: "assets/img/result/result_font_A.png",
    result_font_B_img: "assets/img/result/result_font_B.png",
    result_font_C_img: "assets/img/result/result_font_C.png",
    result_font_D_img: "assets/img/result/result_font_D.png",
    result_font_E_img: "assets/img/result/result_font_E.png",
    result_font_F_img: "assets/img/result/result_font_F.png",
  },
};
