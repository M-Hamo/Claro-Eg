import { Pipe, PipeTransform } from '@angular/core';
import { isExternalUrl } from '@core/utils';

@Pipe({ name: 'isExternalUrl' })
export class IsExternalUrlPipe implements PipeTransform {
  transform(url: string): boolean {
    return isExternalUrl(url);
  }
}
