// TODO：目前只有靜態的色塊史萊姆（一顆橢圓形身體 + 兩個眼睛 + 一點高光），完全沒有動畫。
// 留給你練習的部分：
// - 待機呼吸動畫：用 this.tweens.add 讓身體（graphics）輕輕縮放/上下彈跳，做出「活著」的感覺，
//   可以參考下面 create() 最後留的 TODO 註解
// - 之後找到／畫好真的 sprite 素材時，這整個 create() 要換掉：
//   this.load.image('slime', 'xxx.png')（放在 preload() 裡）→ this.add.sprite(cx, cy, 'slime')
//   （不用再手動 fillCircle/fillEllipse 畫形狀了）
import type { JobType, SlimeItem } from '@/type';
import type { SlimeStatName } from '@/type/slime';
import Phaser from 'phaser';

const BODY_COLOR = 0xd0d0d0; // 培育中固定用這個顏色
const EYE_COLOR = 0x3a352f; // 對應 --color-ink
const HIGHLIGHT_COLOR = 0xfffdfa; // 對應 --color-panel

const ABILITY_IMAGE_MAPPING: Record<SlimeStatName, string> = {
  cash: 'coin',
  power: 'meat',
  str: 'apple',
  dex: 'dex',
  int: 'med',
  luk: 'cake',
};

type JobConfig = {
  fileName: string;
  frameWidth: number;
  spriteSheetKey: string;
  displayWidth: number;
  displayHeight: number;
  displayY: number;
  job: JobType;
};
// bowman -276
// warrior - 274
// wizzard - 274
const jobConfigs: JobConfig[] = [
  {
    fileName: 'bowman',
    frameWidth: 276,
    spriteSheetKey: 'bowmanAttack',
    displayWidth: 220,
    displayHeight: 560,
    displayY: -80,
    job: 'bowman',
  },
  {
    fileName: 'warrior',
    frameWidth: 274,
    spriteSheetKey: 'warriorAttack',
    displayWidth: 180,
    displayHeight: 480,
    displayY: -80,
    job: 'warrior',
  },
  {
    fileName: 'wizard',
    frameWidth: 274,
    spriteSheetKey: 'wizardAttack',
    displayWidth: 220,
    displayHeight: 560,
    displayY: -80,
    job: 'wizard',
  },
  {
    fileName: 'thief',
    frameWidth: 273,
    spriteSheetKey: 'thiefAttack',
    displayWidth: 220,
    displayHeight: 560,
    displayY: -80,
    job: 'thief',
  },
];

export default class SlimeIdleScene extends Phaser.Scene {
  // ! 是什麼：TypeScript 的「明確賦值斷言」（definite assignment assertion）
  private graphics!: Phaser.GameObjects.Graphics;
  private eyeGraphics!: Phaser.GameObjects.Graphics;
  private bodyContainer!: Phaser.GameObjects.Container;
  private isBusy = false;
  constructor() {
    super('SlimeIdleScene');
  }

