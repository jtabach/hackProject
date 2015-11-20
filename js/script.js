// Created player object literal
var player = {
  team: 'Canadiens',
  pick: 5,
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

function updateMyPlayer() {
  for (var cat in player) {
    if (player[cat].hasOwnProperty('count')) {
      $(player[cat].id).html(player[cat].label + player[cat].count);
    }
  }
}

var ratingStart = 60, ratingFlux = 10;
var offense = "offense", defense = "defense", athletics = "athletics";

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

function skillClickHandler() {
  for (var attr in skills) {
    $(skills[attr].id).on('click', skills[attr].clickHandler);
  }
}

function addSkillPoint(skill) {
  if (attributePoints > 0){
    skill.rating++;
    attributePoints--;
    getNewSkillsRating(overallSkills);
  }
}

function resetOveralls(ovr) {
  for (var type in ovr) {
    ovr[type].rating = 0;
  }
}

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
    
  if (ovr.overall.rating >= 99) {

    // Invokes function to award user for reaching 99 overall.
    unlockAchievement(achievements.overall99);

    /** User's overall has reached an ability to directly effect outcome of games.
    * User's team has a max goals potential 2 higher than the opponent.
    * This will result in the user having a much greater chance of winning.
    */
    player.effect = 2;

  // Checks to see if overallSkill has reached 85.
  } else if (ovr.overall.rating >= 85) {

    // Invokes function to award user for reaching 85 overall.
    unlockAchievement(achievements.overall85);

    /** User's overall has reached an ability to directly effect outcome of games.
    * User's team has a max goals potential 1 higher than the opponent.
    * This will result in the user having a slightly greater chance of winning.
    */
    player.effect = 1;
  }
  editPlayerAttributesDiv(overallSkills);
  player.overall.count = ovr.overall.rating;
  updateMyPlayer();
}

function editPlayerAttributesDiv(ovr) {
  for (var attr in skills) {
    $(skills[attr].id).html(skills[attr].label + skills[attr].rating);
  }
  for (var type in ovr) {
    $(ovr[type].id).html(ovr[type].label + ovr[type].rating);
  }
  editAttributePointHTML();
}

function editAttributePointHTML() {
  $("#attributePoints > h3").html("Points: " + attributePoints);
}

function linkClickHandler() {
  for (var item in links) {
    $(links[item].id).on('click', links[item].clickHandler);
  }
}

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

function togglePlayerStats() {
  if (!$(links.playerStats.id).hasClass('gray')) { 
    getLeaveGrayID(seasonEnd, links.playerStats, links, toggleLinksGray);
    updateStatsArray();
    updateStats(seasonStatIDs, seasonStats);
    updateStats(playoffStatIDs, playoffStats);
    $("#playerStats").toggle();
  }
}

function toggleImprovePlayer(){
  if (!$(links.improvePlayer.id).hasClass('gray')) {
    getLeaveGrayID(seasonEnd, links.improvePlayer, links, toggleLinksGray);
    $("#improvePlayer").toggle();
  }
}

function toggleMyPlayer() {
  if (!$(links.myPlayer.id).hasClass('gray')) {
    getLeaveGrayID(seasonEnd, links.myPlayer, links, toggleLinksGray);
    $("#myPlayer").toggle();
  }
}

function togglePlayGame() {
  if (!$(links.playGame.id).hasClass('gray')) {
    getLeaveGrayID(seasonEnd, links.playGame, links, toggleLinksGray);
    $("#gameStats, #close").hide();
    $("#playGame, #gameNumber, #scoreLine").toggle();

    //Updates the game number and changes the html
    $("#gameNumber h2").html("Season " + stats.count.seasons + " - Game #" + (stats.season.games+1));
    $("#teamH").html(player.team);
    if (opponentPicked === false){
        $("#teamV").html(opponents[Math.floor(Math.random()*opponents.length)]);
    }
    opponentPicked = true;
  }
}
    
function togglePlayoffGame() {
  if (!$(links.playoffGame.id).hasClass('gray')) {
    getLeaveGrayID(seasonEnd, links.playoffGame, links, toggleLinksGray);
    $("#gameStats, #close").hide();
    $("#playGame, #gameNumber, #scoreLine").toggle();
    $("#gameNumber h2").html(playoffRounds[stats.series.round] + " - Game #" + (stats.series.games+1));
    if (opponentPicked === false){
        $("#teamV").html(opponents[Math.floor(Math.random()*opponents.length)]);
    }
    opponentPicked = true;
  }
}

