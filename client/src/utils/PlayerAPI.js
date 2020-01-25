import axios from "axios";

export default {
  // Gets all players and scores
  getPlayers: function() {
    return axios.get("/api/player");
  },
  // Get a player by their ID
  // getPlayer: function(_id) {
  //   return axios.get("/api/player" + _id);
  // },
  // Gets the player with the given id
  getPlayer: function(playerId) {
    return axios.get("/api/player/" + playerId);
  },
  // Gets the playerssss with the given playerName------gameId
  getPlayerScore: function(playerName) {
    return axios.get("/api/player/score/" + playerName);
  },
  // Deletes the player with the given id
  // deletePlayer: function(id) {
  //   return axios.delete("/api/player/" + id);
  // },
  // Deletes all players
  deleteAllPlayers: function() {
    return axios.delete("/api/player/");
  },
  // Saves a player to the database, or a new guess to the database- takes in player's unique id OR username
  saveScore: function(toSave) {
    console.log("saveScore from API.js- toSave:");
    console.log(toSave);
    return axios.post("/api/player", toSave);
  },
  // Should save a player's guess to the database- doesn't work
  calculateScores: function(toSave) {
    console.log("saveScore from API.js- toSave:");
    console.log(toSave);
    return axios.put("/api/player", toSave);
  }
};
