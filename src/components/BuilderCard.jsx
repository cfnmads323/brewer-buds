import { useState } from "react";
import { cups, bases, milks, syrups, toppings } from "../data/options";
import { getLayers } from "../utils/drink";
import CupPreview from "./CupPreview";
import "./BuilderCard.css";

const TABS = [
  { id: "cup", label: "Cup", options: cups },
  { id: "base", label: "Base", options: bases },
  { id: "milk", label: "Milk", options: milks },
  { id: "syrup", label: "Syrup", options: syrups },
  { id: "topping", label: "Topping", options: toppings },
];

const PAGE_SIZE = 3;

// which reducer action each tab dispatches (see state/drinkReducer.js)
const ACTIONS = {
  cup: "SET_CUP",
  base: "SET_BASE",
  milk: "SET_MILK",
  syrup: "TOGGLE_SYRUP",
  topping: "SET_TOPPING",
};

function isSelected(tabId, optionId, drink) {
  if (tabId === "syrup") return drink.syrups.includes(optionId);
  return drink[tabId] === optionId;
}

export default function BuilderCard({ drink, dispatch, onBrew }) {
  const [tabId, setTabId] = useState("cup");
  const [page, setPage] = useState(0);

  const tab = TABS.find((t) => t.id === tabId);
  const pageCount = Math.ceil(tab.options.length / PAGE_SIZE);
  const visible = tab.options.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );
  const isEmpty = getLayers(drink).length === 0;
  const canBrew = Boolean(drink.cup && drink.base);

  function selectTab(id) {
    setTabId(id);
    setPage(0);
  }

  return (
    <section className="builder-card" aria-label="Drink builder">
      <header className="builder-card__title">
        Welcome to Brewer Buds! What can we make you today?
      </header>

      <div className="builder-card__preview">
        {isEmpty && (
          <div className="slot">
            Choose a cup to start! Are we staying or taking to-go?
          </div>
        )}
        <CupPreview drink={drink} />
      </div>

      <div
        className="builder-card__tabs"
        role="tablist"
        aria-label="Drink parts"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={` tab-${t.id}`}
            aria-selected={t.id === tabId}
            aria-controls="options-panel"
            className="tab"
            onClick={() => selectTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        className="builder-card__options"
        id="options-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tabId}`}
      >
        <button
          className="arrow"
          aria-label="Previous options"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          ‹
        </button>

        <div className="thumbs">
          {visible.map((o) => {
            const selected = isSelected(tabId, o.id, drink);
            return (
              <button
                key={o.id}
                className="thumb"
                aria-pressed={selected}
                onClick={() => dispatch({ type: ACTIONS[tabId], id: o.id })}
              >
                {o.img ? (
                  <img src={o.img} alt="" />
                ) : (
                  <span className="swatch" style={{ background: o.color }} />
                )}
                <span className="thumb__label">{o.label}</span>
              </button>
            );
          })}
        </div>

        <button
          className="arrow"
          aria-label="Next options"
          disabled={page >= pageCount - 1}
          onClick={() => setPage(page + 1)}
        >
          ‹
        </button>
      </div>

      <footer className="builder-card__actions">
        <button className="reset" onClick={() => dispatch({ type: "RESET" })}>
          Start Over
        </button>
        <button
          className="brew"
          disabled={!canBrew}
          onClick={onBrew}
          aria-describedby={canBrew ? undefined : "brew-hint"}
        >
          Brew!
        </button>
      </footer>
      {!canBrew && (
        <p id="brew-hint" className="hint">
          Pick a cup and a base to brew.
        </p>
      )}
    </section>
  );
}