  private showHeart = () => {
    const heart = this.add.image(0, 0, 'heart');
    heart.setDisplaySize(20, 20);
    // const heart = this.add.graphics();
    // heart.fillStyle(0xff0000, 1);

    // const r = 6; // 愛心大小，自己調
    // heart.fillCircle(-r, 0, r); // 左邊凸起
    // heart.fillCircle(r, 0, r); // 右邊凸起
    // heart.fillTriangle(-2 * r, 0, 2 * r, 0, 0, 2.5 * r);
    heart.setPosition(160, 80);
    heart.setDepth(-1);
    const startX = 180;
    const swayAmplitude = 20;
    const swayCount = 1;
    const startY = 80;
    const endY = 20;

    const progress = { t: 0 };
    this.tweens.add({
      targets: progress,
      t: 1,
      duration: 600,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        heart.x =
          startX +
          swayAmplitude * Math.sin(progress.t * swayCount * Math.PI * 2);
        heart.y = Phaser.Math.Linear(startY, endY, progress.t);
      },
      onComplete: () => {
        heart.destroy();
      },
    });
  };

  public feedFood(ability: SlimeStatName) {
    const food = this.add.image(0, 0, ABILITY_IMAGE_MAPPING[ability]);
    food.setDisplaySize(20, 20);
    food.setPosition(10, 180);
    food.setDepth(-1);

    const progress = { t: 0 };
    const startX = 10;
    const startY = 180;
    const endX = 80;
    const endY = 120;
    const arcHeight = 60;
    this.tweens.add({
      targets: progress,
      t: 1,
      duration: 600,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        food.x = Phaser.Math.Linear(startX, endX, progress.t);
        food.y =
          Phaser.Math.Linear(startY, endY, progress.t) -
          arcHeight * 4 * progress.t * (1 - progress.t);
        food.angle = progress.t * 360 * 0.5;
      },
      onComplete: () => {
        food.destroy();
        const tryReact = () => {
          if (this.isBusy) {
            this.time.delayedCall(300, tryReact);
            return;
          }
          this.bounce(this.showHeart);
        };
        tryReact();
      },
    });
  }

  public growSlime(jobPromise: Promise<SlimeItem>): Promise<SlimeItem> {
    return new Promise((resolve) => {
      let isWaiting = true;

      const loopBounce = () => {
        if (!isWaiting) return;

        this.jump(() => {
          loopBounce();
        });
      };
      loopBounce();

      jobPromise.then((slime) => {
        isWaiting = false;
        this.flash(() => {
          this.drawBody(slime);
          resolve(slime);
        });
        // growing
      });
    });
  }

  private flash = (onDone?: () => void) => {
    const overlay = this.add.graphics();
    overlay.fillStyle(0xffffff, 1);
    overlay.fillRect(0, 0, this.scale.width, this.scale.height);
    overlay.setDepth(10);
    overlay.setAlpha(0);

    this.tweens.add({
      targets: overlay,
      alpha: 1,
      // yoyo: true,
      // duration: ???, // 自己抓感覺
      duration: 1000, // 自己抓感覺
      ease: 'Sine.easeOut', // 自己試試看哪種 ease 閃起來比較有「衝擊感」
      onComplete: () => {
        overlay.destroy();
        onDone?.();
      },
    });
  };

  private jump = (onDone: () => void) => {
    const step1 = (nextStep?: () => void) => {
      const jumpHeight = 40;
      this.tweens.add({
        targets: this.bodyContainer,
        y: this.bodyContainer.y - jumpHeight, // 往上移動（y 變小）
        scaleY: 1.15, // 拉長
        scaleX: 0.9, // 跟著變瘦一點，模擬體積守恆
        yoyo: true, // 自動播回去：y 回到原位、scale 也跟著變回 1
        duration: 150,
        ease: 'Sine.easeOut',
        onComplete: () => {
          nextStep?.();
        },
      });
    };
    const step2 = (nextStep?: () => void) => {
      this.tweens.add({
        targets: this.bodyContainer,
        scaleY: 0.85, // 變矮
        scaleX: 1.15, // 變寬
        duration: 80, // 要夠短，才有「撞擊」的瞬間感
        ease: 'Sine.easeOut',
        onComplete: () => {
          nextStep?.();
        },
      });
    };

    const step3 = () => {
      this.tweens.add({
        targets: this.bodyContainer,
        scaleY: 1,
        scaleX: 1,
        duration: 150,
        ease: 'Back.easeOut', // 用你之前查過的「有回彈感」的 ease，讓收尾更有彈性
        onComplete: () => {
          onDone();
        },
      });
    };

    step1(() => {
      return step2(step3);
    });
  };

  private getAnimationSeconds = (): number => {
    return 1 + Math.random() * 2;
  };

  private bounce = (onDone: () => void) => {
    this.isBusy = true;
    this.tweens.add({
      targets: this.bodyContainer,
      scaleY: 0.95,
      scaleX: 1.05,
      yoyo: true,
      repeat: 1,
      // repeatDelay: 500,
      duration: 150,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.isBusy = false;
        onDone();
      },
    });
  };

  private drawBody = (slime: SlimeItem) => {
    this.graphics.setVisible(false); // 原本的橢圓身體藏起來，不要刪掉（之後其他職業還可能用得到）
    this.eyeGraphics.setVisible(false);
    const jobConfig = jobConfigs.find(({ job }) => job === slime.profession);

    if (jobConfig) {
      const sprite = this.add.sprite(
        0,
        jobConfig.displayY,
        jobConfig.spriteSheetKey,
      );
      sprite.setOrigin(0.5, 0.5); // 讓圖釘對齊 sprite 底部，呼應你之前學的「圖釘」概念
      sprite.setDisplaySize(jobConfig.displayWidth, jobConfig.displayHeight); // 自己調整大小，跟原本身體的視覺比例接近
      sprite.play(jobConfig.spriteSheetKey);
      this.bodyContainer.add(sprite);
    }
  };

  preload() {
    this.load.image('apple', '/game/apple.png');
    this.load.image('cake', '/game/cake.png');
    this.load.image('coin', '/game/coin.png');
    this.load.image('dex', '/game/dex.png');
    this.load.image('meat', '/game/cake.png');
    this.load.image('med', '/game/med.png');
    this.load.image('heart', '/game/heart.png');

    jobConfigs.forEach(({ spriteSheetKey, fileName, frameWidth }) => {
      this.load.spritesheet(spriteSheetKey, `/game/${fileName}.png`, {
        frameWidth,
        frameHeight: 724,
      });
    });
  }

  create() {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    this.graphics = this.add.graphics();
    this.eyeGraphics = this.add.graphics();

    // 把位置放在原本  graphics.setPosition 的圖盯上
    this.bodyContainer = this.add.container(cx, cy + 60);
    this.bodyContainer.add([this.graphics, this.eyeGraphics]);

    // 身體：橢圓形，模擬史萊姆圓滾滾、底部微扁的輪廓
    this.graphics.fillStyle(BODY_COLOR, 1);
    this.graphics.fillEllipse(0, -60, 150, 120);

    // 高光：左上角一小塊半透明亮點，增加 Q 彈的光澤感
    this.graphics.fillStyle(HIGHLIGHT_COLOR, 0.5);
    this.graphics.fillEllipse(-28, -92, 22, 14);

    // 眼睛
    this.eyeGraphics.fillStyle(EYE_COLOR, 1);
    this.eyeGraphics.fillCircle(-24, 0, 7);
    this.eyeGraphics.fillCircle(+24, 0, 7);

    this.eyeGraphics.setPosition(0, -63.5);

    const wink = (onDone: () => void) => {
      this.isBusy = true;
      this.tweens.add({
        targets: this.eyeGraphics,
        scaleY: 0.1,
        yoyo: true,
        duration: 500,
        ease: 'Back.easeInOut',
        onComplete: () => {
          this.isBusy = false;
          onDone();
        },
      });
    };

    const onDone = () => {
      if (this.isBusy) {
        this.time.delayedCall(300, onDone); // 忙碌中，稍等一下再重新檢查
        return;
      }
      this.time.delayedCall(this.getAnimationSeconds() * 1000, () => {
        if (Math.random() < 0.5) {
          this.bounce(onDone);
          return;
        }
        wink(onDone);
      });
    };

    this.bounce(onDone);

    jobConfigs.forEach(({ spriteSheetKey }) => {
      this.anims.create({
        key: spriteSheetKey,
        frames: this.anims.generateFrameNumbers(spriteSheetKey, {
          start: 0,
          end: 7,
        }),
        frameRate: 10, // 自己調整播放速度
        repeat: 1, // 攻擊動畫通常播一次就好，不循環
      });
    });
  }
}
