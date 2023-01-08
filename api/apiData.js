const apiData = {
    pl: {
        leagues: require('./pl/leagues.json'),
        matches: [
            require('./pl/ekstraklasa.json'),
            require('./pl/1liga.json')
        ],
        tables: [
            require('./pl/ekstraklasaTable.json'),
            require('./pl/1ligaTable.json')
        ],
        scorers: [
            require('./pl/ekstraklasaTopscorers.json'),
            require('./pl/1ligaTopscorers.json')
        ]
    },
    de: {
        leagues: require('./de/leagues.json'),
        matches: [
            require('./de/bundesliga.json'),
            require('./de/2bundesliga.json')
        ],
        tables: [
            require('./de/bundesligaTable.json'),
            require('./de/2bundesligaTable.json')
        ],
        scorers: [
            require('./de/bundesligaTopscorers.json'),
            require('./de/2bundesligaTopscorers.json')
        ]
    },
    es: {
        leagues: require('./es/leagues.json'),
        matches: [
            require('./es/laliga.json'),
            require('./es/segundadivision.json')
        ],
        tables: [
            require('./es/laligaTable.json'),
            require('./es/segundadivisionTable.json')
        ],
        scorers: [
            require('./es/laligaTopscorers.json'),
            require('./es/segundadivisionTopscorers.json')
        ]
    },
    it: {
        leagues: require('./it/leagues.json'),
        matches: [
            require('./it/seriea.json'),
            require('./it/serieb.json')
        ],
        tables: [
            require('./it/serieaTable.json'),
            require('./it/seriebTable.json')
        ],
        scorers: [
            require('./it/serieaTopscorers.json'),
            require('./it/seriebTopscorers.json')
        ]
    },
    gb: {
        leagues: require('./gb/leagues.json'),
        matches: [
            require('./gb/premierleague.json'),
            require('./gb/premiership.json')
        ],
        tables: [
            require('./gb/premierleagueTable.json'),
            require('./gb/premiershipTable.json')
        ],
        scorers: [
            require('./gb/premierleagueTopscorers.json'),
            require('./gb/premiershipTopscorers.json')
        ]
    }
};

export default apiData;
