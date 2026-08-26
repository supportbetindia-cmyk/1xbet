'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Crown,
  Trophy,
  Sparkles,
  CheckCircle2,
  Rocket,
  Disc,
} from 'lucide-react';
import { Quest } from '@/lib/types';
import { VIP_TIERS, DAILY_QUESTS } from '@/lib/gameData';
import { soundFX } from '@/lib/audio';

interface VIPClubSectionProps {
  onRewardClaimed: (amount: number, message: string) => void;
}

export const VIPClubSection: React.FC<VIPClubSectionProps> = ({
  onRewardClaimed,
}) => {
  const [quests, setQuests] = useState<Quest[]>(DAILY_QUESTS);
  const [currentXP, setCurrentXP] = useState<number>(14250);
  const targetXP = 20000;
  const pct = Math.min(100, (currentXP / targetXP) * 100);

  const handleClaimQuest = (questId: string) => {
    soundFX.playClick();
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId && !q.isClaimed && q.progress >= q.target) {
          soundFX.playWin();
          setCurrentXP((xp) => xp + q.xpReward);
          onRewardClaimed(25, `${q.title} reward: ${q.reward}`);

          try {
            confetti({
              particleCount: 60,
              spread: 55,
              origin: { y: 0.7 },
              colors: ['#007acc', '#002f5e', '#6fb9ec', '#ffffff'],
            });
          } catch {
            // safe fallback
          }

          return { ...q, isClaimed: true };
        }
        return q;
      })
    );
  };

  const getQuestIcon = (name: string) => {
    const cls = 'w-[18px] h-[18px] text-brand-600';
    switch (name) {
      case 'Rocket': return <Rocket className={cls} strokeWidth={2} />;
      case 'Disc': return <Disc className={cls} strokeWidth={2} />;
      case 'Sparkles': return <Sparkles className={cls} strokeWidth={2} />;
      default: return <Trophy className={cls} strokeWidth={2} />;
    }
  };

  return (
    <section id="vip" className="border-t border-ink-200 bg-ink-50 py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <span className="eyebrow eyebrow-brand">Elite loyalty programme</span>
          <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-semibold tracking-[-0.03em] text-ink-900">
            VIP Club &amp; daily quests
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">
            Earn XP on every spin to unlock weekly rakeback, instant cashback, and mystery drops.
          </p>
        </div>

        {/* Tier progression panel */}
        <div className="panel-navy panel-navy-hairline mb-8 overflow-hidden rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-12">

            <div className="flex items-center gap-4 lg:col-span-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brass-400/30 bg-gradient-to-b from-brass-300/25 to-brass-500/15 text-brass-300">
                <Crown className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.11em] text-navy-200">
                    Current tier
                  </span>
                  <span className="rounded border border-white/12 bg-white/8 px-1.5 py-0.5 font-mono text-[10px] text-navy-100">
                    Lvl 3
                  </span>
                </div>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white">
                  Gold High-Roller
                </h3>
                <p className="mt-0.5 text-[13px] text-navy-200">
                  12% cashback · 7% rakeback
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="flex items-baseline justify-between gap-4 text-[13px]">
                <span className="text-navy-200">
                  Progress to <strong className="font-medium text-white">Platinum Master</strong>
                </span>
                <span className="font-mono text-white">
                  {currentXP.toLocaleString()}
                  <span className="text-navy-300"> / {targetXP.toLocaleString()} XP</span>
                </span>
              </div>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-[width] duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-navy-300">
                <span>Bronze</span>
                <span>Silver</span>
                <span className="font-medium text-brass-300">Gold</span>
                <span>Platinum</span>
                <span>Diamond</span>
              </div>
            </div>

          </div>
        </div>

        {/* Quests + tiers */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          <div className="lg:col-span-7">
            <h3 className="mb-4 text-base font-semibold tracking-tight text-ink-900">
              Today&rsquo;s quests
            </h3>

            <div className="space-y-2.5">
              {quests.map((quest) => {
                const isCompleted = quest.progress >= quest.target;
                const qPct = Math.min(100, (quest.progress / quest.target) * 100);

                return (
                  <div
                    key={quest.id}
                    className={`rounded-xl border bg-white p-4 transition-all duration-300 ${
                      quest.isClaimed
                        ? 'border-ink-200 opacity-55'
                        : isCompleted
                        ? 'border-win-500/35 shadow-sm'
                        : 'border-ink-200 hover:border-ink-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-ink-50">
                          {getQuestIcon(quest.iconName)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-[13px] font-semibold text-ink-900">
                              {quest.title}
                            </h4>
                            <span className="rounded bg-brand-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-brand-700">
                              +{quest.xpReward} XP
                            </span>
                          </div>
                          <p className="mt-1 text-[13px] leading-snug text-ink-500">
                            {quest.description}
                          </p>
                          <p className="mt-1.5 text-[11px] text-ink-500">
                            Reward{' '}
                            <span className="font-medium text-win-600">{quest.reward}</span>
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {quest.isClaimed ? (
                          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-win-600">
                            <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                            Claimed
                          </span>
                        ) : isCompleted ? (
                          <button
                            onClick={() => handleClaimQuest(quest.id)}
                            className="btn-1x-primary cursor-pointer px-3.5 py-2 text-[12px]"
                          >
                            Claim
                          </button>
                        ) : (
                          <span className="font-mono text-[11px] text-ink-500">
                            {quest.progress}/{quest.target}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress rail — reads faster than the old text-only counter */}
                    {!quest.isClaimed && (
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink-100">
                        <div
                          className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                            isCompleted ? 'bg-win-500' : 'bg-brand-500'
                          }`}
                          style={{ width: `${qPct}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="mb-4 text-base font-semibold tracking-tight text-ink-900">
              Tier privileges
            </h3>

            <div className="space-y-2 rounded-xl border border-ink-200 bg-white p-3">
              {VIP_TIERS.map((tier) => {
                const isCurrent = tier.level === 3;
                return (
                  <div
                    key={tier.level}
                    className={`rounded-lg border p-3 transition-colors ${
                      isCurrent
                        ? 'border-brass-400/45 bg-brass-50'
                        : 'border-transparent bg-ink-25 hover:bg-ink-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: tier.color }}
                        />
                        <span className="truncate text-[13px] font-medium text-ink-900">
                          {tier.name}
                        </span>
                        {isCurrent && (
                          <span className="shrink-0 rounded bg-brass-500 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                            You
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 font-mono text-[12px] font-medium text-win-600">
                        {tier.cashback}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {tier.benefits.slice(0, 2).map((b, i) => (
                        <span
                          key={i}
                          className="rounded bg-white px-2 py-0.5 text-[10px] text-ink-600 ring-1 ring-ink-200"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
