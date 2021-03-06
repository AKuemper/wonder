const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { restoreUser } = require('../../utils/auth');
const { Question, User, Answer } = require('../../db/models');
const { Op, Sequelize } = require('sequelize');

router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({
      include: [Question, User],
    });
    res.json(answers);
  })
);

router.post(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { userId, questionId, answer } = req.body.comment;

    const answerRes = await Answer.create({
      userId,
      questionId,
      answer,
    });

    await answerRes.save();

    res.json(answerRes);
  })
);

module.exports = router;
