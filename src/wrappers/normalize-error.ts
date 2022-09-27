export function normalizeError(fn: () => void): () => void {
  return () => {
    try {
      fn();
    } catch (err) {
      if (err instanceof Error) {
        err.stack = err.stack
          ?.split("\n")
          .takeWhile(line => !line.includes("__mainLoop"))
          .join("\n");
      }
      throw err;
    }
  };
}
