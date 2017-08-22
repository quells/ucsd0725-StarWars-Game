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