function getLeaveGrayID(seasonEnd, clickedLink, linksObj, callbackLinks) {
  var leaveGray;
  leaveGray = (seasonEnd) ? "#playGameLink" : "#playoffGameLink";
  callbackLinks(leaveGray, clickedLink, linksObj);
}

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

var unlockAlert = "You have unlocked the ";
    
// Achievements Object.
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
    
function unlockAchievement(type) {
  if (type.unlocked === false) {
    alert(type.alert);
    $(type.id).removeClass('locked');
    type.unlocked = true;
  }
}

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

function simClickHandler() {
  for (var button in simButtons) {
    $(simButtons[button].id).on('click', simButtons[button].clickHandler);
  }
}

// When play button is clicked, simulation begins showing the score of the game period by period
function play() {
  
  for (var item in links) {
    $(links[item].id).addClass('gray');
  }

  opponentPicked = false;

  $(simButtons.play.id).hide();

  // Invokes the simulationGame callback function and passes goalsByPeriod and playerGameStats
  simulateGame(goalsByPeriod, playerGameStats);

  determineWinner();

  // Uses jQueary callback function to display the score in a more exciting way.
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
        // Checks to see if the game requires overtime
        if (period.away.reg.score === period.home.reg.score) {
          setTimeout(function(){
            $(period.away.ot.id).html(period.away.ot.score);
            $(period.home.ot.id).html(period.home.ot.score);
            $(period.away.final.id).html(period.away.final.score);
            $(period.home.final.id).html(period.home.final.score);
          }, gamespeed);
        }
        // Displays if your team wins or loses
        setTimeout(function(){
          $("#teamWins, #gameStats").show();
        }, gamespeed);
      }, gamespeed);
    }, gamespeed);
  }, gamespeed); 

//  if (stats.season.games === 3 && askIncreaseGameSpeed === false) {
//    increaseGameSpeed = confirm("Would like to greatly increase the game speed?");
//    if (increaseGameSpeed) {
//      gamespeed = 100;
//      askIncreaseGameSpeed = true;
//    }
//  } 
}         
      
function gameStats() {
            
  $("#gameStats").hide();
  $("#playerName").html(player.lastName);
  $("#gameGoals").html(stats.sim.goals);
  $("#gameAssists").html(stats.sim.assists);
  $("#gamePoints").html(stats.sim.points);
  $("#gameHits").html(stats.sim.hits);
  $("#gameTOI").html(stats.sim.shots);
  
  // shows the player stats and attribute points earned
  $("#statLine, #attributesEarned, #close").show();
}

// Toggle appropriate links to gray at game's end.
function toggleGrayEndOfGame() {
  $("#improvePlayerLink, #playerStatsLink, #myPlayerLink").removeClass('gray');
  if (seasonEnd === false){
    $("#playGameLink").removeClass('gray');
  } else {
    $("#playoffGameLink").removeClass('gray');
  }
  links.playGame.active = false;
  links.playoffGame.active = false;
}

// Add attribute points based on simulation game performance.
function earnedAttributePoints() {
  if (stats.sim.points > 3) {
    attributePoints += 2;
  }
  if (stats.sim.points > 0) {
    attributePoints++;
  }
}

// Increase game based on regular season or playoffs
function increaseGameCount() {
  if (seasonEnd === false) {
    stats.season.games++;
  } else {
    stats.playoffs.games++;
    stats.series.games++;
  }
}

// When clicked hides the entire playGame Div
function close(){
  $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned").hide();

  // Invokes resestGame which resets the html for the next game
  resetGame();
  $(simButtons.close.id).hide();
  $(simButtons.play.id).show();

  // Updates the team record in upper left of screen
  updateTeamRecord();

  // Toggle appropriate links to gray at game's end.
  toggleGrayEndOfGame();

  // Adds attribute point for completion of game
  earnedAttributePoints();
  editAttributePointHTML();
  
  // Increases game count for season/playoffs/series
  increaseGameCount();
  checkAllStar();

  if(stats.season.games >= seasonLength){
    seasonEnd = true;
    checkRocketAward();
    checkMVP();
    
    if(stats.season.wins >= winsToQualify){
      playoffQualify();
    } else {
      playoffDidNotQualify();      
    } 
}
if (stats.playoffs.wins === winsToAdvance && stats.series.round === 3) {
    wonStanleyCup();
  } else if (stats.playoffs.wins === winsToAdvance) {
    wonPlayoffSeries();
  } else if (stats.playoffs.losses === winsToAdvance){
    lostPlayoffSeries();
  }
}

