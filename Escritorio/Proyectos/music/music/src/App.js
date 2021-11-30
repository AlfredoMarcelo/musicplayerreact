import React, { useRef } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  let [lista, setLista] = React.useState([]);
  const [condicion, setCondicion] = React.useState(false);
  const [posicion, setPosicion] = React.useState(0);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://assets.breatheco.de/apis/sound/songs");
    const cancion = await data.json();
    setLista(cancion);
  };

  let audioRef = useRef(null);

  const reproducir = (itemurl) => {
    audioRef.src = "https://assets.breatheco.de/apis/sound/" + itemurl;
    audioRef.play();
    setCondicion(true);
  };

  const botonRetroceder = () => {
    if (posicion === 0) return;
    const song = lista[posicion - 1];
    reproducir(song.url);
    setPosicion(posicion - 1);
  };

  const botonPausa = () => {
    audioRef.pause();
    setCondicion(false);
  };

  const botonPlay = () => {
    audioRef.play();
    setCondicion(true);
  };

  const botonAvanzar = () => {
    if (posicion === lista.length - 1) return;
    const song = lista[posicion + 1];
    reproducir(song.url);
    setPosicion(posicion + 1);
  };

  return (
    <>
      <div className="container bg-dark">
        <div className="row">
          <table className="table text-white mb-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cancion</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((item, i) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td
                    onClick={() => {
                      reproducir(item.url);
                      setPosicion(i);
                    }}
                  >
                    {item.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fixed-bottom text-center d-flex justify-content-evenly bg-dark pb-2">
          <button
            onClick={() => botonRetroceder()}
            className="rounded bg-dark text-white"
          >
            <i className="fas fa-backward"></i>
          </button>
          {condicion ? (
            <button
              onClick={() => botonPausa()}
              className="rounded bg-dark text-white"
            >
              <i className="fas fa-pause-circle"></i>
            </button>
          ) : (
            <button
              onClick={() => botonPlay()}
              className="rounded bg-dark text-white"
            >
              <i className="fas fa-play"></i>
            </button>
          )}
          <button
            onClick={() => botonAvanzar()}
            className="rounded bg-dark text-white"
          >
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </div>
      <audio src="" ref={(elm) => (audioRef = elm)} />
    </>
  );
};

export default App;
