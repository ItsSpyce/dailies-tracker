/// <reference types="vite/client" />

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.png?base64' {
  const value: string;
  export default value;
}
