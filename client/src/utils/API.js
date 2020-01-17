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
  // Gets the player with the given playerName
  getPlayerScore: function(playerName) {
    return axios.get("/api/scores/score/" + playerName);
  },
  // Deletes the player with the given id
  // deletePlayer: function(id) {
  //   return axios.delete("/api/scores/" + id);
  // },
  // Deletes all players
  deleteAllPlayers: function() {
    return axios.delete("/api/scores/");
  },
  // Saves a player to the database, or a new guess to the database- takes in player's unique id OR username
  saveScore: function(toSave) {
    console.log("saveScore from API.js- toSave:");
    console.log(toSave);
    return axios.post("/api/scores", toSave);
  },
  // Should save a player's guess to the database- doesn't work
  calculateScores: function(toSave) {
    console.log("saveScore from API.js- toSave:");
    console.log(toSave);
    return axios.put("/api/scores", toSave);
  }
};
