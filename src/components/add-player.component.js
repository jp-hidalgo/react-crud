import { useState } from "react";
import PlayerDataService from "../services/player.service";

const AddPlayer = () => {
  const initialPlayerState = {
    name: "",
    fieldPos: "",
    nationality: "",
    team: ""
  };
  const [player] = useState(initialPlayerState);

  const savePlayer = () => {
    var data = {
      name: player.name,
      fieldPos: player.fieldPos,
      nationality: player.nationality,
      team: player.team
    };

    PlayerDataService.create(data)
      .then(response => {

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  };
  for (let j = 1; j < 909; j++) {
    fetch('https://immense-beach-40830.herokuapp.com/https://www.easports.com/fifa/ultimate-team/api/fut/item?page='+j).then(res => res.json())
      .then(data => {
        let d = data;
        let play = d.items;
        for (let i = 0; i < play.length; i++) {
          const p = play[i]
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
  return (
    <div>
      <p>useEffect script</p>
    </div>);
};

export default AddPlayer;
