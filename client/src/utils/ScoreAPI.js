import axios from "axios";

export default {
  // Calculate all player scores after a play
  calculateScores: function(toSave) {
    console.log("calculateScores from ScoreAPI.js- toSave:");
    console.log(toSave);
    return axios.put("/api/score/", toSave);
  },
  // Calculate all player scores after a play
  undoScores: function(toSave) {
    console.log("undoScores from ScoreAPI.js- toSave:");
    console.log(toSave);
    return axios.post("/api/score/", toSave);
  }
};
