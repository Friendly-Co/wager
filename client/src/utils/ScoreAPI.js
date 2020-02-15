import axios from "axios";

export default {
  // Calculate all player scores after a play
  calculateScores: function(toSave) {
    console.log("calculateScores from ScoreAPI.js- toSave:");
    console.log(toSave);
    return axios.put("/api/score/", toSave);
  }
};
