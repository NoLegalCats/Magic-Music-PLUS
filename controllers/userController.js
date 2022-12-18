const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ApiError = require('../error/ApiError');

// Для создания фала JSON
('use strict');
const fs = require('fs');
const { title } = require('process');

class userController {
  // Регистрация
  async Registration(req, res, next) {
    const {name} = req.body;
    const {surname} = req.body;
    const roleID = 4;
    const {login} = req.body;
    const {password} = req.body;
    const {email} = req.body;
    const {number} = req.body;

    // Проверка пользователя
    try {
      const data = await prisma.user.findFirst({
        where: {
          login: login,
          password: password,
        },
      });
      if (data != null) {
        console.log(`Пользователь с такими ${login} ${password} уже существует `);
        return res.json({"message" : `Пользователь с такими данными уже существует`});
      }
    } catch (e) {}

    // Добавление данных в БД
    try {
      const information = await prisma.User.create({
        data: {
          name: name,
          surname: surname,
          roleID: roleID,
          login: login,
          password: password,
          email: email,
          number: number,
        }
      });
      console.log(information);
      console.log(`Пользователь ${name} зарегистирован!`);
      return res.json({"message" : `Пользователь ${name} зарегистрирован!`});
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }



  // Вход
  async Login(req, res, next) {
    const { login } = req.body;
    const { password } = req.body;

    if(login == undefined || password == undefined){
      console.log(`Заполните поля`);
      return res.json({"message" : "Заполните поля"});
    }

    // Проверка пользователя
    try {
      const data = await prisma.user.findFirst({
        where: {
          login: login,
          password: password,
        },
        select: {
          name: true,
          surname: true,
          login: true,
          password: true,
          role: true,
          email: true,
          number: true,
        },
      });
      if (data == null) {
        console.log(`Пользоватиель с ${login} ${password} не найден`);
        return res.json({"message" : "Неверный логин или пароль"});
      } else {
        console.log(data);
        return res.json(data);
      }
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }



  // Добавление сотрудника
  async AddEmployee(req, res, next) {
    const {name} = req.body;
    const {surname} = req.body;
    const {roleID} = req.body;
    const {login} = req.body;
    const {password} = req.body;
    const {email} = req.body;
    const {number} = req.body;

    if (roleID > 4) {
      console.log(`Неверный ID роли ${roleID}`);
      return res.json({"message" : "Неверный ID роли"});
    }

    // Проверка пользователя
    try {
      const data = await prisma.user.findFirstOrThrow({
        where: {
          login: login,
          password: password,
        },
      });
      if (data != null) {
        console.log(`Пользователь с такими ${login} ${password} уже существует `);
        return res.json({"message" : `Пользователь с такими данными уже существует`});
      }
    } catch (e) {}

    // Добавление данных в БД
    try {
      const information = await prisma.user.create({
        data: {
          name: name,
          surname: surname,
          roleID: roleID,
          login: login,
          password: password,
          email: email,
          number: number,
        },
      });
      console.log(information);
      console.log(`Пользователь ${name} добавлен!`);
      return res.json({"message" : `Пользователь ${name} добавлен!`});
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }



  // Изменение пользователя
  async EditUser(req, res, next) {
    const {userID} = req.body;
    const {name} = req.body;
    const {surname} = req.body;
    const {roleID} = req.body;
    const {login} = req.body;
    const {password} = req.body;
    const {email} = req.body;
    const {number} = req.body;

    if (roleID > 4) {
      console.log(`Неверный ID роли ${roleID}`);
      return res.json({"message" : "Неверный ID роли"});
    }

    // Проверка пользователя
    try {
      const data = await prisma.user.findFirstOrThrow({
        where: {
          login: login,
          password: password,
        },
      });
      if (data != null && data.userID != userID) {
        console.log(`Пользователь с такими ${login} ${password} уже существует `);
        return res.json({"message" : `Пользователь с такими данными уже существует`});
      }
    } catch (e) {}

    // Изменение данных в БД
    try {
      const data = await prisma.user.update({
        where: {
          userID: userID,
        },
        data: {
          name: name,
          surname: surname,
          roleID: roleID,
          login: login,
          password: password,
          email: email,
          number: number,
        },
      });
    console.log(data);
    console.log(`Пользоватиель ${name} изменён!`);
    return res.json({"message" : `Пользоватиель ${name} изменён!`});
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new userController();
