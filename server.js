// const app = require("express")();
// const stripe = require("stripe")("sk_test_H2dtm0IRthuoCnAidmM1RHEU");
// var bodyParser = require('body-parser');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// app.route("/charge")
// .post( async (req, res) => {
//     try {
//         let {status} = await stripe.charges.create({
//             amount: 2000,
//             currency: "usd",
//             description: "An example charge",
//             source: req.body.id
//         });
//         res.json({status});
//     } catch (err) {
//         console.warn(err);
//         res.status(500).end();
//     }
// });
//
// app.listen(9500, () => console.log("Listening on port 9500"));

const app = require("express")();
const stripe = require("stripe")("sk_test_H2dtm0IRthuoCnAidmM1RHEU");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/charge", async (req, res) => {
    try {
        let {status} = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example charge",
            source: 'tok_visa'
        });

        res.json({status});
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

app.listen(9500, () => console.log("Listening on port 9500"));


