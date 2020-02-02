import axios from "axios";

export default {
  // Gets all players and scores
  // getPlayers: function() {
  //   return axios.get("/api/player");
  // },
  // Get a player by their gameId
  getPlayers: function(gameId) {
    console.log("getPlayers function in PlayerAPI, gameId: ");
    console.log(gameId);
    return axios.get("/api/player/" + gameId);
  },
  // Gets the player with the given id
  // getPlayer: function(playerId) {
  //   return axios.get("/api/player/" + playerId);
  // },
  // Gets the playerssss with the given playerName------gameId
  // getPlayerScore: function(playerName) {

  // Deletes the player with the given id
  // deletePlayer: function(id) {
  //   return axios.delete("/api/player/" + id);
  // },
  // Deletes all players
  deleteAllPlayers: function() {
    return axios.delete("/api/player/");
  },
  // Saves a player to the database, or a new guess to the database- takes in player's unique id OR username
  savePlayer: function(toSave) {
    console.log("savePlayer from API.js- toSave:");
    console.log(toSave);
    return axios.post("/api/player/new", toSave);
  },
  // Should save a player's guess to the database- doesn't work
  calculateScores: function(toSave) {
    console.log("calculateScores from API.js- toSave:");
    console.log(toSave);
    return axios.put("/api/player/calculations", toSave);
  },
  getPlayerScore: function(playerId) {
    console.log("getPlayerScore function in PlayerAPI, playerId: ");
    console.log(playerId);
    return axios.get("/api/player/score/" + playerId);
  },
  kickOutPlayer: function(toSave) {
    console.log("kickOutPlayer function in PlayerAPI, toSave: ");
    console.log(toSave);
    return axios.put("/api/player/score/tooBadSoSad", toSave);
  }
};
