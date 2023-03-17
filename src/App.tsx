import "./styles.css";
import {getCharacters} from "./API";
import {useEffect, useState} from "react";

type Character = {
  id: string;
  name: string;
  species: string;
  gender: string;
  location: any;
  status: string;
  image: string;
};

export default function App () {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pages, setPages] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [flip, setFlip] = useState(false);
  const [charIndex, setCHarIndex] = useState<number>();
  const [rotate, setRotate] = useState<string>('');
  const [episodes, setEpisodes] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setFlip(false);
      setLoading(true);
      window.scrollTo(0, 0);
      const characters = await getCharacters(pageNumber);
      console.log("characters:", characters);

      setCharacters(characters.results);
      setPages(characters.info.pages);
      setLoading(false);
    })();
  }, [pageNumber]);

  useEffect(() => {
    setFlip(true);
  }, [charIndex])


  useEffect(() => {
    // setFlip(true);
    if (flip) {
      // setTimeout(() => {
      setRotate('rotateY(1turn)');
      // }, 300)
    } else setRotate('rotateY(-1turn)')
    // setRotate(true);
  }, [flip])

  const pagination = () => {
    if (typeof pages === "number") {
      const pagesArray = [];
      for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
      }
      // const selectedPage = 1;
      const endIndex = pageNumber < 5 ? 7 : pageNumber + 3;
      const beginIndex = pageNumber > 5 ? (pageNumber - 3) : 0;
      const pageElements = pagesArray.slice(beginIndex, endIndex).map((pageNum) => (
        <h2 style={{cursor: "pointer", color: pageNum === pageNumber ? '#f59' : '#fff'}} onClick={() => setPageNumber(pageNum)}>
          {pageNum}
        </h2>
      ));
      return pageElements;
    }
  };

  return (
    <div className="App">
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: "1rem", color: '#fff', backgroundColor: '#242425', position: 'sticky', top: 0, width: '100%', zIndex: 50}}>
        <h1>Rick and Morty Characters:</h1>
        <div style={{display: "flex", gap: "1rem"}}>
          {typeof pages === 'number' && <h2 onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)} style={{cursor: 'pointer'}}>{pageNumber > 5 && '<<'}</h2>}
          {pagination()}
          {typeof pages === 'number' && <h2 onClick={() => ((pageNumber + 3) < pages && setPageNumber(pageNumber + 1))} style={{cursor: 'pointer'}}>{(pageNumber + 3) < pages && '>>'}</h2>}
        </div>
      </div>
      <div
        style={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "1rem", color: '#fff'}}
      >

        {characters.map((char, index) => {
          return (
            <div
              style={{
                backgroundColor: "#f59",
                borderRadius: "25px",
                padding: "1rem",
                width: "20rem",
                height: '32rem',
                color: '#fafafa',
                // transform: index === charIndex ? rotate : '',
                // WebkitTransform: index === charIndex ? rotate : '',
                transition: '.900s',
                position: 'relative'
              }}
              key={index}
              onClick={() => {
                setFlip(!flip)
                setCHarIndex(index);
              }}
            >
              <h3 style={{position: 'absolute', margin: 'auto', top: '0', right: '.5rem', color: '#64D2FE'}}>Flip<span role="img" aria-label='point'>👉</span></h3>
              {loading ? <h1>Loading...</h1> :
                (flip && charIndex === index ?
                  <div style={{backgroundColor: '#7F51BA', padding: '.5rem', borderRadius: '15px', height: '31rem'}}>
                    <h2>Origin: {char.location.name}</h2>
                    <h2>Dimension: {char.location.dimension}</h2>
                    <h2>Status: {char.status}</h2>
                  </div> :
                  <div style={{backgroundColor: '#7F51BA', padding: '.5rem', borderRadius: '15px', height: '31rem'}}>
                    <h2>Name: {char.name}</h2>
                    <h3>Species: {char.species}</h3>
                    <h3>Gender: {char.gender}</h3>
                    <img
                      style={{borderRadius: "15px"}}
                      src={char.image}
                      alt={char.name}
                    ></img>
                  </div>)
              }
            </div>
          );
        })}

      </div>
    </div>
  );
}
