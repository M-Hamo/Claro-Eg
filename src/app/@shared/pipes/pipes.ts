import { CamelCaseToTextPipe } from './camel-case-to-text.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { TrimPipe } from './trim.pipe';
import { TimingPipe } from './timing.pipe';
import { NumberWithCommasPipe } from './number-with-commas.pipe';
import { ParseUrlPipe } from './parse-url.pipe';
import { PluralPipe } from './plural.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { IsExternalUrlPipe } from './is-external-url.pipe';
import { TakePipe } from './take.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

export const PIPES = [
  CamelCaseToTextPipe,
  CapitalizePipe,
  TrimPipe,
  PluralPipe,
  SafeUrlPipe,
  NumberWithCommasPipe,
  TimingPipe,
  IsExternalUrlPipe,
  TakePipe,
  ParseUrlPipe,
  SafeHtmlPipe,
];
