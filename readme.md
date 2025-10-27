###**PG29 T1 Intro to HTML - A3: Minesweeper**
Submitted by: <PG29Felipe> Juan Felipe Garcia Martinez
Date: 26/10/2025
----------
This project is a web page in which you can play Minesweeper, find the rules and the history of the game.

####**Download/Install**
---------
 - git repo: https://github.com/PG29felipe/Minesweeper.git


####**How to use**
--------
1. Clone the repo.
2. in the folder you cloned the repo in, open the command line.
3. execute the following command: npx http-server -c-1 (Make sure you have node and the npx library instaled).
4. go to one of the returned sockets (i.e: 127.0.0.1:8080) in your web browser.
5. There you will find the minesweeper page.
6. to start the game, click any cell of the game board.
7. the timer on the left will start running.
8. the amount of flags to mark mines is on the right.
9. if you click a mine, you lose and the timer will stop and the button will show a "dead" face.
10. a cell will show the amount of mines it has around it.
11. if you click a cell without mines around it, it's neighbour cells without mines around them will be revealed until cells with bombs around them are revealed (propagation)
12. reveal all the cells that are not mines to win, the timer will stop turn green.
13. left click to flag an unrevealed cell.
14. left click a flagged cell to unflag it.
15. click the happy face button to restart the game.
16. in side bar you will find all the sections of the page, click any of the options in the side bar to navigate to it's corresponding section in the page.
17. in the footer section of the page you will find links to my linkedIn page, HTML development resources and minesweeper stats.

