// player object holds properties used in the draft, updating html on the divs, and updating myPlayer info.
var player = {
  team: 'NA', // not set until draft.
  rookieTeam: 'NA', // not set until draft.
  pick: 0, // not set until draft.
  effect: 0,
  yearsPro: {
    count: 1,
    id: "#yp",
    label: "Years Pro: "
  },
  overall: {
    count: 0,
    id: "#mpo",
    label: "Overall: "
  },
  allstars: {
    count: 0,
    id: "#ag",
    label: "Allstar Games: "
  },
  playoffs: {
    count: 0,
    id: "#pb",
    label: "Playoff Births: "
  },
  stanleys: {
    count: 0,
    id: "#sc",
    label: "Stanley Cups: "
  }
};

/**
  * updateMyPlayer() updates the html of the myPlayer link.
  * Uses properties of player that have the property 'label'.
  */
function updateMyPlayer() {
  for (var cat in player) {
    if (player[cat].hasOwnProperty('label')) {
      $(player[cat].id).html(player[cat].label + player[cat].count);
    }
  }
}

// Variable used for setting players starting attributes.
var ratingStart = 60, ratingFlux = 10;
var offense = "offense", defense = "defense", athletics = "athletics";

/**
  * skills object holds all nine player attribute used for setting/updating player ratings.
  * Contains IDs and labels for updating the HTML of the playerAttributes div.
  * Each attrbiute has a click handler for updating player attributes on every button click.
  */
var skills = {
  shooting: { 
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#shooting",
    label: "Shooting: ",
    type: offense,
    clickHandler: function() {
      addSkillPoint(skills.shooting);
    }
  },
  passing: {
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#passing",
    label: "Passing: ",
    type: offense,
    clickHandler: function() {
      addSkillPoint(skills.passing);
    }
  },
  handling: {
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#handling",
    label: "Handling: ",
    type: offense,
    clickHandler: function() {
      addSkillPoint(skills.handling);
    }
  },
  checking: {
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#checking",
    label: "Checking: ",
    type: defense,
    clickHandler: function() {
      addSkillPoint(skills.checking);
    }
  },
  positioning: {
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#positioning",
    label: "Positioning: ",
    type: defense,
    clickHandler: function() {
      addSkillPoint(skills.positioning);
    }
  },
  takeaway: {
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#takeaway",
    label: "Takeaway: ",
    type: defense,
    clickHandler: function() {
      addSkillPoint(skills.takeaway);
    }
  },
  speed: {
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#speed",
    label: "Speed: ",
    type: athletics,
    clickHandler: function() {
      addSkillPoint(skills.speed);
    }
  },
  strength: {
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#strength",
    label: "Strength: ",
    type: athletics,
    clickHandler: function() {
      addSkillPoint(skills.strength);
    }
  },
  endurance: {
    rating: Math.floor(Math.random() * ratingFlux + ratingStart),
    id: "#endurance",
    label: "Endurance: ",
    type: athletics,
    clickHandler: function() {
      addSkillPoint(skills.endurance);
    }
  }
};

/**
  * overallSkills object holds 4 attribute averages used for updating player overall ratings.
  * Contains IDs and labels for updating the HTML of the playerAttributes div.
  */
var overallSkills = {
  offense: {
    rating: 0,
    id: "#overallOffense",
    label: "Offense: "
  },
  defense: {
    rating: 0,
    id: "#overallDefense",
    label: "Defense: "
  },
  athletics: {
    rating: 0,
    id: "#overallAthletics",
    label: "Athlete: "
  },
  overall: {
    rating: 0,
    id: "#playerOverall",
    label: "Player Overall: "
  }
}

// skillClickHandler() loops through all properties of skills and sets up a click handler for each.
function skillClickHandler() {
  for (var attr in skills) {
    $(skills[attr].id).on('click', skills[attr].clickHandler);
  }
}

/** 
  * addSkillPoint() is invoked from the skill's property's click handler.
  * Receives parameter skill, which is the property of the skills object that was clicked.
  * skill has its own property, rating, which is increased.
  * Then invokes the function getNewSkillsRating() and passes the overallSkills object.
  */
function addSkillPoint(skill) {
  if (attributePoints > 0){
    skill.rating++;
    attributePoints--;
    getNewSkillsRating(overallSkills);
  }
}

// resetOveralls() receives overallSkills object as a parameter.
// Loops through each property of overallSkills and sets the rating property to 0.
function resetOveralls(ovr) {
  for (var type in ovr) {
    ovr[type].rating = 0;
  }
}

/**
  * getNewSkillsRating() is invoked from addSkillPoint().
  * Receives overallSkills object as a parameter.
  * Resets the player overall ratings prior to updating.
  * Loops through each property of the skills object to get overall ratings.
  * Checks overall rating achievements, invokes the editPLayerAttributesDiv(), and updates myPLayer.
  */
function getNewSkillsRating(ovr) {
  resetOveralls(ovr);
  for (var attr in skills) {
    if (skills[attr].type === offense) {
        ovr.offense.rating += skills[attr].rating;
    }
    if (skills[attr].type === defense) {
        ovr.defense.rating += skills[attr].rating;
    }
    if (skills[attr].type === athletics) {
        ovr.athletics.rating += skills[attr].rating;
    }
  }
  
  ovr.offense.rating = Math.floor(ovr.offense.rating / 3);
  ovr.defense.rating = Math.floor(ovr.defense.rating / 3);
  ovr.athletics.rating = Math.floor(ovr.athletics.rating / 3);
  ovr.overall.rating = Math
    .floor((ovr.offense.rating + ovr.defense.rating + ovr.athletics.rating) / 3);
    
  checkOverallRating(overallSkills);
  editPlayerAttributesDiv(overallSkills);
  player.overall.count = ovr.overall.rating;
  updateMyPlayer();
}

/**
  * editPlayerAttributesDiv() is invoked from the getNewSkillsRating().
  * Receives the overallSkills object as a parameter.
  * Loops through each property in the object and updates the HTML of the playerAttributes div.
  * Invokes editAttributePointHTML();
  */
function editPlayerAttributesDiv(ovr) {
  for (var attr in skills) {
    $(skills[attr].id).html(skills[attr].label + skills[attr].rating);
  }
  
  for (var type in ovr) {
    $(ovr[type].id + "> h3").html(ovr[type].label + ovr[type].rating);
  }
  
  editAttributePointHTML();
}

// editAttributePointHTML() is invoked from editPlayerAttributesOverall() or close().
// Is updated after every time a skill is increased and after every game.
function editAttributePointHTML() {
  $("#attributePoints > h3").html("Attribute Points: " + attributePoints);
}

// linkClickHandler() loops through all properties of links object and sets up a click handler for each.
function linkClickHandler() {
  for (var item in links) {
    $(links[item].id).on('click', links[item].clickHandler);
  }
}

/**
  * links object holds the links for all the buttons on the game's main div.
  * Contains id and active properties used to set up permissions for clicking on links.
  * Each link has a click handler used for adding opacity and displaying each link's associated div.
  */
