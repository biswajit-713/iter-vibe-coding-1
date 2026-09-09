export const ProtectProducts = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (
        (input.tool === "edit" || input.tool === "write") &&
        output.args.filePath &&
        output.args.filePath.replace(/\\/g, "/").includes("src/data/products.js")
      ) {
        throw new Error(
          "src/data/products.js is hardcoded on purpose — do not modify it."
        )
      }
    },
  }
}
