export const BlockEnv = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read" && output.args.filePath?.includes(".env")) {
        throw new Error("Cannot read .env files")
      }
      // if (input.tool === "bash") {
      //   const cmd = output.args.command || ""
      //   const envReadPatterns = [
      //     /\bcat\b.*\.env/,
      //     /\bless\b.*\.env/,
      //     /\bmore\b.*\.env/,
      //     /\bhead\b.*\.env/,
      //     /\btail\b.*\.env/,
      //     /\bnl\b.*\.env/,
      //     /\bbat\b.*\.env/,
      //     /\btype\b.*\.env/,
      //     /\bprintenv\b/,
      //     /\benv\b/,
      //     /\bset\b/,
      //     /dotenv/,
      //     /\.env\s/,
      //     /\.env"/,
      //   ]
      //   if (envReadPatterns.some((p) => p.test(cmd))) {
      //     throw new Error("Cannot read .env files")
      //   }
      // }
    },
  }
}
