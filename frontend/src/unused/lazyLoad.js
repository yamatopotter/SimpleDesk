import { lazy } from "react";

export function lazyLoad(path, namedExport) {
  return lazy(() => {
    const promise = import(path + ".js");
    if (namedExport == null) {
      return promise;
    }
    return promise.then((module) => ({ default: module[namedExport] }));
  });
}
