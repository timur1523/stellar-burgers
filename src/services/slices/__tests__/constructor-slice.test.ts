import constructorReducer from "../constructor-slice"

describe("constructorSlice", () => {
    it("Начальное состояние", () => {
        const initialState = constructorReducer(undefined, {type: "UNKNOWN"})
        expect(initialState).toEqual({ ingredients: [], bun: null })
    })
})