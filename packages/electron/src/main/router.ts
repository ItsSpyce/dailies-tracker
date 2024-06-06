import { ipcMain } from 'electron';

let currentControllerRoutes = new Map<string, string>();

export function Route(name?: string) {
  return function (_: any, propertyKey: string, __: PropertyDescriptor) {
    currentControllerRoutes.set(name ?? propertyKey, propertyKey);
  };
}

export function Controller(name: string) {
  return (constructor: new () => any) => {
    let instance = new constructor();
    for (const [routeName, methodName] of currentControllerRoutes) {
      ipcMain?.handle(
        `${name ?? constructor.name}:${routeName}`,
        async (_, ...args) => {
          const result = instance[methodName].apply(instance, args);
          if (result instanceof Promise) {
            return await result;
          }
          return result;
        }
      );
    }
  };
}
