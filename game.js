//deck properties
var deck = [];

//constant for the "board" of cards is 5, 3 initial and 2 draws after.
var MAX_TABLE = 5;
var FLOP = 3;
var onTable = [];

//constants for the players and the computers hand
var MAX_HAND = 2;
var playerHand = [];
var computerHand = [];

//the players and dealer characteristics/properties
var INITIAL_BALANCE = 5000;
var playerTurn = "false";
var playerBalance = 0;
var playerBet = 0;
var pool = 0;

//ordering of combo "strengths", omitting royal flushes
var combos = ["StraightFlush", "FourOfAKind", "FullHouse", "Flush", "Straight", "ThreeOfAKind", "TwoPair", "OnePair", "High"];

//Card object that has a number, a suit, and an availability
var cardConst = function(suit, number, available)
{
   return {
      suit : suit,
      number : number,
      available : available
   };
};

//creates a deck of 52 cards
var cardCreation = function()
{ 
   deck = [];
   deck.push(cardConst("Spades", "1", "true"));
   for(var i = 2; i < 11; i++)
   {
      deck.push(cardConst("Spades", i, "true"));
   }
   deck.push(cardConst("Spades", "11", "true"));
   deck.push(cardConst("Spades", "12", "true"));
   deck.push(cardConst("Spades", "13", "true"));
   
   deck.push(cardConst("Hearts", "1", "true"));
   for(var i = 2; i < 11; i++)
   {
      deck.push(cardConst("Hearts", i, "true"));
   }
   deck.push(cardConst("Hearts", "11", "true"));
   deck.push(cardConst("Hearts", "12", "true"));
   deck.push(cardConst("Hearts", "13", "true"));
   
   deck.push(cardConst("Clubs", "1", "true"));
   for(var i = 2; i < 11; i++)
   {
      deck.push(cardConst("Clubs", i, "true"));
   }
   deck.push(cardConst("Clubs", "11", "true"));
   deck.push(cardConst("Clubs", "12", "true"));
   deck.push(cardConst("Clubs", "13", "true"));
   
   deck.push(cardConst("Diamonds", "1", "true"));
   for(var i = 2; i < 11; i++)
   {
      deck.push(cardConst("Diamonds", i,"true"));
   }
   deck.push(cardConst("Diamonds", "11", "true"));
   deck.push(cardConst("Diamonds", "12", "true"));
   deck.push(cardConst("Diamonds", "13", "true"));
   //shuffle deck and make that the new deck.
   shuffleDeck();
};

//shuffles the cards in the ordered deck, picking random cards
//based on the "availability"
var shuffleDeck = function()
{
   var shuffledDeck = [];
   var card;
   var num;
   //until the arrays match keep getting random cards
   while(shuffledDeck.length != deck.length)
   {//grab cards at random from the ordered deck and push them onto a new array to "shuffle"
      num = Math.floor(Math.random() * 52)
      if(deck[num].available == "true")
      {
	deck[num].available = "false";
	card = deck[num];
	shuffledDeck.push(card);
      }
   }
   deck = shuffledDeck;
};

//used to search the back of the array, is used to go past the problem of 
//two pairs and full houses so as to avoid the first set of similar values
var reverseChecker = function(maxToCheck, comboLength, increment, cards)
{
	var combo = 1;
	for(i = cards.length - 1; i >= (cards.length - 1 - maxToCheck); i--)
	{
		//so long as I is less then the combo length
		for(var k = i; k > i - comboLength + 1; k--)
		{
			console.log(k);
			if((cards[k - 1].number + increment) == cards[k].number)
			{
				combo++;
			}
		}
		if(combo == comboLength)
		{
			return combo;
		}
		combo = 1;
	}
	return combo;
}

//helper function to handValue, is used to calculate whether a straight, or multiple cards
//are in the hand, based off of the other cards around it.
//increment is used to figure out whether we have a straight or not
//the list we are given is order, therefore we can check linearly
var comboChecker = function(maxToCheck, comboLength, increment, cards)
{
	var combo = 1;
	for(i = 0; i <= maxToCheck; i++)
	{
		//so long as k is less then the combo length taking into the account I offset
		for(var k = i; k < i + comboLength - 1; k++)
		{
			if((cards[k].number + increment) == cards[k + 1].number)
			{
				combo++;
			}
		}
		if(combo == comboLength)
		{
			return combo;
		}
		combo = 1;
	}
	return combo;
};

//main function to determine what kind of hand the player has in comparison to the computer
//orders the persons hand, and checks the values and suits to determine
//the strength of the combo the player has
//combo is placed in an array 0 being highest
var handValue = function(hand)
{
   var cards = onTable.concat(hand);
   cards.sort(function(a,b) {return a.number - b.number});
   console.log(cards);
   var suited = 1;
   var i;
  //Check if the table and player hand are suited.
   for(i = 0; (i < hand.length) && (suited < 5); i++)
   {
	var suit = hand[i].suit;
	suited = 0;
	for(var k = 0; k < cards.length && suited < 5; k++)
	{
		if(cards[k].suit == suit)
		{
			suited++;
		}
	}
	console.log("suited is" + suited);
   }
   
   //winning conditions are split into suited and non-suited
   if(suited >= 5)
   {
	var straight = comboChecker(2, 5, 1, cards);
	if(straight == 5)
	{
		return combos.indexOf("StraightFlush");
	}
	return combos.indexOf("Flush");
   }
   else
   {
	console.log("checking three of kind");
	var straight = comboChecker(2, 5, 1, cards);
	if(straight == 5)
	{
		return combos.indexOf("Straight");
	}
	console.log("checking three of kind");
	var fourOfAKind = comboChecker(3, 4, 0, cards);
	if(fourOfAKind == 4)
	{
		return combos.indexOf("FourOfAKind");
	}
	//possible three of kind or full house so check for a two pair in the
	//possible combinations
	var threeOfKind = comboChecker(4, 3, 0, cards);
	if(threeOfKind == 3)
	{
		console.log("Three Of Kind checked");
		var twoOfKind = reverseChecker(5, 2, 0, cards);
		if(twoOfKind == 2)
		{
			return combos.indexOf("FullHouse");
		}
		return combos.indexOf("ThreeOfAKind");
	}
	//possible two pair within the pair so check opposite direction 
	//of the list to find the other pair
	twoOfKind = comboChecker(5, 2, 0, cards);
	if(twoOfKind == 2)
	{//check the reverse of all the cards for other pair
		var secondTwoOfKind = reverseChecker(5,2, 0, cards);
		if(secondTwoOfKind == 2)
		{
			return combos.indexOf("TwoPair");
		}
		return combos.indexOf("OnePair");
	}
	return combos.indexOf("High");
   }
};

