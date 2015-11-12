
// Created player object literal
var player = {
    firstName: 'Jeff',
    lastName: 'Tabachnick',
    position: 'Left Wing',
    team: 'Canadiens',
    pick: 5,
    skills: {
        offense: {
            shooting: Math.floor(Math.random()*10+60),
            passing : Math.floor(Math.random()*10+60),
            handling : Math.floor(Math.random()*10+60)
        },
        defense: {
            checking : Math.floor(Math.random()*10+60),
            positioning : Math.floor(Math.random()*10+60),
            takeaway : Math.floor(Math.random()*10+60)
        },
        athletics: {
            speed : Math.floor(Math.random()*10+60),
            strength : Math.floor(Math.random()*10+60),
            endurance : Math.floor(Math.random()*10+60)
        }
    }
};

var opponents = ["Senators", "Lightning", "Bruins", "Red Wings", "Panthers", "Sabres",
                 "Maple Leafs", "Rangers", "Capitals", "Penguins", "Devils", "Islanders",
                 "Flyers", "Hurricanes", "Jackets", "Stars", "Blues", "Wild", "Predators",
                 "Jets", "Blackhawks", "Avalanche", "Kings", "Canucks", "Coyotes", "Ducks",
                 "Flames", "Oilers"];

var attributePoints = 9;
var areasArray = [];
var skillsArray = [];
var overallOffense, overallDefense, overallAthletics, overallSkill;

var playGameLinkActive = false, improvePlayerLinkActive = false, playerStatsLinkActive = false;
var seasonEnd = false;

// Player effect starts at zero but can be increased to directly effect outcome of games as player progresses
var playerEffect = 0;
// Declares variables for playGame
var period1H, period2H, period3H, periodOTH, periodRegH, periodFH;
var period1V, period2V, period3V, periodOTV, periodRegV, periodFV;
var playButtonClicked = false, statsButtonClicked = false;

var formValidated = true;
var opponentPicked = false;

var resetGameArray = ["#period1V", "#period1H", "#period2V", "#period2H", "#period3V",
                      "#period3H", "#periodOTV", "#periodOTH", "#periodFV", "#periodFH"];

var seasonStatIDs = ["#seasonNum", "#seasonGames", "#seasonGoals", "#seasonAssists",
                     "#seasonPoints", "#seasonHits", "#seasonTOI"];

var playoffStatIDs = ["#playoffNum", "#playoffGames", "#playoffGoals", "#playoffAssists",
                      "#playoffPoints", "#playoffHits", "#playoffTOI"];



var games = 0, seasons = 1, playoffs = 1;
var seasonLength = 3;
var winsToQualify = 4;
var careerLength = 10;
var wins = 0, losses = 0, lossesOT = 0;
var goals, assists, points, hits, timeOnIce;
var seasonGoals = 0, seasonAssists = 0, seasonPoints = 0, seasonHits = 0, seasonTimeOnIce = 0;

var playoffGoals = 0, playoffAssists = 0, playoffPoints = 0, playoffHits = 0, playoffTimeOnIce = 0;

var careerGoals = 0, careerAssists = 0, careerPoints = 0, careerHits = 0, careerTimeOnIce = 0;

var seasonStats = [seasons, games, seasonGoals, seasonAssists, seasonPoints, seasonHits, seasonTimeOnIce];

var playoffStats = [playoffs, games, playoffGoals, playoffAssists, playoffPoints, playoffHits, playoffTimeOnIce];

var goalChance, assistChance, hitChance, timeOnIceAverage;
var teamGoalsLeft, maxPlayerPoints;
var goalAbility, assistAbility, hitAbility, timeOnIceAbility;
var timeOnIceMin, timeOnIceSec, totalTimeOnIceMin = 0, totalTimeOnIceSec = 0;
var lowImpactAbility = 0.05, medImpactAbility = 0.1, highImpactAbility = 0.25;


