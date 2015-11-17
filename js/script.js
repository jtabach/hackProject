
// Created player object literal
var player = {
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

// @desc - hold all possible oppenent's user may play (or be drafted to).
// @array - contains strings.
var opponents = ["Senators", "Lightning", "Bruins", "Red Wings", "Panthers", "Sabres",
                 "Maple Leafs", "Rangers", "Capitals", "Penguins", "Devils", "Islanders",
                 "Flyers", "Hurricanes", "Jackets", "Stars", "Blues", "Wild", "Predators",
                 "Jets", "Blackhawks", "Avalanche", "Kings", "Canucks", "Coyotes", "Ducks",
                 "Flames", "Oilers"];


var yearsPro = 1, playoffBirths = 0, allStarGames = 0, stanleyCups = 0;
var attributePoints = 9;
var areasArray = [];
var skillsArray = [];
var overallOffense, overallDefense, overallAthletics, overallSkill;

var playGameLinkActive = false, playoffGameLinkActive = false;
var myPlayerLinkActive = false;
var improvePlayerLinkActive = false, playerStatsLinkActive = false;
var seasonEnd = false;

// Player effect starts at zero but can be increased to directly effect outcome of games as player progresses
var playerEffect = 0;
// Declares variables for playGame
var period1H, period2H, period3H, periodOTH, periodRegH, periodFH;
var period1V, period2V, period3V, periodOTV, periodRegV, periodFV;
var playButtonClicked = false, statsButtonClicked = false;

var formValidated = true;
var opponentPicked = false;
var gamespeed = 500;
var increaseGameSpeed = false, askIncreaseGameSpeed = false;

var resetGameArray = ["#period1V", "#period1H", "#period2V", "#period2H", "#period3V",
                      "#period3H", "#periodOTV", "#periodOTH", "#periodFV", "#periodFH"];

var seasonStatIDs = ["#seasonNum", "#seasonGames", "#seasonGoals", "#seasonAssists",
                     "#seasonPoints", "#seasonHits", "#seasonTOI"];

var playoffStatIDs = ["#playoffNum", "#playoffGames", "#playoffGoals", "#playoffAssists",
                      "#playoffPoints", "#playoffHits", "#playoffTOI"];



var games = 0, playoffGames = 0, postGames = 0, seasons = 1, playoffs = 1;
var playoffRounds = ["Conference Quarterfinals", "Conference Semifinals",
                     "Conference Finals", "Stanley Cup Finals"];
var playoffRound = 0;
var seasonLength, playoffLength;
var winsToQualify, winsToAdvance;
var careerLength = 10;
var wins = 0, losses = 0, lossesOT = 0;
var careerWins = 0;
var playoffWins = 0, playoffLosses = 0;

var goals, assists, points, hits, timeOnIce;
var postGoals, postAssits, postPoints, postHits, postTimeOnIce;
var seasonGoals = 0, seasonAssists = 0, seasonPoints = 0, seasonHits = 0, seasonTimeOnIce = 0;
var playoffGoals = 0, playoffAssists = 0, playoffPoints = 0, playoffHits = 0, playoffTimeOnIce = 0;

var careerGoals = 0, careerAssists = 0, careerPoints = 0, careerHits = 0, careerTimeOnIce = 0;

var seasonStats = [seasons, games, seasonGoals, seasonAssists, seasonPoints, seasonHits, seasonTimeOnIce];

var playoffStats = [playoffs, games, playoffGoals, playoffAssists, playoffPoints, playoffHits, playoffTimeOnIce];

var goalChance, assistChance, hitChance, timeOnIceAverage;
var teamGoalsLeft, maxPlayerPoints;
var goalAbility, assistAbility, hitAbility, timeOnIceAbility;
var timeOnIceMin, timeOnIceSec, totalTimeOnIceMin = 0, totalTimeOnIceSec = 0;
var playoffTotalTimeOnIceSec = 0, playoffTotalTimeOnIceMin = 0;
var lowImpactAbility = 0.05, medImpactAbility = 0.1, highImpactAbility = 0.25;

// Achievements
var achievePlayoffs = false, achieveStanleyCup = false, achieve50Wins = false;
var achieve100Wins = false, achieve85Overall = false, achieve99Overall = false;
var achieveAllStar = false, achieveCaptain = false, achieveRocket = false;
var achieveMVP = false, achieveFinalsMVP = false, achieveLegend = false;


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
        alert("Please input a full name. No numbers, special characters, or spaces");
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
    $("#playerInfoLink, #playGameLink, #myPlayerLink, #improvePlayerLink, #playoffGameLink, #playerStatsLink, #teamRecordLink, #pick, #draft, #submitGames, #info, #myPlayer").hide();
    
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
        $("#playerInfoLink, #playGameLink, #improvePlayerLink, #playoffGameLink, #playerStatsLink, #teamRecordLink, #myPlayerLink, #info").show();
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
    $("#mpo").html("Overall: " + overallSkill); 
    
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
        if(playGameLinkActive === false && playoffGameLinkActive === false && playerStatsLinkActive === false && myPlayerLinkActive === false){
        
            if (improvePlayerLinkActive === false){
                $("#playGameLink, #playoffGameLink, #playerStatsLink, #myPlayerLink").addClass('gray');
                improvePlayerLinkActive = true;           
            } else {
                improvePlayerLinkActive = false;
                $("#playerStatsLink, #myPlayerLink").removeClass('gray');
                if(seasonEnd === false){
                    $("#playGameLink").removeClass('gray');
                } else {
                    $("#playoffGameLink").removeClass('gray');
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
            $("#mpo").html("Overall: " + overallSkill); 
            
            // Checks to see if overallSkill has reached 99.
            if (overallSkill >= 99) {
                
                // Invokes function to award user for reaching 99 overall.
                checkAchievement99Overall();
                
                /** User's overall has reached an ability to directly effect outcome of games.
                * User's team has a max goals potential 2 higher than the opponent.
                * This will result in the user having a much greater chance of winning.
                */
                playerEffect = 2;
                
            // Checks to see if overallSkill has reached 85.
            } else if (overallSkill >= 85) {
                
                // Invokes function to award user for reaching 85 overall.
                checkAchievement85Overall();
                
                /** User's overall has reached an ability to directly effect outcome of games.
                * User's team has a max goals potential 1 higher than the opponent.
                * This will result in the user having a slightly greater chance of winning.
                */
                playerEffect = 1;
            }
           
        }
    });
    
    
    
    var gameNum = 1;
    
    
    // Hides the divs for the playGame link when the page loads
    $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned, #playerStats").hide();

    
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    $("#myPlayerLink").on('click', function() {
        if(improvePlayerLinkActive === false && playerStatsLinkActive === false && playButtonClicked === false && playGameLinkActive === false && playoffGameLinkActive === false){
            
            if (myPlayerLinkActive === false){
                $("#playGameLink, #playoffGameLink, #playerStatsLink, #improvePlayerLink").addClass('gray');
                myPlayerLinkActive = true;           
            } else {
                myPlayerLinkActive = false;
                $("#playerStatsLink, #improvePlayerLink").removeClass('gray');
                if(seasonEnd === false){
                    $("#playGameLink").removeClass('gray');
                } else {
                    $("#playoffGameLink").removeClass('gray');
                }
            }
            
            
            $("#myPlayer").toggle();
        }
    });
    
    
    
    function pizzaria() {}
    
//    function getClickHandler() {
//        for (var item in links) {
//            $(links[item].id).on('click', links[item].clickHandler);
//        }
//    }
    
    
    
    $("#playGameLink").on('click', function() {
        
        // Check to see if improvePlayer link or playerStats link is active
        // If it is, don't allow increase Skill dev to show
        if(improvePlayerLinkActive === false && playerStatsLinkActive === false && playButtonClicked === false && seasonEnd === false && myPlayerLinkActive === false){
        
            if (playGameLinkActive === false){
                $("#gameStats, #xGame").hide();
                $("#improvePlayerLink, #playerStatsLink, #myPlayerLink").addClass('gray');
                playGameLinkActive = true;           
            } else {
                $("#improvePlayerLink, #playerStatsLink, #myPlayerLink").removeClass('gray');
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
    
    $("#playoffGameLink").on('click', function() {
        if(improvePlayerLinkActive === false && playerStatsLinkActive === false && playButtonClicked === false && seasonEnd === true && myPlayerLinkActive === false){
            
            if (playoffGameLinkActive === false){
                $("#gameStats, #xGame").hide();
                $("#improvePlayerLink, #playerStatsLink, #myPlayerLink").addClass('gray');
                playoffGameLinkActive = true;           
            } else {
                $("#improvePlayerLink, #playerStatsLink, #myPlayerLink").removeClass('gray');
                playoffGameLinkActive = false;
            }
        
            $("#playGame, #gameNumber, #scoreLine").toggle();
            
            
            $("#gameNumber h2").html(playoffRounds[playoffRound] + " - Game #" + (postGames+1));
            if (opponentPicked === false){
                $("#teamV").html(opponents[Math.floor(Math.random()*opponents.length)]);
            }
            opponentPicked = true;
        }
    });
    
    
    
       
    // When play button is clicked, simulation begins showing the score of the game period by period
    $('#play').on('click', function(){
        
        $("#playGameLink, #playoffGameLink, #improvePlayerLink, #playerStatsLink, #myPlayerLink").addClass('gray');
        playGameLinkActive = true;
        opponentPicked = false;

        // Checks to see if the play button has been clicked
        if (playButtonClicked === false){
            
            $("#play").hide();
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
                            }, gamespeed);
                        }
                        // Displays if your team wins or loses
                        setTimeout(function(){
                            $("#teamWins, #gameStats").show();
                        }, gamespeed);
                    }, gamespeed);
                }, gamespeed);
            }, gamespeed); 
        }
        
        if (games === 3 && askIncreaseGameSpeed === false) {
            increaseGameSpeed = confirm("Would like to greatly increase the game speed?");
            if (increaseGameSpeed) {
                gamespeed = 100;
                askIncreaseGameSpeed = true;
            }
        }
        
    });
    
        

    $('#gameStats').on('click', function(){
        
        // Checks to see if the stats button has previously been clicked for the game
        if (statsButtonClicked === false){
            
            $("#gameStats").hide();
            // Sets statsButtonClicked to true to avoid multiple clicks of the stats button
            statsButtonClicked = true;
            
            
            $("#playerName").html(player.lastName);
            $("#gameGoals").html(goals);
            $("#gameAssists").html(assists);
            $("#gamePoints").html(points);
            $("#gameHits").html(hits);
            $("#gameTOI").html(timeOnIce);
            
            // shows the player stats and attribute points earned
            $("#statLine, #attributesEarned, #xGame").show();
            
        }
        
    });
    
    // When clicked hides the entire playGame Div
    $('#xGame').on('click', function(){
        $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned").hide();
        
        // Invokes resestGame which resets the html for the next game
        resetGame(resetGameArray);
        
        $("#xGame").hide();
        $("#play").show();
        
        // Updates the team record
        
        if (seasonEnd === false){
            $("#record").html("Team Record: " + wins + "-" + losses + "-" + lossesOT);
        } else {
            $("#record").html("Playoff Series: " + playoffWins + "-" + playoffLosses);
        }
        
        // Sets both conditionals back to false to allow buttons to be clicked for the next game
        playButtonClicked = false;
        statsButtonClicked = false;
        
        $("#improvePlayerLink, #playerStatsLink, #myPlayerLink").removeClass('gray');
        if (seasonEnd === false){
            $("#playGameLink").removeClass('gray');
        } else {
            $("#playoffGameLink").removeClass('gray');
        }
        playGameLinkActive = false;
        playoffGameLinkActive = false;
        
        // Adds attribute point for completion of game
        attributePoints++;
        $("#attributePoints > h3").html("Points: " + attributePoints);
        if (seasonEnd === false) {
            games++;
        } else {
            playoffGames++;
            postGames++;
        }
        
        /** Conditional that is used to check if player has qualified as an allstar
        * at the halfway point of the season.
        */
        if (seasonLength/2 === games) {
            
            /** Conditional to check if user has averaged at least one point per game
            * at the half way point of the season. If so, they are selected as an allstar.
            */
            if (seasonPoints >= games) {
                
                // Increases the number of times user has been an allstar.
                allStarGames++;
                
                // Appends the myPlayer Button to reflect number or allstar appearances
                $("#ag").html("Allstar Games: " + allStarGames);
                
                // Alerts user that their player has been selected as an allstar.
                alert("You have been selected as an allstar this season!");
                
                // Invokes function to award user for being selected as an Allstar.
                checkAchievementAllStar();
                
                // Check if the user has reached legendary status as allstar games is a requirement.
                preChecklegend();
            }
        }
        
        if (playoffWins === winsToAdvance && playoffRound === 3) {
            
            // Invokes function to award user for qualifying for the playoffs.
            checkAchievementPlayoffs();
            
            // Invokes function to award user for winning the Stanley Cup.
            checkAchievementStanleyCup();
            stanleyCups++;
            playoffBirths++;
            
            /** Conditional to check if user has averaged at least one point per game
            * throughout the Stanley Cup Playoffs.
            */
            if (playoffPoints >= playoffGames) {
                
                // Alerts user that their player has been selected as the finals MVP.
                alert("You have been selected as an Conn Smythe Winner as the " +
                      "Stanley Cup Finals MVP!");
                
                // Invokes function to award user for being selected as the finals MVP.
                checkAchievementfinalsMVP();
            }
            
            // Check the if user has reached legendary status as Stanley Cups is a requirement.
            preChecklegend();
            
            $('#pb').html("Playoff Births: " + playoffBirths);
            alert("You won the Stanley Cup!");
            alert("End of playoffs. Begin Next Season");
            $('#playGameLink').removeClass('gray');
            $('#playoffGameLink').addClass('gray');
            $("#record").html("Team Record: " + 0 + "-" + 0 + "-" + 0);
            updateStatsArray();
            updateStats(seasonStatIDs, seasonStats);
            updateStats(playoffStatIDs, playoffStats);
            resetSeason();
            resetPlayoffs();
            appendStatLine(seasonStatIDs);
            seasonEnd = false;
            appendStatLine(playoffStatIDs);
        } else if (playoffWins === winsToAdvance) {
            playoffWins = 0;
            playoffLosses = 0;
            postGames = 0;
            playoffRound ++;
            alert("Congratulations you moved to the " +playoffRounds[playoffRound] + "!");
            $("#record").html("Playoff Series: " + playoffWins + "-" + playoffLosses);
        } else if (playoffLosses === winsToAdvance){
            
            // Invokes the function to award user for qualifying for the playoffs.
            checkAchievementPlayoffs();
            playoffBirths++;
            $('#pb').html("Playoff Births: " + playoffBirths);
            alert("You lost in the " + playoffRounds[playoffRound]);
            alert("End of playoffs. Begin Next Season");
            $('#playGameLink').removeClass('gray');
            $('#playoffGameLink').addClass('gray');
            $("#record").html("Team Record: " + 0 + "-" + 0 + "-" + 0);
            updateStatsArray();
            updateStats(seasonStatIDs, seasonStats);
            updateStats(playoffStatIDs, playoffStats);
            resetSeason();
            resetPlayoffs();
            appendStatLine(seasonStatIDs);
            seasonEnd = false;
            appendStatLine(playoffStatIDs);
            
        }
        
        if(games >= seasonLength){
            seasonEnd = true;
            
            /** Conditional that checks if the user scored at least as many goals
            * as games played in the season.
            */
            if (seasonGoals >= seasonLength && playoffGames === 0) {
                
                // Alert the user that they have won the Rocket Richard Trophy this season.
                alert("You have been awarded the Rocket Richard Trophy for " +
                      "the most goals by any player this season with " + seasonGoals + " goals!");
                
                // Invokes fuction for winning the Rocket Richard Trophy
                checkAchievementRocket();
            }
            
            /** Conditional that checks if the user recorded at least as many points
            * as games played in the season and qualified for the playoffs.
            */
            if (seasonPoints >= seasonLength && wins >= winsToQualify && playoffGames === 0){
                
                // Alert the user that they have won the Hart Memorial Trophy this season.
                alert("You have been awarded the Hart Memorial Trophy for " +
                      "being selected the league's the most valuable player " + 
                      "in the regular season with " + seasonPoints + " points!");
                
                // Invokes fuction for winning the Hart Memorial Trophy.
                checkAchievementMVP();
            }
            
            if(wins >= winsToQualify){
                $("#playGameLink").addClass('gray');
                $("#playoffGameLink").removeClass('gray');
                $("#record").html("Playoff Series: " + playoffWins + "-" + playoffLosses);
                if (playoffGames === 0) {
                    alert("You have qualified for the playoffs!");
                }
            } else {
                alert("You did not qaulify for te playoffs. You only won "
                     + wins + " of the needed " + winsToQualify + ".\n\n"
                     + "Better luck next year. Next season has begun.");
                updateStatsArray();
                updateStats(seasonStatIDs, seasonStats);
                updateStats(playoffStatIDs, playoffStats);
                resetSeason();
                resetPlayoffs();
                appendStatLine(seasonStatIDs);
                seasonEnd = false;
                appendStatLine(playoffStatIDs);
            }
            
            

            
        }
    });
    
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    $("#playerStatsLink").on('click', function(){
        
        if (!$(this).hasClass('gray')) { 
        
            getLeaveGrayID(seasonEnd, links.playerStats, links, toggleLinksGray);
            
            updateStatsArray();
            updateStats(seasonStatIDs, seasonStats);
            updateStats(playoffStatIDs, playoffStats);
            $("#playerStats").toggle();
        }
        
    });
    
    
    
});