function playoffDidNotQualify() {
  alert("You did not qualify for the playoffs this year. You only won "
       + stats.season.wins + " of the necessary " + winsToQualify + " in order to qualify.\n\n"
       + "Better luck next year. Next season has begun.");
  updateStatsDiv();
  resetSeasonPlayoffs();
  appendStatLinesSeasonPlayoffs();
}

function playoffQualify() {
  if (stats.playoffs.games === 0) {
    alert("You have qualified for the playoffs!");
    player.playoffs.count++;
    updateMyPlayer();
    unlockAchievement(achievements.playoffs);
    $("#playGameLink").addClass('gray');
    $("#playoffGameLink").removeClass('gray');
    updateTeamRecord();
  }
}

function wonStanleyCup() {
  unlockAchievement(achievements.stanleyCup);
  player.stanleys.count++;
  checkFinalsMVP();
  checkLegend();
  alert("You won the Stanley Cup!");
  updateMyPlayer();
  alert("End of playoffs. Begin Next Season");
  $('#playGameLink').removeClass('gray');
  $('#playoffGameLink').addClass('gray');
  updateStatsDiv();
  resetSeasonPlayoffs();
  appendStatLinesSeasonPlayoffs();
  updateTeamRecord();
}

function wonPlayoffSeries() {
  stats.playoffs.wins = 0;
  stats.playoffs.losses = 0;
  stats.series.games = 0;
  stats.series.round++;
  alert("Congratulations you moved to the " +playoffRounds[stats.series.round] + "!");
  updateTeamRecord();
}

function lostPlayoffSeries() {
  updateMyPlayer();
  alert("You lost in the " + playoffRounds[stats.series.round]);
  alert("End of playoffs. Begin Next Season");
  $('#playGameLink').removeClass('gray');
  $('#playoffGameLink').addClass('gray');
  updateStatsDiv();
  resetSeasonPlayoffs();
  appendStatLinesSeasonPlayoffs();
  updateTeamRecord();
}

function checkAllStar() {
  if (seasonLength/2 === stats.season.games) {
    if (stats.season.points >= stats.season.games) {
      player.allstars.count++;
      updateMyPlayer();
      alert("You have been selected as an allstar this season!");
      unlockAchievement(achievements.allStar);
      checkLegend();
    }
  }
}

function checkFinalsMVP() {
  if (stats.playoffs.points >= stats.playoffs.points) {
    alert("You have been selected as an Conn Smythe Winner as the " +
          "Stanley Cup Finals MVP!");
    unlockAchievement(achievements.finalsMVP);
  }
}

function checkLegend() {
  if (stats.career.points >= 500 && player.allstars.count >= 7 && player.stanleys.count >= 3){
    unlockAchievement(achievements.legend);
  }
}

function checkRocketAward() {
  if (stats.season.goals >= seasonLength && stats.playoffs.games === 0) {
    alert("You have been awarded the Rocket Richard Trophy for " +
          "the most goals by any player this season with " + stats.season.goals + " goals!");
    unlockAchievement(achievements.rocket);
  }
}

function checkMVP() {
  if (stats.season.points >= seasonLength && stats.season.wins >= winsToQualify && stats.playoffs.games === 0){
    alert("You have been awarded the Hart Memorial Trophy for " +
          "being selected the league's the most valuable player " + 
          "in the regular season with " + stats.season.points + " points!");
    unlockAchievement(achievements.mvp);
  }
}

// @desc - hold all possible oppenent's user may play (or be drafted to).
// @array - contains strings.
var opponents = ["Senators", "Lightning", "Bruins", "Red Wings", "Panthers", "Sabres",
                 "Maple Leafs", "Rangers", "Capitals", "Penguins", "Devils", "Islanders",
                 "Flyers", "Hurricanes", "Jackets", "Stars", "Blues", "Wild", "Predators",
                 "Jets", "Blackhawks", "Avalanche", "Kings", "Canucks", "Coyotes", "Ducks",
                 "Flames", "Oilers"];

