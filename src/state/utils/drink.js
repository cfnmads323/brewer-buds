import { cups, bases, milks, syrups, toppings } from "../data/options";

const find = (list, id) => list.find((o) => o.id === id);

// Bottom-to-top layer order: cup back, base, milk, syrups, toppings, cup front
export function getLayers(drink) {
    const cup = find(cups, drink.cup);
    const base = find(bases, drink.base);
    const milk = find(milks, drink.milk);
    const topping = find(toppings, drink.topping);

    return [
        cup && { key: "cup-back", kind: "cup", src: cup.back, color: cup.color },
        base && { key: "base", kind: "base", src: base, color: base.color },
        base && milk && milk.id !== "none" && {
            key: "milk", kind: "milk", src: milk.img, color: milk.color,
        },
        ...drink.syrups.map((id, i) => {
            const s = find(syrups, id);
            return { key: `syrup-${id}`, kind: "syrup", src: s.img, color: s.color, index: i };
        }),
        topping && {
            key: "topping", kind: "topping", src: topping.img, color: topping.color,
        },
        cup && cup.front && { key: "cup-front", kind: "front", src: cup.front},
    ].filter(Boolean);
}

// one line per item, used by the receipt and the gallery cards
export function getReceiptLines(drink) {
    const lines = [];
    const cup = find(cups, drink.cup);
    const base = find(bases, drink.base);
    const milk = find(milks, drink.milk);
    const topping = find(toppings, drink.topping);

    if (cup) lines.push({ label: "Cup", value: cup.label });
    if (base) lines.push({ label: "Base", value: base.label });
    if (milk) lines.push({ label: "Milk", value: milk.label });
    drink.syrups.forEach((id) => {
        const s = find(syrups, id);
        if (s) lines.push({ label: "Syrup", value: s.label});
    });
    if (topping) lines.push({ label: "Topping", value: topping.label });
    return lines;
}
