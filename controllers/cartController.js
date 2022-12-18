const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ApiError = require('../error/ApiError');

// Для создания фала JSON
('use strict');
const fs = require('fs');

class cartController {
  // Добавление в корзину
  async AddTrack(req, res, next) {
    const { userID } = req.body;
    const { trackID } = req.body;

    // Проверка пользователя
    try {
      const data = await prisma.cart.findFirst({
        where: {
          userID: parseInt(userID),
          trackID: parseInt(trackID),
        },
      });
      if(data != null){
        console.log(`Товар с ID ${trackID} уже в корзине пользвателя ID ${userID}`);
      return res.json({"message" : `Товар уже находится в корзине`});
      }
    } catch (e) {}

    // Добавление данных в БД
    try {
      const information = await prisma.cart.create({
        data: {
          userID: parseInt(userID),
          trackID: parseInt(trackID),
          
        },
      });
      console.log(information);
      console.log(`Трек ${trackID} добавлен в корзину пользователя ${userID}`);
      return res.json({"message" : "Трек добавлен в корзину"});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }



  // Корзина пользователя
  async GetAllTrack(req, res, next) {
    const { userID } = req.body;

    try {
      const data = await prisma.cart.findMany({
        where: {
          userID: parseInt(userID),
        },
        select: {
          user: true,
          track: true,
        }
      });
      if (data == null) {
        console.log(`Корзина пользователя ${userID} пуста`);
        return res.json({"message" : 'Корзина пользователя пуста'});
      } else {
        console.log(data);
        return res.json(data);
      }
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }



  // Купить товар
  async BuyTrack(req, res, next) {
    const { userID } = req.body;
    const { trackID } = req.body;

    // Проверка
    try {
      var cartInfo = await prisma.cart.findFirst({
        where: {
          userID: parseInt(userID),
          trackID : parseInt(trackID),
        },
      });
      if(cartInfo == null)
      {
        console.log(`Товар ${trackID} не найден в корзине пользователя ${userID}`);
        return res.json({"message" : 'Товар в корзине не найден'});
      }
    } catch (e) {}

    // Перенос данных в купленное
    try {
    const data = await prisma.sale.createMany({
      data: [{
        userID : cartInfo.userID,
        trackID : cartInfo.trackID,
        date : new Date(),
      }]
    })
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }

    // Удаленние данных из таблицы
    try {
    const data = await prisma.cart.deleteMany({
      where: {
        userID : cartInfo.userID,
        trackID : parseInt(trackID),
      }
    })
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }

    console.log(`Пользователь ${cartInfo.userID} купил товар`);
    return res.json({"message" : 'Товар успешно куплен'});
  }



  // Убрать товар из корзины
  async DeleteTrack(req, res, next) {
    const { userID } = req.body;
    const { trackID } = req.body;

    // Проверка
    try {
      var cartInfo = await prisma.cart.findFirst({
        where: {
          userID: parseInt(userID),
          trackID : parseInt(trackID),
        },
      });
      if(cartInfo == null)
      {
        console.log(`Товар ${trackID} не найден в корзине пользователя ${userID}`);
        return res.json({"message" : 'Товар в корзине не найден'});
      }
    } catch (e) {}

    try {
    const data = await prisma.cart.deleteMany({
      where: {
        userID : parseInt(userID),
        trackID : parseInt(trackID),
      }
    })
      console.log(`Товар с ID ${trackID} убран из корзины пользвателя ID ${userID}`);
      return res.json({"message" : 'Товар убран из корзины'});
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }



  // Получить информацию о продажах
  async GetInfoSales(req, res, next) {

    try {
      const data = await prisma.sale.findMany();
      console.log(data);
      return res.json(data);
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new cartController();
