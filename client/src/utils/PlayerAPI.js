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
  // Saves a player to the database
  savePlayer: function(toSave) {
    console.log("savePlayer from API.js- toSave:");
    console.log(toSave);
    return axios.post("/api/player", toSave);
  },
  // Saves a player's guess to the database
  saveGuess: function(toSave) {
    console.log("saveGuess from API.js- toSave:");
    console.log(toSave);
    return axios.put("/api/player", toSave);
  },
  // Gets the player's score
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