//grabs the combo value of the player and computer and checks
//distributes money accordingly
var checkWinner = function()
{
	var playerValue = handValue(playerHand);
	var computerValue = handValue(computerHand);
	if(playerValue < computerValue)
	{
		playerBalance += Number(pool);
		pool = 0;
		document.getElementById("gameActivity").innerHTML += "<section>Player won by " + combos[playerValue] + "</section>";
		updatePool();
		updatePlayerBalance();
		dealCards();
	}
	else if(playerValue > computerValue)
	{
		pool = 0;
		document.getElementById("gameActivity").innerHTML += "<section>Computer won by " + combos[computerValue] + "</section>";
		updatePool();
		updatePlayerBalance();
		dealCards();
	}
	else
	{
		playerBalance += Number(pool/2);
		pool = 0;
		document.getElementById("gameActivity").innerHTML += "<section>Both had " + combos[computerValue] + "</section>";
		updatePool();
		updatePlayerBalance();
		dealCards();
	}
}

//after all actions are performed plays a turn or flop card onto the table
var drawCard = function()
{//in the case the deck has no cards send out error
   //else place card from deck onto table array, if max cards on table, determine winner
//deck should never run out of cards though since we shuffle before it gets below 20
   if(deck.length > 0)
   {
      if(onTable.length == MAX_TABLE)
      {
         checkWinner();
      }
      else
      {
         onTable.push(deck.pop());
	 newCard();
	document.getElementById("cards").innerHTML = deck.length;
	computerAction();
	playerTurn == "true";
      }
   }
   else
   {
      alert("Deck has run out of cards");
   }
};

//deals out a new board of poker
//updates visuals after dealing out cards
var dealCards = function()
{//deals out cards to the players on the board
   if(deck.length >= 20)
   {
      var i;
      var newPlayerHand = [];
      var newComputerHand = [];
      var newTable = [];
      for(i = 0; i < MAX_HAND ; i++)
      {
         newPlayerHand.push(deck.pop());
         newComputerHand.push(deck.pop());
      }
      for(i = 0; i < FLOP ; i++)
      {
         newTable.push(deck.pop());
      }
      document.getElementById("cards").innerHTML = deck.length;
      playerHand = newPlayerHand;
      computerHand = newComputerHand;
      onTable = newTable;
      clearBoard();
      drawPlayer(playerHand);
      drawComputer(computerHand);
      drawTable(onTable);
       computerAction();
      playerTurn = "true";
   }
   else
   {//make new deck and reshuffle
      cardCreation();
      dealCards();
   }
};

//Very first function ran that sets up the board, player balance and the like.
var newGame = function()
{
   playerBalance = INITIAL_BALANCE;
   document.getElementById("balance").innerHTML = "$" + playerBalance;
   cardCreation();
   dealCards();
   document.getElementById("cards").innerHTML = deck.length;
   drawPlayer(playerHand);
   drawComputer(computerHand);
   drawTable(onTable);
   playerTurn = "true";
};

//updates the pool of money for the user
var updatePool = function(amt)
{
	document.getElementById("pool").innerHTML = "$" + pool;
}

var updatePlayerBalance = function()
{
	document.getElementById("balance").innerHTML = "$" + playerBalance;
}

var bet = function()
{
   if(playerTurn == "true")
   {
      playerTurn == "false";
      playerBet = document.getElementById("betAmount").value;
      if(playerBet > playerBalance)
      {
         alert("Bet is larger then your money available.");
         return;
      }
      if(playerBet <= Number(computerBet))
      {
         alert("You must match or beat the computers bet.");
         return;
      }
      //for now we ignore the raise mechanic of poker and only do one round of betting
      playerBalance -= playerBet;
      pool += Number(playerBet);
      document.getElementById("pool").innerHTML = pool;
      updatePool();
      updatePlayerBalance();
      drawCard();
   }
};

var check = function()
{
   //If computer has not made a bet, then it has checked
   //if player wants to check as well board is given another card
   if(playerTurn == "true")
   {
      playerTurn == "false";
      drawCard();
   }
};

var call = function()
{//both bets are the same, therefore we use one variable to make things simpler
   //add two bets to the pool minus the players money
   if(playerTurn == "true")
   {
      playerTurn = "false";
      playerBalance -= computerBet;
      document.getElementById("balance").innerHTML = "$" + playerBalance;
      pool += (computerBet * 2);
      drawCard();
   }
};

var fold = function()
{//player folds hand, redeal the board and is players turn
   if(playerTurn == "true")
   {
      playerTurn = "false";
      dealCards();
   }
};