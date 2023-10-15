interface Route {
  method: "get" | "post" | "patch" | "delete";
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any;
  protected?: boolean;
}

export { Route };