var links = {
    playerStats: {
        active: false,
        id: "#playerStatsLink",
//        clickHandler: pizzaria
    },
    improvePlayer: {
        active: false,
        id: "#improvePlayerLink"
    },
    myPlayer: {
        active: false,
        id: "#myPlayerLink"
    },
    playGame: {
        active: false,
        id: "#playGameLink"
    },
    playoffGame: {
        active: false,
        id: "#playoffGameLink"
    }
};


/**
  * @seasonEnd - Boolean 
  *
*/

function getLeaveGrayID(seasonEnd, clickedLink, linksObj, callbackLinks) {
    var leaveGray;
    leaveGray = (seasonEnd) ? "#playGameLink" : "#playoffGameLink";
    return callbackLinks(leaveGray, clickedLink, linksObj);
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



//var linkIDs = ["#playerStatsLink", "#improvePlayerLink", "#myPlayerLink", 
//               "#playGameLink", "#playoffGameLink"];
//
//
//function getLeaveGrayID(seasonEnd, linkClicked, linkID, callbackLinks) {
//    var leaveGray;
//    leaveGray = (seasonEnd) ? "#playGameLink" : "#playoffGameLink";
//    return callbackLinks(linkClicked, linkID, leaveGray);
//}
//
//function toggleLinksGray(linkClicked, linkID, leaveGray) {
//    if (!linkClicked) {
//        linkIDs.forEach(function(element, index){
//            if (element !== linkID) {
//                $(element).addClass('gray');
//            }
//        });
//    } else {
//        linkClicked = false;
//        linkIDs.forEach(function(element, index){
//            if (element !== linkID && element !== leaveGray) {
//                $(element).removeClass('gray');
//            }
//        });
//    }
//}
    

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
    
    if (seasonEnd === true){
        postGoals = goals;
        playoffGoals += postGoals;
    } else {
        seasonGoals += goals;
    }
    
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
    
    points = goals + assists;
    
    if (seasonEnd === true){
        postAssists = assists;
        playoffAssists += postAssists;
        postPoints = points;
        playoffPoints += postPoints;
    } else {
        seasonAssists += assists;
        seasonPoints += points;
    }
    
    careerAssists += assists;
    careerPoints += points;
    
    /** Conditional to verify if user has reached 500 career points. Is linked
    * to the legendary Achievement but not invoked until 500 to avoid multple calls.
    */
    if (careerPoints >= 500) { 
    
        // Check the if user has reached legendary status as career points is a requirement.
        preChecklegend();
    }
    
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
    
    if (seasonEnd === true){
        postHits = hits;
        playoffHits += postHits;
    } else {
        seasonHits += hits;
    }
    
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
    
    if (seasonEnd === true){
        playoffTotalTimeOnIceMin += timeOnIceMin;
        playoffTotalTimeOnIceSec += timeOnIceSec;
        playoffTimeOnIce = Math.floor(playoffTotalTimeOnIceMin/(playoffGames+1)) + ":" + 
            Math.floor(playoffTotalTimeOnIceSec/(playoffGames+1));
    } else {
        seasonTimeOnIce = Math.floor(totalTimeOnIceMin/(games+1)) + ":" + 
            Math.floor(totalTimeOnIceSec/(games+1));
    }
}

