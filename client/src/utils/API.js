import axios from "axios";

export default {
  // Gets all players and scores
  getScores: function() {
    return axios.get("/api/scores");
  },
  // Gets the player with the given id
  getScore: function(id) {
    return axios.get("/api/scores/" + id);
  },
  // Deletes the player with the given id
  deletePlayer: function(id) {
    return axios.delete("/api/scores/" + id);
  },
  // Deletes all players
  deleteAllPlayers: function() {
    return axios.delete("/api/scores/");
  },
  // Saves a player's score to the database- takes in player's unique id OR username
  saveScore: function(toSave) {
    console.log("saveScore from API.js- toSave:");
    console.log(toSave);
    return axios.post("/api/scores", toSave);
  }
};
