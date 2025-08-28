/*
  Warnings:

  - You are about to drop the `estudiantes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `matriculas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."matriculas" DROP CONSTRAINT "matriculas_estudiante_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."matriculas" DROP CONSTRAINT "matriculas_materia_id_fkey";

-- DropTable
DROP TABLE "public"."estudiantes";

-- DropTable
DROP TABLE "public"."materias";

-- DropTable
DROP TABLE "public"."matriculas";

-- CreateTable
CREATE TABLE "public"."conferencistas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "cedula" VARCHAR(20) NOT NULL,
    "genero" VARCHAR(20) NOT NULL,
    "ciudad" VARCHAR(20) NOT NULL,
    "direccion" VARCHAR(200) NOT NULL,
    "fecha_nacimiento" VARCHAR(50) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "empresa" VARCHAR(50) NOT NULL,

    CONSTRAINT "conferencistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."auditorios" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "ubicacion" VARCHAR(50) NOT NULL,
    "capacidad" VARCHAR(20) NOT NULL,
    "descripcion" VARCHAR(200),

    CONSTRAINT "auditorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reservas" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "descripcion" VARCHAR(200),
    "conferencista_id" INTEGER NOT NULL,
    "auditorio_id" INTEGER NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."reservas" ADD CONSTRAINT "reservas_conferencista_id_fkey" FOREIGN KEY ("conferencista_id") REFERENCES "public"."conferencistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reservas" ADD CONSTRAINT "reservas_auditorio_id_fkey" FOREIGN KEY ("auditorio_id") REFERENCES "public"."auditorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
