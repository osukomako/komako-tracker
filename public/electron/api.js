const axios = require('axios').default
const logger = require('electron-log');
const Store = require('electron-store')
const axiosRetry = require('axios-retry')

axiosRetry(axios, {
    retries: 5,
    retryDelay: (retryCount) => {
        logger.warn(`api request failed, retrying attempt ${retryCount}`)
        return retryCount * 2000
    }
})

const store = new Store();

function logAxiosError(err) {
    if (err && err.response) {
        logger.error({
            message: err.message,
            status: err.response.status,
            data: err.response.data,
            url: err.config && err.config.url
        });
    } else {
        logger.error(err);
    }
}

async function searchPlayers(query) {
    try {
        const response = await axios.get('https://api.komako.pw/search_players', {
            params: { query }
        })
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getPlayerCount() {
    try {
        const response = await axios.get('https://api.komako.pw/get_player_count')
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getPlayerStatus(user_id) {
    try {
        const response = await axios.get('https://api.komako.pw/get_player_status', {
            params: { id: user_id }
        })
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getPlayerMostPlayed(user_id, gamemode) {
    try {
        // gulag API expects integer gamemode
        const gamemodeInt = (gamemode === "osu" ? 0 : gamemode === "relax" ? 4 : gamemode === "taiko" ? 1 : gamemode === "fruits" ? 2 : gamemode === "mania" ? 3 : 0);
        const response = await axios.get('https://api.komako.pw/get_player_most_played', {
            params: { id: user_id, mode: gamemodeInt }
        })
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getMapInfo(map_id) {
    try {
        const response = await axios.get('https://api.komako.pw/get_map_info', {
            params: { id: map_id }
        })
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getMapScores(map_id, gamemode) {
    try {
        // gulag API expects integer gamemode
        const gamemodeInt = (gamemode === "osu" ? 0 : gamemode === "relax" ? 4 : gamemode === "taiko" ? 1 : gamemode === "fruits" ? 2 : gamemode === "mania" ? 3 : 0);
        const response = await axios.get('https://api.komako.pw/get_map_scores', {
            params: { id: map_id, scope: "best", mode: gamemodeInt }
        })
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getScoreInfo(score_id) {
    try {
        const response = await axios.get('https://api.komako.pw/get_score_info', {
            params: { id: score_id }
        })
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getReplay(score_id) {
    try {
        const response = await axios.get('https://api.komako.pw/get_replay', {
            params: { id: score_id }
        })
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getLeaderboard(gamemode, sort) {
    try {
        // gulag API expects integer gamemode
        const gamemodeInt = (gamemode === "osu" ? 0 : gamemode === "relax" ? 4 : gamemode === "taiko" ? 1 : gamemode === "fruits" ? 2 : gamemode === "mania" ? 3 : 0);
        const response = await axios.get('https://api.komako.pw/get_leaderboard', {
            params: { mode: gamemodeInt, sort }
        })
        return response.data
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getScoreRank() {
    const settings = store.get("settings")
    if (!settings) return null
    const { user_id, gamemode } = settings
    // gulag API expects integer gamemode
    const gamemodeInt = (gamemode === "osu" ? 0 : gamemode === "relax" ? 4 : gamemode === "taiko" ? 1 : gamemode === "fruits" ? 2 : gamemode === "mania" ? 3 : 0);
    try {
        const response = await axios.get(`https://api.komako.pw/get_player_scores`, {
            params: {
                id: user_id,
                mode: gamemodeInt,
                scope: "best"
            }
        })
        const scores = response.data
        if (scores && Array.isArray(scores.scores) && scores.scores.length > 0) {
            // Return the best score (first in array)
            return scores.scores[0]
        }
        return null
    } catch (err) {
        logAxiosError(err)
        return null
    }
}

async function getOsuUser() {
    const settings = store.get("settings")
    if (!settings) return null;
    const { user_id, gamemode } = settings
    if (!user_id || isNaN(Number(user_id))) {
        logger.error({ message: "Invalid user_id in settings", user_id })
        return null;
    }
    try {
        const response = await axios.get(`https://api.komako.pw/get_player_info`, {
            params: {
                id: user_id,
                scope: "all"
            }
        })
        const user = response.data
        // If response is null or not successful, log request params for debugging
        if (!user || user.status === "error" || user.status === "fail") {
            logger.error({
                message: "get_player_info returned null or error",
                url: `https://api.komako.pw/get_player_info?id=${user_id}&scope=all`,
                user_id,
                response: user
            })
            return null;
        }
        // gulag API expects integer gamemode
        user.gamemode = (gamemode === "osu" ? 0 : gamemode === "relax" ? 4 : gamemode === "taiko" ? 1 : gamemode === "fruits" ? 2 : gamemode === "mania" ? 3 : 0);
        if (user.player && user.player.info && user.player.info.name) {
            store.set("username", user.player.info.name)
        } else if (user.name) {
            store.set("username", user.name)
        }
        return user
    } catch (err) {
        logAxiosError(err)
        return null
    }
}     

module.exports = {
    // To change API endpoints, edit the URLs in the functions above
    getOsuUser,
    getScoreRank,
    searchPlayers,
    getPlayerCount,
    getPlayerStatus,
    getPlayerMostPlayed,
    getMapInfo,
    getMapScores,
    getScoreInfo,
    getReplay,
    getLeaderboard
}