// Gets the overall skill level of the player
function getNewOverallSkillLevel (obj) {

    var i = 0;
    // For in loop puts each of the child objects of the parent object in an array
    for (var areas in obj) {
        // Chose not to use .push() to avoid creating a long array after multiple invocations of the function
        areasArray[i] = obj[areas];
        i++;
    }
    i = 0;
    // ForEach loops through the new array
    areasArray.forEach(function(element, index){
        // For..in loops through each property of each object and places each property's value in a skills array
        for (var skills in element) {
            skillsArray[i] = element[skills];
            i++;
        }
    });
    
    // Averages the skills of each skill area as well as averages each area for the overall skill
    overallOffense = Math.floor((skillsArray[0] + skillsArray[1] + skillsArray[2])/3);
    overallDefense = Math.floor((skillsArray[3] + skillsArray[4] + skillsArray[5])/3);
    overallAthletics = Math.floor((skillsArray[6] + skillsArray[7] + skillsArray[8])/3);
    overallSkill = Math.round((overallAthletics + overallDefense + overallOffense)/3)
}

// Edits the attribute value associated with the button clicked
//function editButtonHTML (attribute, target, button) {
//    button.html(attribute + " " + player.skills[target][attribute]);
//}

// Gets Skill type from Id of button clicked and performs a callback function
function getSkillType(attribute, target, callback) {
     return callback(attribute, target);
}

// Adds a skill point to the appropriate skill
function addSkillPoint (attribute, target) {
    player.skills[target][attribute]++;
}

function validateForm() {
    var first = document.forms["draftForm"]["firstName"].value;
    var last = document.forms["draftForm"]["lastName"].value;
    var regex = /^[a-zA-Z]+$/;
    if (!first.match(regex) || !last.match(regex)) {
        alert("Please input a full name. No numbers or special characters");
        formValidated = false;
    } else {
        formValidated = true;
    }
}



// DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //
// DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //
// DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //
// DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //  // DOCUMENT IS READY //