function determineWinner() {
    if (periodRegH > periodRegV){
        $("#teamWins h2").html("" + player.team + " Win");
        if (seasonEnd === false) {
            wins++;
            careerWins++;
        } else {
            playoffWins++;
            careerWins++;
        }
    } else if (periodRegH < periodRegV){
        $("#teamWins h2").html("" + player.team + " Lose");
        if (seasonEnd === false) {
            losses++;
        } else {
            playoffLosses++;
        }
    } else {
        if (periodOTH > periodOTV){
            $("#teamWins h2").html("" + player.team + " Win in Overtime");
            if (seasonEnd === false) {
                wins++;
                careerWins++;
            } else {
                playoffWins++;
                careerWins++;
        }
        } else {
            $("#teamWins h2").html("" + player.team + " Lose in Overtime");
            if (seasonEnd === false) {
                losses++;
            } else {
                playoffLosses++;
        }
        }
    }
    
    // Checks to see if user has reached 100 career wins.
    if (careerWins >= 100) {
        
        // Invokes function to award user for reaching 100 career wins.
        checkAchievement100Wins();
        
    // Checks to see if user has reached 50 career wins.    
    } else if (careerWins >= 50) {
        
        // Invokes function to award user for reaching 100 career wins.
        checkAchievement50Wins();
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

    playoffStats = [playoffs, playoffGames, playoffGoals, playoffAssists, playoffPoints, playoffHits, playoffTimeOnIce]; 
    
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

// Receives an array as a parameter and passes it to a for which changes the html to the pregame settings
function resetGame(arr){
    for (var i = 0; i < arr.length; i++) {
        $(arr[i]).html("-");
    }
}
    
function resetSeason() {
    seasons++;
    yearsPro++;
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
    timeOnIceSec = 0;
    timeOnIceMin = 0;
    totalTimeOnIceMin = 0;
    totalTimeOnIceSec = 0;
    $('#yp').html("Years Pro: " + yearsPro);
    $('#sc').html("Stanley Cups: " + stanleyCups);
    pointPerGameSeason = false;
    
    // Conditional that checks to see if the user has reached their 7th seaon.
    if (seasons === 8) {
        
        // Alerts the user that they have been made Captain.
        alert("You have just finished your 7th season with the " + player.team +
             "./n/nYour teammates have voted and you have been named Captain!");
        
        /** Invoked function to award the user for finishing their 7th
        * season and being named captain.
        */
        checkAchievementCaptain();
    }
}
 
function resetPlayoffs() {
    playoffs++;
    playoffWins = 0;
    playoffLosses = 0;
    playoffGames = 0;
    postGames = 0;
    playoffRound = 0;
    playoffGoals = 0; 
    playoffAssists = 0; 
    playoffPoints = 0; 
    playoffHits = 0; 
    playoffTimeOnIce = 0;
    playoffTotalTimeOnIceMin = 0;
    playoffTotalTimeOnIceSec = 0;
    pointPerGamePlayoff = false;
}

/** The following 12 functions check for player achievements. 
* Achievements are shown by clicking on the myPlayer Button.
* Any achievements that have not been unlocked have a gray filter.
* Hovering over an achievement will notify the user what tasks
* must be accomplished to unlock that achievement.
**/
    
/** checkAchievementPlayoffs() receives no parameters.
* Called at end of season if user qualified for playoffs.
*/
function checkAchievementPlayoffs() {

    //Checks to see if achievement has been unlocked previously.
    if (achievePlayoffs === false){
        
        // Alerts user that they have unlucked the achievement.
        alert("You have unlocked the Playoffs Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achievePlayoffs").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achievePlayoffs = true;
    }
}

/** checkAchievementStanleyCup() receives no parameters.
* Called at end of playoffs if user won the Stanley Cup.
*/    
function checkAchievementStanleyCup() {   
    
    //Checks to see if achievement has been unlocked previously.
    if (achieveStanleyCup === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the Stanley Cup Winner Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieveStanleyCup").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieveStanleyCup = true;
    }
}

/** checkAchievement50Wins() receives no parameters.
* Passes a conditional prior to being invoked.
* Called once the user has won 50 games.
*/  
function checkAchievement50Wins() {

    //Checks to see if achievement has been unlocked previously.
    if (achieve50Wins === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the 50 Wins Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieve50Wins").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieve50Wins = true;
    }
}

/** checkAchievement100Wins() receives no parameters.
* Passes a conditional prior to being invoked.
* Called once the user has won 100 games.
*/  
function checkAchievement100Wins() {

    //Checks to see if achievement has been unlocked previously.
    if (achieve100Wins === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the 100 Wins Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieve100Wins").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieve100Wins = true;
    }
}

/** checkAchievement85Overall() receives no parameters.
* Passes a conditional prior to being invoked.
* Called once the user's player has reached an 85 overall rating.
*/  
function checkAchievement85Overall() {

    //Checks to see if achievement has been unlocked previously.
    if (achieve85Overall === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the 85 Overall Rating Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieve85Overall").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieve85Overall = true;
    }
}

/** checkAchievement99Overall() receives no parameters.
* Passes a conditional prior to being invoked.
* Called once the user's player has reached an 99 overall rating.
*/  
function checkAchievement99Overall() {

    //Checks to see if achievement has been unlocked previously.
    if (achieve99Overall === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the 99 Overall Rating Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieve99Overall").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieve99Overall = true;
    }
}

/** checkAchievementAllStar() receives no parameters.
* Passes a conditional prior to being invoked.
* Called once the user has reached the halfway point of the season and
* has averaged at least a one point per game average.
*/ 
function checkAchievementAllStar() {

    //Checks to see if achievement has been unlocked previously.
    if (achieveAllStar === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the Allstar Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieveAllStar").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieveAllStar = true;
    }
}

/** checkAchievementCaptain() receives no parameters.
* Passes a conditional prior to being invoked.
* Called once the user has finished their 7th season.
*/ 
function checkAchievementCaptain() {

    //Checks to see if achievement has been unlocked previously.
    if (achieveCaptain === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the Captain Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieveCaptain").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieveCaptain = true;
    }
}

/** checkAchievementRocket() receives no parameters.
* Passes a conditional prior to being invoked.
* Called if the user has scored at least a goal per game during regular season.
*/ 
function checkAchievementRocket() {

    //Checks to see if achievement has been unlocked previously.
    if (achieveRocket === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the Rocket Richard Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieveRocket").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieveRocket = true;
    }

}

/** checkAchievementMVP() receives no parameters.
* Passes a conditional prior to being invoked.
* Called if the user has qualified for the playoffs while averaging
* over a point per game for the regular season.
*/ 
function checkAchievementMVP() {

    //Checks to see if achievement has been unlocked previously.
    if (achieveMVP === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the MVP Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieveMVP").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieveMVP = true;
    }
}

/** checkAchievementFinalsMVP() receives no parameters.
* Passes a conditional prior to being invoked.
* Called if the user has won the Stanley Cup while averaging
* over a point per game for the playoffs.
*/ 
function checkAchievementfinalsMVP() {

    //Checks to see if achievement has been unlocked previously.
    if (achieveFinalsMVP === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the MVP Achievement!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieveFinalsMVP").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieveFinalsMVP = true;
    }
}

/** checkAchievementLegend() receives no parameters.
  * Passes 3 conditional prior to being invoked.
  * Called if the user has won the Stanley Cup at least 3 times, has been
  * selected to 7 allstar games and has accumulated at least 500 career points.
*/ 
function checkAchievementLegend() {

    //Checks to see if achievement has been unlocked previously.
    if (achieveLegend === false){
        
        // Alerts user that they have unlocked the achievement.
        alert("You have unlocked the Legend Achievement! This achievement " +
              "is awarded for scoring 500 career points, being selected to " +
              "7 allstar games, and winning 3 Stanley Cups!");
        
        /** Removes the locked class which removes the
        * gray filter on the myPlayer achievement.
        */
        $("#achieveLegend").removeClass('locked');
        
        // Achievement set to true to eliminate multiple notifications.
        achieveLegend = true;
    }
}

/** preCheckLegend() recieves no parameters. It is called in 3 different locations
  * as the conditional requires three variables to result to true.
*/
function preChecklegend() {
    
    /** Conditional that checks legendary requirements for career points,
      * allstar games, and Stanley Cups.
    */
    if (careerPoints >= 500 && allStarGames >= 7 && stanleyCups >= 3) {
        
        // Invokes function awarding the user for being a legend of the NHL.
        checkAchievementLegend();
    }
}