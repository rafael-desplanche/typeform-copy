export type PublicStep = {
  id: string;
  order: number;
  type: 'QUESTION' | 'END';
  fieldType: 'TEXT' | 'EMAIL' | 'PHONE' | null;
  label: string | null;
  required: boolean;
  endMessage: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
};
