const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware pour lire les données JSON envoyées par le site
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques du dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route pour traiter la recharge lorsqu'un utilisateur clique sur Valider
app.post('/api/topup', (req, res) => {
    const { playerId, diamonds } = req.body;

    if (!playerId) {
        return res.status(400).json({ success: false, message: "ID de joueur manquant !" });
    }

    // Simulation de la validation avec les serveurs de Free Fire
    console.log(`Traitement de la recharge pour l'ID: ${playerId} - Quantité: ${diamonds} diamants`);

    // On renvoie une réponse positive avec un message de succès
    res.json({
        success: true,
        message: `Recharge de ${diamonds} diamants réussie pour l'ID ${playerId} !`,
        remainingCoins: 7212 // Vous pouvez ajuster ou lier à une base de données
    });
});

app.listen(PORT, () => {
    console.log(`FlashTopUp démarré sur le port ${PORT}`);
});