$(document).ready(function() {
    
    $("#playerInfoLink, #playGameLink, #improvePlayerLink, #playoffGameLink, #playerStatsLink, #teamRecordLink, #pick, #draft, #submitGames").hide();
    
    // When next button is clicked, player it taken into the NHL draft
    $("#welcomeNext").on('click', function(){
        $("#draft").show();
        $("#welcome").remove();
        return false;
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
        
        return false;
    });
    
    $("#beginDraft").on('click', function(){
        $("#beginDraft").hide();
        $("p").append("<br><br><h2>With the number " + player.pick + " of the NHL draft, the " +
                     player.team + " select " + player.position + ", " + player.firstName + 
                     " " + player.lastName + ".</h2><br><br><form id='seasonLengthForm'>" + 
                     "<h4>How many games would you like to play each season?</h4><br>" +
                     "12 Games (Recommended)<input type='radio' class='games' id='12' name='length' value='12' checked>" +
                     "32 Games<input type='radio' class='games' id='32' name='length' value='32'>" +
                     "82 Games<input type='radio' class='games' id='82' name='length' value='82'>" +
                     "<div class='clear'></div>" +
                     "</form>");
        $("#submitGames").show();
    });
    
    $("#submitGames").on('click', function(){
        seasonLength = Number($("input[type='radio'][name='length']:checked").val());
        winsToQualify = seasonLength/2;
        $("#welcome, #draft, #pick").hide();
        $("#playerInfoLink, #playGameLink, #improvePlayerLink, #playoffGameLink, #playerStatsLink, #teamRecordLink").show();
    });

    // Hides the divs for the playGame link when the page loads
    $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned, #playerStats, #improvePlayer, #pick, #draft").hide();
    
    // Gets the initial skills of the player
    getNewOverallSkillLevel(player.skills);
    
    // Array of the skills as they are identified by their IDs
    var skillsIDs = ["shooting", "passing", "handling", "checking", "positioning", "takeaway", "speed", "strength", "endurance"];
    
    // forEach loop that uses the skillsArray with the skillsID array to update player skills
    skillsIDs.forEach(function(element, index){
        $("#" + element).html(element + " " + skillsArray[index]); 
    });
    
    
    var attributeCategoryIDs = ["#attributePoints > h3", "#averageOffense > h3", "#averageDefense > h3", "#averageAthletics > h3", "#averageOverall > h3"];
    
    var attributeCategories = ["Points: ", "Offense: ", "Defense: ", "Athlete: ", "Player Overall: "];
    
    var attributeOveralls = [attributePoints, overallOffense, overallDefense, overallAthletics, overallSkill];
    
    
    attributeCategoryIDs.forEach(function(element, index){
        $(element).html(attributeCategories[index] + attributeOveralls[index]);
    });
    
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    $("#improvePlayerLink").on('click', function(){
    
        // Check to see if playGame link or playerStats link is active
        // If it is, don't allow increase Skill dev to show
        if(playGameLinkActive === false && playerStatsLinkActive === false){
        
            if (improvePlayerLinkActive === false){
                $("#playGame, #playerStats").hide();
                $("#playGameLink, #playerStatsLink").addClass('gray');
                improvePlayerLinkActive = true;           
            } else {
                improvePlayerLinkActive = false;
                $("#playerStatsLink").removeClass('gray');
                if(seasonEnd === false){
                    $("#playGameLink").removeClass('gray');
                }
            }
    
            $("#improvePlayer").toggle();
            
            // Invokes the function and passes player skills object
            getNewOverallSkillLevel(player.skills);



            
        }
    });
       
    // Click function on an attribute
    $('.skill').on('click', function(){

        // Checks to see if any attributes points are available and subtracts from the total
        if (attributePoints > 0){
            attributePoints--;

            /* Invokes a callback fuction and passes the button Id, 
            the button attribute area, and the function addSkillPoint */
            getSkillType(this.id, $(this).attr("area"), addSkillPoint);
//                    editButtonHTML(this.id, $(this).attr("area"), editButtonHTML, $(this));

            getNewOverallSkillLevel(player.skills);

            // Checks which skill has been selected, adds an attribute point, and changes the HTML
            $(this).html(this.id + " " + player.skills[$(this).attr("area")][this.id]);


            // Changes the HTML of attribute points left
            $("#attributePoints > h3").html("Points: " + attributePoints);
            $("#averageOffense > h3").html("Offense: " + overallOffense);
            $("#averageDefense > h3").html("Defense: " + overallDefense);
            $("#averageAthletics > h3").html("Athlete: " + overallAthletics);
            $("#averageOverall > h3").html("Player Overall: " + overallSkill);
        }
    });
    
    
    
    var gameNum = 1;
    
    
    // Hides the divs for the playGame link when the page loads
    $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned, #playerStats").hide();

    
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    $("#playGameLink").on('click', function(){
        
        // Check to see if improvePlayer link or playerStats link is active
        // If it is, don't allow increase Skill dev to show
        if(improvePlayerLinkActive === false && playerStatsLinkActive === false && playButtonClicked === false && seasonEnd === false){
        
            if (playGameLinkActive === false){
                $("#improvePlayer, #playerStats").hide();
                $("#improvePlayerLink, #playerStatsLink").addClass('gray');
                playGameLinkActive = true;           
            } else {
                $("#improvePlayerLink, #playerStatsLink").removeClass('gray');
                playGameLinkActive = false;
            }
        
            $("#playGame, #gameNumber, #scoreLine").toggle();

            //Updates the game number and changes the html
            $("#gameNumber h2").html("Season " + seasons + " - Game #" + (games+1));
            $("#teamH").html(player.team);
            if (opponentPicked === false){
                $("#teamV").html(opponents[Math.floor(Math.random()*opponents.length)]);
            }
            opponentPicked = true;
            
        }
    });
       
    // When play button is clicked, simulation begins showing the score of the game period by period
    $('#play').on('click', function(){
        
        $("#playGameLink").addClass('gray');
        $("#improvePlayerLink").addClass('gray');
        $("#playerStatsLink").addClass('gray');
        playGameLinkActive = true;
        opponentPicked = false;

        // Checks to see if the play button has been clicked
        if (playButtonClicked === false){
            
            /* Changes the playButtonClicked to true to avoid multiple calls
            to the setTimeout method during a single game*/
            playButtonClicked = true;
            
            
            // Invokes the simulationGame callback function and passes goalsByPeriod and playerGameStats
            simulateGame(goalsByPeriod, playerGameStats);
            
            determineWinner();

            // Uses jQueary callback function to display the score in a more exciting way.
            setTimeout(function(){
                $("#period1V").html(period1V);
                $("#period1H").html(period1H);
                $("#periodFV").html(period1V);
                $("#periodFH").html(period1H);
                setTimeout(function(){
                    $("#period2V").html(period2V);
                    $("#period2H").html(period2H);
                    $("#periodFV").html(period1V + period2V);
                    $("#periodFH").html(period1H + period2H);
                    setTimeout(function(){
                        $("#period3V").html(period3V);
                        $("#period3H").html(period3H);
                        $("#periodFV").html(period1V + period2V + period3V);
                        $("#periodFH").html(period1H + period2H + period3H);
                        gameNum++;
                        // Checks to see if the game requires overtime
                        if ((period1V + period2V + period3V) == (period1H + period2H + period3H)) {
                            setTimeout(function(){
                                $("#periodOTV").html(periodOTV);
                                $("#periodOTH").html(periodOTH);
                                $("#periodFV").html(period1V + period2V + period3V + periodOTV);
                                $("#periodFH").html(period1H + period2H + period3H + periodOTH);
                            }, 500);
                        }
                        // Displays if your team wins or loses
                        setTimeout(function(){
                            $("#teamWins").show();
                        }, 500);
                    }, 500);
                }, 500);
            }, 500); 
        }   
    });
    
        

    $('#gameStats').on('click', function(){
        
        // Checks to see if the stats button has previously been clicked for the game
        if (statsButtonClicked === false){
            
            // Sets statsButtonClicked to true to avoid multiple clicks of the stats button
            statsButtonClicked = true;
            
            
            $("#playerName").html(player.firstName);
            $("#gameGoals").html(goals);
            $("#gameAssists").html(assists);
            $("#gamePoints").html(points);
            $("#gameHits").html(hits);
            $("#gameTOI").html(timeOnIce);
            
            // shows the player stats and attribute points earned
            $("#statLine, #attributesEarned").show();
            
        }
        
    });
    
    // When clicked hides the entire playGame Div
    $('#xGame').on('click', function(){
        $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned").hide();
        
        // Invokes resestGame which resets the html for the next game
        resetGame(resetGameArray);
        
        // Updates the team record
        $("#record").html("Team Record: " + wins + "-" + losses + "-" + lossesOT);
        
        // Sets both conditionals back to false to allow buttons to be clicked for the next game
        playButtonClicked = false;
        statsButtonClicked = false;
        
        $("#playGameLink, #improvePlayerLink, #playerStatsLink").removeClass('gray');
        playGameLinkActive = false;
        
        // Adds attribute point for completion of game
        attributePoints++;
        $("#attributePoints > h3").html("Points: " + attributePoints);
        games++;
        
        if(games >= seasonLength){
            
            updateStatsArray();
            updateStats(seasonStatIDs, seasonStats);
            //updateStats(playoffStatIDS, playoffStats);
            appendStatLine(seasonStatIDs, playoffStatIDs);
            
            
            
            if(wins >= winsToQualify){
                $("#playGameLink").addClass('gray');
                $("#playoffGameLink").removeClass('gray');
                seasonEnd = true;
                // playoffs
            }
            seasons++;
            playoffs++; //Move to playoffs when created
            games = 0;
            goals = 0;
            assists = 0;
            points = 0;
            hits = 0;
            timeOnIce = 0;
            wins = 0;
            losses = 0;
            lossesOT = 0;
            seasonGoals = 0; 
            seasonAssists = 0; 
            seasonPoints = 0; 
            seasonHits = 0; 
            seasonTimeOnIce = 0;
            totalTimeOnIceMin = 0;
            totalTimeOnIceSec = 0;

            
        }
    });
    
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    $("#playerStatsLink").on('click', function(){
        
        // Check to see if playGame link or improvePlayer link is active
        // If it is, don't allow seeStats dev to show
        if(improvePlayerLinkActive === false && playGameLinkActive === false){
        
            if (playerStatsLinkActive === false){
                $("#improvePlayer, #playGame").hide();
                $("#improvePlayerLink, #playGameLink").addClass('gray');
                playerStatsLinkActive = true;           
            } else {
                playerStatsLinkActive = false;
                $("#improvePlayerLink").removeClass('gray');
                if (seasonEnd === false){
                    $("#playGameLink").removeClass('gray');
                }
            }
        
            updateStatsArray();
            updateStats(seasonStatIDs, seasonStats);
            //updateStats();
            $("#playerStats").toggle();
        }
        
    });
    
    
    
});
    

