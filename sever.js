const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Solde de pièces virtuel actuel (vous pouvez modifier ce chiffre ici pour changer votre solde)
let userCoins = 7212;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route pour traiter la recharge
app.post('/api/topup', (req, res) => {
    const { playerId, diamonds } = req.body;

    if (!playerId) {
        return res.status(400).json({ success: false, message: "ID de joueur manquant !" });
    }

    console.log(`Recharge demandée pour l'ID: ${playerId} - Quantité: ${diamonds} diamants`);

    // Simulation de déduction ou de mise à jour des pièces si nécessaire
    // (Par exemple, on valide la transaction avec succès)
    
    res.json({
        success: true,
        message: `Recharge de ${diamonds} diamants réussie pour l'ID ${playerId} !`,
        remainingCoins: userCoins
    });
});

// Route pour recharger vos pièces de test si besoin (ex: allez sur /api/reset-coins dans votre navigateur)
app.get('/api/reset-coins', (req, res) => {
    userCoins = 7212;
    res.send(`Solde réinitialisé avec succès à ${userCoins} pièces !`);
});

app.listen(PORT, () => {
    console.log(`FlashTopUp démarré sur le port ${PORT}`);
});