var links = {
  playerStats: {
    active: false,
    id: "#playerStatsLink",
    clickHandler: function() {
      togglePlayerStats();
    }
  },
  improvePlayer: {
    active: false,
    id: "#improvePlayerLink",
    clickHandler: function() {
      toggleImprovePlayer();
    }
  },
  myPlayer: {
    active: false,
    id: "#myPlayerLink",
    clickHandler: function() {
      toggleMyPlayer();
    }
  },
  playGame: {
    active: false,
    id: "#playGameLink",
    clickHandler: function() {
      togglePlayGame();
    }
  },
  playoffGame: {
    active: false,
    id: "#playoffGameLink",
    clickHandler: function() {
      togglePlayoffGame();
    }
  }
};

/**
  * togglePlayerStats() is a click handler invoked as a property of the links object.
  * Checks if the link is inactive (gray), if not, invokes the callback function getLeaveGray().
  * Updates the stats div and toggles it to show.
  */
function togglePlayerStats() {
  if (!$(links.playerStats.id).hasClass('gray')) { 
    getLeaveGrayID(seasonEnd, links.playerStats, links, toggleLinksGray);
    updateStatsDiv();
    $("#playerStats").toggle();
  }
}

// See description togglePlayerStats() (similar).
function toggleImprovePlayer(){
  if (!$(links.improvePlayer.id).hasClass('gray')) {
    getLeaveGrayID(seasonEnd, links.improvePlayer, links, toggleLinksGray);
    
    // Invokes editAttributePointHTML() - updates the HTML of the attributePoints div. 
    editAttributePointHTML();
    $("#improvePlayer").toggle();
  }
}

// See description togglePlayerStats() (similar).
function toggleMyPlayer() {
  if (!$(links.myPlayer.id).hasClass('gray')) {
    getLeaveGrayID(seasonEnd, links.myPlayer, links, toggleLinksGray);
    updateCareerStats();
    $("#myPlayer").toggle();
  }
}

/**
  * togglePlayGame() is a click handler invoked as a property of the links object.
  * Checks if the link is inactive (gray), if not, invokes the callbac function getLeaveGray().
  * Hides the gameStats and close div in play. Toggles the play game div to show.
  * Updates the season and game number of the HTML of the div.
  * Checks if an opponent has been picked and then updates the HTML with opponent name.
  */
function togglePlayGame() {
  if (!$(links.playGame.id).hasClass('gray')) {
    getLeaveGrayID(seasonEnd, links.playGame, links, toggleLinksGray);
    $("#gameStats, #close").hide();
    $("#playGame, #gameNumber, #scoreLine").toggle();
    $("#gameNumber h2").html("Season " + stats.count.seasons + " - Game #" + (stats.season.games+1));
    $("#teamH").html(player.team);
    if (opponentPicked === false){
        $("#teamV").html(opponents[Math.floor(Math.random()*opponents.length)]);
    }
    
    opponentPicked = true;
  }
}
    
// See description togglePlayGame() (similar).
function togglePlayoffGame() {
  if (!$(links.playoffGame.id).hasClass('gray')) {
    getLeaveGrayID(seasonEnd, links.playoffGame, links, toggleLinksGray);
    $("#gameStats, #close").hide();
    $("#playGame, #gameNumber, #scoreLine").toggle();
    $("#gameNumber h2").html(playoffRounds[stats.series.round] + " - Game #" + (stats.series.games+1));
    if (playoffOpponentPicked === false){
        $("#teamV").html(opponents[Math.floor(Math.random()*opponents.length)]);
    }
    
    playoffOpponentPicked = true;
  }
}

/**
  * getLeaveGrayID() is a callback (helper) function.
  * Takes a boolen, 2 objects, and a function as parameters respectively.
  * Determines which play game link will remain gray.
  * Invokes callbackLinks() and passes the new variable and 2 objects as parameters respectively.
  */
function getLeaveGrayID(seasonEnd, clickedLink, linksObj, callbackLinks) {
  var leaveGray;
  leaveGray = (seasonEnd) ? "#playGameLink" : "#playoffGameLink";
  callbackLinks(leaveGray, clickedLink, linksObj);
}

/**
  * toggleLinksGray() is invoked from a callback function.
  * Receives a string and 2 objects as parameters.
  * Determines if the link clicked is active or inactive.
  * If inactive, loops through each property of the linksObj and adds the class gray.
  * Does not add the class gray to the clicked link.
  * If active, loops through each property of the linksObj and removes the class gray.
  * Except for the link clicked and the link's id that was passed as leaveGray.
  */
function toggleLinksGray(leaveGray, clickedLink, linksObj) {
  if (!clickedLink.active) {
    clickedLink.active = true;
    for (var item in linksObj) {
      if (linksObj[item].id !== clickedLink.id) {
        $(linksObj[item].id).addClass('gray');
      }
    }
  } else {
    clickedLink.active = false;
    for (var item in linksObj) {
      if (linksObj[item].id !== clickedLink.id && linksObj[item].id !== leaveGray) {
        $(linksObj[item].id).removeClass('gray');
      }
    }
  }
}

/** 
  * updateCareerStats() is invoked from toggleMyPLayer().
  * Selects each below item by id and updates the HTML for the myPlayer Div.
  */
function updateCareerStats() {
  $("#cGames").html(stats.career.games);
  $("#cWins").html(stats.career.wins);
  $("#cGoals").html(stats.career.goals);
  $("#cAssists").html(stats.career.assists);
  $("#cPoints").html(stats.career.points);
  $("#cHits").html(stats.career.hits);
  $("#cShots").html(stats.career.shots);
}

// Variable unlockAlert holds beginning string used for each achievement alert.
var unlockAlert = "You have unlocked the ";
    
/**
  * achievements object contains 12 unlockable achievements as properties.
  * Each property holds a boolean - unlocked, an alert, and an id.
  * Is used in the unlockAchievements() function to display achievement to myPLayer div.
  */
var achievements = {
  playoffs: {
    unlocked: false,
    alert: unlockAlert + "Playoffs Achievement!",
    id: "#achievePlayoffs"
  },
  stanleyCup: {
    unlocked: false,
    alert: unlockAlert + "Stanley Cup Winner Achievement!",
    id: "#achieveStanleyCup"
  },
  wins50: {
    unlocked: false,
    alert: unlockAlert + "50 Wins Achievement!",
    id: "#achieve50Wins"
  },
  wins100: {
    unlocked: false,
    alert: unlockAlert + "100 Wins Achievement!",
    id: "#achieve100Wins"
  },
  overall85: {
    unlocked: false,
    alert: unlockAlert + "85 Overall Rating Achievement!",
    id: "#achieve85Overall"
  },
  overall99: {
    unlocked: false,
    alert: unlockAlert + "99 Overall Rating Achievement!",
    id: "#achieve99Overall"
  },
  allStar: {
    unlocked: false,
    alert: unlockAlert + "All Star Achievement!",
    id: "#achieveAllStar"
  },
  captain: {
    unlocked: false,
    alert: unlockAlert + "Captain Achievement!",
    id: "#achieveCaptain"
  },
  rocket: {
    unlocked: false,
    alert: unlockAlert + "Rocket Richard Achievement!",
    id: "#achieveRocket"
  },
  mvp: {
    unlocked: false,
    alert: unlockAlert + "MVP Achievement!",
    id: "#achieveMVP"
  },
  finalsMVP: {
    unlocked: false,
    alert: unlockAlert + "Finals MVP Achievement!",
    id: "#achieveFinalsMVP"
  },
  legend: {
    unlocked: false,
    alert: unlockAlert + "Legend Achievement!",
    id: "#achieveLegend"
  }
}
    
