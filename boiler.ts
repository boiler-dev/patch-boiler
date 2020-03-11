import { join } from "path"
import { ActionBoiler } from "boiler-dev"

export const generate: ActionBoiler = async () => {
  const actions = []

  actions.push({
    action: "write",
    path: "src/patch.ts",
    sourcePath: "tsignore/patch.ts",
  })

  actions.push({
    action: "write",
    path: "test/patch.spec.ts",
    sourcePath: "tsignore/patch.spec.ts",
  })

  return actions
}
