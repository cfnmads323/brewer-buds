import { useState } from "react";
import { Link } from "react-router-dom";
import CupPreview from "../utils/drink";
import { getReceiptLines } from "../utils/gallery";
import "../Gallery.css";

export default function Gallery() {
  const [drinks, setDrinks] = useState(loadGallery);

  return (
    <main className="gallery">
      <h1>Gallery</h1>

      {drinks.length === 0 ? (
        <p>
          No drinks saved yet. <Link to="/">Brew your first one.</Link>
        </p>
      ) : (
        <u1 className="gallery__grid">
          {drinks.map((d) => (
            <li key={d.id} className="gallery__card">
              <CupPreview drink={d.drink} />
              <h2>{d.name}</h2>
              <ul className="gallery__lines">
                {getReceiptLines(d.drink).map((line, i) => (
                  <li key={i}>
                    {line.label}: {line.value}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setDrinks(removeDrink(d.id))}
                aria-label={`Delete ${d.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </u1>
      )}
    </main>
  );
}