/**
  * unlockAchievements() is invoked from various locations in the code depending on user progress.
  * The funciton recieves a property of the achievements object as a parameter.
  * Has condtional to check if achivement has previosly been earned.
  * Alert the user of the achievement.
  * Removes the class locked, which is an opacity filter.
  * Sets the property, unlocked, to true to avoid multiple alerts of the achievement.
  */
function unlockAchievement(type) {
  if (type.unlocked === false) {
    alert(type.alert);
    $(type.id).removeClass('locked');
    type.unlocked = true;
  }
}

/**
  * simButtons object holds the buttons for each part of the simulation of playGame or playoffGame div.
  * Each button has an id and click handler used for proceeding to the next step in the game simulation.
  */
var simButtons = {
  play: {
    id: "#play",
    clickHandler: function() {
      play();
    }
  },
  gameStats: {
    id: "#gameStats",
    clickHandler: function() {
      gameStats();
    }
  },
  close: {
    id: "#close",
    clickHandler: function() {
      close();
    }
  }
};

// simClickHandler() loops through all properties of simButtons object and sets up a click handler for each.
function simClickHandler() {
  for (var button in simButtons) {
    $(simButtons[button].id).on('click', simButtons[button].clickHandler);
  }
}

// play() is a funtion invoked by a click handler and begins the simulation of a season/playoff game.
function play() {
  // Loops through each property of the links objects and adds the class gray,
  // restricting the user from clicking any buttons during the simulation.
  for (var item in links) {
    $(links[item].id).addClass('gray');
  }

  // Sets opponentPicked to false to allow for a new random opponenet for next simulation game.
  opponentPicked = false;

  // Hides the play button to restrict user from clicking again.
  $(simButtons.play.id).hide();

  // Invokes the simulationGame() callback function and passes goalsByPeriod and playerGameStats
  simulateGame(goalsByPeriod, playerGameStats);
  
  // invokes determineWinner() which randomizes the result of the game and determines what team wins.
  determineWinner();

  /**
    * setTimeout() used to display the score of the game one period at a time at the speed of the user's liking.
    * Updates the html of the current period as well as the final score with respect to how many periods are displayed.
    */
  setTimeout(function(){
    $(period.away.one.id).html(period.away.one.score);
    $(period.home.one.id).html(period.home.one.score);
    $(period.away.final.id).html(period.away.one.score);
    $(period.home.final.id).html(period.home.one.score);
    setTimeout(function(){
      $(period.away.two.id).html(period.away.two.score);
      $(period.home.two.id).html(period.home.two.score);
      $(period.away.final.id).html(period.away.one.score + period.away.two.score);
      $(period.home.final.id).html(period.home.one.score + period.home.two.score);
      setTimeout(function(){
        $(period.away.three.id).html(period.away.three.score);
        $(period.home.three.id).html(period.home.three.score);
        $(period.away.final.id).html(period.away.reg.score);
        $(period.home.final.id).html(period.home.reg.score);
        
        // Conditional to check if game requires overtime and diplays the html accordingly.
        if (period.away.reg.score === period.home.reg.score) {
          setTimeout(function(){
            $(period.away.ot.id).html(period.away.ot.score);
            $(period.home.ot.id).html(period.home.ot.score);
            $(period.away.final.id).html(period.away.final.score);
            $(period.home.final.id).html(period.home.final.score);
          }, gamespeed);
        }
        
        setTimeout(function(){
          //  Displays the Div showing the result of the game and the stats button.
          $("#teamWins, #gameStats").show();
        }, gamespeed);
      }, gamespeed);
    }, gamespeed);
  }, gamespeed);  
}         
      
// gameStats() is a funtion invoked by a click handler and shows the stats of the simulated season/playoff game. 
function gameStats() {
  // Hides the stats button to restrict multiple clicks on it.
  $("#gameStats").hide();
  
  // Selects each element by id and updates the gameStats div with the appropriate html.
  $("#playerName").html(player.lastName);
  $("#gameGoals").html(stats.sim.goals);
  $("#gameAssists").html(stats.sim.assists);
  $("#gamePoints").html(stats.sim.points);
  $("#gameHits").html(stats.sim.hits);
  $("#gameShots").html(stats.sim.shots);
  
  // Shows the player stats for the simulated game in the updated gameStats div.
  $("#statLine, #close").show();
  
  // Checks if the player earned attribute points that game and alerts the user if true.
  if (stats.sim.points > 0) {
    $("#attributesEarned").show();
  }
}

// gameStats() is a funtion invoked by a click handler and hides the playGame/playoffGame div.
function close(){
  $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned").hide();

  // Invokes resestGame() - Resets the html for the next game to a blank scorebaord with "-"s.
  resetGame();
  
  // Hides the close button and displays the play button in preperation for the next game.
  $(simButtons.close.id).hide();
  $(simButtons.play.id).show();
  
  links.playGame.active = false;
  links.playoffGame.active = false;
  
  // Invokes updateTeamRecord() - Updates the team record in upper right of the main div.
  updateTeamRecord();

  // Invokes toggleGrayEndOfGame() - Adds/removes the class 'gray' to the appropriate links. 
  toggleGrayEndOfGame();

  // Invokes earnedAttributePoints() - Awards the player with attribute points based on performance.
  earnedAttributePoints();
  
  // invokes increaseGameCount() - Increases game count for season/playoffs/series
  increaseGameCount();
  
  // Invkokes checkAllstar() - Checks to see if player earned allstar for the season.
  checkAllStar();

  // Conditional to check if the season has ended.
  if(stats.season.games >= seasonLength){
    seasonEnd = true;
    
    // Invokes checkRocketAward() - Checks to see if player earned award for averaging a goal per game.
    checkRocketAward();
    
    // Invokes checkMVP() -  Checks to see if player earned a point per game and made playoffs.
    checkMVP();
    
    // Conditional to see if player won enough games to qualify for playoffs.
    if(stats.season.wins >= winsToQualify){
      // Invokes playoffQualify() - Puts player on track for playoffs.
      playoffQualify();
    } else {
      // Invokes playoffDidNotQualify() - Puts player on track for a new season.
      playoffDidNotQualify();      
    } 
  }
  
  // Conditional - Checks if player won required games to win series and required series to win the stanley cup.
  if (stats.playoffs.wins === winsToAdvance && stats.series.round === 3) {
    wonStanleyCup();
    
    // Conditional - Checks if player won required games to win series.
  } else if (stats.playoffs.wins === winsToAdvance) {
    // Puts player on path to begin next playoff series.
    wonPlayoffSeries();
    
    // Conditional - Checks if the player lost required games to lose series.
  } else if (stats.playoffs.losses === winsToAdvance){
    // Puts players on path to begin next season.
    lostPlayoffSeries();
  }
}

/**
  * determineWinner() is invoked from the play function.
  * Uses conditionals to set variable used to update the html of the gameStats div.
  */
