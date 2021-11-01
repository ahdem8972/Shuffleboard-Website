document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    var grid =  [[0,0,false],[100,0,false],[200,0,false],[300,0,false],
                 [0,100,false],[100,100,false],[200,100,false],[300,100,false],
                 [0,200,false],[100,200,false],[200,200,false],[300,200,false],
                 [0,300,false],[100,300,false],[200,300,false],[300,300,true]];

    var puzzleAreaContents = document.getElementById("puzzlearea").children;
    var shuffleTracker = 0;
    var numberOfMoves = 0;
    document.getElementById("overall").insertAdjacentHTML('beforeend', "number of moves: <span id='numberOfMoves'>0</span>");

    function checkIfComplete() {
      var check = ""
      var arr = document.getElementById("puzzlearea").children;
      for (i = 0; i < arr.length; i++) {
        check = check + arr[i].innerHTML 
      };
      if (check == "123456789101112131415" && numberOfMoves > 20) {
        celebrate()
        return true;
      }
    }

    function reload() {alert("hey") }

    function celebrate() {
      document.getElementById("puzzlearea").innerHTML = "<div><img onclick='location.reload();' src='http://rack.2.mshcdn.com/media/ZgkyMDEzLzA4LzA1LzYyL2FuY2hvcm1hbi42NjJkYS5naWYKcAl0aHVtYgk4NTB4ODUwPgplCWpwZw/e36d14bd/1c0/anchorman.jpg'/></div><br /><h1 onclick='location.reload();'>Good Job</h1>";
      document.getElementById("shufflebutton").outerHTML = ""
    }

    function shuffle(shuffleTracker) {
      var rand = getRandomElement();
      shiftPuzzlePiece.call(puzzleAreaContents[rand]);
      if (shuffleTracker < 199) 
        { 
          shuffleTracker = shuffleTracker + 1;
          shuffle(shuffleTracker) 
        }
        else {
          shuffleTracker = 0;
          numberOfMoves = 0; 
          document.getElementById("numberOfMoves").innerHTML = numberOfMoves;          
        }
    }

    function getRandomElement() {
      var movables = getArrayOfMovableCells();
      return movables[Math.floor(Math.random() * movables.length)];
    }

    function openBlock() {
      for (i = 0; i < grid.length; i++) {
        if (grid[i][2] == true){return i;}
      }
    }

    function getArrayOfMovableCells() {
      var open = openBlock()
      var movables = [open-4, open-1, open+1, open+4]
      var count = movables.length;
      for (i = 0; i < count; i++) {
        if (movables[i] < 0) {movables[i] = null} 
        if (movables[i] > 15) {movables[i] = null}
        if (open == 3 || open == 7 || open == 11 ) { movables[movables.indexOf(open+1)] = null }
        if (open == 4 || open == 8 || open == 12 ) { movables[movables.indexOf(open-1)] = null }
      }
      movables = movables.filter(function(val) { return val !== null; })
      return movables;
    }

    function addPuzzlePieceHover() {this.className = this.className + " moveablepiece";
    }

    function removePuzzlePieceHover() {this.className = "puzzlepiece";
    }

    function shiftPuzzlePiece() {
      numberOfMoves = numberOfMoves + 1;
      document.getElementById("numberOfMoves").innerHTML = numberOfMoves; 

      this.style.left = grid[openBlock()][0]+"px";
      this.style.top = grid[openBlock()][1]+"px";
      this.className = "puzzlepiece";
      var collection = Array.prototype.slice.call( puzzleAreaContents )
      var movedBlock = collection.indexOf(this)
      var openBlockIndex = collection.indexOf(puzzleAreaContents[openBlock()])
      
      var switchVariable = collection[movedBlock];
      collection[movedBlock] = collection[openBlockIndex];
      collection[openBlockIndex] = switchVariable;

      document.getElementById("puzzlearea").innerHTML = ""
      for (i = 0; i < collection.length; i++) {
        document.getElementById("puzzlearea").innerHTML = document.getElementById("puzzlearea").innerHTML + collection[i].outerHTML;
      }

      grid[openBlock()][2] = false;
      grid[movedBlock][2] = true;

      removeEventListeners(getArrayOfMovableCells());
      if (checkIfComplete() == true) {return} 
      addEventListeners(getArrayOfMovableCells());
    }

    function addEventListeners(movables) {
      for (i = 0; i < movables.length; i++) {
        puzzleAreaContents[movables[i]].addEventListener("mouseover", addPuzzlePieceHover, false);
        puzzleAreaContents[movables[i]].addEventListener("mouseout", removePuzzlePieceHover, false);
        puzzleAreaContents[movables[i]].addEventListener("click", shiftPuzzlePiece);
      }
    }

    function removeEventListeners(movables) {
      for (i = 0; i < movables.length; i++) {
        puzzleAreaContents[movables[i]].removeEventListener("mouseover", addPuzzlePieceHover, false);
        puzzleAreaContents[movables[i]].removeEventListener("mouseout", removePuzzlePieceHover, false);
        puzzleAreaContents[movables[i]].removeEventListener("click", shiftPuzzlePiece, false);
      }
    }

    function initializePuzzleArea() {
      var x = 0;
      var y = 0;
      for (i = 0; i < puzzleAreaContents.length; i++) {
        puzzleAreaContents[i].setAttribute("class", "puzzlepiece");
        puzzleAreaContents[i].style.top = y+"px" ;
        puzzleAreaContents[i].style.left = x+"px" ;
        puzzleAreaContents[i].style.backgroundPosition = "-"+x+"px "+"-"+y+"px" ;
        if (x==300)
        {var y = y + 100; 
         var x = 0; }
        else{var x = x + 100;}
      }
      document.getElementById("puzzlearea").innerHTML = document.getElementById("puzzlearea").innerHTML + "<div class='empty'></div>"
      addEventListeners(getArrayOfMovableCells());
    }

  document.getElementById("shufflebutton").onclick = function(){shuffle(shuffleTracker);}
  initializePuzzleArea();
}
}