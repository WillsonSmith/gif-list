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
  const inputElement = useRef(null);

  function handleMouseOver(event) {
    event.target.play();
  }
  function handleMouseLeave(event) {
    event.target.pause();
  }

  function copyLink() {
    inputElement.current.select();
    document.execCommand('copy');
  }

  return <li class="ListItem">
    <div class="ListItem__Content">
      <gif-player
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        alt={alt}
        src={src}
      ></gif-player>
    </div>
    <div class="InputWrapper">
      <label class="CopyLinkLabel">
        <input class="CopyLinkTextField" ref={inputElement} type="text" value={src} />
      </label>
    </div>
    <div class="ListItem__Controls">
      <div class="ListItem__Copy">
        <div>
          <span class="CopyLinkTitle">{alt}</span>
        </div>
        <div><button aria-label="Copy link" onClick={copyLink}>Copy link</button></div>
      </div>
    </div>
  </li>
}