-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "roleID" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "number" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Track" (
    "trackID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "genreID" INTEGER NOT NULL DEFAULT 1,
    "autorID" INTEGER NOT NULL DEFAULT 1,
    "albumID" INTEGER NOT NULL DEFAULT 1,
    "image" TEXT,
    "price" INTEGER NOT NULL,
    "music" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("trackID")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleID")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cartID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL DEFAULT 1,
    "trackID" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartID")
);

-- CreateTable
CREATE TABLE "Sale" (
    "saleID" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userID" INTEGER NOT NULL DEFAULT 1,
    "trackID" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("saleID")
);

-- CreateTable
CREATE TABLE "Genre" (
    "genreID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genreID")
);

-- CreateTable
CREATE TABLE "Autor" (
    "autorID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("autorID")
);

-- CreateTable
CREATE TABLE "Album" (
    "albumID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("albumID")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("roleID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_genreID_fkey" FOREIGN KEY ("genreID") REFERENCES "Genre"("genreID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_autorID_fkey" FOREIGN KEY ("autorID") REFERENCES "Autor"("autorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumID_fkey" FOREIGN KEY ("albumID") REFERENCES "Album"("albumID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_trackID_fkey" FOREIGN KEY ("trackID") REFERENCES "Track"("trackID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_trackID_fkey" FOREIGN KEY ("trackID") REFERENCES "Track"("trackID") ON DELETE RESTRICT ON UPDATE CASCADE;
