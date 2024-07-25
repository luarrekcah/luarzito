const guildAccess = () => async (req, res, next) => {
    try {
        const id = req.params.ID; // Certifique-se de usar o nome correto do parâmetro
        const selectedGuild = req.user.guilds.find(guild => guild.id === id);

        // Verifique se o servidor foi encontrado e se o usuário é dono ou administrador
        if (selectedGuild && (selectedGuild.owner || selectedGuild.permissions === 2147483647)) {
            console.log(selectedGuild); // Para depuração
            return next(); // Usuário tem acesso, continue para a próxima etapa
        } else {
            return res.redirect("/"); // Usuário não tem acesso, redirecionar para a página inicial
        }
    } catch (error) {
        console.error('Error in guildAccess middleware:', error); // Adicione logging detalhado para depuração
        return res.redirect("/"); // Em caso de erro, redirecionar para a página inicial
    }
};

module.exports = guildAccess;