// Callback function that takes two functions as parameters
function simulateGame(callback1, callback2) {
    
    // Player effect will increase as your player hits milestone skill levels
    periodRegH = Math.round(Math.random() * (5 + playerEffect));
    periodRegV = Math.round(Math.random() * 5);
    
    // Randomly decides which team will win in overtime
    if(periodRegH === periodRegV) {
        if(Math.random() > 0.5) {
            periodOTH = 1;
            periodOTV = 0;
        } else {
            periodOTH = 0;
            periodOTV = 1;
        }
    } else {
        periodOTH = 0;
        periodOTV = 0;
    }
    
    maxPlayerPoints = periodRegH + periodOTH;
    // Performs a callback and passes the the regulation scores as parameters
    callback1(periodRegH, periodRegV);
    
    // Performs a callback and passes the regulation scorea of your team a parameter
    callback2(maxPlayerPoints, goalsThisGame);
}    
    
/* Function that takes the regulation goals for both home and away team
and somewhat randomizes how many of the total goals were scored in each period*/
function goalsByPeriod(periodRegH, periodRegV){
    
    period1H = Math.floor(Math.random() * periodRegH);
    period2H = Math.floor(Math.random() * (periodRegH - period1H));
    period3H = periodRegH - period1H - period2H;
    
    period1V = Math.floor(Math.random() * periodRegV);
    period2V = Math.floor(Math.random() * (periodRegV - period1V));
    period3V = periodRegV - period1V - period2V;
}

