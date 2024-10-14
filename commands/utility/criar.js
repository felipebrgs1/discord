"use strict";
const { SlashCommandBuilder } = require("discord.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Registra um usuário no sistema"),
    async execute(interaction) {
        const discordId = interaction.user.id;
        const username = interaction.user.username;
        // Verifica se o usuário já está registrado
        const existingUser = await prisma.user.findUnique({
            where: { discordId },
        });
        if (existingUser) {
            await interaction.reply("Você já está registrado no sistema.");
        }
        else {
            // Cria um novo registro de usuário
            await prisma.user.create({
                data: {
                    discordId,
                    username,
                },
            });
            await interaction.reply("Registro concluído com sucesso!");
        }
    },
};
