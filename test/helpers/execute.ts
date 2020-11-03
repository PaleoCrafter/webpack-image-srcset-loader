import Module from "module";
import path from "path";

const parentModule = module;

export default (code: string) => {
  const resource = "test.js";
  const module = new Module(resource, parentModule);
  // @ts-expect-error
  module.paths = Module._nodeModulePaths(
    path.resolve(__dirname, "../fixtures")
  );
  module.filename = resource;

  // @ts-expect-error
  module._compile(
    `let __export__;${code};module.exports = __export__;`,
    resource
  );

  return module.exports;
};
