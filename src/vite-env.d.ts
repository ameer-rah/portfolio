/// <reference types="vite/client" />

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}
