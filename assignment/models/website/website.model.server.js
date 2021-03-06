
module.exports = function() {

    var mongoose = require("mongoose");

    var WebsiteSchema = require("./website.schema.server.js")(mongoose);
    var Website = mongoose.model("Website", WebsiteSchema);
    
    var api = {
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById" : findWebsiteById,
        "createWebsiteForUser" : createWebsiteForUser,
        "updateWebsite" : updateWebsite,
        "deleteWebsite" : deleteWebsite
    };

    return api;


    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId})
    }
    
    function findWebsiteById(websiteId) {
        return Website.findOne({_id: websiteId})
    }

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        website.dateCreated = new Date();
        return Website.create(website);
    }
    
    function updateWebsite(websiteId, website) {
        return Website.update(
            {_id: websiteId},
            {
                $set: {
                    name: website.name,
                    description: website.description
                }
            }
        )
    }
    
    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId})
    }
    
};