const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

// Для создания фала JSON
("use strict");
const fs = require("fs");
const { time } = require("console");
const { title } = require("process");

class trackController {
  // Получение все треков
  async GetAllTrack(req, res, next) {
    try {
      const data = await prisma.track.findMany({
        select: {
          trackID :true,
          title : true,
          genre : true,
          autor : true,
          album : true,
          image : true,
          price : true,
          music : true,
        },
      });
      console.log(data);
      return res.json(data);
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }



  // Сортировка и тп.
  async SortingTrack(req, res, next) {
    var {search} = req.body;
    var {filtering} = req.body;
    var {sorting} = req.body;

    var VariantSorting;

    if (sorting == "Цена ↑") {
      VariantSorting = "asc";
    } else if (sorting == "Цена ↓") {
      VariantSorting = "desc";
    } else {
      VariantSorting = undefined;
    }

    if (filtering == 0){
      try {
        const data = await prisma.track.findMany({
          where: {
            title : {
              contains: search,
            },
          },
          orderBy: {
            price: VariantSorting,
          },
          select: {
            trackID :true,
            title : true,
            genre : true,
            autor : true,
            album : true,
            image : true,
            price : true,
            music : true,
          },
        });
        console.log(data);
        return res.json(data);
      } catch (e) {
        console.log(e.message);
        next(ApiError.badRequest(e.message));
      }
    }
    else{
      try {
        const data = await prisma.track.findMany({
          where: {
            title : {
              contains: search,
            },
            genreID : {
              equals: parseInt(filtering),
            },
          },
          orderBy: {
            price: VariantSorting,
          },
          select: {
            trackID :true,
            title : true,
            genre : true,
            autor : true,
            album : true,
            image : true,
            price : true,
            music : true,
          },
        });
        console.log(data);
        return res.json(data);
      } catch (e) {
        console.log(e.message);
        next(ApiError.badRequest(e.message));
      }
    }
  }



  // Получение Жанров
  async GetGenre(req, res, next) {
    try {
      const data = await prisma.genre.findMany();
      console.log(data);
      return res.json(data);
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
  // Получение Авторов
  async GetAutor(req, res, next) {
    try {
      const data = await prisma.autor.findMany();
      console.log(data);
      return res.json(data);
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
  // Получение Альбомов
  async GetAlbum(req, res, next) {
    try {
      const data = await prisma.album.findMany();
      console.log(data);
      return res.json(data);
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  // Установка Жанров
  async PostGenre(req, res, next) {
    const {title} = req.body;
    try {
      const data = await prisma.genre.create({
        data: {
          title : title,
        },
      });
      console.log(data);
      return res.json({"message" : `Добавлено!`});
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
  // Установка Авторов
  async PostAutor(req, res, next) {
    const {title} = req.body;
    try {
      const data = await prisma.autor.create({
        data: {
          title : title,
        },
      });
      console.log(data);
      return res.json({"message" : `Добавлено!`});
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
  // Установка Альбомов
  async PostAlbum(req, res, next) {
    const {title} = req.body;

    try {
      const data = await prisma.album.create({
        data: {
          title : title,
        },
      });
      console.log(data);
      return res.json({"message" : `Добавлено!`});
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }



  // Добавление трека
  async AddTrack(req, res, next) {
    const { title } = req.body;
    const { genreID } = req.body;
    const { autorID } = req.body;
    const { albumID } = req.body;
    var pathImage = path.resolve(__dirname, "..", "..", "files", uuid.v4() + ".png");
    const { price } = req.body;
    var pathMusic = path.resolve(__dirname, "..", "..", "files", uuid.v4() + ".mp3");

    // Создание картинки
    try {
      const image = req.files.image;
      image.mv(pathImage);
      console.log(`Файл по пути ${pathImage} создан`);
    } catch (e) {
      pathImage = null;
      console.log("Нет файла картинки");
    }

    // Создание музыки
    try {
      const music = req.files.music;
      music.mv(pathMusic);
      console.log(`Файл по пути ${pathMusic} создан`);
    } catch (e) {
      pathMusic = null;
      console.log("Нет файла музыки");
    }

    // Добавление данных в БД
    try {
      const information = await prisma.track.create({
        data: {
          title: title,
          genreID: parseInt(genreID),
          autorID: parseInt(autorID),
          albumID: parseInt(albumID),
          image: pathImage,
          price: parseInt(price),
          music: pathMusic,
        },
      });
      console.log(information);
      return res.json({"message" : `Трек ${title} добавлен!`});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
    console.log(information);
    return res.json(information);
  }



  // Изменение трека
  async UpdateInfoTrack(req, res, next) {
    const { trackID } = req.body;
    const { title } = req.body;
    const { genreID } = req.body;
    const { autorID } = req.body;
    const { albumID } = req.body;
    var pathImage = path.resolve(__dirname, "..", "..", "files", uuid.v4() + ".jpg");
    const { price } = req.body;
    var pathMusic = path.resolve(__dirname, "..", "..", "files", uuid.v4() + ".mp3");

    // Создание картинки
    try {
      const image = req.files.image;
      image.mv(pathImage);
      console.log(`Файл по пути ${pathImage} создан`);
    } catch (e) {
      pathImage = null;
      console.log("Нет файла картинки");
    }

    // Создание музыки
    try {
      const music = req.files.music;
      music.mv(pathMusic);
      console.log(`Файл по пути ${pathMusic} создан`);
    } catch (e) {
      pathMusic = null;
      console.log("Нет файла музыки");
    }

    try {
      const data = await prisma.track.update({
        where: {
          trackID: parseInt(trackID),
        },
        data: {
          title : title,
          genreID: parseInt(genreID),
          autorID: parseInt(autorID),
          albumID: parseInt(albumID),
          image : pathImage,
          price: parseInt(price),
          music : pathMusic,
        },
      });
      console.log(data);
      return res.json({"message" : `Трек ${title} изменён!`});
    } catch (e) {
      console.log(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new trackController();
