import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  useRoutes,
  useParams,
  useLocation,
  matchPath,
  createRoutesFromChildren,
  type RoutesProps,
  type Params,
  type RouteObject,
  Navigate,
} from 'react-router-dom';

/// Types

type RoutePatternEntry = {
  components: PathRouteComponents;
  route: RouteObject;
  filename: string;
  path: string;
};

type RoutePatternContainer = {
  [routePattern: string]: RoutePatternEntry;
};

type PathRouteComponentType = 'notFound' | 'error' | 'layout';

type PathRouteComponents = {
  [type in PathRouteComponentType]: React.ComponentType<
    React.PropsWithChildren<NonNullable<unknown>> & { [key: string]: any }
  >;
};

interface DynamicImport {
  (): Promise<any>;
}

type GlobImport = {
  [filename: string]: DynamicImport;
};

export type PageProps<P> = {
  params: P;
};

export type RedirectProps = {
  value: string;
};

export interface ErrorHandlingProvider {
  /**
   * Set to true in non-development environments, otherwise will show stack traces
   * for errors
   */
  shouldRenderErrorPage: boolean;
  /**
   * Handler for when and unhandled error is thrown on a page.
   */
  onError?: (error: Error) => void;
}

export interface LayoutProps
  extends React.PropsWithChildren<NonNullable<unknown>> {}

export interface GetLayout {
  (props: LayoutProps): React.ReactElement;
}

export interface Page<TParams = Params> {
  (props: PageProps<TParams>): React.ReactElement;
}

/// Contexts

//@ts-ignore
const FileRoutingContext = createContext<FileRoutingController>();
export const RoutePatternContext = createContext('/');
export const ErrorHandlingContext = createContext<ErrorHandlingProvider>({
  shouldRenderErrorPage: true,
});
export const RouteTransformContext = createContext<RouteTransformMap>({});
const RouterRootContext = createContext<() => string>(() => '');

/// Components

export interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  allowErrorPage?: boolean;
}

export interface RouteErrorBoundaryState {
  error?: Error;
}

export class RouteErrorBoundary extends React.Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static contextType = ErrorHandlingContext;
  declare context: React.ContextType<typeof ErrorHandlingContext>;

  componentDidCatch(error: unknown) {
    this.setState({
      error: error as Error,
    });
    this.context.onError?.(error as Error);
  }

  render() {
    const { error } = this.state;
    return (
      <>
        {error &&
          (this.props.allowErrorPage && this.context.shouldRenderErrorPage ? (
            <ErrorPage error={error} />
          ) : (
            <div id="path-router-error-boundary" role="log">
              <span>{`${error}`}</span>
              <ul style={{ fontSize: '0.85rem' }}>
                {error.stack
                  ?.split?.('\n')
                  .filter((line) => line.length > 0)
                  .map((line, i) => (
                    <li key={`${line.split('@')[1]}${i}`}>{line}</li>
                  ))}
              </ul>
            </div>
          ))}
        {!error && this.props.children}
      </>
    );
  }
}

export interface PageWrapperProps {
  moduleFn: DynamicImport;
}

export function PageWrapper({ moduleFn }: PageWrapperProps) {
  const params = useParams();
  const [Page, setPage] =
    useState<(props: PageProps<unknown>) => JSX.Element>();

  useEffect(() => {
    moduleFn().then((mod) => {
      const pageFn = mod.component$ ?? mod.default;
      // if a string is returned, do not show and instead navigate
      // @ts-ignore
      setPage(() => pageFn);
    });
  }, [moduleFn]);

  return (
    <RouteErrorBoundary allowErrorPage>
      {Page && <Page params={params} />}
    </RouteErrorBoundary>
  );
}

export function NotFound() {
  const Component = usePathComponent('notFound');
  return <Component />;
}

export interface ErrorPageProps {
  error: Error;
}

export function ErrorPage(props: ErrorPageProps) {
  const Component = usePathComponent('error');
  return <Component {...props} />;
}

export function Layout(props: LayoutProps) {
  const Component = usePathComponent('layout');
  if (Component == null) {
    return <>{props.children}</>;
  }
  return <Component {...props} />;
}

export function Redirect({ value }: RedirectProps) {
  return <Navigate to={value} />;
}

export function RouterRoot() {
  const getRouterRoot = useContext(RouterRootContext);
  const [routeToUse] = useState(() => getRouterRoot());

  return <Redirect value={routeToUse} />;
}

interface RouteTransformer {
  (route: string): string;
}

type RouteTransformMap = Record<string, string | RouteTransformer>;

