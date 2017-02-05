
var levels = [
	{
		title: "Greet your computer",
		text: "Write a program that prints \"Hello computer!\"<br /><br />To print, write <br />" +
			"PRINT \"your message\"<br />on its own line.<br /><br />To run, hit \"submit\" below, " +
			"or hit CTRL+ENTER in the text box.",
		default: "//type code in this box\n//lines beginning with a double\n//slash will not be parsed\n\nPRINT \"test\"\n",
		solution: function(input, output){
			if(output == "Hello computer!"){
				return true;
			}
			return false;
		}
	},
	{
		title: "Your answer may vary",
		text: "Set a variable equal to 5, then print it.<br /><br />To declare a variable, type:<br /><br />VAR NAME = NUMBER" +
			"<br /><br />Variables can be printed like so:<br />PRINT NAME",
		default: "//see, like this.\n\nVAR hello = 5\n\n//just add a print command!\n",
		solution: function(input, output){
			if(output == "5"){
				return true;
			}
			return false;
		}
	},
	{
		title: "Mathemagical",
		text: "Add anything to the variable hello and print it.<br /><br />To add to a variable, use the ADD command:<br /><br />ADD NAME NUMBER" +
			"<br /><br />For example:<br />ADD counter 10",
		default: "//add something to this\n//and we'll call it a day.\n\nVAR hello = 5\n\nPRINT hello",
		solution: function(input, output){
			if(parseInt(output) > 5){
				return true;
			}
			return false;
		}
	},
	{
		title: "I appreciate your input",
		text: "A good program will need a way to input things. To read input into your program, use the READ command.<br /><br />Your program will" +
			" run over and over again for as long as there is input.<br /><br />In order to complete this exercise, read from the input and print it.",
		default: "//declare a variable called\n//anything\n\n\nREAD anything\nPRINT anything\n\n//this line is so there's\n//spaces between the numbers\nPRINT \" \"",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				string += input[i] + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 20);
		}
	},
	{
		title: "Added intrigue",
		text: "Read each number from the input. Add one, then output it.<br /><br />Sample input:<br />0 1 2 3 4 5<br /><br />Expected output:<br />1 2 3 4 5 6" +
			"<br />Because there are six inputs to process, the same program will run six times.",
		default: "",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				string += (parseInt(input[i]) + 1) + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 20);
		}
	},
	{
		title: "Double trouble",
		text: "Read each number from the input. Then, double it.<br /><br />Sample input:<br />0 5 2<br /><br />Expected output:<br />0 10 4",
		default: "",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				string += (parseInt(input[i]) * 2) + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 20);
		}
	},
	{
		title: "If you please",
		text: "If the number in the input is negative, print false. If it's zero or positive, print true.<br /><br />Sample input:<br />-5 2 5<br /><br />Expected output:<br />false true true ",
		default: "//Below, you can see the\n//IF command in action.\n\nIF variable < 0\n\nENDIF\n\n//Read the documentation for\n//more info.",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				if(input[i] < 0){
					string += "false "
				}else{
					string += "true "
				}
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 20) - 10;
		}
	},
	{
		title: "Absolutely incredible",
		text: "For each number in the input, print that number's absolute value.<br /><br />Sample input:<br />-3 2 -1 -6 0 5<br /><br />Expected output:<br />3 2 1 6 0 5",
		default: "",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				string += Math.abs(parseInt(input[i])) + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 20) - 15;
		}
	}
];
