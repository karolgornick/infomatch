const apiData = {
    pl: {
        leagues: require('./pl/leagues.json'),
        matches: [
            require('./pl/ekstraklasa.json'),
            require('./pl/1liga.json')
        ]
    },
    de: {
        leagues: require('./de/leagues.json'),
        matches: [
            require('./de/bundesliga.json'),
            require('./de/2bundesliga.json')
        ]
    },
    es: {
        leagues: require('./es/leagues.json'),
        matches: [
            require('./es/laliga.json'),
            require('./es/segundadivision.json')
        ]
    },
    it: {
        leagues: require('./it/leagues.json'),
        matches: [
            require('./it/seriea.json'),
            require('./it/serieb.json')
        ]
    },
    gb: {
        leagues: require('./gb/leagues.json'),
        matches: [
            require('./gb/premierleague.json'),
            require('./gb/premiership.json')
        ]
    },
    matches: '',
    users: require('./users.json'),
};

export default apiData;
