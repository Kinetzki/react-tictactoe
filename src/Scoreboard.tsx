import "./Scoreboard.css"

interface Prop {
    title: string;
    score: number;
}

const Scoreboard = ({title, score}: Prop) => {
  return (
    <div className="container-score">
        <div className="title">{title}: </div>
        <div className="score">{score}</div>
    </div>
  )
}

export default Scoreboard