var attributePoints = 9;
var formValidated = true;
var opponentPicked = false;
var gamespeed = 50;
var increaseGameSpeed = false, askIncreaseGameSpeed = false;
var seasonStatIDs = ["#seasonNum", "#seasonGames", "#seasonGoals", "#seasonAssists",
                     "#seasonPoints", "#seasonHits", "#seasonTOI"];
var playoffStatIDs = ["#playoffNum", "#playoffGames", "#playoffGoals", "#playoffAssists",
                      "#playoffPoints", "#playoffHits", "#playoffTOI"];
var games = 0, playoffGames = 0, postGames = 0, seasons = 1, playoffs = 1;
var playoffRounds = ["Conference Quarterfinals", "Conference Semifinals",
                     "Conference Finals", "Stanley Cup Finals"];
var seasonLength, playoffLength;
var winsToQualify, winsToAdvance;
var careerLength = 10;
var seasonEnd = false;
var goalChance, assistChance, hitChance, shotChance;
var teamGoalsLeft;

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

// DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //
// DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //

$(document).ready(function() {
    $("#playerInfoLink, #playGameLink, #myPlayerLink, #improvePlayerLink, #playoffGameLink, #playerStatsLink, #teamRecordLink, #pick, #draft, #submitGames, #info, #myPlayer").hide();
    
    // When next button is clicked, player it taken into the NHL draft
    $("#welcomeNext").on('click', function(){
        $("#draft").show();
        $("#welcome").hide();
    });
    
    $("#submit").click(function(event){
        event.preventDefault();
        validateForm();
        player.firstName = $("#firstName").val();
        player.lastName = $("#lastName").val();
        player.position = $("input[type='radio'][name='position']:checked").val();
        
        if (formValidated === true) {
            $("#welcome, #draft").hide();
            $("#pick").show();
        } else {
            $("#draft").show();
        }
        //Sets the proper name and position
        $("#playerInfoLink h3").html(player.firstName + " " + player.lastName  + " - " + player.position);
    });
    
    $("#beginDraft").on('click', function(){
        $("#beginDraft").hide();
        $("#draftDetails").append("<br><br><h2>With the number " + player.pick + " of the NHL draft, the " +
                     player.team + " select " + player.position + ", " + player.firstName + 
                     " " + player.lastName + ".</h2><br><br><form id='seasonLengthForm'>" + 
                     "<h4>How many games would you like to play each season?</h4><br>" +
                     "12 Games (Recommended)" + " " + "<input type='radio' class='games' id='12' name='length' value='12' checked>" +
                     "32 Games" + " " + "<input type='radio' class='games' id='32' name='length' value='32'>" +
                     "82 Games" + " " + "<input type='radio' class='games' id='82' name='length' value='82'>" +
                     "4 Games (I just want to see if this works)" + " " + "<input type='radio' class='games' id='4' name='length' value='4'>" +
                     "<div class='clear'></div><br><br>" +
                      "<h4>How many games would you like to each playoff series to be?</h4><br>" +
                     "Best of 3" + " " + "<input type='radio' class='series' id='3' name='series' value='3' checked>" +
                     "Best of 5" + " " + "<input type='radio' class='series' id='5' name='series' value='5'>" +
                     "Best of 7" + " " + "<input type='radio' class='series' id='7' name='series' value='7'>" +
                     "<div class='clear'></div>");
        $("#submitGames").show();
    });
    
    $("#submitGames").click(function(event){
        event.preventDefault();
        seasonLength = Number($("input[type='radio'][name='length']:checked").val());
        winsToQualify = seasonLength/2;
        playoffLength = Number($("input[type='radio'][name='series']:checked").val());
        winsToAdvance = Math.ceil(playoffLength/2);
        $("#welcome, #draft, #pick").hide();
        $("#playerInfoLink, #playGameLink, #improvePlayerLink, #playoffGameLink," +
          "#playerStatsLink, #teamRecordLink, #myPlayerLink, #info").show();
    });

    // Hides the divs for the playGame link when the page loads
    $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned," +
      "#playerStats, #improvePlayer, #pick, #draft").hide();
    
    // Array of the skills as they are identified by their IDs
    var skillsIDs = ["shooting", "passing", "handling", "checking", "positioning",
                     "takeaway", "speed", "strength", "endurance"];
    
    // Hides the divs for the playGame link when the page loads
    $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned, #playerStats").hide();

    updateMyPlayer();
    getNewSkillsRating(overallSkills);
    skillClickHandler();
    linkClickHandler();
    simClickHandler();
     
});


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

