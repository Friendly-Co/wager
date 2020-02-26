import axios from "axios";

export default {
  // Gets all players and scores
  getAllGames: function() {
    console.log("getAllGames from HouseAPI.js");
    return axios.get("/api/house");
  },
  // Deletes all admin
  deleteAll: function() {
    console.log("deleteAll from HouseAPI.js");
    return axios.delete("/api/house/");
  },
  // Gets the admin with the given gameId
  getGameInfo: function(id) {
    console.log("getGameInfo from HouseAPI.js- game id");
    console.log(id);
    // return axios.get("/api/admin/login" + id);
    return axios.get("/api/house/" + id);
  },
  // Saves admin to the database
  saveGame: function(toSave) {
    console.log("saveGame from HouseAPI.js- toSave:");
    console.log(toSave);
    return axios.post("/api/house/adminname", toSave);
  },
  // Updates gameOver boolean in database
  gameOver: function(toSave) {
    console.log("gameOver from HouseAPI.js- toSave:");
    console.log(toSave);
    return axios.put("/api/house/adminname", toSave);
  },

  // Email a username reminder
  sendEmail: function(toSend) {
    console.log("sendEmail from HouseAPI.js- toSend:");
    console.log(toSend);
    return axios.post("/api/house/mail/moremail", toSend);
  }
};
