import axios from "axios";

export default {
  // Gets all players and scores
  getAllAdmin: function() {
    console.log("getAllAdmin from AdminAPI.js");
    return axios.get("/api/admin");
  },
  // Deletes all admin
  deleteAllAdmin: function() {
    console.log("deleteAllAdmin from AdminAPI.js");
    return axios.delete("/api/admin/");
  },
  //   // Gets the player with the given id
  //   getScore: function(id) {
  //     return axios.get("/api/admin/" + id);
  //   },
  // Gets the admin with the given adminName
  getAdminInfo: function(adminName) {
    console.log("getAdminInfo from AdminAPI.js- adminName:");
    return axios.get("/api/admin/" + adminName);
  },
  // Deletes the player with the given id
  // deletePlayer: function(id) {
  //   return axios.delete("/api/scores/" + id);
  // },
  // Saves admin to the database
  saveAdmin: function(toSave) {
    console.log("saveAdmin from AdminAPI.js- toSave:");
    console.log(toSave);
    return axios.post("/api/admin", toSave);
  },
  // Should save a player's guess to the database- doesn't work
  updateEmail: function(toSave) {
    console.log("updateEmail from AdminAPI.js- toSave:");
    console.log(toSave);
    return axios.put("/api/admin", toSave);
  }
};
