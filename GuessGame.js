var correct = Math.floor((Math.random() * 100) + 1);
var doOnce = false;
var guessArray = [];

$(document).ready(function(){
	$("#hintForm [value='Play Again']").click(function(){
		$("[type='submit']").prop('disabled', false);
		resetGame();
	});
	$("#hintForm [value='Hint']").click(function(){
		var $hint = $("<div id='hintDiv'></div>");
		var $sure = $("<span style='color:white;font-size:10em;'>Are you sure?</span><br>");
		var $confirmation = $("<button>Yes</button>");
		$hint.append($sure);
		$hint.append($confirmation);
		$hint.click(function(){
			$hint.fadeOut(3000, function(){
				$hint.remove();
			});
		});
		$confirmation.click(function(){
			$confirmation.remove();
			$sure.text(correct);
			$hint.fadeOut(5000, function(){
				$hint.remove();
			});
		});
		$('body').append($hint);
	});
	alert('Ready to play!');
});

function validateValue(guess){
	$("[name='guess']").val("");
	var $helpTool = $("<div style='float:left;text-align:center;margin:-50% 1% auto 1%;color:red;'></div>");
	if (guess !== ""){
		if (Number(guess) !== NaN && guess >= 1 && guess <= 100){
			var hits = 0;
			for (i=0;i<guessArray.length;i++){
				if (guess == guessArray[i]){
					hits++;
				}
			}
			if (hits > 0){
				$helpTool.text('You have already guessed that number');
				$('body').append($helpTool);
				$helpTool.fadeOut(5000, function(){
					$helpTool.remove();
				});
			}
			else{
				checkValue(guess);
			}
		}
		else if (guess < 1 || guess > 100){
			$helpTool.text('Please select only number 1 through 100');
			$('body').append($helpTool);
			$helpTool.fadeOut(5000, function(){
				$helpTool.remove();
			});
		}
		else{
			$helpTool.text('Your guess must be a number');
			$('body').append($helpTool);
			$helpTool.fadeOut(5000, function(){
				$helpTool.remove();
			});
		}
	}
	else{
		$helpTool.text('You must enter a guess');
		$('body').append($helpTool);
		$helpTool.fadeOut(5000, function(){
			$helpTool.remove();
		});
	}
	
}

function guessControl(guess, heat){
	var $totalGuesses = $("<span id='totalGuesses' style='color:white;font-weight:bold;'></span>");
	var $guessBox = $("<div class='yourGuesses'></div>");
	guessArray.push(guess);
	if (doOnce === false){
		doOnce = true;
		if (guess != 'win'){
			$totalGuesses.text("You have guessed " + guessArray.length + " time");
		}
		else{
			$totalGuesses.text("You Win!");
			$('main section').append($totalGuesses);
			$("[type='submit']").prop('disabled', true);
			var $hint = $("<div id='hintDiv' style='opacity:0.9'></div>");
			var $winVideo = $("<iframe width='550' height='412' src='http://www.youtube.com/embed/HQgccf-5T4w' frameborder='0' allowfullscreen></iframe>");
			$hint.append($winVideo);
			$('body').append($hint);
			$hint.click(function(){
				$hint.fadeOut(3000, function(){
					$hint.remove();
				});
			});
			return;
		}
		$('main section').append($totalGuesses);
		$guessBox.append("<p>" + guess + " " + heat + "</p>");
		$('body').append($guessBox);
	}
	else{
		if (guessArray.length <= 14 && guess != 'win'){
			$('#totalGuesses').text("You have guessed " + guessArray.length + " times");
			$('.yourGuesses').append("<p>" + guess + " " + heat + "</p>");
		}
		else if (guess === 'win'){
			$('#totalGuesses').text("You Win!");
			$("[type='submit']").prop('disabled', true);
			var $hint = $("<div id='hintDiv'></div>");
			var $winVideo = $("<iframe width='550' height='412' src='http://www.youtube.com/embed/HQgccf-5T4w' frameborder='0' allowfullscreen></iframe>");
			$hint.append($winVideo);
			$('body').append($hint);
			$hint.click(function(){
				$hint.fadeOut(3000, function(){
					$hint.remove();
				});
			});
		}
		else{
			$('#totalGuesses').text("Sorry, you could not guess the number. Please play again.").fadeOut(5000, function(){
				resetGame();
			});
		}
	}
}

function checkValue(guess){
	if (guess != correct && guessArray.length == 0){
		if (guess <= (correct + 10) && guess >= (correct - 10)){
			$('#hot').show('slow', function(){
				$('#hot').hide(3000, function(){
					$('#cold').text('Colder');
					$('#hot').text('Hotter');
					guessControl(guess, 'HOT');
				});
			});
		}
		else{
			$('#cold').show('slow', function(){
				$('#cold').hide(3000, function(){
					$('#cold').text('Colder');
					$('#hot').text('Hotter');
					guessControl(guess, 'COLD');
				});
			});
		}
	}
	else if (guess != correct && guessArray.length != 0){
		if (Math.abs(correct - guess) < Math.abs(correct - guessArray[guessArray.length - 1])){
			$('#hot').show('slow', function(){
				$('#hot').hide(3000, function(){
					guessControl(guess, 'HOTTER');
				});
			});
		}
		else{
			$('#cold').show('slow', function(){
				$('#cold').hide(3000, function(){
					guessControl(guess, 'COLDER');
				});
			});
		}
	}
	else{
		guessControl('win');
	}
}

function resetGame(){
	doOnce = false;
	guessArray = [];
	$('.yourGuesses').text("");
	$('.yourGuesses').remove();
	$('#totalGuesses').remove();
	$('#cold').text('Cold');
	$('#hot').text('Hot');
	correct = Math.floor((Math.random() * 100) + 1);
}