import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// Create a unique colour based on username for the chat username
export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(1) + (Math.imul(hash, 32) - hash);
  }
  let color = '#';

  for (let i = 0; i < 3; i += 1) {
    const value = Math.floor(hash / 256 ** i) % 256;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}
