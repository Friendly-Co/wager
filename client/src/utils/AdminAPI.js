import axios from "axios";

export default {
  // Gets all players and scores
  getAllGames: function() {
    console.log("getAllGames from AdminAPI.js");
    return axios.get("/api/admin");
  },
  // Deletes all admin
  deleteAll: function() {
    console.log("deleteAll from AdminAPI.js");
    return axios.delete("/api/admin/");
  },
  //   // Gets the player with the given id
  //   getScore: function(id) {
  //     return axios.get("/api/admin/" + id);
  //   },
  // Gets the admin with the given adminName and gameId
  getAdminInfo: function(id) {
    console.log("getAdminInfo from AdminAPI.js- game id");
    return axios.get("/api/admin/login", id);
  },
  // Deletes the player with the given id
  // deletePlayer: function(id) {
  //   return axios.delete("/api/scores/" + id);
  // },
  // Saves admin to the database
  saveGame: function(toSave) {
    console.log("saveGame from AdminAPI.js- toSave:");
    console.log(toSave);
    // return axios.post("/api/admin/login", toSave);
    return axios.post("/api/admin/adminname", toSave);
  },
  // Should save a player's guess to the database- doesn't work
  updateEmail: function(toSave) {
    console.log("updateEmail from AdminAPI.js- toSave:");
    console.log(toSave);
    return axios.put("/api/admin/adminname", toSave);
  },
  sendEmail: function(toSend) {
    console.log("sendEmail from AdminAPI.js- toSend:");
    console.log(toSend);
    return axios.post("/api/admin/mail/moremail", toSend);
  }
};