function determineWinner() {
  if (period.home.reg.score > period.away.reg.score){
    var resultLabel = " Win";
    var result = "wins";
    var playoffResult = "wins";
  } else if (period.home.reg.score < period.away.reg.score){
    var resultLabel = " Lose";
    var result = "losses";
    var playoffResult = "losses";
  } else {
    if (period.home.ot.score > period.away.ot.score){
      var resultLabel = " Win in Overtime";
      var result = "wins";
      var playoffResult = "wins";
    } else {
      var resultLabel = " Lose in Overtime";
      var result = "lossesOT";
      var playoffResult = "losses";
    }
  }

  $("#teamWins h3").html("" + player.team + resultLabel);
  
  // Adds to career games and career/season/playoffs based on outcome.
  stats.career.games++;
  stats.career[result]++;
  if (seasonEnd === false) {
    stats.season[result]++;
  } else {
    stats.playoffs[playoffResult]++;
  }
  
  // Invokes checkWinsTotal() - Check if player has reached the required wins for the achievement.
  checkWinsTotal();
}

/**
  * toggleGrayEndOfGame() invoked after completed season/playoff game.
  * Checks if in season or playoffs. Removes 'gray' class from appropriate links.
  */
function toggleGrayEndOfGame() {
  $("#improvePlayerLink, #playerStatsLink, #myPlayerLink").removeClass('gray');
  if (seasonEnd === false){
    $("#playGameLink").removeClass('gray');
  } else {
    $("#playoffGameLink").removeClass('gray');
  }
}

/**
  * earnedAttributePoints() invoked when gameStats button clicked.
  * Adds attribute points based on player performance in simulation game.
  */
function earnedAttributePoints() {
  if (stats.sim.points > 3) {
    attributePoints += 2;
  }
  
  if (stats.sim.points > 0) {
    attributePoints++;
  }
}

// increaseGameCount() invoked from the close funciton. Adds a game to season/playoff/series as appropriate.
function increaseGameCount() {
  if (seasonEnd === false) {
    stats.season.games++;
  } else {
    stats.playoffs.games++;
    stats.series.games++;
  }
}

/**
  * updateTeamRecord() is invoked after every game.
  * Updates the team record as appropriate for regular season or playoffs.
  */
function updateTeamRecord() {
  if (seasonEnd === false){
    $("#record").html("Team Record: " + stats.season.wins + "-" + 
                      stats.season.losses + "-" + stats.season.lossesOT);
  } else {
    $("#record").html("Playoff Series: " + stats.playoffs.wins + "-" + 
                      stats.playoffs.losses);
  }
}

/**
  * resetGame() is invoked from the close() function.
  * Loops through each property's property of period object if it has the id property,
  * and changes the html to "-" in preperation for the next game.
  */
function resetGame(){
  for (var loc in period) {
    for (var num in period[loc]) {
      if (period[loc][num].hasOwnProperty('id')) {
         $(period[loc][num].id).html("-")
      }
    }
  }
}

/**
  * playoffDidNotQualify() is invoked from the close() function. 
  * Is invoked only if player had fewer than the required wins for playoffs.
  * Alerts user they missed playoffs and why.
  */
function playoffDidNotQualify() {
  alert("You did not qualify for the playoffs this year.\n\nYou won "
       + stats.season.wins + " of the required " + winsToQualify + " wins to qualify for playoffs.\n\n"
       + "Better luck next year. Next season has begun.");
  
  // Invokes endOfSeason() - Invokes a variety of functions to update divs and prepare for next season.
  endOfSeason();
}

/**
  * playoffQualify() is invoked from the close() function. 
  * Is invoked only if player had more than or equal to the required wins for playoffs.
  */
function playoffQualify() {
  // Conditional - Run only at first game of playoffs to avoid repeated funciton invocations.
  if (stats.playoffs.games === 0) {
    alert("You have qualified for the playoffs!\n\n You earned 3 attribute points.");
    player.playoffs.count++;
    attributePoints += 3;
    
    // Invokes unlockAchievement() - Passes property of achievement object as a parameter to award player.
    unlockAchievement(achievements.playoffs);
    
    // Invokes updateTeamRecord() - Updates the team record in upper right of the main div.
    updateTeamRecord();
    
    // Adds removes/adds the 'gray' class in preperation for the next season.
    $('#playGameLink').addClass('gray');
    $('#playoffGameLink').removeClass('gray');
  }
}

/**
  * wonStanleyCup() is invoked from the close() function. 
  * Is invoked only if player has won all 4 playoff series.
  */
function wonStanleyCup() {
  alert("You won the Stanley Cup!\n\n You earned 10 attribute points.");
  player.stanleys.count++;
  attributePoints += 10;
  
  // Invokes unlockAchievement() - Passes property of achievement object as a parameter to award player.
  unlockAchievement(achievements.stanleyCup);
  
  // Invocations check if the player has been awarded achievements based on performace.
  checkFinalsMVP();
  checkLegend();
  alert("End of playoffs. Begin Next Season");
  
  // Invokes endOfSeason() - Invokes a variety of functions to update divs and prepare for next season.
  endOfSeason();
}

/**
  * wonStanleyCup() is invoked from the close() function. 
  * Is invoked only if player has won the required games to win the series and not the Stanley Cup.
  */
function wonPlayoffSeries() {
  
  // resets wins, losses, and games to 0 for start of series and adds round to series.
  stats.playoffs.wins = 0;
  stats.playoffs.losses = 0;
  stats.series.games = 0;
  stats.series.round++;
  attributePoints += 3;
  alert("Congratulations you moved to the " +playoffRounds[stats.series.round] + 
        "!\n\nYou earned 3 attribute points.");
  
  // Invokes updateTeamRecord() - Updates the team record in upper right of the main div.
  updateTeamRecord();
  
  // Sets the playoffOpponentPicked to false to allow for a new team to be picked for the next series.
  playoffOpponentPicked = false;
}

/**
  * wonStanleyCup() is invoked from the close() function. 
  * Is invoked only if player has lost the required games to lose the series.
  */
function lostPlayoffSeries() {
  alert("You lost in the " + playoffRounds[stats.series.round]);
  alert("End of playoffs. Begin Next Season");
  
  // Invokes endOfSeason() - Invokes a variety of functions to update divs and prepare for next season.
  endOfSeason();
}

// endOfSeason() is invoked after player has either missed playoffs, been eliminated, or won Stanley Cup.
function endOfSeason() {
  
  // Invokes updateStatsDiv() - Updates player stats.
  updateStatsDiv();
  
  // Invokes resetSeasonPlayoffs() - Sets all season and playoff stats to 0 in prep for them to appended to the next season.
  resetSeasonPlayoffs();
  
  // Invokes appendStatLinesSeasonPlayoffs() - Adds HTML to the playerStats div for the next season and playoffs.
  appendStatLinesSeasonPlayoffs();
  
  // Invokes updateTeamRecord() - Updates the team record in upper right of the main div.
  updateTeamRecord();
  
  // Invokes updateMyPlayer() - Updates the HTML of all the myPlayer tags.
  updateMyPlayer();
  
  // Adds removes/adds the 'gray' class in preperation for the next season.
  $('#playGameLink').removeClass('gray');
  $('#playoffGameLink').addClass('gray');
}

/**
  * checkOverallRating() - Invoked from getNewSkillsRating() function.
  * Checks to see if your player reached a skill level milestones and rewards them accordingly.
  */
