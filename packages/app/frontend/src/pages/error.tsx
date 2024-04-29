import { ErrorPageProps } from '@/path-router';

export const component$ = (props: ErrorPageProps) => (
  <div>
    <h1>{props.error.name}</h1>
    <h2>{props.error.message}</h2>
    <p>{props.error.stack ?? ''}</p>
  </div>
);
