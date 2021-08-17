const mongoose = require("mongoose");

const SocialMedia = mongoose.model(
    "SocialMedia",
    new mongoose.Schema({
        twitter_handle: String,
        github_organization_handle: String,
        telegram_handle: String,
        linkedin_company_name: String,
        discord_link: String,
    },
        { timestamps: {} })
);

module.exports = SocialMedia;