function checkOverallRating(ovr) {
  if (ovr.overall.rating >= 99) {
    // Increase player effect which adds to the total possible number of goals your team can score in a game by 2.
    player.effect = 2;
    unlockAchievement(achievements.overall99);
  } else if (ovr.overall.rating >= 85) {
    // Increase player effect which adds to the total possible number of goals your team can score in a game by 1.
    player.effect = 1;
    unlockAchievement(achievements.overall85);
  }
}

/**
  * checkWinsTotal() - Invoked from determineWinner() function.
  * Checks to see if your player reached a wins milestones and rewards them accordingly.
  */
function checkWinsTotal() {
  if (stats.career.wins >= 100) {
    unlockAchievement(achievements.wins100);
  } else if (stats.career.wins >= 50) {
    unlockAchievement(achievements.wins50);
  }
}

/**
  * checkAllStar() - Invoked from the close() function.
  * Checks to see player has averaged a point per game at the half way mark of the season and awards accordingly.
  */
function checkAllStar() {
  if (seasonLength/2 === stats.season.games) {
    if (stats.season.points >= stats.season.games) {
      player.allstars.count++;
      alert("You have been selected as an allstar this season!");
      unlockAchievement(achievements.allStar);
      
      // Invokes updateMyPlayer() - Updates the HTML of all the myPlayer tags.
      updateMyPlayer();
      
      // Invokes checkLegend() - this checks for legend achievement as allstar appearances is a conditional.
      checkLegend();
    }
  }
}

/**
  * checkFinalsMVP() - Invoked from the wonStanleyCup() function.
  * Checks to see if player has averaged a point per game throughout the playoffs and awards accordingly.
  */
function checkFinalsMVP() {
  if (stats.playoffs.points >= stats.playoffs.points) {
    alert("You have been selected as an Conn Smythe Winner as the " +
          "Stanley Cup Finals MVP!");
    unlockAchievement(achievements.finalsMVP);
  }
}

/**
  * checkLegend() - Invoked from the checkAllStar(), wonStanleyCup(), assistsThisGame() functions.
  * Checks to see if player has met the requirements for allstar appearances,
  * Stanley Cups, and career points and awards accordingly.
  */
function checkLegend() {
  if (stats.career.points >= 500 && player.allstars.count >= 7 && player.stanleys.count >= 3){
    unlockAchievement(achievements.legend);
  }
}

/**
  * checkRocketAward() - Invoked from the close() function.
  * Checks to see if player has averaged a goal per game at end of season and awards accordingly.
  */
function checkRocketAward() {
  if (stats.season.goals >= seasonLength && stats.playoffs.games === 0) {
    alert("You have been awarded the Rocket Richard Trophy for " +
          "the most goals by any player this season with " + stats.season.goals + " goals!");
    unlockAchievement(achievements.rocket);
  }
}

/**
  * checkMVP() - Invoked from the close() function.
  * Checks to see if player has averaged a point per game at end of season and qualified for the playoffs,
  * and awards accordingly.
  */
function checkMVP() {
  if (stats.season.points >= seasonLength && stats.season.wins >= winsToQualify && stats.playoffs.games === 0){
    alert("You have been awarded the Hart Memorial Trophy for " +
          "being selected the league's the most valuable player " + 
          "in the regular season with " + stats.season.points + " points!");
    unlockAchievement(achievements.mvp);
  }
}

/**
  * checkCaptain() - Invoked from the resetSeasonPlayoffs() function.
  * Checks to see if player has completed their 7th season with the same team.
  */
function checkCaptain() {
  // Conditional that checks to see if the user has reached their 7th seaon.
  if (stats.count.seasons === 8 && player.team === player.rookieTeam) {
    alert("You have just finished your 7th season with the " + player.team +
         ".\n\nYour teammates have voted and you have been named Captain!");
    unlockAchievement(achievements.captain);
  }
}

// Array of possible opponenets. Randomly chosen for season/playoff games.
var opponents = ["Senators", "Lightning", "Bruins", "Canadiens", "Red Wings", "Panthers", "Sabres",
                 "Maple Leafs", "Rangers", "Capitals", "Penguins", "Devils", "Islanders",
                 "Flyers", "Hurricanes", "Jackets", "Stars", "Blues", "Wild", "Predators",
                 "Jets", "Blackhawks", "Avalanche", "Kings", "Canucks", "Coyotes", "Ducks",
                 "Flames", "Oilers", "Sharks"];

// Booleans used to determine is a playoff/season opponent has been chosen.
var opponentPicked = false, playoffOpponentPicked = false;

// Variables set in submitGames(). Used as a conditinoal for season/playoff end and achievements.
var seasonLength, playoffLength, winsToQualify, winsToAdvance;

// Variable used for updating player attributes.
var attributePoints = 9;

// Boolean used in submitForm() and validateForm() to determine user input allowed.
var formValidated = true;

// Variable for setting simulation speed. Can be adjusted via the faster/slower buttons.
var gamespeed = 500;

// Arrays of IDs used to update and append season and playoff stats.
var seasonStatIDs = ["#seasonNum", "#seasonGames", "#seasonGoals", "#seasonAssists",
                     "#seasonPoints", "#seasonHits", "#seasonShots"];
var playoffStatIDs = ["#playoffNum", "#playoffGames", "#playoffGoals", "#playoffAssists",
                      "#playoffPoints", "#playoffHits", "#playoffShots"];

// Array of strings used to notify user what playoff round they are in.
var playoffRounds = ["Conference Quarterfinals", "Conference Semifinals",
                     "Conference Finals", "Stanley Cup Finals"];

// Boolean for determining if game played in regular season or playoffs.
var seasonEnd = false;

// Used in game simulation to determine user chance of registering stats.
var goalChance, assistChance, hitChance, shotChance, teamGoalsLeft;

/**
  * getRandomTeamPick() - First invoked when document is ready.
  * Randomly selects player's team and draft #.
  * Uses native splice() method to remove the selected team from possible opponents.
  */
function getRandomTeamPick() {
  var temp = Math.floor(Math.random() * 30);
  player.team = opponents[temp];
  player.rookieTeam = player.team;
  opponents.splice(temp, 1);
  player.pick = Math.ceil(Math.random() * 30);
}

/** welcome() - Invoked when 'Continue to Draft Form' buttton is clicked.
  * Hides the welcome screen/div and shows the draft form screen/div.
  */
function welcome() {
  $("#draft").show();
  $("#welcome").hide();
}

/** submitForm() - Invoked when 'Continue to Draft Day' button is clicked.
  * event is passed as a parameter to prevent the button from submitting the form.
  * Invokes validateForm() to verify user filled out form appropriately.
  * Sets properties of player object based on form.
  */  
function submitForm(event) {
  event.preventDefault();
  validateForm();
  player.firstName = $("#firstName").val();
  player.lastName = $("#lastName").val();
  player.position = $("input[type='radio'][name='position']:checked").val();

  // Conditional that if false directs user to submit again. If true, shows draft day div.
  if (formValidated === true) {
    $("#welcome, #draft").hide();
    $("#chooseGames").hide();
    $("#pick").show();
  } else {
    $("#draft").show();
  }
  
  //Updates HTML to main div for player name based on form.
  $("#playerInfoLink h3").html(player.firstName + " " + player.lastName);
}
  
