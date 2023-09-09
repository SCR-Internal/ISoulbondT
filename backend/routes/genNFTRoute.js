const express = require('express');
const router = express.Router();
const { generateMint } = require('../controllers/index');

// Mint NFT API
// router.post('/generate/:address', async (req, res, next) => {
//   console.log('generate');
//   try {
//     await generateMint(req, res, next);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Failed to mint NFT.' });
//   }
// });

router.post('/generate/:address', async (req, res, next) => {
  console.log('generate');
  try {
    const result = await generateMint(req, res, next);

    const soulboundFlag = result ? 1 : 0;

    const userId = req.params.address;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      const newUser = new User({
        _id: userId,
        id: userId, 
        picture: req.user.picture,
        socials: [{
          id: userId,
          platform: 'custom', 
          soulbound_flag: soulboundFlag,
        }],
        user_id: req.user.username,
        user_name: req.user.displayName,
      });

      await newUser.save();
      console.log('User Info stored:', newUser);
    } else {
      const socialToUpdate = user.socials.find(social => social.id === userId);
      if (socialToUpdate) {
        socialToUpdate.soulbound_flag = soulboundFlag;
      } else {
        user.socials.push({
          id: userId,
          platform: 'custom', 
          soulbound_flag: soulboundFlag,
        });
      }

      await user.save();
      console.log('User Info updated:', user);
    }

    res.status(200).json({ message: 'NFT minted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to mint NFT.' });
  }
});

module.exports = router;
