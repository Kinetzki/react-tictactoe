import "./Tile.css";

interface Prop {
    onclick: () => void;
    text: string;
}
const Tile = ({onclick, text}: Prop) => {

   return (
    <button onClick={onclick} className="tile">{text}</button>
   )
};

export default Tile;