// Takes the final score of your team as a parameter and uses it to determine max player stats
function playerGameStats(teamGoals, callback){
    
    callback(teamGoals, assistsThisGame);
    
}



// Function that determines how many assists your player gets in a given game
function goalsThisGame(teamGoals, callback) {
    // Radomizes a number between 1 and 200
    goalChance = Math.random() * 200;
    // Determines your players ability to record a goal based on your player attributes
    goalAbility = highImpactAbility * player.skills.offense.shooting +
        lowImpactAbility * player.skills.offense.passing +
        highImpactAbility * player.skills.offense.handling +
        lowImpactAbility * player.skills.defense.checking +
        lowImpactAbility * player.skills.defense.positioning +
        lowImpactAbility * player.skills.defense.takeaway +
        highImpactAbility * player.skills.athletics.speed +
        medImpactAbility * player.skills.athletics.strength +
        lowImpactAbility * player.skills.athletics.endurance;
    
    /* Uses the assistAbility of your player to determine the likeliness
    of your player recording one or more goals in a game.
    Uses teamGoalsLeft as a safety net as to not allow your player to
    record more goals than your team scores*/
    if (goalAbility > (goalChance * 10)){
        goals = 3;
        if(goals > teamGoals){
            goals = teamGoals;
        }
    } else if(goalAbility > (goalChance * 4)){
        goals = 2;
        if(goals > teamGoals){
            goals = teamGoals;
        }
    } else if (goalAbility > goalChance){
        goals = 1;
        if(goals> teamGoals){
            goals = 0;
        }
    } else {
        goals = 0;
    }
    
    seasonGoals += goals;
    careerGoals += goals;
    callback(teamGoals, goals, hitsThisGame);
}

