const express = require('express')

const mongoDAO = require('../db/mongoDAO')

const router = express.Router()

router.get("/shorturl/:short_url",mongoDAO.getShortUrl);
router.post("/shorturl/new",mongoDAO.createShortUrl );
router.get('/urls', mongoDAO.getAllUrls);
router.get('/clearDirtyData',mongoDAO.deleteDirtyData);


module.exports = router