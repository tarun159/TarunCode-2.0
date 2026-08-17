import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatProgramNumber(num: number): string {
  return `Program ${num.toString().padStart(2, '0')}`;
}

export function getLabDisplayName(lab: 'pc' | 'iot'): string {
  return lab === 'pc' ? 'PC Lab' : 'IoT Lab';
}

export function getLabRoute(lab: 'pc' | 'iot'): string {
  return lab === 'pc' ? 'pc-lab' : 'iot-lab';
}