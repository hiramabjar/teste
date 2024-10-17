export const environment = {
  production: true,
  url: 'https://apiaugustinopolis.evolucao-sistemas.info/sigahapi',
  urlIntercept: '/sigahapi/oauth/token',

  tokenWhitelistedDomains: [ new RegExp('apiaugustinopolis.evolucao-sistemas.info'), ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};



// 66.94.109.3 - treinamento - CONTABO
// 185.237.253.93 - Apore - CONTABO
// 85.31.231.100 - serranopolis - hostinger
// 89.117.76.196 - sao francisco - CONTABO EUA
// 195.35.17.82 - aruana - hostinger
// 89.116.186.20 - bom jardim - hostinger
