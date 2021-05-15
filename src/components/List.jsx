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


  return (
    <ul className="List">
      {
        list.map(gif => {
          return <ListItem src={`https://raw.githubusercontent.com/WillsonSmith/gifs/master/gifs/${gif.name}`} alt={gif.name} />
        })
      }
    </ul>
  )
}


function ListItem({src, alt}) {
  
  function handleMouseOver(event) {
    event.target.play();
  }
  function handleMouseLeave(event) {
    event.target.pause();
  }

  function copyLink() {}

  return <li class="ListItem">
    <div class="ListItem__Content">
      <gif-player
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        alt={alt}
        src={src}
      ></gif-player>
    </div>
    <div class="ListItem__Controls">
      <div class="ListItem__Copy">
        <div>
        <label class="CopyLinkLabel">
          <span>{alt}</span>
          <input class="visually-hidden" type="text" value={src} />
        </label>
        </div>
        <div><button aria-label="Copy link">Copy link</button></div>
      </div>
    </div>
  </li>
}