export interface PathRoutesProps extends RoutesProps {
  /**
   * The pages to be injected into the router
   */
  pages: GlobImport;
  /**
   * The base path for the router
   */
  path?: string;
  /**
   * A map of route transformations. These are applied during route building and not true redirects
   */
  transformRoutes?: RouteTransformMap;
  /**
   * Callback for when there is an unhandled error
   */
  onError?: (error: Error) => void;
  /**
   * Set to false to render stack traces instead of the error page
   */
  shouldRenderErrorPage?: boolean;
  /**
   * The root URL for the router. If the root is `/` and `<RouterRoot />` is called, it will navigate to that
   * path.
   */
  routerRoot?: () => string;
}

export function PathRoutes({
  children,
  pages,
  path,
  transformRoutes = {},
  shouldRenderErrorPage = true,
  onError,
  routerRoot = () => '/',
}: PathRoutesProps) {
  return (
    <ErrorHandlingContext.Provider value={{ shouldRenderErrorPage, onError }}>
      <RouteErrorBoundary>
        <RouterRootContext.Provider value={routerRoot}>
          <RouteTransformContext.Provider value={transformRoutes}>
            <FileRoutingProvider pages={pages} path={path || ''}>
              {children}
            </FileRoutingProvider>
          </RouteTransformContext.Provider>
        </RouterRootContext.Provider>
      </RouteErrorBoundary>
    </ErrorHandlingContext.Provider>
  );
}

export interface FileRoutingProviderProps
  extends React.PropsWithChildren<{
    pages: GlobImport;
    path: string;
  }> {}

