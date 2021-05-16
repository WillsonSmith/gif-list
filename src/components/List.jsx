import {useState, useEffect, useRef} from 'preact/hooks';
import '@willson/gif-player';
import './List.css';


const GIF_LIST_URL = 'https://raw.githubusercontent.com/WillsonSmith/gifs/master/gifs.json';

export function List(props) {
  const [list, setList] = useState([]);
  useEffect(async () => {
    const response = await fetch(GIF_LIST_URL);
    const json = await response.json();
    setList(json.slice(1, 8));
  })

  const map = new Map();
  function handleUpdateCallback(element, playCallback, pauseCallback) {
    map.set(element, [playCallback, pauseCallback]);
  }

  const observer = new IntersectionObserver((entries) => {
    requestIdleCallback(() => {
      for (const entry of entries) {
        console.log(entry.target, entry.intersectionRatio)
        if (entry.intersectionRatio >= 0.75) {
          map.get(entry.target)[0]();
        }
        if (entry.intersectionRatio <= 0.5) {
          map.get(entry.target)[1]();
        }
      }
    });
  }, {threshold: [0.5, 0.75]} )

  return (
    <ul className="List">
      {
        list.map(gif => {
          return <ListItem
                    src={`https://raw.githubusercontent.com/WillsonSmith/gifs/master/gifs/${gif.name}`}
                    alt={gif.name}
                    observer={observer}
                    onUpdateCallback={handleUpdateCallback} />
        })
      }
    </ul>
  )
}


function ListItem({src, alt, observer, onUpdateCallback}) {
  const inputElement = useRef(null);
  const gifPlayerRef = useRef(null);

  useEffect(() => {
    if (gifPlayerRef.current) {
      const {current: player} = gifPlayerRef;
      observer.observe(player);
        onUpdateCallback(player, () => {
          player.play()
        }, () => {
          player.pause();
        });
    }
  }, [gifPlayerRef]);

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
      <gif-player ref={gifPlayerRef}
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