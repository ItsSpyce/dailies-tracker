import React from 'react';
import { DefaultTheme, Interpolation } from 'styled-components';

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

export function breakpoints<T extends { theme: DefaultTheme }>(
  breakpoint: keyof T['theme']['breakpoints']
): Interpolation<T> {
  return (props: T) => {
    // @ts-ignore
    return `@media (min-width: ${props.theme.breakpoints[breakpoint]})`;
  };
}

export function childrenCount<T extends React.PropsWithChildren<unknown>>(): (
  props: T
) => number;
export function childrenCount<T extends React.PropsWithChildren<unknown>>(
  count?: number
): Interpolation<T> {
  return (props) => {
    if (count == null) {
      return React.Children.count(props.children);
    }
    if (count === React.Children.count(props.children)) {
      return `&`;
    }
  };
}

export function areChildrenOf<T extends React.PropsWithChildren<unknown>>(
  ...types: React.ComponentType[]
): Interpolation<T> {
  return (props) => {
    const children = React.Children.toArray(props.children);
    if (children.length !== types.length) {
      return undefined;
    }
    for (let i = 0; i < types.length; i++) {
      const child = children[i];
      if (!React.isValidElement(child) || child.type !== types[i]) {
        return undefined;
      }
    }
    return '&';
  };
}

export function hasChildOf<T extends React.PropsWithChildren<unknown>>(
  type: React.ComponentType
): Interpolation<T> {
  return (props) => {
    const children = React.Children.toArray(props.children);
    if (
      children.some(
        (child) => React.isValidElement(child) && child.type === type
      )
    ) {
      return '&';
    }
  };
}
