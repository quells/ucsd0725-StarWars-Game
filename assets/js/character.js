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
};

function AttackBetween(player, opponent) {
    var msg = "";
    opponent.health -= player.attackPower;
    msg += player.name + " dealt " + player.attackPower + " damage.";
    if (opponent.health > 0) {
        player.health -= opponent.defendPower;
        msg += "<br>";
        msg += opponent.name + " dealt " + opponent.defendPower + " damage.";
    }
    player.attackPower += player.basePower;
    return {"player": player, "opponent": opponent, "msg": msg};
};

function ResetCharacter(c) {
    c.attackPower = c.basePower;
    c.health = c.maxHealth;
    return c;
};

var CharacterView = function (c) {
    var root = $("<div>").addClass("character " + c.shortName).attr("shortname", c.shortName);
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
