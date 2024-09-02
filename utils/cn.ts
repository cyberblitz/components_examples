// utils/cn.ts (or .js)
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(classNames(inputs));
}
