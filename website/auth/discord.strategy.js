const passport = require('passport');
const config = require('../config');

const DiscordStrategy = require('passport-discord').Strategy;

const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(new DiscordStrategy({
    clientID: config.oauth.discord.id,
    clientSecret: config.oauth.discord.secret,
    callbackURL: "http://localhost:3000/auth/discord/callback",//"https://luarzito.devluar.com/auth/discord/callback",
    scope: scopes
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile)



        /**
        {
  id: '701953428510736396',
  username: 'devluar',
  avatar: 'a_4fa4f0b7d5b907eaebeb1e68695e006d',
  discriminator: '0',
  public_flags: 4194368,
  flags: 4194368,
  banner: 'a_91b19482ba42c8e6188b10eb0497223a',
  accent_color: 7602176,
  global_name: 'RaulRodrigues',
  avatar_decoration_data: null,
  banner_color: '#740000',
  clan: null,
  mfa_enabled: true,
  locale: 'pt-BR',
  premium_type: 2,
  email: 'raulrodriguesdemoraessteam@gmail.com',
  verified: true,
  provider: 'discord',
  accessToken: 'fuAQMbZ8gltfpb8oVlfhfWb1vfoUcQ',
  guilds: [
    {
      id: '169256939211980800',
      name: 'Discord Town Hall',
      icon: 'b6d536d1332bd67725ca03729348c035',
      banner: 'f1990a1b6d39cecda1805d28739524d5',
      owner: false,
      permissions: 1379328,
      permissions_new: '1266912274484224',
      features: [Array]
    },
    {
      id: '222078108977594368',
      name: 'discord.js - Imagine an app',
      icon: '1ad76bddd2af468c31fdb10cbce63d74',
      banner: '4f20e2ede833993d98b590fb3ab57af8',
      owner: false,
      permissions: 37080128,
      permissions_new: '2181952945114176',
      features: [Array]
    },
    {
      id: '264445053596991498',
      name: 'Top.gg',
      icon: '42ba0bf07d52d398bfbbfa5c7e8899b5',
      banner: 'db498626a91f79b41e25b1aca681b3dd',
      owner: false,
      permissions: 37080640,
      permissions_new: '458363241877056',
      features: [Array]
    },
    {
      id: '603365056578715694',
      name: 'Servidor do Resfriado',
      icon: 'a_ce267f013a9e2b43a45374b4164e224f',
      banner: 'c5a5fd0b78d6d7ccca2c85dcae61dc5d',
      owner: false,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '613425648685547541',
      name: 'Discord Developers',
      icon: 'a_e9948209c5579fb8e9f99ade0dabdfd1',
      banner: 'bb42bdc37653b7cf58c4c8cc622e76cb',
      owner: false,
      permissions: 37080576,
      permissions_new: '1165935481572864',
      features: [Array]
    },
    {
      id: '742068003583295619',
      name: 'Luarzito - SCT',
      icon: '0c6a0e43d5e5fae93490ac6b14ca4d1f',
      banner: null,
      owner: true,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '757308101182357514',
      name: 'Privado Luar Rekcah',
      icon: 'b0b016d05c161402b26969749a0faf88',
      banner: null,
      owner: true,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '819285379982557265',
      name: 'Lanyard',
      icon: 'cdc9672c2a7efcd8cd8f3b8b732d21ab',
      banner: 'da47f944ddbe5b584e7438281fa9ce6a',
      owner: false,
      permissions: 104189505,
      permissions_new: '2221982107422273',
      features: [Array]
    },
    {
      id: '920987652025630730',
      name: 'Asaas',
      icon: '603faa69cb9159f0e2a0d79c6373554b',
      banner: '33fa4022f001cdb6ae0f4c9fc09ce6ad',
      owner: false,
      permissions: 104189505,
      permissions_new: '2222085186637377',
      features: [Array]
    },
    {
      id: '983452978373619814',
      name: 'Future Warriors - CoC',
      icon: 'c03f4664d6ed6dca52f85902e0727577',
      banner: null,
      owner: true,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '991126374632931389',
      name: 'Hellfire Club',
      icon: 'ccfde73c3e0325f0d19128cd548be7f6',
      banner: null,
      owner: false,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '1019817769857990676',
      name: 'DevLuar - A comunidade',
      icon: '309d042cca0285ebe2106b79c0b5638b',
      banner: null,
      owner: true,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '1034197016810623026',
      name: 'COMPATRIOTAS',
      icon: '30b304ce4b14b14256bb1727734a8cce',
      banner: null,
      owner: false,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '1039680136561299476',
      name: 'Servinho dos Renafinhos',
      icon: 'fad9163af26f340e3fbd3f34b27e012b',
      banner: null,
      owner: false,
      permissions: 1178070727,
      permissions_new: '2249574051212999',
      features: []
    },
    {
      id: '1047996507690913823',
      name: '• jamona',
      icon: 'fbc4cfec2ce6a0a3cc54092a39074167',
      banner: null,
      owner: false,
      permissions: 104189505,
      permissions_new: '2222085186637377',
      features: [Array]
    },
    {
      id: '1229129862586044479',
      name: 'Impacto Glorioso',
      icon: 'f0187268c08b1792105695986906e15b',
      banner: null,
      owner: true,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '1253523000825745449',
      name: 'Servidor do Resfriado #500',
      icon: 'a_0634bdfd2009a83abf4be0a63d502e09',
      banner: 'a470c425d3eab5fb224b6013a80c3be7',
      owner: false,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: [Array]
    },
    {
      id: '1261119930762530906',
      name: 'Moonless Test',
      icon: 'f0c4ecbdd11434738d3159d5335d1062',
      banner: null,
      owner: false,
      permissions: 2147483647,
      permissions_new: '2251799813685247',
      features: []
    }
  ],
  fetchedAt: 2024-07-24T22:23:59.907Z
}
         */
        /**
         *  User.findOrCreate({ discordId: profile.id }, function(err, user) {
             return cb(err, user);
         });
         */

        const user = profile;

        return cb(null, user);
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    return done(null, id)
    /**
     *   try {
        const user = findUserById(id);
        done(null, user);
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
     */
});


module.exports = passport;