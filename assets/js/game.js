var Game = function(characters, updateUI) {
    this.updateUI = updateUI;

    this.characters = characters;
    this.player = undefined;
    this.remainingOpponents = {};
    this.defeatedOpponents = {};

    this.state = "NEW_GAME";
    this.states = ["NEW_GAME", "CHOOSE_PLAYER", "CHOOSE_OPPONENT", "FIGHT_SCREEN", "ATTACKING", "GAME_LOST", "GAME_WON"];
    this.transitions = {
        "NEW_GAME": ["CHOOSE_PLAYER"],
        "CHOOSE_PLAYER": ["FIGHT_SCREEN"],
        "CHOOSE_OPPONENT": ["FIGHT_SCREEN", "GAME_WON"],
        "FIGHT_SCREEN": ["ATTACKING", "CHOOSE_OPPONENT"],
        "ATTACKING": ["FIGHT_SCREEN", "CHOOSE_OPPONENT", "GAME_LOST"],
        "GAME_LOST": ["NEW_GAME"],
        "GAME_WON": ["NEW_GAME"]
    };

    this.canTransitionTo = function(nextState) {
        var validTransitions = this.transitions[this.state];
        for (var i = 0; i < validTransitions.length; i++) {
            if (validTransitions[i] == nextState) { return true; }
        }
        return false;
    };

    this.transitionTo = function(nextState) {
        if (this.canTransitionTo(nextState)) {
            this.state = nextState;
            this.handleCurrentState();
            return;
        } else {
            throw "Cannot transition from " + this.state + " to " + nextState;
        }
    };

    this.handleCurrentState = function() {
        switch (this.state) {
            case "NEW_GAME":
                this.player = undefined;
                this.remainingOpponents = new Array();
                this.defeatedOpponents = new Array();
                break;
            case "CHOOSE_PLAYER":
            case "CHOOSE_OPPONENT":
            case "FIGHT_SCREEN":
            case "ATTACKING":
            case "GAME_LOST":
            case "GAME_WON":
            default:
                throw "Have not implemented " + this.state;
        }
        this.updateUI();
    };

    this.selectCharacter = function(event) {
        var charName = $(event.currentTarget).attr("shortname")
        var isPlayer = ((this.player != undefined) && (charName == this.player.shortName));
        switch (this.state) {
            case "NEW_GAME":
                console.log(charName);
                break;
            case "CHOOSE_PLAYER":
            case "CHOOSE_OPPONENT":
            case "FIGHT_SCREEN":
            case "ATTACKING":
            case "GAME_LOST":
            case "GAME_WON":
            default:
                throw "Have not implemented " + this.state;
        }
    };
};