/** validateForm() - Invoked from submitForm().
  * Checks to see if first and last name in form are filled out using only letters.
  * If false, alerts user instructions. if true allows user to progress.
  */
function validateForm() {
  var first = document.forms["draftForm"]["firstName"].value;
  var last = document.forms["draftForm"]["lastName"].value;
  var regex = /^[a-zA-Z]+$/;
  if (!first.match(regex) || !last.match(regex)) {
    alert("Please input a full name. No numbers, special characters, or spaces");
    formValidated = false;
  } else {
    formValidated = true;
  }
}

/** beginDraft() - Invoked when 'Begin Draft' button is clicked.
  * Hides 'Begin Draft button. Appends the draft results and final form.
  * Allows user to select games per season and games per playoff series.
  */
function beginDraft() {
  $("#beginDraft").hide();
  $("#draftDetails").append("<br><br><br><h3>With the number " + player.pick + " pick of the NHL draft...<br><br>The " +
             player.team + " select " + player.position + "...</h3><br><br><h1>" + player.firstName + 
             " " + player.lastName + "!</h1><br><br><br><form id='seasonLengthForm'>");
  $("#chooseGames").show();
  $("#submitGames").show();
}

/** validateForm() - Invoked when 'Lets Start Playing' button is clicked().
  * event is passed as a parameter to prevent the button from submitting the form.
  * sets the value of seasonLength and playofflength based on radio of input selected.
  * Uses the value os seasonLength and playofflength to set num wins for playoffs and series victory.
  * Hides all pregame divs and shows the main divs to the user.
  */
function submitGames(event) {
  event.preventDefault();
  seasonLength = Number($("input[type='radio'][name='length']:checked").val());
  winsToQualify = seasonLength/2;
  playoffLength = Number($("input[type='radio'][name='series']:checked").val());
  winsToAdvance = Math.ceil(playoffLength/2);
  $("#welcome, #draft, #pick").hide();
  $("#playerInfoLink, #playGameLink, #improvePlayerLink, #playoffGameLink," +
      "#playerStatsLink, #teamRecordLink, #myPlayerLink, #info").show();
}

// DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY // // DOCUMENT IS READY //
$(document).ready(function() {
  // Hides all divs except for the welcome div.
  $("#playerInfoLink, #playGameLink, #myPlayerLink, #improvePlayerLink, #playoffGameLink," +
    "#playerStatsLink, #teamRecordLink, #pick, #draft, #submitGames, #info, #myPlayer").hide();
  
  // Invokes getRandomTeamPick() - Randomizes the team and pick the player will be drafted prior to the draft.
  getRandomTeamPick();

  // When 'Continue to Draft Form' button is clicked, user is taken to NHL Draft Form.
  $("#welcomeNext").on('click', function(){
    welcome();
  });

  // When 'Continue to Draft Day' button is clicked, user is taken to Draft Day.
  $("#submitForm").click(function(event){
    submitForm(event);
  });
    
  // When 'Begin Draft' button is clicked, user is shown draft results and season/playoff form.
  $("#beginDraft").on('click', function(){
    beginDraft();
  });
    
  // When 'Lets Start Playing' button is clicked, user is taken to the main game screen.
  $("#submitGames").click(function(event){
    submitGames(event);
  });
  
  // Slows the simulation speed of the game by 1/10 of a second per period up to as slow as 1 second per period.
  $("#slower").on('click', function(){
    if (gamespeed < 1000){
      gamespeed += 100;
    } else {
      alert ("This is the slowest speed you can simulate at.")
    }
  });
  
  // Quickens simulation speed by 1/10 of a second per period up to as fast '0' seconds per period.
  $("#faster").on('click', function(){
    if (gamespeed > 0){
      gamespeed -= 100;
    } else {
      alert ("This is the fastest speed you can simulate at.")
    }
  });

  // Hides the divs for the playGame, playerStats, and improvePlayer link when the page loads
  $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned," +
    "#playerStats, #improvePlayer, #pick, #draft").hide();
  
  // Invokes updateMyPlayer() - Updates the HTML of all the myPlayer tags.
  updateMyPlayer();
  
  // Invokes getNewSkillsRating() - Updates player rating and associated HTML for the playerAttributes div.
  getNewSkillsRating(overallSkills);
  
  // skillClickHandler() - Sets up a click handler for each button is the playerAttributes div.
  skillClickHandler();
  
  // linkClickHandler() - Sets up a click handler for each link is the main div.
  linkClickHandler();
  
  // simClickHandler() -  Sets up a click handler for each button in game simulation.
  simClickHandler();
});

/**
  * period object - Has properties for ids and scores of home and away team used to determine 
  * simualtion game score and update the html of the game stats.
  */
var period = {
  home: {
    reg: { score: 0 },
    one: { id: "#period1H", score: 0 },
    two: { id: "#period2H", score: 0 },
    three: { id: "#period3H", score: 0 },
    ot: { id: "#periodOTH", score: 0 },
    final: { id: "#periodFH", score: 0 }
  },
  away: {
    reg: {score: 0},
    one: { id: "#period1V", score: 0 },
    two: { id: "#period2V", score: 0 },
    three: { id: "#period3V", score: 0 },
    ot: { id: "#periodOTV", score: 0 },
    final: { id: "#periodFV", score: 0 }
  }
}


    
/**
  * simulateGame() is invoked from play() function as a callback (helper) function and passed two functions as parameters.
  * goalsByPeriod() and playerGameStats() functions are passed respectively.
  * Both functions use the randomized/simulated score in their funcitons.
  */
function simulateGame(callback1, callback2) {
  // Home and away score are each randomized.
  period.home.reg.score = Math.round(Math.random() * (5 + player.effect));
  period.away.reg.score = Math.round(Math.random() * 5);

  // If both teams have same score, one team randomly receives an overtime goal.
  if(period.home.reg.score === period.away.reg.score) {
    if(Math.random() > 0.5) {
      period.home.ot.score = 1;
      period.away.ot.score = 0;
    } else {
      period.home.ot.score = 0;
      period.away.ot.score = 1;
    }
  } else {
    period.home.ot.score = 0;
    period.away.ot.score = 0;
  }
  
  period.home.final.score = period.home.reg.score + period.home.ot.score;
  period.away.final.score = period.away.reg.score + period.away.ot.score;
  
  // Performs a callback of function goalsByPeriod() and passes the period object as a parameter.
  callback1(period);

  // Performs a callback of function playerGameStats() home team's final score and function goalsThisGame() as parameters. 
  callback2(period.home.final.score, goalsThisGame);
}    
    
/** 
  * goalsByPeriod() is invoked from simulateGame function as a callback function. Receives the period object as a parameter.
  * Uses an imperfect method to randomize how many of the total goals scored were scored in each period.
  * Uses a for..in loop to set the values for both home and away.
  */
function goalsByPeriod(per){
  for (var loc in per) {
    per[loc].one.score = Math.floor(Math.random() * per[loc].reg.score);
    per[loc].two.score = Math.floor(Math.random() * (per[loc].reg.score - per[loc].one.score));
    per[loc].three.score = per[loc].reg.score - per[loc].one.score - per[loc].two.score;
  }
}

