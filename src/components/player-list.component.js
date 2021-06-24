import React, { useState, useEffect } from "react";
import PlayerDataService from "../services/player.service";
import { Link } from "react-router-dom";

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTeam, setSearchTeam] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrievePlayers();
  }, []);

  const onChangeSearchTeam = e => {
    const searchTeam = e.target.value;
    setSearchTeam(searchTeam);
  };
  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrievePlayers = () => {
    PlayerDataService.getAll()
      .then(response => {
        setPlayers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const setActivePlayer = (player, index) => {
    setCurrentPlayer(player);
    setCurrentIndex(index);
  };


  const findByTeam = () => {
    PlayerDataService.findByTeam(searchTeam)
      .then(response => {
        setPlayers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    PlayerDataService.findPlayers(searchName)
      .then(response => {
        setPlayers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by team"
            value={searchTeam}
            onChange={onChangeSearchTeam}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTeam}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Players List</h4>

        <ul className="list-group">
          {players &&
            players.map((player, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePlayer(player, index)}
                key={index}
              >
                {player.name}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentPlayer ? (
          <div>
            <h4>Player</h4>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.M4c52VgqUgwUe_FISQEFBwDZEs%26pid%3DApi&f=1" class="img-fluid" alt="Responsive"></img>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentPlayer.name}
            </div>
            <div>
              <label>
                <strong>Positon:</strong>
              </label>{" "}
              {currentPlayer.fieldPos}
            </div>
            <div>
              <label>
                <strong>Nation:</strong>
              </label>{" "}
              {currentPlayer.nationality}
            </div>
            <div>
              <label>
                <strong>Team:</strong>
              </label>{" "}
              {currentPlayer.team}
            </div>

            <Link
              to={"/players/" + currentPlayer.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Player...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersList;
