
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
		default: "//add something to this\n//and we'll call it a day.\n\nVAR hello = 5\n\n\n\nPRINT hello",
		solution: function(input, output){
			if(parseInt(output) > 5){
				return true;
			}
			return false;
		}
	},
	{
		title: "I appreciate your input",
		text: "A good program will need a way to input things. To read input into your program, use the READ command:<br />READ variable<br /><br />Your program will" +
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
			"<br /><br />Because there are six inputs to process, the same program will run six times.",
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
		title: "Sub sandwich",
		text: "The SUB command subtracts from a variable.<br />SUB variable 1<br /><br />For this problem, if the number in the input is positive, subtract 5 and print it. If it's negative, print it.<br /><br />Sample input:<br />1 7 -4 -3 0 2<br /><br />Expected output:<br />-4 2 -4 -3 0 -3",
		default: "//The name of this command\n//was a mistake.\n//Through subconscious suggestion,\n//it caused us to spend more\n//money on sandwiches than R&D.\n",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				if(input[i] < 1){
					string += input[i] + " "
				}else{
					string += (parseInt(input[i]) - 5) + " ";
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
	},
	{
		title: "A little loopy",
		text: "You can create loops using if statements and the GOTO command. Use it to jump back to a previously defined point in the code.<br /><br />For this problem, read a number from the input and print all the numbers from it to zero.<br /><br />Sample input:<br />7<br /><br />Expected output:<br />7 6 5 4 3 2 1 0",
		default: "\n\nSTART:\n\n\n\n\nGOTO START",
		solution: function(input, output){
			var string = "";
			for(var i = input[0]; i >= 0; i--){
				string += i + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 5) + 5;
		},
		inputLength: 1
	},
	{
		title: "Divide and conquer",
		text: "Well, the division command unfortunately didn't make it into this version of the TinkerCo Family Home Computer System. Maybe you can implement it yourself.<br />For this problem, read each number from the input and divide by three.<br /><br />Sample input:<br />9 5 7 3 0 4<br /><br />Expected output:<br />3 1 2 1 0 1",
		default: "",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				string += Math.floor(parseInt(input[i]) / 3) + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 10);
		}
	},
	{
		title: "Exponential",
		text: "We weren't able to get an exponentiation command in this version either. Look forward to that in the TinkerCo 3251, due for release in 1975!<br />For this problem, read each number from the input and print two to the power of that number.<br /><br />Sample input:<br />1 5 9 4 3 2<br /><br />Expected output:<br />2 32 512 16 8 4",
		default: "",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				string += Math.pow(2, parseInt(input[i]))  + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 10) + 1;
		}
	},
	{
		title: "Just fibbin'",
		text: "The Fibonacci sequence is generated by adding the previous two terms together. It goes like this:<br />1 1 2 3 5 8 13...<br /><br />For this problem, read each number from the input. Then print that position in the Fibonacci sequence.<br /><br />Sample input:<br />2 5 7 2 3 8<br /><br />Expected output:<br />1 5 13 1 2 21",
		default: "",
		solution: function(input, output){
			var string = "";
			for(var i in input){
				var a = 1;
				var b = 1;
				var c = 1;
				while(parseInt(input[i]) >= 3){
					a = b + c;
					c = b;
					b = a;
					input[i]--;
				}
				string += a + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 15) + 5;
		}
	},
	{
		title: "Dim sum",
		text: "The TinkerCo 3250 has an astounding sixteen locations of permanent memory that can be used to store data in between programs:<br />SAVE 0 VARIABLE<br /><br />For this problem, read each number from the input. Add them together, and print the running total.<br /><br />Sample input:<br />9 12 7 8 11 20<br /><br />Expected output:<br />9 21 28 36 47 67",
		default: "//The memory locations to save to\n//are 0-9 and A-F. Check the\n//documentation for more info.\n\n\nLOAD 0 variable\n\n\nSAVE 0 variable",
		solution: function(input, output){
			var string = "";
			var total = 0;
			for(var i in input){
				total += input[i];
				string += total + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 15) + 5;
		}
	},
	{
		title: "What's the difference?",
		text: "For this problem, print the difference of the current number from the previous number.<br /><br />Sample input:<br />20 18 12 19 21 1<br /><br />Expected output:<br />20 -2 -6 7 3 -20",
		default: "",
		solution: function(input, output){
			var string = input[0] + " ";
			for(var i = 1; i < input.length; i++){
				string += (parseInt(input[i]) - parseInt(input[i - 1])) + " "
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 30);
		}
	},
	{
		title: "So high right now",
		text: "For this problem, read all six numbers from the input. Print only the highest number out of those inputs.<br /><br />Sample input:<br />10 18 12 11 9 14<br /><br />Expected output:<br />18",
		default: "",
		solution: function(input, output){
			var string = "";
			var best = 0;
			for(var i in input){
				if(input[i] > best){
					best = input[i];
				}
			}
			string = best;
			if(output == string + "" || output == string + " "){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 15) + 5;
		}
	},
	{
		title: "Two bad",
		text: "We also weren't able to get a binary number converter into this version of our product. We would like to take this time to thank you for your brand loyalty.<br />For this problem, read each number from the input and print a 4 digit binary representation of it.<br /><br />Sample input:<br />0 12 15 3 9 7<br /><br />Expected output:<br />0000 1100 1111 0011 1001 0111",
		default: "",
		solution: function(input, output){
			var string = "";
			var news = "";
			for(var i in input){
				news = parseInt(input[i]).toString(2);
				string += ('0000'+news).substring(news.length) + " ";
			}
			if(output == string){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 16);
		}
	},
	{
		title: "Above average",
		text: "For this problem, add all six inputs together and print their average. Don't worry about the remainder.<br /><br />Sample input:<br />5 1 2 3 4 5<br /><br />Expected output:<br />3",
		default: "",
		solution: function(input, output){
			var string = "";
			var total = 0;
			for(var i in input){
				total += input[i];
			}
			string = Math.floor(total / 6);
			if(output == string + "" || output == string + " "){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 30) + 5;
		}
	},
	{
		title: "Completely rect",
		text: "For this problem, read two groups of three numbers from the input. Treat those numbers as the dimensions of two different rectangular prisms. Output their two volumes.<br /><br />Sample input:<br />4 3 5 1 9 2<br /><br />Expected output:<br />60 18",
		default: "",
		solution: function(input, output){
			var string = "";
			var vol1 = 1;
			var vol2 = 1;
			for(var i = 0; i < 3; i++){
				vol1 *= input[i];
			}
			for(var i = 3; i < 6; i++){
				vol2 *= input[i];
			}
			string = vol1 + " " + vol2;
			if(output == string + "" || output == string + " "){
				return true;
			}
			return false;
		},
		input: function(){
			return Math.floor(Math.random() * 19) + 1;
		}
	},
	{
		title: "Completely rect",
		text: "For this problem, read two groups of three numbers from the input. Treat those numbers as the dimensions of two different rectangular prisms. Output their two volumes.<br /><br />Sample input:<br />4 3 5 1 9 2<br /><br />Expected output:<br />60 18",
		default: "",
		solution: function(input, output){
			var string = "";
			var vol1 = 1;
			var vol2 = 1;
			for(var i = 0; i < 3; i++){
				vol1 *= input[i];
			}
			for(var i = 3; i < 6; i++){
				vol2 *= input[i];
			}
			string = vol1 + " " + vol2;
			if(output == string + "" || output == string + " "){
				return true;
			}
			return false;
		},
		input: function(){

			this.counter++;
			if(this.counter >= 5){
				this.counter = 1;
			}

			return Math.floor(Math.random() * this.counter * 7) + 1;
		},
		counter: 1
	}
];