// ability object hold's values for abilites that help determine the chance of a player earning a statistic.
var ability = {
  low: 0.05,
  med: 0.1,
  high: 0.25,
  goal: 0,
  assist: 0,
  hit: 0,
  shot: 0
};

/**
  * The following 9 properties are added to skills object under each skill property.
  * Each use the ability object to determine how much each ability helps the player earn a statistic.
  * Goals, assists, hits, and shots.
  * Properties were not added to the player object at the top as to allow the reader easier reference to the properties.
  */
skills.shooting.impact = {
  goal: ability.high,
  assist: ability.low,
  hit: ability.low,
  shot: ability.high
};

skills.passing.impact = {
  goal: ability.low,
  assist: ability.high,
  hit: ability.low,
  shot: ability.low
};

skills.handling.impact = {
  goal: ability.high,
  assist: ability.med,
  hit: ability.low,
  shot: ability.med
};

skills.checking.impact = {
  goal: ability.low,
  assist: ability.low,
  hit: ability.high,
  shot: ability.low
};

skills.positioning.impact = {
  goal: ability.low,
  assist: ability.low,
  hit: ability.high,
  shot: ability.low
};

skills.takeaway.impact = {
  goal: ability.low,
  assist: ability.low,
  hit: ability.low,
  shot: ability.med
};

skills.speed.impact = {
  goal: ability.high,
  assist: ability.high,
  hit: ability.med,
  shot: ability.med
};

skills.strength.impact = {
  goal: ability.med,
  assist: ability.med,
  hit: ability.high,
  shot: ability.med
};

skills.endurance.impact = {
  goal: ability.low,
  assist: ability.low,
  hit: ability.low,
  shot: ability.med
};

// stats object has multiple properties used to keep track of all season, playoff, series, and career stats.
var stats = {
  count: {
    seasons: 1,
    playoffs: 1,
  },
  sim: {
    goals: 0,
    assists: 0,
    points: 0,
    hits: 0,
    shots: 0
  },
  season: {
    games: 0,
    goals: 0,
    assists: 0,
    points: 0,
    hits: 0,
    shots: 0,
    wins: 0,
    losses: 0,
    lossesOT: 0,
  },
  playoffs: {
    games: 0,
    goals: 0,
    assists: 0,
    points: 0,
    hits: 0,
    shots: 0,
    wins: 0,
    losses: 0,
    lossesOT: 0,
  },
  series: {
    games: 0,
    round: 0,
  },
  career: {
    games: 0,
    goals: 0,
    assists: 0,
    points: 0,
    hits: 0,
    shots: 0,
    wins: 0,
    losses: 0,
    lossesOT: 0
  }
}

/** 
  * playerGameStats() is invoked from simulateGame() as a callback function. 
  * Receives period.home.final.score and the goalsThisGame() function as parameters respectively.
  * Performs a call to the goalsThisGame() function and passes the teamGoals and assistsThisGame() function as parameters.
  */
function playerGameStats(teamGoals, callback){
    callback(teamGoals, assistsThisGame);
}

/**
  * goalsThisGame() is invoked from playerGameStats().
  * Receives teamGoals and assistsThisGame() function as parameters respectively.
  * Determines how many goals the player will score based on player.ability and system of conditionals.
  * Uses conditionals to not allow player to score more goals than the team scored goals.
  */
function goalsThisGame(teamGoals, callback) {
  goalChance = Math.random() * 200;
  
  // Invokes getAbility() - Passes 'goal' as a parameter and determines likeliness of player registering a goal(s).
  getAbility('goal');
  if (ability.goal > (goalChance * 10)){
    stats.sim.goals = 3;
    if(stats.sim.goals > teamGoals){
      stats.sim.goals = teamGoals;
    }
  } else if(ability.goal > (goalChance * 4)){
    stats.sim.goals = 2;
    if(stats.sim.goals > teamGoals){
      stats.sim.goals = teamGoals;
    }
  } else if (ability.goal > goalChance){
    stats.sim.goals = 1;
    if(stats.sim.goals> teamGoals){
      stats.sim.goals = 0;
    }
  } else {
    stats.sim.goals = 0;
  }

  if (seasonEnd === true){
    stats.playoffs.goals += stats.sim.goals;
  } else {
    stats.season.goals += stats.sim.goals;
  }

  // Resets goal ability for next game.
  ability.goal = 0;
  stats.career.goals += stats.sim.goals;
  
  // Invokes assistsThisGame() and passes teamGoals, stats.sim.goals and hitsThisGame() as parameters respectively.
  callback(teamGoals, stats.sim.goals, hitsThisGame);
}

/**
  * assistsThisGame() is invoked from goalsThisGame().
  * Receives teamGoals, stats.sim.goals, and assistsThisGame() function as parameters respectively.
  * Determines how many assists the player will score based on player.ability and system of conditionals.
  * Uses conditionals to not allow player to score more assists and goals than the team scored goals.
  */
function assistsThisGame(teamGoals, goals, callback) {
  assistChance = Math.random() * 200;
  
  // Invokes getAbility() - Passes 'assist' as a parameter and determines likeliness of player registering an assist(s).
  getAbility('assist');

  // Determines maximum assists player can register based on number of goals the team scored and player scored.
  teamGoalsLeft = teamGoals - goals;
  if (ability.assist > (assistChance * 10)){
    stats.sim.assists = 3;
    if(stats.sim.assists > teamGoalsLeft){
      stats.sim.assists = teamGoalsLeft;
    }
  } else if(ability.assist > (assistChance * 4)){
    stats.sim.assists = 2;
    if(stats.sim.assists > teamGoalsLeft){
      stats.sim.assists = teamGoalsLeft;
    }
  } else if (ability.assist > assistChance){
    stats.sim.assists = 1;
    if(stats.sim.assists > teamGoalsLeft){
      stats.sim.assists = 0;
    }
  } else {
    stats.sim.assists = 0;
  }

  stats.sim.points = goals + stats.sim.assists;
  if (seasonEnd === true){
    stats.playoffs.assists += stats.sim.assists;
    stats.playoffs.points += stats.sim.points;
  } else {
    stats.season.assists += stats.sim.assists;
    stats.season.points += stats.sim.points;
  }
  
  // Resets assist ability for next game.
  ability.assist = 0;
  stats.career.assists += stats.sim.assists;
  stats.career.points += stats.sim.points;

  // Invokes checkLegend() - this checks for legend achievement as career points is a conditional.
  checkLegend();

  // Invokes hitsThisGame() and passes shotsThisGame() as a parameter.
  callback(shotsThisGame);
}

/**
  * hitsThisGame() is invoked from assistsThisGame().
  * Receives shotsThisGame() function as a parameters.
  * Determines how many hits the player will register based on player.ability and system of conditionals.
  */
function hitsThisGame(callback) {
  hitChance = Math.random() * 80;

  // Invokes getAbility() - Passes 'hit' as a parameter and determines likeliness of player registering a hit(s).
  getAbility('hit');
  if(ability.hit > (hitChance * 15)){
    stats.sim.hits = 5;
  } else if (ability.hit > (hitChance * 12)){
    stats.sim.hits = 4;
  } else if (ability.hit > (hitChance * 7)){
    stats.sim.hits = 3;
  } else if (ability.hit > (hitChance * 2)){
    stats.sim.hits = 2;
  } else if (ability.hit > hitChance){
    stats.sim.hits = 1;
  } else {
    stats.sim.hits = 0;
  }
    
  if (seasonEnd === true){
    stats.playoffs.hits += stats.sim.hits;
  } else {
    stats.season.hits += stats.sim.hits;
  }
    
  // Resets hit ability for next game.
  ability.hit = 0;
  stats.career.hits += stats.sim.hits;

  // Invokes shotsThisGame() and passes stats.sim.goals as a parameter.
  callback(stats.sim.goals);
}

