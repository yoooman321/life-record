// React ↔ Phaser 的橋接元件。這個檔案的掛載/卸載邏輯（比較多坑的部分）已經處理好，
// 應該不太需要改動；想加史萊姆本身的動畫/互動，去改 src/game/SlimeIdleScene.ts。
import { useEffect, useImperativeHandle, useRef } from 'react';
import Phaser from 'phaser';
import SlimeIdleScene from '@/game/SlimeIdleScene';
import type { SlimeStatName } from '@/type/slime';
import type { SlimeItem } from '@/type';

export type SlimeStageHandle = {
  feedFood: (ability: SlimeStatName) => void;
  growSlime: (jobPromise: Promise<SlimeItem>) => Promise<SlimeItem | void>;
};

type SlimeStageProps = {
  width?: number;
  height?: number;
  ref?: React.Ref<SlimeStageHandle>;
};

export default function SlimeStage({
  width = 240,
  height = 240,
  ref,
}: SlimeStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SlimeIdleScene | null>(null);
  useImperativeHandle(ref, () => ({
    feedFood: (ability) => {
      sceneRef.current?.feedFood(ability);
    },
    growSlime: (jobPromise) => {
      return sceneRef.current?.growSlime(jobPromise) ?? Promise.resolve();
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width,
      height,
      parent: containerRef.current,
      transparent: true,
    });

    game.events.once(Phaser.Core.Events.READY, () => {
      sceneRef.current = game.scene.add(
        'SlimeIdleScene',
        SlimeIdleScene,
        true,
      ) as SlimeIdleScene;
    });

    // 一定要在卸載時 destroy，不然畫布不會消失。React 開發模式的 StrictMode
    // 會先掛載→卸載→再掛載一次，如果沒清乾淨，這裡就會看到兩個畫布疊在一起。
    return () => {
      game.destroy(true);
      sceneRef.current = null;
    };
  }, [width, height]);

  return <div ref={containerRef} className="h-60 w-60" />;
}
