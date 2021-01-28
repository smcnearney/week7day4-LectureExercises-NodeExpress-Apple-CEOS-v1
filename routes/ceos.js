const express = require('express'),
    router = express.Router();

const ceosModel = require('../db');


router.get('/', (req, res) => {
    console.log(ceosModel);
    res.render ('template', {
       locals: {
           title: "List of Apple CEOs",
           data: ceosModel
       },
       partials: {
           body: 'partials/ceo-list',
       },

   })
});

router.get('/:slug', (req, res) => {
    const { slug } = req.params;
    const executive = ceosModel.find((executive) => {
        if (executive.slug === slug) {
            return executive;
        }
    })
    if (executive) {
        res.render ('template', {
            locals: {
                title: "An Apple CEO",
                executive: executive //could just be written as 'executive'
            },
            partials: {
                body: 'partials/ceo-details',
            },
    });
    }else {
        res.status(404).send(`No CEO found that matches slug ${slug}`);
    }
});
    

module.exports = router;