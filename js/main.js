// phina.js をグローバル領域に展開
phina.globalize();

const SCREEN_X = 1280;
const SCREEN_Y = 720;
const RIGHT = 1;
const LEFT = 2;

// ゲームバージョン
const g_version = 0.95;

const KISIKIL_IDLE = 0;
const KISIKIL_DASH = KISIKIL_IDLE + 1;
const KISIKIL_ATTACK = KISIKIL_DASH + 1;
const KISIKIL_ATTACK2 = KISIKIL_ATTACK + 1;
const KISIKIL_DODGE = KISIKIL_ATTACK2 + 1;
const KISIKIL_DEATH = KISIKIL_DODGE + 1;
const KISIKIL_STOLEN = KISIKIL_DEATH + 1;
const KISIKIL_TYPHOON = KISIKIL_STOLEN + 1;

// 敵を倒した際に得られる基本スコア
const KISIKIL_SCORE = 200;

const MONSTER_NORMAL = 0;
const MONSTER_THROUGH = 1;
const MONSTER_DEATH = 2;
const MONSTER_ATTACK = 3;
const MONSTER_TREASURE = 4;

const LEVEL_1 = 0;
const LEVEL_2 = 1;
const LEVEL_3 = 2;
const LEVEL_4 = 3;
const LEVEL_5 = 4;
const LEVEL_6 = 5;
const LEVEL_7 = 6;

const RANK_LEVEL_1 = "F";
const RANK_LEVEL_2 = "E";
const RANK_LEVEL_3 = "D";
const RANK_LEVEL_4 = "C";
const RANK_LEVEL_5 = "B";
const RANK_LEVEL_6 = "A";
const RANK_LEVEL_7 = "S";

// ステージレベルに到達するために必要なスコア
const SCORE_LEVEL_1 = 0;
const SCORE_LEVEL_2 = 1200;
const SCORE_LEVEL_3 = 2600;
const SCORE_LEVEL_4 = 4800;
const SCORE_LEVEL_5 = 8000;
const SCORE_LEVEL_6 = 12400;
const SCORE_LEVEL_7 = 18600;

// 制作者スコア
const SCORE_LEVEL_X = 24400;

// ステージレベル毎のモンスター生成頻度
const TIME_START_LEVEL_1 = 16;
const TIME_END_LEVEL_1 = 22;
const TIME_START_LEVEL_2 = 13;
const TIME_END_LEVEL_2 = 18;
const TIME_START_LEVEL_3 = 10;
const TIME_END_LEVEL_3 = 14;
const TIME_START_LEVEL_4 = 7;
const TIME_END_LEVEL_4 = 10;
const TIME_START_LEVEL_5 = 5;
const TIME_END_LEVEL_5 = 6.5;
const TIME_START_LEVEL_6 = 3;
const TIME_END_LEVEL_6 = 4.5;
const TIME_START_LEVEL_7 = 1.5;
const TIME_END_LEVEL_7 = 2.5;

// ステージレベルレベル毎のモンスターの速度
const MONSTER_BASE_SPEED = 10;
const SPEED_LEVEL_1 = 1;
const SPEED_LEVEL_2 = 1.15;
const SPEED_LEVEL_3 = 1.3;
const SPEED_LEVEL_4 = 1.5;
const SPEED_LEVEL_5 = 1.9;
const SPEED_LEVEL_6 = 2.4;
const SPEED_LEVEL_7 = 2.9;

const ON = 1;
const OFF = 0;
const NO_CLICK = 0;

// 隠しコマンドの定義
const KONAMIcommand = [
  38, // "ArrowUp"
  38, // "ArrowUp"
  40, // "ArrowDown"
  40, // "ArrowDown"
  37, // "ArrowLeft"
  39, // "ArrowRight"
  37, // "ArrowLeft"
  39, // "ArrowRight"
  66, // "b"
  65, // "a"
];

// 全体で使う変数定義
var g_groundLine = 0;
var g_flyingLine = 0;
var g_kisikilLine = 0;
var g_hitLine = 0;
var g_deathLine = 0;

var g_level = LEVEL_1;
var g_rank = RANK_LEVEL_1;
var g_score = SCORE_LEVEL_1;
var g_nextScore = SCORE_LEVEL_1;
var g_tempScore = SCORE_LEVEL_1;
var g_makeMonsterTimeStart = TIME_START_LEVEL_1;
var g_makeMonsterTimeEnd = TIME_END_LEVEL_1;
var g_MonsterSpeedMag = SPEED_LEVEL_1;

// キスキルの状態
var g_kisikilAtk = 500;
var g_hornKisikilFlag = 0;

// ゲームの制御
var g_makeMonsterFlag = 0;
var g_gameEndFlag = 0;
var g_hornFlg = 0;
var g_typhoonFlg = 0;
var g_pauseFlag = OFF;
var g_treasureFlag = OFF;
var g_GalleryViewFlag = OFF;

// メイン処理
phina.main(function () {
  // アプリケーション生成
  var app = GameApp({
    startLabel: "sceneLoading",
    scenes: [
      {
        className: "SceneLoading",
        label: "sceneLoading",
        nextLabel: "sceneTitleAnime",
      },
      {
        className: "SceneTitleAnime",
        label: "sceneTitleAnime",
        nextLabel: "sceneTitle",
      },
      {
        className: "SceneTitle",
        label: "sceneTitle",
        nextLabel: "sceneMain",
      },
      {
        className: "SceneTutorial",
        label: "sceneTutorial",
      },
      {
        className: "SceneGallery",
        label: "sceneGallery",
        nextLabel: "sceneTitleAnime",
      },
      {
        className: "ScenePause",
        label: "scenePause",
      },
      {
        className: "SceneThankYou",
        label: "sceneThankYou",
      },
      {
        className: "SceneMain",
        label: "sceneMain",
        nextLabel: "sceneResultAnime",
      },
      {
        className: "SceneResultAnime",
        label: "sceneResultAnime",
        nextLabel: "sceneResult",
      },
      {
        className: "SceneResult",
        label: "sceneResult",
        nextLabel: "sceneTitleAnime",
      },
    ],
    width: SCREEN_X,
    height: SCREEN_Y,
    assets: PREV_ASSET,
  });
  // アプリケーション実行
  app.run();
});
