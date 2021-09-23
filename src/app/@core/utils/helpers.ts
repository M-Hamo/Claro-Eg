import { AbstractControl } from '@angular/forms';

/** Returns a valid HTML id from @str */
export function generateId(str: string): string {
  return String(str)
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '') // Remove HTML tags
    .replace(/[^A-Za-z -]/g, '') // Remove not valid characters
    .trim()
    .replace(/\s+/g, '-') // Replace space with characters
    .toLowerCase();
}

/**
 * Return true if the type of the value is string, otherwise returns false.
 * @param val value to be checked
 */
export function isString(val: any): boolean {
  return val && (typeof val === 'string' || val instanceof String);
}

export function toBoolean(val: any): boolean {
  if (isString(val)) {
    val = val.toLowerCase().trim();

    return val === 'true';
  }

  return !!val;
}

export function serialize(obj: any = {}): string {
  const arr = [];
  for (const k of Object.keys(obj)) {
    arr.push(
      `${k}=${encodeURIComponent(
        typeof obj[k] === 'string'
          ? String.prototype.trim.call(obj[k])
          : obj[k] === null
          ? ''
          : obj[k]
      )}`
    );
  }
  return arr.join('&');
}

/**
 * Determine wither object | string | array is empty.
 */
export function isEmptyObject(obj: {}): boolean {
  let name: any;
  // tslint:disable-next-line: forin
  for (name in obj) {
    return false;
  }
  return true;
}

/**
 * is valid date helper
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function str2arr(str: string): string[] {
  return str.replace(/[\r\n\s]/g, '').split(',');
}

export function getScrollbarWidth(): number {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.cssText =
    'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
}

export const isExternalUrl = (url: string): boolean => {
  const match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);

  if (!match) return false;

  if (
    isString(match[1]) &&
    match[1].length > 0 &&
    match[1].toLowerCase() !== location.protocol
  ) {
    return true;
  }

  return (
    isString(match[2]) &&
    match[2].length > 0 &&
    match[2].replace(
      new RegExp(':(' + (location.protocol === 'https' ? 443 : 80) + ')?$'),
      ''
    ) !== location.host
  );
};

export const isSameOriginUrl = (url: string): boolean => {
  // It's an absolute url with the same origin.
  if (url.startsWith(`${window.location.origin}/`)) {
    return true;
  }

  // It's a protocol relative url with the same origin.
  // For example: //www.example.com/api/Products
  if (url.startsWith(`//${window.location.host}/`)) {
    return true;
  }

  // It's a relative url like /api/Products
  if (/^\/[^\/].*/.test(url)) {
    return true;
  }

  // It's an absolute or protocol relative url that
  // doesn't have the same origin.
  return false;
};

/** Group objects by a property */
export function groupBy<T>(list: Array<T>, keyGetter: (x: T) => any): Map<any, T[]> {
  const map = new Map<any, T[]>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

/** Clear error form AbstractControl by its name. */
export const clearError = (control: AbstractControl, error: string): void => {
  const err = control?.errors;
  if (!err) {
    return;
  }
  delete err[error];
  if (!Object.keys(err).length) {
    control.setErrors(null);
  } else {
    control.setErrors(err);
  }
};

/** Get last element of array */
export function last<T>(arr: Array<T>): T | null {
  return arr && arr.length > 0 ? arr[arr.length - 1] : null;
}