// Uses period object to loops through home/away which loops through each period id
// Checks to see if the property has the property 'id'.
function resetGame(){
  for (var loc in period) {
    for (var num in period[loc]) {
      if (period[loc][num].hasOwnProperty('id')) {
         $(period[loc][num].id).html("-")
      }
    }
  }
}

function updateTeamRecord() {
  if (seasonEnd === false){
    $("#record").html("Team Record: " + stats.season.wins + "-" + 
                      stats.season.losses + "-" + stats.season.lossesOT);
  } else {
    $("#record").html("Playoff Series: " + stats.playoffs.wins + "-" + 
                      stats.playoffs.losses);
  }
}
    
// Callback function that takes two functions as parameters
function simulateGame(callback1, callback2) {
    
  // Player effect will increase as your player hits milestone skill levels
  period.home.reg.score = Math.round(Math.random() * (5 + player.effect));
  period.away.reg.score = Math.round(Math.random() * 5);

  // Randomly decides which team will win in overtime
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
  
  // Performs a callback and passes the the regulation scores as parameters
  callback1(period);

  // Performs a callback and passes the regulation scorea of your team a parameter
  callback2(period.home.final.score, goalsThisGame);
}    
    
/* Function that takes the regulation goals for both home and away team
and somewhat randomizes how many of the total goals were scored in each period*/
function goalsByPeriod(per){
  
  for (var loc in per) {
    per[loc].one.score = Math.floor(Math.random() * per[loc].reg.score);
    per[loc].two.score = Math.floor(Math.random() * (per[loc].reg.score - per[loc].one.score));
    per[loc].three.score = per[loc].reg.score - per[loc].one.score - per[loc].two.score;
  }
}

// Takes the final score of your team as a parameter and uses it to determine max player stats
function playerGameStats(teamGoals, callback){
    callback(teamGoals, assistsThisGame);
}

var ability = {
  low: 0.05,
  med: 0.1,
  high: 0.25,
  goal: 0,
  assist: 0,
  hit: 0,
  shot: 0
};

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

// parameter should be goal, assist, shot, or hit
function getAbility(stat) {
  for (var attr in skills) {
    ability[stat] += skills[attr].impact[stat] * skills[attr].rating;
  }
}

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

// Function that determines how many assists your player gets in a given game
function goalsThisGame(teamGoals, callback) {
  // Radomizes a number between 1 and 200
  goalChance = Math.random() * 200;
  // Determines your players ability to record a goal based on your player attributes
  getAbility('goal');

  /* Uses the ability.goal of your player to determine the likeliness
  of your player recording one or more goals in a game.
  Uses teamGoalsLeft as a safety net as to not allow your player to
  record more goals than your team scores*/
  
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

  ability.goal = 0;
  stats.career.goals += stats.sim.goals;
  callback(teamGoals, stats.sim.goals, hitsThisGame);
}

// Function that determines how many assists your player gets in a given game
function assistsThisGame(teamGoals, goals, callback) {
  // Radomizes a number between 1 and 200
  assistChance = Math.random() * 200;
  // Determines your players ability to get an assist based on your player attributes
  getAbility('assist');

  // Find how many goals were scored by your team, not including your player
  teamGoalsLeft = teamGoals - goals;

  /* Uses the ability.assist of your player to determine the likeliness
  of your player recording one or more assists in a game.
  Uses teamGoalsLeft as a safety net as to not allow your player to
  record more points than your team scores*/
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

  ability.assist = 0;
  stats.career.assists += stats.sim.assists;
  stats.career.points += stats.sim.points;

  /** Conditional to verify if user has reached 500 career points. Is linked
  * to the legendary Achievement but not invoked until 500 to avoid multple calls.
  */
  if (stats.career.points >= 500) { 

    // Check the if user has reached legendary status as career points is a requirement.
    if (stats.career.points >= 500 && allStarGames >= 7 && stanleyCups >= 3){
      unlockAchievement(achievements.legend);
    }
  }

  callback(shotsThisGame);
}

function hitsThisGame(callback) {
  
  // Radomizes a number between 1 and 100
  hitChance = Math.random() * 80;
  // Determines your players ability to record a hit based on your player attributes
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
    
  ability.hit = 0;
  stats.career.hits += stats.sim.hits;
  callback(stats.sim.goals);
}

