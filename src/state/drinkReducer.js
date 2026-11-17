export const initialDrink = {
    cup: null,
    base: null,
    milk: "none",
    syrups: [],
    toppings: null,
};

export function drinkReducer(state, action) {
    switch (action.type) {
        case "SET_CUP":
            return {...state, cup: action.id};
        case "SET_BASE":
            return {...state, base: action.id};
        case "SET_MILK":
            return {...state, milk: action.id};
        case "TOGGLE_SYRUP":
            return {
                ...state,
                syrups: state.syrups.includes(action.id)
                 ? state.syrups.filter((s) => s !== action.id)
                 : [...state.syrups, action.id],
            };
        case "SET_TOPPINGS":
            // Checking the selected topping again removes it
            return {...state, topping: state.topping === action.id ? null: action.id };
        case "RESET":
            return initialDrink;
        default:
            return state;
    }
}