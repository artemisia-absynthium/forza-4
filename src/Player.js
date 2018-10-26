class Player {
    static getColor(player) {
        switch (player) {
            case 1:
                return "redbg";
            case 2:
                return "yellowbg";
            default:
                return "";
        }
    }
}

export default Player;
