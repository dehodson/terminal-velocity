
var currentLevel = 0;
var gameMode = 0;
var currentOutput = "";
var gameStarted = 0;
var alertActive = true;
var generated = [];
var highestLevel = 0;

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
		if(levels[currentLevel].solution(generated, currentOutput)){
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

if(localStorage.highestLevel){
	highestLevel = parseInt(localStorage.highestLevel);
	currentLevel = highestLevel;
}

document.getElementById("title").innerText = "Problem "+(currentLevel + 1)+": "+levels[currentLevel].title;
document.getElementById("text").innerHTML = levels[currentLevel].text;
document.getElementById("textbox").value = levels[currentLevel].default;

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

	var output = "";
	var labels    = {};
	var variables = {};
	var steps = 0;
	var success = true;
	var ifLevel = 1;
	var storage = {
		"0": 0,
		"1": 0,
		"2": 0,
		"3": 0,
		"4": 0,
		"5": 0,
		"6": 0,
		"7": 0,
		"8": 0,
		"9": 0,
		"A": 0,
		"B": 0,
		"C": 0,
		"D": 0,
		"E": 0,
		"F": 0,
	};

	generated = [];

	function parseTree(input){

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

		function throwError(reason){
			document.getElementById("alert-title").innerText = "Error";
			document.getElementById("alert-text").innerText = reason;
			showAlert();
		}

		for(var i = 0; i < tree.length; i++){
			if(steps < 100000){
				if(tree[i][0].toUpperCase().slice(-1) == ":"){
					labels[tree[i][0].toUpperCase().slice(0, -1)] = i;
				}else if(tree[i][0].toUpperCase() == "PRINT"){
					if(tree[i].length > 1){
						if(variables.hasOwnProperty(tree[i][1].toUpperCase())){
							output += variables[tree[i][1].toUpperCase()];
						}else{
							output += tree[i][1];
						}
					} else {
						throwError("Error in print statement - nothing to print!");
						return false;
					}
				}else if(tree[i][0].toUpperCase() == "GOTO"){
					if(tree[i].length > 1){
						if(labels.hasOwnProperty(tree[i][1].toUpperCase())){
							i = labels[tree[i][1].toUpperCase()];
						}
					} else {
						throwError("Error in goto statement - no label given!");
						return false;
					}
				}else if(tree[i][0].toUpperCase() == "VAR"){
					if(tree[i].length > 3){
						variables[tree[i][1].toUpperCase()] = toNum(3);
					}else if(tree[i].length > 1){
						variables[tree[i][1].toUpperCase()] = 0;
					}else{
						throwError("Error in variable declaration.");
						return false;
					}
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
				}else if(tree[i][0].toUpperCase() == "READ"){
					variables[tree[i][1].toUpperCase()] = input;
				}else if(tree[i][0].toUpperCase() == "SAVE"){
					if(tree[i].length > 2){
						if(storage.hasOwnProperty(tree[i][1].toUpperCase())){
							if(variables.hasOwnProperty(tree[i][2].toUpperCase())){
								storage[tree[i][1].toUpperCase()] = toNum(2);
							}
						} else {
							if(variables.hasOwnProperty(tree[i][1].toUpperCase())){
								if(variables.hasOwnProperty(tree[i][2].toUpperCase())){
									storage[variables[tree[i][1].toUpperCase()].toString(16).toUpperCase()] = toNum(2);
								}
							}
						}
					} else {
						throwError("Error in SAVE statement.");
						return false;
					}
				}else if(tree[i][0].toUpperCase() == "LOAD"){
					if(tree[i].length > 2){
						if(storage.hasOwnProperty(tree[i][1].toUpperCase())){
							if(variables.hasOwnProperty(tree[i][2].toUpperCase())){
								variables[tree[i][2].toUpperCase()] = storage[tree[i][1].toUpperCase()];
							}
						} else {
							if(variables.hasOwnProperty(tree[i][1].toUpperCase())){
								if(variables.hasOwnProperty(tree[i][2].toUpperCase())){
									variables[tree[i][2].toUpperCase()] = storage[variables[tree[i][1]].toString(16).toUpperCase()];
								}
							}
						}
					} else {
						throwError("Error in LOAD statement.");
						return false;
					}
				}else if(tree[i][0].toUpperCase() == "ENDIF"){
					//nothing
				}else if(tree[i][0]){
					throwError("Unrecognized command "+tree[i][0]+".");
					return false;
				}
				steps++;
			}else{
				throwError("Uh oh! Your code timed out. Maybe an infinite loop?");
				return false;
			}
		}

		return true;
	}

	var reps = 6;

	if(levels[currentLevel].hasOwnProperty("inputLength")){
		reps = levels[currentLevel].inputLength;
	}

	if(levels[currentLevel].hasOwnProperty("input")){
		for(var inp = 0; inp < reps; inp++){

			var currentInput = levels[currentLevel].input();
			generated.push(currentInput);

			if(parseTree(currentInput)){
				labels    = {};
				variables = {};
				steps = 0;
				success = true;
				ifLevel = 1;
			} else {
				success = false;
				break;
			}
		}
	}else{
		success = parseTree(0);
	}

	if(success){
		document.getElementById("alert-text").innerHTML = "none<br/><br/><u>Program Output</u><br/><br/>";

		if(generated.length != 0){
			var string = "";
			for(var g in generated){
				string += generated[g] + " ";
			}

			document.getElementById("alert-text").innerHTML = string + "<br/><br/><u>Program Output</u><br/><br/>";
		}

		document.getElementById("alert-title").innerText = "Program Input";
		document.getElementById("alert-text").innerHTML += output.replace(/ /g,"&nbsp;");;

		currentOutput = output;

		showAlert();
	}
}

function next(){
	if(currentLevel < levels.length - 1){
		currentLevel++;

		document.getElementById("title").innerText = "Problem "+(currentLevel + 1)+": "+levels[currentLevel].title;
		document.getElementById("text").innerHTML = levels[currentLevel].text;
		document.getElementById("textbox").value = levels[currentLevel].default;
	}
}

function previous(){
	if(currentLevel > 0){
		currentLevel--;

		document.getElementById("title").innerText = "Problem "+(currentLevel + 1)+": "+levels[currentLevel].title;
		document.getElementById("text").innerHTML = levels[currentLevel].text;
		document.getElementById("textbox").value = levels[currentLevel].default;
	}
}

function documentation(){
	document.getElementById("doc-overlay").style.visibility = "visible";
	document.getElementById("documentation").style.visibility = "visible";
}

function closeDocumentation(){
	document.getElementById("doc-overlay").style.visibility = "hidden";
	document.getElementById("documentation").style.visibility = "hidden";
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