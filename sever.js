const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let usersDatabase = {
    "user_ishley": { coins: 500, name: "Ishley" }
};

app.get('/api/balance/:userId', (req, res) => {
    let userId = req.params.userId;
    if (!usersDatabase[userId]) {
        usersDatabase[userId] = { coins: 500, name: "Joueur" };
    }
    res.json({ success: true, coins: usersDatabase[userId].coins });
});

app.post('/api/topup', (req, res) => {
    let { userId, game, packName, coinCost, playerId, paymentMethod } = req.body;

    if (!usersDatabase[userId]) {
        usersDatabase[userId] = { coins: 500, name: "Joueur" };
    }

    let user = usersDatabase[userId];

    if (paymentMethod === 'Coins') {
        if (user.coins < coinCost) {
            return res.json({ success: false, message: "Solde de coins insuffisant ! Veuillez recharger." });
        }
        user.coins -= coinCost;
    }

    res.json({
        success: true,
        message: `Commande validée ! ${packName} envoyé automatiquement pour l'ID ${playerId}.`,
        remainingCoins: user.coins
    });
});

app.listen(PORT, () => {
    console.log(`Serveur GameTopUp démarré sur le port ${PORT}`);
});
