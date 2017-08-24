var Character = function(shortName, name, weapon, power, health, color) {
    this.shortName = shortName;
    this.name = name;
    this.weapon = weapon;
    this.brandColor = color;

    this.basePower = power;
    this.attackPower = power;
    this.defendPower = power;

    this.maxHealth = health;
    this.health = health;

    this.attack = function(other) {
        other.health -= this.attackPower;
        if (other.health > 0) {
            this.health -= other.defendPower;
        }
        this.attackPower += this.basePower;
        return other;
    }
}

var CharacterView = function (c) {
    var root = $("<div>").addClass("character " + c.shortName);
    var avatar = $("<div>").addClass("charAvatar").appendTo(root);
    $("<img>").addClass("avatarImage").attr("src", "assets/img/" + c.shortName + ".png").appendTo(avatar);
	$("<canvas>").addClass("avatarHealth").attr("name", c.shortName).attr("brandcolor", c.brandColor).appendTo(avatar);
    var description = $("<div>").addClass("charDescription").appendTo(root);
    $("<h3>").addClass("charName").text(c.name).appendTo(description);
    $("<p>").addClass("charWeapon").text("Weapon: " + c.weapon).appendTo(description);
    $("<p>").addClass("charStatus").text("POW: " + c.attackPower + " HP: " + c.health).appendTo(description);
    $("<div>").addClass("clear").appendTo(root);
    return root;
}

var Game = function(characters, updateUI) {
    this.updateUI = updateUI;

    this.characters = characters;
    this.player = undefined;
    this.remainingOpponents = [];
    this.defeatedOpponents = [];

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