export function FileRoutingProvider({
  pages,
  path,
  children,
}: FileRoutingProviderProps) {
  const location = useLocation();
  const [fileRoutingController] = useState(
    new FileRoutingController(pages, path)
  );
  const [routePattern, setRoutePattern] = useState('/');
  const [canRender, setCanRender] = useState(false);
  const [routes, setRoutes] = useState<RouteObject[]>([]);
  const renderableRoutes = useRoutes(routes);
  const routeTransformations = useContext(RouteTransformContext);

  useEffect(() => {
    fileRoutingController.buildRoutes(routeTransformations).then((routes) => {
      const newRouteTree: RouteObject[] = [
        ...routes,
        ...createRoutesFromChildren(children),
        {
          element: <NotFound />,
          path: '*',
        },
      ];
      setRoutes(newRouteTree);
      setCanRender(true);
    });
  }, [fileRoutingController, children, routeTransformations]);

  useEffect(() => {
    const newRoutePath = fileRoutingController.getMatchingRoutePattern(
      location.pathname
    );
    setRoutePattern(newRoutePath);
  }, [location.pathname, canRender, fileRoutingController]);

  useEffect(() => {
    //Scroll to top on path change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <FileRoutingContext.Provider value={fileRoutingController}>
      <RoutePatternContext.Provider value={routePattern}>
        {canRender && <Layout>{renderableRoutes}</Layout>}
      </RoutePatternContext.Provider>
    </FileRoutingContext.Provider>
  );
}

/// Hooks

export function useRoutePattern() {
  return useContext(RoutePatternContext);
}

export function usePathComponent(pathComponentType: PathRouteComponentType) {
  const routePattern = useRoutePattern();
  const fileRoutingController = useContext(FileRoutingContext);
  const component = fileRoutingController.getPathComponentFor(
    routePattern,
    pathComponentType
  );
  return component;
}

export function useRouterRoot() {
  const getRouterRoot = useContext(RouterRootContext);
  const [routeToUse, setRouteToUse] = useState(() => getRouterRoot());
  useEffect(() => {
    const routeToUse = getRouterRoot();
    setRouteToUse(routeToUse);
  }, []);

  return routeToUse;
}

/// Utils

const reservedPaths: PathRouteComponentType[] = ['layout', 'notFound', 'error'];

export class FileRoutingController {
  private _routePatternContainer: RoutePatternContainer = {};
  private _isBuilt = false;

  constructor(private _globImports: GlobImport, private _path: string) {}

  async buildRoutes(
    routeTransformations: RouteTransformMap
  ): Promise<RouteObject[]> {
    if (!this._isBuilt) {
      const componentMapAtRoute: Record<string, PathRouteComponents> = {};

      for (const [path, moduleFn] of Object.entries(this._globImports)) {
        const routePattern = `${
          this._path !== '' ? this._path + '/' : ''
        }${getRoutePatternFromPath(path)}`;
        const filename = getFilename(path);

        if (reservedPaths.includes(filename as PathRouteComponentType)) {
          const mod = await moduleFn();
          const pageFn = mod.component$ ?? mod.default;
          if (pageFn == null) {
            continue;
          }
          if (
            componentMapAtRoute[routePattern] &&
            filename in componentMapAtRoute[routePattern]
          ) {
            throw new Error(
              `Duplicated component found for ${routePattern}, ${path}`
            );
          }
          const parentRoute = getParentRoute(routePattern);
          const components = componentMapAtRoute[parentRoute] ?? {};
          // @ts-ignore For now
          components[filename as PathRouteComponentType] = pageFn;
          componentMapAtRoute[parentRoute] = components;
          continue;
        }

        if (this._routePatternContainer[routePattern]) {
          continue;
        }

        // transform the route
        let formattedPath = routePattern === '' ? '/' : routePattern;
        for (const [pathGlob, transformer] of Object.entries(
          routeTransformations
        )) {
          const match = matchPath(
            { path: pathGlob, end: false, caseSensitive: false },
            formattedPath
          );
          if (match) {
            // found the first applicable match
            if (typeof transformer === 'string') {
              formattedPath = formattedPath.replace(
                match.pathnameBase,
                transformer
              );
            } else if (typeof transformer === 'function') {
              formattedPath = formattedPath.replace(
                match.pathname,
                transformer
              );
            }
            break;
          }
        }

        const route: RouteObject = {
          element: React.createElement(PageWrapper, { moduleFn }),
          path: formattedPath,
        };
        this._routePatternContainer[routePattern] = {
          path,
          filename,
          route,
          components: emptyComponentMap,
        };
      }

      for (const route in this._routePatternContainer) {
        const matchingRoutes = Object.keys(componentMapAtRoute)
          .filter((routePattern) => isRouteInPath(route, routePattern))
          .sort((a, b) => a.length - b.length || 0);
        const components = matchingRoutes.reduce(
          (acc, routePattern) => ({
            ...acc,
            ...componentMapAtRoute[routePattern],
          }),
          Object.create(emptyComponentMap)
        );
        this._routePatternContainer[route].components = components;
      }
      this._isBuilt = true;
    }
    return Object.values(this._routePatternContainer).map((rp) => rp.route);
  }

  getMatchingRoutePattern(route: string) {
    for (const routePattern in this._routePatternContainer) {
      // no sense in trying to run matches if they equal each other
      if (route === routePattern) {
        return routePattern;
      }
      const match = matchPath(routePattern, route);
      if (match) {
        return routePattern;
      }
    }
    return '/';
  }

  getPathComponentFor(
    route: string,
    pathRouteComponentType: PathRouteComponentType
  ) {
    const routePattern = this.getMatchingRoutePattern(route);
    if (routePattern in this._routePatternContainer) {
      return this._routePatternContainer[routePattern].components![
        pathRouteComponentType
      ];
    }
    throw new Error(`No route found matching ${route}`);
  }
}

const emptyComponentMap: PathRouteComponents = {
  notFound: React.Fragment,
  layout: React.Fragment,
  error: React.Fragment,
};

type CasingOpts = {
  separator?: string | false;
};

function getParentRoute(route: string) {
  const parts = route.split('/').slice(1, -1);
  return `/${parts.join('/')}`;
}

function isRouteInPath(route: string, path: string) {
  return !!matchPath({ path, end: !route.startsWith('/') }, route);
}

function getFilename(path: string, includeExt?: boolean) {
  const lastSlash = path.lastIndexOf('/') + 1;
  if (includeExt) {
    return path.substring(lastSlash + 1);
  }
  return path.substring(lastSlash, path.lastIndexOf('.'));
}

function transformPathSection(pathSection: string, separator: string) {
  const withoutExt = pathSection.replaceAll(/(\.(?:j|t)sx?)$/gi, '');

  if (/\[.+\]/.test(withoutExt)) {
    // return the original path
    return `:${withoutExt.substring(1, withoutExt.length - 1)}`;
  }

  return withoutExt
    .replaceAll(/pages/gi, '')
    .replaceAll(/index/gi, '')
    .replaceAll(
      /([a-z])([A-Z])([a-z])/g,
      (_, p1, p2, p3) => `${p1}${separator}${p2.toLowerCase()}${p3}`
    )
    .replace(/^([A-Z])/, (char) => char.toLowerCase());
}

function getRoutePatternFromPath(filename: string, opts?: CasingOpts): string {
  const separator = opts?.separator === false ? '' : opts?.separator || '-';
  const normalized = filename.replace('\\', '/');
  const cleaned = normalized
    .split('/')
    .map((pathSection) => transformPathSection(pathSection, separator))
    .filter((pathSection) => pathSection.length > 0 && pathSection !== '.')
    .join('/');

  return `/${cleaned}`;
}
