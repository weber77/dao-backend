const mongoose = require("mongoose");

const DAO = mongoose.model(
    "DAO",
    new mongoose.Schema({
        full_name: String,
        description: String,
        date_founded: Date,
        date_created: Date, // date made on DAOggregate
        logo_link: String,
        category: {
            type: String, default: "",
            enum: [
                "Protocol",
                "Service",
                "Grant",
                "Media",
                "Social",
                "Investment",
                "Platform",
                "Collector"
            ]
        },
        governance_token_name: String,
        governance_token_symbol: String,
        dao_structure: {
            type: String, default: "",
            enum: [
                "shares",
                "gov_token",
                "tbd",
            ]
        },
        voting_process: String, // explain how voting process works
        TVL: Number, // total value locked, enntered i but should be pulled from a protocol
        tech_stack: String,
        notes: String,
        blockchain: {
            type: String, default: "",
            enum: [
                "Ethereum",
                "Polygon",
                "Binance_Smart_Chain",
                "Harmony",
                "Solana",
                "Algorand",
                "Stellar",
                "NEAR",
                "IBM_Blockchain",
                "Hyperledger_Fabric",
                "Tezos",
                "EOSIO",
                "Waves",
                "Ripple",
            ]
        },
        headquarters: String, // Was specified as Location -- Revisit <====
        social_media: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "SocialMedia"
        },],
        AUM: Number,
        numTwitterFollowers: Number,
        website_link: String,
        


    },
        { timestamps: {} })
);

module.exports = DAO;