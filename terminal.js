
var levels = [
	{
		title: "Greet your computer",
		text: "Write a program that prints \"Hello computer!\"<br /><br />To print, write <br />" +
			"PRINT \"your message\"<br />on its own line.<br /><br />To run, hit \"submit\" below, " +
			"or hit CTRL+ENTER in the text box.",
		default: "//type code in this box\n//lines beginning with a double\n//slash will not be parsed\n\nPRINT \"Hello computer!\"\n",
		solution: function(output){
			if(output == "Hello computer!"){
				return true;
			}
			return false;
		},
		listen: function(){
			return Math.floor((Math.random() * 10));
		}
	},
	{
		title: "Your answer may vary",
		text: "Set a variable equal to 5, then print it.<br /><br />To declare a variable, type:<br /><br />VAR NAME = NUMBER" +
			"<br /><br />Variables can be printed like so:<br />PRINT NAME",
		default: "//see, like this.\n\nVAR hello = 5\n\n//just add a print command!\n",
		solution: function(output){
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
		solution: function(output){
			if(parseInt(output) > 5){
				return true;
			}
			return false;
		}
	}
];

var currentLevel = 0;
var gameMode = 0;
var currentOutput = "";
var gameStarted = 0;
var alertActive = true;

function showAlert(){
	document.getElementById("alert").style.visibility = "visible";
	document.getElementById("overlay").style.visibility = "visible";

	alertActive = true;
}

function closeAlert(){
	document.getElementById("alert").style.visibility = "hidden";
	document.getElementById("overlay").style.visibility = "hidden";

	alertActive = false;

	if(gameMode == 1){
		if(levels[currentLevel].solution(currentOutput)){
			document.getElementById("alert-title").innerText = "Congratulations";
			document.getElementById("alert-text").innerText = "Your program was a success!";
			showAlert();

			gameMode = 0;
		}
	}else{
		if(gameStarted == 1){
			currentLevel++;

			document.getElementById("title").innerText = "Problem "+(currentLevel + 1)+": "+levels[currentLevel].title;
			document.getElementById("text").innerHTML = levels[currentLevel].text;
			document.getElementById("textbox").value = levels[currentLevel].default;
		}
	}

	gameStarted = 1;
}

function parse(){

	gameMode = 1;

	var program = document.getElementById("textbox").value;
	var programLines = program.match(/[^\r\n]+/g);
	var token  = "";
	var mode   = 0;

	var tree  = [];
	var place = -1;

	for(var i = 0; i < programLines.length; i++){
		var line = programLines[i];

		if(line.length > 2 && line[0] != "/" && line[1] != "/"){
			tree.push([]);
			place++;

			for(var j = 0; j < line.length; j++){
				if(mode == 0){
					if(line[j] == "\""){
						mode = 1;
						if(token != ""){
							tree[place].push(token);
							token = "";
						}
					}else if(line[j] != " " && line[j] != "\t" && line[j] != "\n"){
						token += line[j];
					}else{
						if(token != ""){
							tree[place].push(token);
							token = "";
						}
					}
				}else{
					if(line[j] == "\""){
						if(token != ""){
							tree[place].push(token);
							token = "";
						}
						mode = 0;
					}else{
						token += line[j];
					}
				}
			}
		}

		mode = 0;

		if(token != ""){
			tree[place].push(token);
			token = "";
		}
	}

	console.log(tree);

	var output = "";
	var labels    = {};
	var variables = {};
	var steps = 0;
	var success = true;
	var ifLevel = 1;

	function skipAhead(){
		for(var j = i + 1; j < tree.length; j++){
			if(tree[j][0].toUpperCase() == "IF"){
				ifLevel++;
			}else if(tree[j][0].toUpperCase() == "ENDIF"){
				ifLevel--;
			}

			if(ifLevel == 0){
				i = j;
				ifLevel = 1;
				break;
			}
		}
	}

	function toNum(n){
		if(variables.hasOwnProperty(tree[i][n].toUpperCase())){
			return variables[tree[i][n].toUpperCase()];
		}else{
			return parseInt(tree[i][n].toUpperCase());
		}
	}

	for(var i = 0; i < tree.length; i++){
		if(steps < 100000){
			if(tree[i][0].toUpperCase().slice(-1) == ":"){
				labels[tree[i][0].toUpperCase().slice(0, -1)] = i;
			}else if(tree[i][0].toUpperCase() == "PRINT"){
				if(variables.hasOwnProperty(tree[i][1].toUpperCase())){
					output += variables[tree[i][1].toUpperCase()];
				}else{
					output += tree[i][1];
				}
			}else if(tree[i][0].toUpperCase() == "GOTO"){
				if(labels.hasOwnProperty(tree[i][1].toUpperCase())){
					i = labels[tree[i][1].toUpperCase()];
				}
			}else if(tree[i][0].toUpperCase() == "VAR"){
				variables[tree[i][1].toUpperCase()] = toNum(3);
			}else if(tree[i][0].toUpperCase() == "ADD"){
				variables[tree[i][1].toUpperCase()] += toNum(2);
			}else if(tree[i][0].toUpperCase() == "SUB"){
				variables[tree[i][1].toUpperCase()] -= toNum(2);
			}else if(tree[i][0].toUpperCase() == "IF"){
				if(tree[i][2] == "<"){
					if(toNum(1) >= toNum(3)){
						skipAhead();
					}
				}else if(tree[i][2] == ">"){
					if(toNum(1) <= toNum(3)){
						skipAhead();
					}
				}else if(tree[i][2] == ">="){
					if(toNum(1) < toNum(3)){
						skipAhead();
					}
				}else if(tree[i][2] == "<="){
					if(toNum(1) > toNum(3)){
						skipAhead();
					}
				}else if(tree[i][2] == "=="){
					if(toNum(1) != toNum(3)){
						skipAhead();
					}
				}
			}else if(tree[i][0].toUpperCase() == "LISTEN"){
				if(levels[currentLevel].hasOwnProperty("listen")){
					variables[tree[i][1].toUpperCase()] = levels[currentLevel].listen();
				}
			}
			steps++;
		}else{
			document.getElementById("alert-title").innerText = "Error";
			document.getElementById("alert-text").innerText = "Uh oh! Something went wrong. Please inspect your code.";
			showAlert();

			success = false;

			break;
		}
	}

	if(success){
		document.getElementById("alert-title").innerText = "Program Output";
		document.getElementById("alert-text").innerText = output;

		currentOutput = output;

		showAlert();
	}
}

function typing(e){
	if(e.keyCode === 9) { // tab was pressed
		// get caret position/selection
		var $this = document.getElementById("textbox");

		var start = $this.selectionStart;
		var end = $this.selectionEnd;

		var value = $this.value;

		// set textarea value to: text before caret + tab + text after caret
		$this.value = value.substring(0, start)
		            + "  "
		            + value.substring(end);

		// put caret at right position again (add one for the tab)
		$this.selectionStart = $this.selectionEnd = start + 2;

		// prevent the focus lose
		e.preventDefault();
	}else if(e.keyCode === 13 && alertActive){
		closeAlert();
		e.preventDefault();
	}else if(e.ctrlKey && e.keyCode === 13){
		e.preventDefault();
		parse();
	}
}