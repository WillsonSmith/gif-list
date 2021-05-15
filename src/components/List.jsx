import {useState, useEffect, useRef} from 'preact/hooks';
import '@willson/gif-player';
import './List.css';

const GIF_LIST_URL = 'https://raw.githubusercontent.com/WillsonSmith/gifs/master/gifs.json';

export function List(props) {
  const [list, setList] = useState([]);
  useEffect(async () => {
    const response = await fetch(GIF_LIST_URL);
    const json = await response.json();
    setList(json);
  })

  function handleMouseOver(event) {
    event.target.play();
  }
  function handleMouseLeave(event) {
    event.target.pause();
  }

  return (
    <div className="List">
      {
        list.map(gif => {
          return <gif-player
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          alt={gif.name}
          src={`https://raw.githubusercontent.com/WillsonSmith/gifs/master/gifs/${gif.name}`}
        ></gif-player>
        })
      }
    </div>
  )
}
