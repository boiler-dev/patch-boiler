import expect from "./expect"

import loaded from "../src/loaded"
import tinyId from "../src/tinyId"
import patch from "../src/patch"

describe("patch", () => {
  beforeEach(() => {
    patch.reset()
    loaded.reset()
    loaded.load({ patch, tinyId })
  })

  class A {
    patchMe(hi: string): boolean {
      return true
    }
  }

  const a = new A()

  it("patches", () => {
    expect.assertions(9)

    let calls = []

    patch.create(
      a,
      "patchMe",
      {
        fn: (hi: string) => {
          expect(hi).toBe("hi")
          calls.push(-1)
        },
        order: -1,
      },
      {
        patchMe: a.patchMe.bind(a),
        order: 0,
      },
      {
        fn: (hi: string) => {
          expect(hi).toBe("hi")
          calls.push(1)
        },
      }
    )

    expect(a.patchMe("hi")).toBe(true)
    expect(calls).toEqual([-1, 1])

    calls = []

    patch.update(
      a.patchMe,
      {
        fn: (hi: string) => calls.push(-2),
        order: -2,
      },
      {
        after: (hi: string) => {
          calls.push(2)
          return 2
        },
        order: 2,
        return: true,
      }
    )

    expect(a.patchMe("hi")).toBe(2)
    expect(calls).toEqual([-2, -1, 1, 2])

    expect(patch.find(a.patchMe).memo).toEqual({
      fn: undefined,
      patchMe: true,
      after: 2,
    })
  })

  it("resets", () => {
    expect(a.patchMe("")).toBe(true)
  })
})
