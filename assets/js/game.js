var Game = function(characters, updateUI) {
    this.updateUI = updateUI;

    this.characters = characters;
    this.player = undefined;
    this.opponent = undefined;
    this.remainingOpponents = {};
    this.defeatedOpponents = {};

    this.state = "NEW_GAME";
    this.states = ["NEW_GAME", "CHOOSE_PLAYER", "CHOOSE_OPPONENT", "FIGHT_SCREEN", "ATTACKING", "GAME_LOST", "GAME_WON"];
    this.transitions = {
        "NEW_GAME": ["CHOOSE_PLAYER"],
        "CHOOSE_PLAYER": ["CHOOSE_OPPONENT"],
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
                this.remainingOpponents = {};
                this.defeatedOpponents = {};
                this.transitionTo("CHOOSE_PLAYER");
                break;
            case "CHOOSE_PLAYER":
                break;
            case "CHOOSE_OPPONENT":
                var remainingOpponentCount = Object.keys(this.remainingOpponents).length;
                if (remainingOpponentCount < 1) {
                    this.transitionTo("GAME_WON");
                }
                break;
            case "FIGHT_SCREEN":
                break;
            case "ATTACKING":
                var result = AttackBetween(this.player, this.opponent);
                this.player = result["player"];
                this.opponent = result["opponent"];
                if (this.player.health <= 0) {
                    this.transitionTo("GAME_LOST");
                } else if (this.opponent.health <= 0) {
                    alert("You have defeated " + this.opponent.name + "!");
                    this.defeatedOpponents[this.opponent.shortName] = this.opponent;
                    this.opponent = undefined;
                    this.transitionTo("CHOOSE_OPPONENT");
                } else {
                    this.transitionTo("FIGHT_SCREEN");
                }
                break;
            case "GAME_LOST":
                alert("GAME OVER");
                this.transitionTo("NEW_GAME");
                break;
            case "GAME_WON":
                alert("Congratulations, you beat the game!");
                this.transitionTo("NEW_GAME");
                break;
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
                break;
            case "CHOOSE_PLAYER":
                this.player = CopyObject(this.characters[charName]);
                this.remainingOpponents = CopyObject(this.characters);
                delete this.remainingOpponents[charName];
                this.transitionTo("CHOOSE_OPPONENT");
                break;
            case "CHOOSE_OPPONENT":
                this.opponent = CopyObject(this.remainingOpponents[charName]);
                delete this.remainingOpponents[charName];
                this.transitionTo("FIGHT_SCREEN");
                break;
            case "FIGHT_SCREEN":
                break;
            case "ATTACKING":
            case "GAME_LOST":
            case "GAME_WON":
            default:
                throw "Have not implemented character selection for " + this.state;
        }
    };
};