// Function that determines how many assists your player gets in a given game
function assistsThisGame(teamGoals, goals, callback) {
    // Radomizes a number between 1 and 200
    assistChance = Math.random() * 200;
    // Determines your players ability to get an assist based on your player attributes
    assistAbility = lowImpactAbility * player.skills.offense.shooting +
        highImpactAbility * player.skills.offense.passing +
        medImpactAbility * player.skills.offense.handling +
        lowImpactAbility * player.skills.defense.checking +
        lowImpactAbility * player.skills.defense.positioning +
        lowImpactAbility * player.skills.defense.takeaway +
        highImpactAbility * player.skills.athletics.speed +
        medImpactAbility * player.skills.athletics.strength +
        lowImpactAbility * player.skills.athletics.endurance;
    
    // Find how many goals were scored by your team, not including your player
    teamGoalsLeft = teamGoals - goals;
    
    /* Uses the assistAbility of your player to determine the likeliness
    of your player recording one or more assists in a game.
    Uses teamGoalsLeft as a safety net as to not allow your player to
    record more points than your team scores*/
    if (assistAbility > (assistChance * 10)){
        assists = 3;
        if(assists > teamGoalsLeft){
            assists = teamGoalsLeft;
        }
    } else if(assistAbility > (assistChance * 4)){
        assists = 2;
        if(assists > teamGoalsLeft){
            assists = teamGoalsLeft;
        }
    } else if (assistAbility > assistChance){
        assists = 1;
        if(assists > teamGoalsLeft){
            assists = 0;
        }
    } else {
        assists = 0;
    }
    
    seasonAssists += assists;
    careerAssists += assists;
    points = goals + assists;
    seasonPoints += points;
    careerPoints += points;
    callback(timeOnIceThisGame);
}

function hitsThisGame(callback) {
    // Radomizes a number between 1 and 100
    hitChance = Math.random() * 80;
    // Determines your players ability to record a hit based on your player attributes
    hitAbility = lowImpactAbility * player.skills.offense.shooting +
        lowImpactAbility * player.skills.offense.passing +
        lowImpactAbility * player.skills.offense.handling +
        highImpactAbility * player.skills.defense.checking +
        highImpactAbility * player.skills.defense.positioning +
        lowImpactAbility * player.skills.defense.takeaway +
        medImpactAbility * player.skills.athletics.speed +
        highImpactAbility * player.skills.athletics.strength +
        lowImpactAbility * player.skills.athletics.endurance;
    
    if(hitAbility > (hitChance * 15)){
        hits = 5;
    } else if (hitAbility > (hitChance * 12)){
        hits = 4;
    } else if (hitAbility > (hitChance * 7)){
        hits = 3;
    } else if (hitAbility > (hitChance * 2)){
        hits = 2;
    } else if (hitAbility > hitChance){
        hits = 1;
    } else {
        hits = 0;
    }
    
    seasonHits += hits;
    careerHits += hits;
    callback();
}

