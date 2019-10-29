var surface = document.getElementById("playerBoard");
var ctx = surface.getContext("2d");

//draw out a single card, taking into account its characteristics
var cardGraphics = function(card)
{
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0,0, 100, 120);
	ctx.strokeRect(0,0, 100, 120);
	ctx.font="50px Times New Roman";
	if(card.suit == "Diamonds" || card.suit =="Hearts")
	{
		ctx.fillStyle="#FF0000";
	}
	else
	{
		ctx.fillStyle="#000000";
	}
	//it's a regular number card, not a special casse
	if(card.number >=2 && card.number <=10)
	{
		ctx.fillText(card.number, 0, 70);
	}//in this case it is a face card so special case
	else
	{
		if(card.number == "1")
		{
			ctx.fillText("A", 0, 70);
		}
		if(card.number == "11")
		{
			ctx.fillText("J", 0, 70);
		}
		if(card.number == "12")
		{
			ctx.fillText("Q", 0, 70);
		}
		if(card.number == "13")
		{
			ctx.fillText("K", 0, 70);
		}
	}//then based on suit, make that shape
	if(card.suit == "Diamonds")
	{
		ctx.save();
		ctx.translate(55, 30);
		ctx.beginPath();
		ctx.moveTo(20, 0);
		ctx.lineTo(40, 20);
		ctx.lineTo(20, 40);
		ctx.lineTo(0,20);
		ctx.lineTo(20, 0);
		ctx.fill();
		ctx.restore();
	}
	else if(card.suit =="Hearts")
	{
		ctx.save();
		ctx.translate(55, 30);
		ctx.beginPath();
		ctx.arc(11, 15, 11, 0, 2*Math.PI);
		ctx.arc(29, 15, 11, 0, 2*Math.PI);
		ctx.fill();
		ctx.moveTo(20, 40);
		ctx.lineTo(41, 15);
		ctx.lineTo(0, 15);
		ctx.lineTo(20, 40);
		ctx.fill();
		ctx.restore();
	}
	else if(card.suit == "Clubs")
	{
		ctx.save();
		ctx.translate(55, 30);
		ctx.beginPath();
		ctx.arc(20, 10, 9, 0, 2*Math.PI);
		ctx.arc(30, 20, 9, 0, 2*Math.PI);
		ctx.arc(10, 20, 9, 0, 2*Math.PI);
		ctx.fillRect(18, 15, 4, 19);
		ctx.fill();
		ctx.restore();
	}
	else
	{
		ctx.save();
		ctx.translate(55, 30);
		ctx.beginPath();
		ctx.moveTo(20, 0);
		ctx.lineTo(40, 20);
		ctx.lineTo(0, 20);
		ctx.lineTo(20, 0);
		ctx.fill();
		ctx.arc(11, 20, 11, 0, 2*Math.PI);
		ctx.arc(29, 20, 11, 0, 2*Math.PI);
		ctx.fill();
		ctx.fillRect(18, 20, 4, 16);
		ctx.restore();
	}
};

var clearBoard = function()
{
	ctx.clearRect(0,0, surface.width, surface.height);
};

var newCard= function()
{
	var newCard = onTable.length - 1;
	ctx.save();
	ctx.translate((50 + (105 * newCard)), 175);
	cardGraphics(onTable[newCard]);
	ctx.restore();
};


//functions that take into account positioning and use the card making function
//to draw the cards for their respective regions
var drawPlayer = function()
{
	for(var i = 0; i < playerHand.length ; i++)
	{
		ctx.save();
		ctx.translate((200 + (105 * i)), 350);
		cardGraphics(playerHand[i]);
		ctx.restore();
	}
};

var drawComputer = function()
{
	for(var i = 0; i < computerHand.length ; i++)
	{
		ctx.save();
		ctx.translate((200 + (105 * i)), 0);
		cardGraphics(computerHand[i]);
		ctx.restore();
	}
};

var drawTable = function()
{
	for(var i = 0; i < onTable.length ; i++)
	{
		ctx.save();
		ctx.translate((50 + (105 * i)), 175);
		cardGraphics(onTable[i]);
		ctx.restore();
	}
};