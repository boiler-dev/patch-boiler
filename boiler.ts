import { join } from "path"
import { ActionBoiler } from "boiler-dev"

export const generate: ActionBoiler = async ({
  cwdPath,
  files,
}) => {
  const actions = []

  for (const file of files) {
    const { name, source } = file

    if (name === "patch.ts") {
      actions.push({
        action: "write",
        path: join(cwdPath, "src", name),
        source,
      })
    }

    if (name === "patch.spec.ts") {
      actions.push({
        action: "write",
        path: join(cwdPath, "test", name),
        source,
      })
    }
  }

  return actions
}
