'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { type OwnershipRecord } from '@/lib/propertyHistoryData';

interface HistoryCardProps {
  record: OwnershipRecord;
  index: number;
  side: 'left' | 'right';
}

function getOwnerTypeBadgeColor(ownerType: string): string {
  switch (ownerType) {
    case 'Government': return 'bg-gold/15 text-gold border-gold/20';
    case 'Corporation': return 'bg-blue-500/10 text-blue-300 border-blue-400/20';
    case 'Royal Estate': return 'bg-amber-500/10 text-amber-300 border-amber-400/20';
    case 'Individual': return 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20';
    case 'Trust': return 'bg-purple-500/10 text-purple-300 border-purple-400/20';
    case 'Community': return 'bg-teal-500/10 text-teal-300 border-teal-400/20';
    default: return 'bg-gold/10 text-gold border-gold/20';
  }
}

function getTransferMethodLabel(method: string): string {
  const map: Record<string, string> = {
    'Government Allotment': 'Govt Allotment',
    'Direct Sale': 'Direct Sale',
    'Auction': 'Auction',
    'Inheritance': 'Inheritance',
    'Land Reform': 'Land Reform',
    'Corporate Acquisition': 'Corp. Acquisition',
    'Court Order': 'Court Order',
    'Crown Grant': 'Crown Grant',
    'Municipal Transfer': 'Municipal Transfer',
  };
  return map[method] || method;
}

function formatHistoricalPrice(amount: number): string {
  if (amount === 0) return 'No monetary transaction';
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `\u20B9${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1)} Cr`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `\u20B9${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} L`;
  }
  return `\u20B9${amount.toLocaleString('en-IN')}`;
}

export function HistoryCard({ record, index, side }: HistoryCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [expanded, setExpanded] = useState(false);
  const animClass = side === 'left' ? 'history-card-left' : 'history-card-right';
  const isCurrent = record.transferDate === 'Present';

  // Truncate description for mobile progressive disclosure
  const shortDescription = record.description.length > 120
    ? record.description.slice(0, 120).replace(/\s+\S*$/, '') + '...'
    : record.description;

  return (
    <div
      ref={ref}
      className={`${animClass} ${isVisible ? 'is-visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`glass-card p-4 md:p-5 border-t-2 ${isCurrent ? 'border-t-gold' : 'border-t-gold/30'} transition-all duration-300 hover:shadow-gold-glow`}>
        {/* Header: Owner + Type Badge */}
        <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
          <h3 className="font-serif text-white text-caption md:text-body font-medium leading-snug flex-1">
            {record.ownerName}
          </h3>
          <span className={`text-micro px-2 py-0.5 rounded-full border flex-shrink-0 ${getOwnerTypeBadgeColor(record.ownerType)}`}>
            {record.ownerType}
          </span>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className="text-gold text-micro md:text-caption font-medium">{record.acquiredDate}</span>
          <span className="text-text-muted text-micro">&mdash;</span>
          <span className={`text-micro md:text-caption font-medium ${isCurrent ? 'text-gold' : 'text-gold/70'}`}>
            {record.transferDate}
          </span>
        </div>

        {/* Transfer Method + Price */}
        <div className="flex items-center gap-2 mb-3 md:mb-4 flex-wrap">
          <span className="text-micro px-2 py-0.5 rounded bg-gold/8 text-text-secondary border border-border-subtle">
            {getTransferMethodLabel(record.transferMethod)}
          </span>
          <span className="text-micro text-text-muted">
            {record.acquiredPrice > 0 ? `Acquired at ${formatHistoricalPrice(record.acquiredPrice)}` : 'Non-monetary transfer'}
          </span>
        </div>

        {/* Period Image */}
        <div className="relative h-32 md:h-40 rounded-lg overflow-hidden mb-3 md:mb-4 group">
          <Image
            src={record.image}
            alt={record.ownerName}
            fill
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            sizes="(max-width: 768px) 85vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-3 text-micro text-white/70 font-medium">
            {record.acquiredDate}
          </span>
        </div>

        {/* Description — desktop: full, mobile: progressive disclosure */}
        <div className="hidden md:block">
          <p className="text-text-secondary text-caption leading-relaxed">
            {record.description}
          </p>
        </div>

        <div className="md:hidden">
          <p className="text-text-secondary text-micro leading-relaxed">
            {expanded ? record.description : shortDescription}
          </p>
          {record.description.length > 120 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gold/70 text-micro mt-1.5 font-medium
                         active:text-gold transition-colors"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Transfer price if sold */}
        {record.transferPrice > 0 && (
          <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between">
            <span className="text-text-muted text-micro">Transferred at</span>
            <span className="text-gold text-micro md:text-caption font-semibold">{formatHistoricalPrice(record.transferPrice)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
