const express = require('express');
const axios = require('axios'); // Permet d'envoyer des requêtes vers une vraie API
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Votre route qui intercepte la demande de recharge du site
app.post('/api/topup', async (req, res) => {
    const { playerId, diamonds } = req.body;

    try {
        // Exemple de requête vers l'API d'un fournisseur B2B tiers
        const apiResponse = await axios.post('https://api.fournisseur-tiers.com/v1/order', {
            uid: playerId,
            product_id: diamonds,
            apikey: process.env.API_KEY_FOURNISSEUR // Votre clé secrète B2B
        }, {
            headers: { 'Authorization': 'Bearer ' + process.env.API_KEY_FOURNISSEUR }
        });

        res.json({
            success: true,
            message: `Commande validée par le fournisseur pour l'ID ${playerId} !`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur de communication avec l'API du fournisseur."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur de recharge démarré sur le port ${PORT}`);
});
