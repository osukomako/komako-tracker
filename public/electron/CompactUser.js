const { GetLevelPrecise } = require("./levelCalc.js")

class CompactUser {
    constructor(user, scoreRank) {
        this.date = new Date
        // gulag API expects integer gamemode
    this.gamemode = user.gamemode
    this.user_id = user?.player?.info?.id
    this.avatar_url = null // not present in komako response
    this.username = user?.player?.info?.name
    this.cover_url = null // not present in komako response
        const mode = String(this.gamemode ?? 0)
        this.rank = user?.player?.stats?.[mode]?.rank
        this.global_rank = user?.player?.stats?.[mode]?.rank
        this.follower_count = user?.player?.info.followers
        this.pp = user?.player?.stats?.[mode]?.pp
        this.ranked_score = user?.player?.stats?.[mode]?.rscore
        this.total_score = user?.player?.stats?.[mode]?.tscore
        this.level = user?.player?.stats?.[mode]?.levels?.current_level
        this.accuracy = user?.player?.stats?.[mode]?.acc
        this.play_count = user?.player?.stats?.[mode]?.plays
        this.play_time = user?.player?.stats?.[mode]?.playtime
        this.total_hits = user?.player?.stats?.[mode]?.total_hits
        this.maximum_combo = user?.player?.stats?.[mode]?.max_combo
        this.replays_watched_by_others = user?.player?.stats?.[mode]?.replay_views
        this.ss_count = user?.player?.stats?.[mode]?.x_count
        this.ssh_count = user?.player?.stats?.[mode]?.xh_count
        this.sh_count = user?.player?.stats?.[mode]?.sh_count
        this.s_count = user?.player?.stats?.[mode]?.s_count
        this.a_count = user?.player?.stats?.[mode]?.a_count
        this.country_rank = user?.player?.stats?.[mode]?.country_rank
        // Derived/calculated fields
        this.total_ss = (this.ssh_count ?? 0) + (this.ss_count ?? 0)
        this.total_s = (this.sh_count ?? 0) + (this.s_count ?? 0)
        this.clears = (this.total_ss ?? 0) + (this.total_s ?? 0) + (this.a_count ?? 0)
        this.medal_count = 0 // not present
        this.badge_count = 0 // not present
        this.tscore_per_play = (this.tscore ?? 0) / (this.plays ?? 1)
        this.rscore_per_play = (this.rscore ?? 0) / (this.plays ?? 1)
        this.hits_per_play = (this.total_hits ?? 0) / (this.plays ?? 1)
    }
}

module.exports = CompactUser