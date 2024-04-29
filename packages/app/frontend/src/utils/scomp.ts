import { Interpolation } from 'styled-components';

export function sif<T extends object>(
  field: keyof T | ((props: T) => boolean),
  value?: T[keyof T]
): Interpolation<T> {
  return (props) => {
    if (typeof field === 'function') {
      if (field(props)) {
        return `&`;
      }
      return `&.__never__`;
    }
    if (props[field] === value) {
      return `&`;
    }
    return `&.__never__`;
  };
}

export function sifNot<T extends object>(
  field: keyof T | ((props: T) => boolean),
  value?: T[keyof T]
): Interpolation<T> {
  return (props) => {
    if (typeof field === 'function') {
      if (field(props)) {
        return `&.__never__`;
      }
      return `&`;
    }
    if (props[field] === value) {
      return `&.__never__`;
    }
    return `&`;
  };
}

export function sides(all: number | string): string;
export function sides(y: number | string, x: number | string): string;
export function sides(
  top: number | string,
  x: number | string,
  bottom: number | string
): string;
export function sides(
  top: number | string,
  right: number | string,
  bottom: number | string,
  left: number | string
): string;
export function sides(...args: (number | string)[]): string {
  if (args.length === 1) {
    return `
      left: ${args[0]};
      right: ${args[0]};
      top: ${args[0]};
      bottom: ${args[0]};
    `;
  }
  if (args.length === 2) {
    return `
      left: ${args[1]};
      right: ${args[1]};
      top: ${args[0]};
      bottom: ${args[0]};
    `;
  }
  if (args.length === 3) {
    return `
      left: ${args[1]};
      right: ${args[1]};
      top: ${args[0]};
      bottom: ${args[2]};
    `;
  }
  return `
    left: ${args[3]};
    right: ${args[1]};
    top: ${args[0]};
    bottom: ${args[2]};
  `;
}
