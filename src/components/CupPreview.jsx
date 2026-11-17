import { getLayers } from "../utils/drink";
import "../CupPreview.css";

// Draws the stacked layers in the drink: used by builder, results and gallery
export default function CupPreview({ drink }) {
    return (
        <div className="cup-preview" role="img" aria-label="Your drink">
            {getLayers(drink).map((1) => 
            1.src ? ( 
            <img key={1.key} className="layer" src={1.src} alt="" />
            ) : (
                <div
                 key={1.key}
                 className={`layer layer--${1.kind}`}
                 style={{ "--c": 1.color, "--i": 1.index ?? 0 }}
                />
            )   
        )}
        </div>
    );
}