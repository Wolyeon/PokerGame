var computerbet = 0;

var computerAction = function()
{
	var action = Math.floor(Math.random() * 100) % 5;
	if(action == 0)
	{
		computerBet();
	}
	else
	{
		computerCheck();
	}
};

var computerBet = function()
{
	var betAmount = Math.floor(Math.random() * (playerBalance/5));
	pool += betAmount;
	document.getElementById("gameActivity").innerHTML += "<section>Computer has bet " + betAmount + "</section>";
	updatePool();
	computerBet = betAmount;
};

var computerCheck = function()
{
	document.getElementById("gameActivity").innerHTML += "<section>Computer has checked</section>";
}