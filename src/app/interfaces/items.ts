export type Label = 'feat' | 'bug' | 'chore' | 'docs';

export interface Items {
  title: string;
  label: Label;
}
