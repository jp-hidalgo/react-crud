import { useState } from "react";
import PlayerDataService from "../services/player.service";

const AddPlayer = () => {
  const initialPlayerState = {
    name: "",
    fieldPos: "",
    nationality: "",
    team: ""
  };
  const [player, setPlayer] = useState(initialPlayerState);
  const [data1, setData] = useState([])
  const [players, setPlayers] = useState([]);

  const savePlayer = () => {
    var data = {
      name: player.name,
      fieldPos: player.fieldPos,
      nationality: player.nationality,
      team: player.team
    };

    PlayerDataService.create(data)
      .then(response => {
        setPlayer({
          id: response.data.id,
          name: response.data.name,
          fieldPos: response.data.fieldPos,
          nationality: response.data.nationality,
          team: player.team
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  };
  const fifaAPIScript=()=>{
    for (let j = 0; j < 909; j++) {
      fetch('https://immense-beach-40830.herokuapp.com/https://www.easports.com/fifa/ultimate-team/api/fut/item?page=' + j).then(res => res.json())
        .then(data => {
          setData(data)
          setPlayers(data1.items)
          for (let i = 0; i < players.length; i++) {
            const p = players[i]
            player.name = p.commonName
            if (player.name === "") {
              player.name = p.firstName + " " + p.lastName
            }
            player.nationality = p.nation.abbrName
            player.fieldPos = p.position
            player.team = p.club.abbrName
            savePlayer()

          }
        }).catch(err => {
          console.log(err)
        })
    }
  }
return (
  <div>
    <button
            className="Button"
            onClick={fifaAPIScript()}
          >
            run script
          </button>
  </div>);
};

export default AddPlayer;
