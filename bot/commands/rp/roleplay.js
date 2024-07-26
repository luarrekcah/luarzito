const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { incrementFriendshipPoints } = require('../../utils/roleplay');

const roleplays = [
	{
		name: 'airkiss',
		description: 'Mande um beijo no ar para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=airkiss',
		title: ':kiss: Beijo no ar! :kiss:',
		action: "mandou um beijo no ar para"
	},
	{
		name: 'angrystare',
		description: 'Dê um olhar de raiva para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=angrystare',
		title: ':angry: Olhar de raiva! :angry:',
		action: "olhou com raiva para"
	},
	{
		name: 'bite',
		description: 'Morda alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=bite',
		title: ':bite: Mordida! :bite:',
		action: "mordeu"
	},
	{
		name: 'blush',
		description: 'Fique envergonhado(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=blush',
		title: ':blush: Envergonhado(a)! :blush:',
		action: "ficou envergonhado(a) com"
	},
	{
		name: 'brofist',
		description: 'Dê um soquinho de camaradagem!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=brofist',
		title: ':punch: Soquinho! :punch:',
		action: "deu um soquinho camarada com"
	},
	{
		name: 'cheers',
		description: 'Brinde com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=cheers',
		title: ':clinking_glasses: Saúde! :clinking_glasses:',
		action: "brindou com"
	},
	{
		name: 'clap',
		description: 'Aplauda alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=clap',
		title: ':clap: Aplausos! :clap:',
		action: "aplaudiu"
	},
	{
		name: 'cry',
		description: 'Chore com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=cry',
		title: ':cry: Chorando! :cry:',
		action: "está chorando com"
	},
	{
		name: 'cuddle',
		description: 'Faça carinho em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=cuddle',
		title: ':hugging: Abraço aconchegante! :hugging:',
		action: "fez carinho em"
	},
	{
		name: 'dance',
		description: 'Dance com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=dance',
		title: ':dancer: Dançando! :dancer:',
		action: "dançou com"
	},
	{
		name: 'hug',
		description: 'Dê um abraço em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=hug',
		title: ':hugs: Abraço! :hugs:',
		action: "abraçou"
	},
	{
		name: 'kiss',
		description: 'Dê um beijo em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=kiss',
		title: ':kiss: Beijo! :kiss:',
		action: "beijou"
	},
	{
		name: 'laugh',
		description: 'Ria de alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=laugh',
		title: ':laughing: Rindo! :laughing:',
		action: "riu de"
	},
	{
		name: 'love',
		description: 'Mostre amor por alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=love',
		title: ':heart: Amor! :heart:',
		action: "mostrou afeto por"
	},
	{
		name: 'mad',
		description: 'Fique bravo(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=mad',
		title: ':rage: Bravo(a)! :rage:',
		action: "ficou bravo com"
	},
	{
		name: 'no',
		description: 'Diga não para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=no',
		title: ':no_entry_sign: Não! :no_entry_sign:',
		action: "disse não para"
	},
	{
		name: 'nuzzle',
		description: 'Acaricie alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=nuzzle',
		title: ':relaxed: Carinho! :relaxed:',
		action: "acariciou"
	},
	{
		name: 'pat',
		description: 'Faça cafuné em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=pat',
		title: ':sparkling_heart: Owwwn cafunézinho :sparkling_heart:',
		action: "fez cafuné em"
	},
	{
		name: 'poke',
		description: 'Cutuca alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=poke',
		title: ':point_right: Cutucada! :point_right:',
		action: "cutucou"
	},
	{
		name: 'punch',
		description: 'Dê um soco em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=punch',
		title: ':facepunch: Soco! :facepunch:',
		action: "socou"
	},
	{
		name: 'sad',
		description: 'Fique triste com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=sad',
		title: ':crying_cat_face: Triste! :crying_cat_face:',
		action: "ficou triste com"
	},
	{
		name: 'scared',
		description: 'Fique assustado(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=scared',
		title: ':fearful: Assustado(a)! :fearful:',
		action: "se assustou com"
	},
	{
		name: 'shout',
		description: 'Grite com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=shout',
		title: ':shouting: Gritando! :shouting:',
		action: "gritou com"
	},
	{
		name: 'slap',
		description: 'Dê um tapa em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=slap',
		title: ':raised_hand: Tapa! :raised_hand:',
		action: "tapeou"
	},
	{
		name: 'wink',
		description: 'Pisque para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=wink',
		title: ':wink: Piscadinha! :wink:',
		action: "piscou para"
	}
];

const commandBuilder = new SlashCommandBuilder()
	.setName('roleplay')
	.setDescription('Faça um RP super legal!');

roleplays.forEach(rp => {
	commandBuilder.addSubcommand((subcommand) =>
		subcommand
			.setName(rp.name)
			.setDescription(rp.description)
			.addUserOption((option) =>
				option
					.setName('usuario')
					.setDescription('Selecine quem você deseja fazer roleplay.')
					.setRequired(true),
			)
	);
});

module.exports = {
	data: commandBuilder,
	async execute(interaction) {

		const { client } = interaction;
		const { config } = client;

		const user = interaction.options.getMember('usuario');

		if (user.user.id === interaction.user.id) {
			return interaction.reply({
				content: 'Você não pode interagir com si mesmo.',
			});
		}

		if (user.user.bot) {
			return interaction.reply({
				content: 'Você não pode interagir com um bot.',
			});
		}

		const friendshipID = Number(user.user.id) + Number(interaction.user.id);
		const pointsTotal = await incrementFriendshipPoints(friendshipID);

		const subcomando = interaction.options.getSubcommand();
		const roleplay = roleplays.find(rp => rp.name === subcomando);

		if (roleplay) {
			const gif = await fetch(roleplay.apiUrl).then((response) => response.json());

			const embed = new EmbedBuilder()
				.setColor(config.botConfig.themeColor)
				.setTitle(roleplay.title)
				.setImage(gif.url)
				.setFooter({
					text: `Pontos de amizade: ${Number(pointsTotal)}`,
				});

			interaction.reply({
				content: `<@${interaction.user.id}> ${roleplay.action.toLowerCase()} <@${user.user.id}>`,
				embeds: [embed],
			});
		} else {
			interaction.reply({
				content: 'Ocorreu um erro.',
			});
		}
	},
};
