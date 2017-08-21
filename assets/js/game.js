var Character = function(shortName, name, weapon, power, health) {
	this.shortName = shortName;
	this.name = name;
	this.weapon = weapon;
	this.basePower = power;
	this.attackPower = power;
	this.defendPower = power;
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

var CharacterView = function (character) {
	var root = $("<div>").addClass("character " + character.shortName);
	var avatar = $("<div>").addClass("charAvatar").appendTo(root);
	var picture = $("<div>").addClass("avatarCircle").appendTo(avatar);
	var description = $("<div>").addClass("charDescription").appendTo(root);
	$("<h3>").addClass("charName").text(character.name).appendTo(description);
	$("<p>").addClass("charWeapon").text("Weapon: " + character.weapon).appendTo(description);
	$("<p>").addClass("charStatus").text("POW: " + character.attackPower + " HP: " + character.health).appendTo(description);
	$("<div>").addClass("clear").appendTo(root);
	return root;
}
