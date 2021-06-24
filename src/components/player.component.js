import React, { useState, useEffect } from "react";
import PlayerDataService from "../services/player.service";

const Player = props => {
  const initialPlayerState = {
    id: null,
    name: "",
    fieldPos: "",
    nationality: "",
    team:""
  };
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayerState);
  const [message, setMessage] = useState("");

  const getPlayer = id => {
    PlayerDataService.get(id)
      .then(response => {
        setCurrentPlayer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPlayer(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPlayer({ ...currentPlayer, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentPlayer.id,
      title: currentPlayer.title,
      description: currentPlayer.description,
      published: status
    };

    PlayerDataService.update(currentPlayer.id, data)
      .then(response => {
        setCurrentPlayer({ ...currentPlayer, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePlayer = () => {
    PlayerDataService.update(currentPlayer.id, currentPlayer)
      .then(response => {
        console.log(response.data);
        setMessage("The player was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePlayer = () => {
    PlayerDataService.remove(currentPlayer.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/players");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    {currentPlayer ? (
      <div className="edit-form">
        <h4>Player</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={currentPlayer.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentPlayer.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>
              <strong>Status:</strong>
            </label>
            {currentPlayer.published ? "Published" : "Pending"}
          </div>
        </form>

        {currentPlayer.published ? (
          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(false)}
          >
            UnPublish
          </button>
        ) : (
          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(true)}
          >
            Publish
          </button>
        )}

        <button className="badge badge-danger mr-2" onClick={deletePlayer}>
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updatePlayer}
        >
          Update
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Player...</p>
      </div>
    )}
  </div>
  );
};

export default Player;
