'use client';

/**
 * ============================================================================
 * SKILLS PAGE - COMMENTED OUT / DISABLED
 * ============================================================================
 *
 * DO NOT UNCOMMENT OR MODIFY THIS PAGE IN FUTURE SESSIONS.
 * This page has been intentionally disabled per user request.
 * Keep it commented out indefinitely.
 *
 * The flow now goes: Phone → OTP → Personalize → Dashboard (skips Skills)
 *
 * ============================================================================
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect to personalize - skills page is disabled
export default function SkillsPage() {
  const router = useRouter();

  useEffect(() => {
    // Skip this page entirely - redirect to personalize
    router.replace('/personalize');
  }, [router]);

  return null; // Page is disabled
}

/*
 * ============================================================================
 * ORIGINAL SKILLS PAGE CODE - PRESERVED BUT COMMENTED OUT
 * DO NOT UNCOMMENT
 * ============================================================================
 *
 * import { useEffect } from 'react';
 * import { useRouter } from 'next/navigation';
 * import { Logo } from '@/components/Logo';
 * import { useFlow } from '@/context/FlowContext';
 * import { SKILLS } from '@/lib/constants';
 *
 * export default function SkillsPage() {
 *   const router = useRouter();
 *   const { state, toggleSkill } = useFlow();
 *
 *   // Redirect if not verified
 *   useEffect(() => {
 *     if (!state.isVerified) {
 *       router.replace('/');
 *     }
 *   }, [state.isVerified, router]);
 *
 *   const handleContinue = () => {
 *     if (state.selectedSkills.length === 0) return;
 *     router.push('/personalize');
 *   };
 *
 *   const handleBack = () => {
 *     router.back();
 *   };
 *
 *   const isSelected = (skillId: string) => state.selectedSkills.includes(skillId);
 *   const canContinue = state.selectedSkills.length > 0;
 *
 *   return (
 *     <div className="min-h-screen flex flex-col items-center px-6 py-12 safe-top safe-bottom">
 *       <div className="w-full max-w-md flex flex-col items-center page-transition">
 *         <button
 *           onClick={handleBack}
 *           className="absolute top-6 left-6 p-2 text-text-muted hover:text-text-primary transition-colors"
 *           aria-label="Go back"
 *         >
 *           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 *             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
 *           </svg>
 *         </button>
 *
 *         <Logo className="w-40 h-10 mb-10" variant="dark" />
 *
 *         <h1 className="text-title text-center text-white mb-2">
 *           What describes you best?
 *         </h1>
 *         <p className="text-text-secondary text-center mb-8">
 *           Select your areas of expertise
 *         </p>
 *
 *         <div className="w-full grid grid-cols-2 gap-3 mb-8">
 *           {SKILLS.map((skill) => (
 *             <button
 *               key={skill.id}
 *               onClick={() => toggleSkill(skill.id)}
 *               className={`skill-chip flex flex-col items-center gap-2 py-5 ${
 *                 isSelected(skill.id) ? 'selected' : ''
 *               }`}
 *             >
 *               <span className="text-2xl">{skill.icon}</span>
 *               <span className="text-sm font-medium">{skill.label}</span>
 *             </button>
 *           ))}
 *         </div>
 *
 *         <p className="text-text-muted text-caption mb-6">
 *           {state.selectedSkills.length === 0
 *             ? 'Select at least one'
 *             : `${state.selectedSkills.length} selected`}
 *         </p>
 *
 *         <button
 *           onClick={handleContinue}
 *           disabled={!canContinue}
 *           className="btn-primary w-full max-w-sm"
 *         >
 *           Continue
 *         </button>
 *
 *         <div className="gold-line w-24 mt-12" />
 *       </div>
 *     </div>
 *   );
 * }
 *
 * ============================================================================
 */
