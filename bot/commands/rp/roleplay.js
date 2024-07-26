const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { incrementFriendshipPoints } = require('../../utils/roleplay');

const roleplays = [
	{
		name: 'airkiss',
		description: 'Mande um beijo no ar para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=airkiss',
		title: ':kiss: Beijo no ar! :kiss:'
	},
	{
		name: 'angrystare',
		description: 'Dê um olhar de raiva para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=angrystare',
		title: ':angry: Olhar de raiva! :angry:'
	},
	{
		name: 'bite',
		description: 'Morda alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=bite',
		title: ':bite: Mordida! :bite:'
	},
	{
		name: 'bleh',
		description: 'Faça uma careta para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=bleh',
		title: ':stuck_out_tongue: Bleh! :stuck_out_tongue:'
	},
	{
		name: 'blush',
		description: 'Fique envergonhado(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=blush',
		title: ':blush: Envegonhado(a)! :blush:'
	},
	{
		name: 'brofist',
		description: 'Dê um soquinho de camaradagem!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=brofist',
		title: ':punch: Soquinho! :punch:'
	},
	{
		name: 'celebrate',
		description: 'Celebre com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=celebrate',
		title: ':tada: Celebrando! :tada:'
	},
	{
		name: 'cheers',
		description: 'Brinde com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=cheers',
		title: ':clinking_glasses: Saúde! :clinking_glasses:'
	},
	{
		name: 'clap',
		description: 'Aplauda alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=clap',
		title: ':clap: Aplausos! :clap:'
	},
	{
		name: 'confused',
		description: 'Fique confuso(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=confused',
		title: ':confused: Confuso(a)! :confused:'
	},
	{
		name: 'cool',
		description: 'Mostre que você é descolado(a)!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=cool',
		title: ':sunglasses: Descolado(a)! :sunglasses:'
	},
	{
		name: 'cry',
		description: 'Chore com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=cry',
		title: ':cry: Chorando! :cry:'
	},
	{
		name: 'cuddle',
		description: 'Faça carinho em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=cuddle',
		title: ':hugging: Abraço aconchegante! :hugging:'
	},
	{
		name: 'dance',
		description: 'Dance com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=dance',
		title: ':dancer: Dançando! :dancer:'
	},
	{
		name: 'drool',
		description: 'Babe por alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=drool',
		title: ':drooling_face: Babando! :drooling_face:'
	},
	{
		name: 'evillaugh',
		description: 'Dê uma risada maligna!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=evillaugh',
		title: ':smiling_imp: Risada maligna! :smiling_imp:'
	},
	{
		name: 'facepalm',
		description: 'Dê um gesto de decepção!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=facepalm',
		title: ':man_facepalming: Decepcionante... :woman_facepalming:'
	},
	{
		name: 'handhold',
		description: 'Segure a mão de alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=handhold',
		title: ':handshake: Mãos dadas! :handshake:'
	},
	{
		name: 'happy',
		description: 'Fique feliz com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=happy',
		title: ':smiley: Feliz! :smiley:'
	},
	{
		name: 'headbang',
		description: 'Batendo a cabeça com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=headbang',
		title: ':metal: AHHHH! VOCÊ ME DEIXA LOUCO(A) :metal:'
	},
	{
		name: 'hug',
		description: 'Dê um abraço em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=hug',
		title: ':hugs: Abraço! :hugs:'
	},
	{
		name: 'kiss',
		description: 'Dê um beijo em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=kiss',
		title: ':kiss: Beijo! :kiss:'
	},
	{
		name: 'laugh',
		description: 'Ria de alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=laugh',
		title: ':laughing: Rindo! :laughing:'
	},
	{
		name: 'lick',
		description: 'Lamba alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=lick',
		title: ':tongue: Lambida! :tongue:'
	},
	{
		name: 'love',
		description: 'Mostre amor por alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=love',
		title: ':heart: Amor! :heart:'
	},
	{
		name: 'mad',
		description: 'Fique bravo(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=mad',
		title: ':rage: Bravo(a)! :rage:'
	},
	{
		name: 'nervous',
		description: 'Fique nervoso(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=nervous',
		title: ':grimacing: Nervoso(a)! :grimacing:'
	},
	{
		name: 'no',
		description: 'Diga não para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=no',
		title: ':no_entry_sign: Não! :no_entry_sign:'
	},
	{
		name: 'nom',
		description: 'Coma algo com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=nom',
		title: ':yum: Nom Nom! :yum:'
	},
	{
		name: 'nosebleed',
		description: 'Tenha um sangramento nasal!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=nosebleed',
		title: ':nose: Sangramento nasal! :nose:'
	},
	{
		name: 'nuzzle',
		description: 'Acaricie alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=nuzzle',
		title: ':relaxed: Carinho! :relaxed:'
	},
	{
		name: 'nyah',
		description: 'Faça um som de gatinho para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=nyah',
		title: ':cat: Nyah! :cat:'
	},
	{
		name: 'pat',
		description: 'Faça cafuné em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=pat',
		title: ':sparkling_heart: Owwwn cafunézinho :sparkling_heart:'
	},
	{
		name: 'peek',
		description: 'Dê uma espiada em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=peek',
		title: ':eyes: Espiadinha! :eyes:'
	},
	{
		name: 'pinch',
		description: 'Belisque alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=pinch',
		title: ':pinching_hand: Beliscão! :pinching_hand:'
	},
	{
		name: 'poke',
		description: 'Cutuca alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=poke',
		title: ':point_right: Cutucada! :point_right:'
	},
	{
		name: 'pout',
		description: 'Faça beicinho para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=pout',
		title: ':pouting_cat: Beicinho! :pouting_cat:'
	},
	{
		name: 'punch',
		description: 'Dê um soco em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=punch',
		title: ':facepunch: Soco! :facepunch:'
	},
	{
		name: 'run',
		description: 'Corra com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=run',
		title: ':running: Correndo! :running:'
	},
	{
		name: 'sad',
		description: 'Fique triste com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=sad',
		title: ':crying_cat_face: Triste! :crying_cat_face:'
	},
	{
		name: 'scared',
		description: 'Fique assustado(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=scared',
		title: ':fearful: Assustado(a)! :fearful:'
	},
	{
		name: 'shout',
		description: 'Grite com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=shout',
		title: ':shouting: Gritando! :shouting:'
	},
	{
		name: 'shrug',
		description: 'Dê de ombros para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=shrug',
		title: ':shrug: Dando de ombros! :shrug:'
	},
	{
		name: 'shy',
		description: 'Fique tímido(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=shy',
		title: ':flushed: Tímido(a)! :flushed:'
	},
	{
		name: 'slap',
		description: 'Dê um tapa em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=slap',
		title: ':raised_hand: Tapa! :raised_hand:'
	},
	{
		name: 'slowclap',
		description: 'Dê uma salva de palmas lenta!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=slowclap',
		title: ':clap: Palmas lentas! :clap:'
	},
	{
		name: 'smack',
		description: 'Dê uma palmada em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=smack',
		title: ':raised_back_of_hand: Palmada! :raised_back_of_hand:'
	},
	{
		name: 'smile',
		description: 'Sorria para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=smile',
		title: ':smile: Sorrindo! :smile:'
	},
	{
		name: 'sorry',
		description: 'Peça desculpas a alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=sorry',
		title: ':pleading_face: Desculpa! :pleading_face:'
	},
	{
		name: 'stare',
		description: 'Encare alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=stare',
		title: ':eyes: Encarando! :eyes:'
	},
	{
		name: 'stop',
		description: 'Pare alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=stop',
		title: ':raised_hand: Parando! :raised_hand:'
	},
	{
		name: 'surprised',
		description: 'Fique surpreso(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=surprised',
		title: ':astonished: Surpreso(a)! :astonished:'
	},
	{
		name: 'thumbsup',
		description: 'Dê um joinha para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=thumbsup',
		title: ':+1: Joinha! :+1:'
	},
	{
		name: 'tickle',
		description: 'Faça cócegas em alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=tickle',
		title: ':laughing: Cócegas! :laughing:'
	},
	{
		name: 'wave',
		description: 'Dê um tchauzinho para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=wave',
		title: ':wave: Tchauzinho! :wave:'
	},
	{
		name: 'wink',
		description: 'Pisque para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=wink',
		title: ':wink: Piscadinha! :wink:'
	},
	{
		name: 'woah',
		description: 'Fique impressionado(a) com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=woah',
		title: ':open_mouth: Impressionado(a)! :open_mouth:'
	},
	{
		name: 'yawn',
		description: 'Boceje com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=yawn',
		title: ':yawning_face: Bocejando! :yawning_face:'
	},
	{
		name: 'yay',
		description: 'Celebre com alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=yay',
		title: ':partying_face: Yay! :partying_face:'
	},
	{
		name: 'yes',
		description: 'Diga sim para alguém!',
		apiUrl: 'https://api.otakugifs.xyz/gif?reaction=yes',
		title: ':white_check_mark: Sim! :white_check_mark:'
	}
];

const commandBuilder = new SlashCommandBuilder()
	.setName('roleplay')
	.setDescription('Faça um RP super legal! + de 60 RPs');

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
				content: `<@${interaction.user.id}> ${roleplay.description.toLowerCase()} <@${user.user.id}>`,
				embeds: [embed],
			});
		} else {
			interaction.reply({
				content: 'Ocorreu um erro.',
			});
		}
	},
};