function shotsThisGame(goals) {
    
  // Radomizes a number between 1 and 100
  shotChance = Math.random() * 80;
  // Determines your players ability to record a hit based on your player attributes
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
  stats.sim.shots += goals;
    
  if (seasonEnd === true){
    stats.playoffs.shots += stats.sim.shots;
  } else {
    stats.season.shots += stats.sim.shots;
  }
    
  ability.shot = 0;
  stats.career.shots += stats.sim.shots;
}

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

  $("#teamWins h2").html("" + player.team + resultLabel);
  stats.career[result]++;
  if (seasonEnd === false) {
    stats.season[result]++;
  } else {
    stats.playoffs[playoffResult]++;
  }

  // Checks to see if user has reached 100 career wins.
  if (stats.career.wins >= 100) {

    // Invokes function to award user for reaching 100 career wins.
    unlockAchievement(achievements.wins100);

  // Checks to see if user has reached 50 career wins.    
  } else if (stats.career.wins >= 50) {

    // Invokes function to award user for reaching 100 career wins.
    unlockAchievement(achievements.wins50);
  }
  
}    

// Invokes following stats functions
function updateStatsDiv() {
  updateStatsArray();
  updateStats(seasonStatIDs, seasonStats);
  updateStats(playoffStatIDs, playoffStats);
}

// Function updates the html to reflect the new player stats
function updateStats(preOrPostIDs, preOrPostStats) {
    preOrPostIDs.forEach(function(element, index){
        $(element).html(preOrPostStats[index]);
    });
}

function updateStatsArray () {
  seasonStats = [stats.count.seasons, stats.season.games, stats.season.goals,
                 stats.season.assists, stats.season.points, stats.season.hits,
                 stats.season.shots];
  playoffStats = [stats.count.playoffs, stats.playoffs.games, stats.playoffs.goals,
                  stats.playoffs.assists, stats.playoffs.points, stats.playoffs.hits,
                  stats.playoffs.shots]; 
}

// Invokes the following functions.
function appendStatLinesSeasonPlayoffs() {
  appendStatLine(seasonStatIDs);
  seasonEnd = false;
  appendStatLine(playoffStatIDs);
}

function appendStatLine(preOrPostIDs) {
  preOrPostIDs.forEach(function(element, index){
    $(element).attr('id', ''+element+'Past');
  });

  if (seasonEnd === true) {
    $("#seeseasonStats").append("<div class='clear'></div>" +
        "<h4 class='stats' id='seasonNum'>1</h4>" +
        "<h4 class='stats' id='seasonGames'>0</h4>" +
        "<h4 class='stats' id='seasonGoals'>0</h4>" +
        "<h4 class='stats' id='seasonAssists'>0</h4>" +
        "<h4 class='stats' id='seasonPoints'>0</h4>" +
        "<h4 class='stats' id='seasonHits'>0</h4>" +
        "<h4 class='stats endOfStats' id='seasonTOI'>0</h4>");
  } else {
    $("#seeplayoffStats").append("<div class='clear'></div>" +
        "<h4 class='stats' id='playoffNum'>1</h4>" +
        "<h4 class='stats' id='playoffGames'>0</h4>" +
        "<h4 class='stats' id='playoffGoals'>0</h4>" +
        "<h4 class='stats' id='playoffAssists'>0</h4>" +
        "<h4 class='stats' id='playoffPoints'>0</h4>" +
        "<h4 class='stats' id='playoffHits'>0</h4>" +
        "<h4 class='stats endOfStats' id='playoffTOI'>0</h4>");
  }

  var statHeight = $('#playerStats').height();
  $('#playerStats').height(statHeight+26);
}

function resetSeasonPlayoffs() {
  for (var cat in stats.season) {
    stats.season[cat] = 0;
  }
  stats.count.seasons++;
  player.yearsPro.count = stats.count.seasons;
  updateMyPlayer();

  for (var cat in stats.playoffs) {
    stats.playoffs[cat] = 0;
  }
  stats.count.playoffs++;
  stats.series.games = 0;
  stats.series.round = 0;
  
  // Conditional that checks to see if the user has reached their 7th seaon.
  if (stats.count.seasons === 8) {

    // Alerts the user that they have been made Captain.
    alert("You have just finished your 7th season with the " + player.team +
         ".\n\nYour teammates have voted and you have been named Captain!");

    /** Invoked function to award the user for finishing their 7th
    * season and being named captain.
    */
    unlockAchievement(achievements.captain);
  }
}