function timeOnIceThisGame() {
    timeOnIce = 600;
    
    var timeOnIceRand = Math.round(Math.random() * 180);
    timeOnIceAverage = Math.random() * 200;
    
    timeOnIceAbility = lowImpactAbility * player.skills.offense.shooting +
        lowImpactAbility * player.skills.offense.passing +
        lowImpactAbility * player.skills.offense.handling +
        medImpactAbility * player.skills.defense.checking +
        highImpactAbility * player.skills.defense.positioning +
        highImpactAbility * player.skills.defense.takeaway +
        highImpactAbility * player.skills.athletics.speed +
        highImpactAbility * player.skills.athletics.strength +
        highImpactAbility * player.skills.athletics.endurance;

    if(timeOnIceAbility > (timeOnIceAverage * 15)){
        timeOnIce += 600 + timeOnIceRand;
    } else if (timeOnIceAbility > (timeOnIceAverage * 12)){
        timeOnIce += 480 + timeOnIceRand;
    } else if (timeOnIceAbility > (timeOnIceAverage * 7)){
        timeOnIce += 360 + timeOnIceRand;
    } else if (timeOnIceAbility > (timeOnIceAverage * 2)){
        timeOnIce += 240 + timeOnIceRand;
    } else if (timeOnIceAbility > timeOnIceAverage){
        timeOnIce += 120 + timeOnIceRand;
    } else {
        timeOnIce += timeOnIceRand;
    }
    timeOnIceMin = Math.floor(timeOnIce/60);
    timeOnIceSec = Math.floor(timeOnIce%60);
    totalTimeOnIceMin += timeOnIceMin;
    totalTimeOnIceSec += timeOnIceSec;
    
    if (timeOnIceSec.toString().length === 1){
        timeOnIceSec = "0" + timeOnIceSec.toString();   
    }
    timeOnIce = timeOnIceMin + ":" + timeOnIceSec;
    
    seasonTimeOnIce = Math.floor(totalTimeOnIceMin/(games+1)) + ":" + 
        Math.floor(totalTimeOnIceSec/(games+1));
}

function determineWinner() {
    if (periodRegH > periodRegV){
        $("#teamWins h2").html("" + player.team + " Win");
            wins++;
    } else if (periodRegH < periodRegV){
        $("#teamWins h2").html("" + player.team + " Lose");
        losses++;
    } else {
        if (periodOTH > periodOTV){
            $("#teamWins h2").html("" + player.team + " Win in Overtime");
            wins++;
        } else {
            $("#teamWins h2").html("" + player.team + " Lose in Overtime");
            lossesOT++;
        }
    }
}    

// Function updates the html to reflect the new player stats
function updateStats(preOrPostIDs, preOrPostStats) {
    
    preOrPostIDs.forEach(function(element, index){
        $(element).html(preOrPostStats[index]);
    });

}

function updateStatsArray () {

    seasonStats = [seasons, games, seasonGoals, seasonAssists, seasonPoints, seasonHits, seasonTimeOnIce];

    playoffStats = [playoffs, games, playoffGoals, playoffAssists, playoffPoints, playoffHits, playoffTimeOnIce]; 
    
}

function appendStatLine(preOrPostIDs1, preOrPostIDs2) {
    
    preOrPostIDs1.forEach(function(element, index){
        $(element).attr('id', ''+element+'Past');
    });
    
    preOrPostIDs2.forEach(function(element, index){
        $(element).attr('id', ''+element+'Past');
    });
            
    $("#seeseasonStats").append("<div class='clear'></div>" +
            "<h4 class='stats' id='seasonNum'>1</h4>" +
            "<h4 class='stats' id='seasonGames'>0</h4>" +
            "<h4 class='stats' id='seasonGoals'>0</h4>" +
            "<h4 class='stats' id='seasonAssists'>0</h4>" +
            "<h4 class='stats' id='seasonPoints'>0</h4>" +
            "<h4 class='stats' id='seasonHits'>0</h4>" +
            "<h4 class='stats endOfStats' id='seasonTOI'>0</h4>");
    
    $("#seeplayoffStats").append("<div class='clear'></div>" +
            "<h4 class='stats' id='playoffNum'>1</h4>" +
            "<h4 class='stats' id='playoffGames'>0</h4>" +
            "<h4 class='stats' id='playoffGoals'>0</h4>" +
            "<h4 class='stats' id='playoffAssists'>0</h4>" +
            "<h4 class='stats' id='playoffPoints'>0</h4>" +
            "<h4 class='stats' id='playoffHits'>0</h4>" +
            "<h4 class='stats endOfStats' id='playoffTOI'>0</h4>");
            
            var statHeight = $('#playerStats').height();
            
            alert("End of season");
            
            $('#playerStats').height(statHeight+52);
}

// Receives an array as a parameter and passes it to a for which changes the html to the pregame settings
function resetGame(arr){
    for (var i = 0; i < arr.length; i++) {
        $(arr[i]).html("-");
    }
}
    

 
