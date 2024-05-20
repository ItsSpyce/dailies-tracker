import { ipcMain } from 'electron';

let currentControllerRoutes = new Map<string, string>();

export function Route(name?: string) {
  console.log('Route factory', name);
  return function (_: any, propertyKey: string, __: PropertyDescriptor) {
    currentControllerRoutes.set(name ?? propertyKey, propertyKey);
    console.log('Route evaluate', propertyKey);
  };
}

export function Controller(name: string) {
  return (constructor: new () => any) => {
    console.log('Controller evaluate', constructor.name);
    let instance = new constructor();
    for (const [routeName, methodName] of currentControllerRoutes) {
      ipcMain.handle(
        `${name ?? constructor.name}:${routeName}`,
        async (_, ...args) => {
          return instance[methodName].apply(instance, args);
        }
      );
    }
  };
}
