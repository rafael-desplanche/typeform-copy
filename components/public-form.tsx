'use client';

import { FormEvent, useMemo, useState } from 'react';
import { PublicStep } from '@/lib/types';

type Props = {
  formId: string;
  steps: PublicStep[];
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^\+?[0-9\s().-]{6,20}$/.test(value);
}

export default function PublicForm({ formId, steps }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const currentStep = steps[currentIndex];

  const questionSteps = useMemo(() => steps.filter((step) => step.type === 'QUESTION'), [steps]);
  const endStep = useMemo(() => steps.find((step) => step.type === 'END') ?? null, [steps]);

  if (!currentStep) {
    return <p>Formulaire vide.</p>;
  }

  async function goNext(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (currentStep.type === 'QUESTION') {
      const value = answers[currentStep.id] || '';

      if (currentStep.required && !value.trim()) {
        setError('Ce champ est requis.');
        return;
      }

      if (value && currentStep.fieldType === 'EMAIL' && !isValidEmail(value)) {
        setError('Email invalide.');
        return;
      }

      if (value && currentStep.fieldType === 'PHONE' && !isValidPhone(value)) {
        setError('Téléphone invalide.');
        return;
      }
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex < steps.length) {
      setCurrentIndex(nextIndex);
      return;
    }

    const payload = {
      formId,
      answers: questionSteps.map((step) => ({
        stepId: step.id,
        value: answers[step.id] || '',
      })),
    };

    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError('Erreur lors de la soumission.');
      return;
    }

    setSubmitted(true);
  }

  if (submitted && endStep) {
    return (
      <section className="bg-white border rounded-lg p-6 space-y-4">
        <p>{endStep.endMessage || 'Merci pour votre réponse.'}</p>
        {endStep.ctaLabel && endStep.ctaUrl && (
          <a href={endStep.ctaUrl} className="inline-block bg-slate-900 text-white rounded-md px-4 py-2">
            {endStep.ctaLabel}
          </a>
        )}
      </section>
    );
  }

  if (currentStep.type === 'END') {
    return (
      <section className="bg-white border rounded-lg p-6 space-y-4">
        <p>{currentStep.endMessage || 'Merci pour votre réponse.'}</p>
        {currentStep.ctaLabel && currentStep.ctaUrl && (
          <a href={currentStep.ctaUrl} className="inline-block bg-slate-900 text-white rounded-md px-4 py-2">
            {currentStep.ctaLabel}
          </a>
        )}
      </section>
    );
  }

  return (
    <form onSubmit={goNext} className="bg-white border rounded-lg p-6 space-y-4">
      <p className="text-sm text-slate-500">
        Question {questionSteps.findIndex((s) => s.id === currentStep.id) + 1} / {questionSteps.length}
      </p>
      <label className="block space-y-2">
        <span className="text-lg font-medium">{currentStep.label}</span>
        <input
          type={currentStep.fieldType === 'EMAIL' ? 'email' : currentStep.fieldType === 'PHONE' ? 'tel' : 'text'}
          value={answers[currentStep.id] || ''}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [currentStep.id]: e.target.value }))}
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="bg-slate-900 text-white">
        Suivant
      </button>
    </form>
  );
}