/**
  * shotsThisGame() is invoked from hitsThisGame().
  * Receives stats.sim.goals as a parameter.
  * Determines how many shots the player will register based on player.ability and system of conditionals.
  * 
  */
function shotsThisGame(goals) {
  shotChance = Math.random() * 80;
  
  // Invokes getAbility() - Passes 'shot' as a parameter and determines likeliness of player registering a shot(s).
  getAbility('shot');
    
  if(ability.shot > (shotChance * 15)){
    stats.sim.shots = 5;
  } else if (ability.shot > (shotChance * 12)){
    stats.sim.shots = 4;
  } else if (ability.shot > (shotChance * 7)){
    stats.sim.shots = 3;
  } else if (ability.shot > (shotChance * 2)){
    stats.sim.shots = 2;
  } else if (ability.shot > shotChance){
    stats.sim.shots = 1;
  } else {
    stats.sim.shots = 0;
  }
  
  // Adds player goals to shot count to ensure player registers more goals than shots.
  stats.sim.shots += goals;
  if (seasonEnd === true){
    stats.playoffs.shots += stats.sim.shots;
  } else {
    stats.season.shots += stats.sim.shots;
  }
    
  ability.shot = 0;
  stats.career.shots += stats.sim.shots;
}

/** 
  * getAbility() is invoked from get___ThisGame() and receives a string as a parameter.
  * Parameter is either 'goal', 'assist', 'hit', or 'shot'.
  * for..in loop uses the properties within skills object and calculates that ability,
  * based on that property's impact and rating.
  */
function getAbility(stat) {
  for (var attr in skills) {
    ability[stat] += skills[attr].impact[stat] * skills[attr].rating;
  }
}    

// updateStatsDiv() is invoked from togglePlayerStats() and endOfSeason().
function updateStatsDiv() {
  
  // Invokes updateStatsArray() - Updates the arrays of season and playoffs with most recent stats.
  updateStatsArray();
  
  // Invokes updateStats() - Passes season/playoffs id and stats arrays. Updates html of playerStats div.
  updateStats(seasonStatIDs, seasonStats);
  updateStats(playoffStatIDs, playoffStats);
}

/** 
  * updateStats() is invoked from updateStatsDiv(). 
  * Is passed either seasonStatIDs or playoffStatIDs and seasonStats or playoffStats as parameters.
  * Uses forEach method to run through the array and update the html of the playerStats div.
  */
function updateStats(preOrPostIDs, preOrPostStats) {
    preOrPostIDs.forEach(function(element, index){
        $(element).html(preOrPostStats[index]);
    });
}

/** 
  * updateStatsArray() is invoked from updateStatsDiv(). 
  * updates seasonStats and playoffStats with most recent stats from stats object.
  */
function updateStatsArray () {
  seasonStats = [stats.count.seasons, stats.season.games, stats.season.goals,
                 stats.season.assists, stats.season.points, stats.season.hits,
                 stats.season.shots];
  playoffStats = [stats.count.playoffs, stats.playoffs.games, stats.playoffs.goals,
                  stats.playoffs.assists, stats.playoffs.points, stats.playoffs.hits,
                  stats.playoffs.shots]; 
}

//appendStatsLineSeasonPlayofs() is invoked from endOfSeason(). 
function appendStatLinesSeasonPlayoffs() {
  
  // Invokes appendStatsLine() - Receives array as parameter. Adds a line to the playerStats div.
  appendStatLine(seasonStatIDs);
  
  // Changed to false before invoking appendStats() since seasonEnd is used as a conditional.
  seasonEnd = false;
  appendStatLine(playoffStatIDs);
}

/** 
  * appendStatLine() is invoked from appendStatLinesSeasonPlayoffs(). Receives as array as a parameter. 
  * Uses forEach method to run through the array and edit the IDs of playerStats to past to avoid changing their html.
  * Appends a new stat line to playerStats div.
  */
function appendStatLine(preOrPostIDs) {
  preOrPostIDs.forEach(function(element, index){
    $(element).attr('id', ''+element+'Past');
  });

  if (seasonEnd === true) {
    $("#seeseasonStats").append("<tr>" +
        "<td class='stats' id='seasonNum'>1</td>" +
        "<td class='stats' id='seasonGames'>0</td>" +
        "<td class='stats' id='seasonGoals'>0</td>" +
        "<td class='stats' id='seasonAssists'>0</td>" +
        "<td class='stats' id='seasonPoints'>0</td>" +
        "<td class='stats' id='seasonHits'>0</td>" +
        "<td class='stats endOfStats' id='seasonShots'>0</td></tr>");
  } else {
    $("#seeplayoffStats").append("<tr>" +
        "<td class='stats' id='playoffNum'>1</td>" +
        "<td class='stats' id='playoffGames'>0</td>" +
        "<td class='stats' id='playoffGoals'>0</td>" +
        "<td class='stats' id='playoffAssists'>0</td>" +
        "<td class='stats' id='playoffPoints'>0</td>" +
        "<td class='stats' id='playoffHits'>0</td>" +
        "<td class='stats endOfStats' id='playoffShots'>0</td>" +
        "</tr>");
  }
}

/** 
  * resetSeasonPlayoffs() is invoked from endOfSeason().
  * for..in loops through each category of stats.season and sets to 0.
  * for..in loops through each category of stats.playoffs and sets to 0.
  */
function resetSeasonPlayoffs() {
  for (var cat in stats.season) {
    stats.season[cat] = 0;
  }
  
  stats.count.seasons++;
  player.yearsPro.count = stats.count.seasons;
  
  // Invokes updateMyPlayer() - Updates the HTML of all the myPlayer tags.
  updateMyPlayer();
  for (var cat in stats.playoffs) {
    stats.playoffs[cat] = 0;
  }
  
  stats.count.playoffs++;
  stats.series.games = 0;
  stats.series.round = 0;
  
  // Invokes checkCaptain() - Checks if player has reached 7 seasons with the same team ans awards accordingly.
  checkCaptain();
  
  // Invokes checkRetirement() - Checks if player has completed 20 seasons.
  checkRetirement();
}

/** 
  * checkRetirement() is invoked form resetSeasonPlayoffs().
  * Checks if player has reached 20 seasons. if true, adds 'gray' class to all links.
  * Alerts user that thier career is over and shows the myPlayer and PlayerStats divs.
  * Game will no longer have any functionality.
  */
function checkRetirement() {
  if (player.yearsPro.count === 21) {
    for (var buttons in links) {
      $(links[buttons].id).addClass('gray');
    }
    
    alert("You have just completed your 20th season as an NHL Pro.\n\n" +
         "It's time to retire. Let's take a look back at your career.");
    $("#myPlayer").show();
    $("#playerStats").show();
  }
}