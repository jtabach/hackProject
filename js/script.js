
// Created player object literal
var player = {
    firstName: 'Jeff',
    lastName: 'Tabachnick',
    position: 'Left Wing',
    skills: {
        offense: {
            Shooting: Math.floor(Math.random()*10+60),
            Passing : Math.floor(Math.random()*10+60),
            Handling : Math.floor(Math.random()*10+60)
        },
        defense: {
            Checking : Math.floor(Math.random()*10+60),
            Positioning : Math.floor(Math.random()*10+60),
            Takeaway : Math.floor(Math.random()*10+60)
        },
        athletics: {
            Speed : Math.floor(Math.random()*10+60),
            Strength : Math.floor(Math.random()*10+60),
            Endurance : Math.floor(Math.random()*10+60)
        }
    }
};

var attributePoints = 9;
var areasArray = [];
var skillsArray = [];
var overallOffense, overallDefense, overallAthletics, overallSkill;

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

$(document).ready(function() {
    
    
    
    
    $("#increaseSkill").fancybox({
        
        // Does not allow fancybox to autoSize
        'autoSize': false,
        // Sets the type of fancybox to an iframe
        'type': 'iframe',
        // Sets height and width of the iframe
        'width': 800,
        'height': 500,
        'maxHeight': 355,
        
        // Updates the player attribute stats before the iframe is loaded.
        beforeLoad : function () {
        
            // Invokes the function and passes player skills object
            getNewOverallSkillLevel(player.skills);
            
        },
        
        // Loads the updated player stats
        afterLoad : function () {
            
            // Creates the html of the iframe
            this.inner.append('<div id="attributePoints"><h1>Player Attributes</h1><h3>Points: ' + attributePoints + '</h3></div>');
            this.inner.append('<div class="clear"><br></div>');
            this.inner.append('<button class="skill" area="offense" id="Shooting">Shooting ' + player.skills.offense.Shooting + '</button>');
            this.inner.append('<button class="skill" area="offense" id="Passing">Passing ' + player.skills.offense.Passing + '</button>');
            this.inner.append('<button class="skill" area="offense" id="Handling">Handling ' + player.skills.offense.Handling + '</button>');
            this.inner.append('<div class="average" id="averageOffense"><h3>Offense: ' + overallOffense + '</h3></div>');
            this.inner.append('<div class="clear"></div>');
            this.inner.append('<button class="skill" area="defense" id="Checking">Checking ' + player.skills.defense.Checking + '</button>');
            this.inner.append('<button class="skill" area="defense" id="Positioning">Positioning ' + player.skills.defense.Positioning + '</button>');
            this.inner.append('<button class="skill" area="defense" id="Takeaway">Takeaway ' + player.skills.defense.Takeaway + '</button>');
            this.inner.append('<div class="average" id="averageDefense"><h3>Defense: ' + overallDefense + '</h3></div>');
            this.inner.append('<div class="clear"></div>');
            this.inner.append('<button class="skill" area="athletics" id="Speed">Speed ' + player.skills.athletics.Speed + '</button>');
            this.inner.append('<button class="skill" area="athletics" id="Strength">Strength ' + player.skills.athletics.Strength + '</button>');
            this.inner.append('<button class="skill" area="athletics" id="Endurance">Endurance ' + player.skills.athletics.Endurance + '</button>');
            this.inner.append('<div class="average" id="averageAthletics"><h3>Athlete: ' + overallAthletics + '</h3></div>');
            this.inner.append('<div class="clear"></div>');
            this.inner.append('<div id="averageOverall"><h3>Player Overall: ' + overallSkill + '</h3></div>');
            
            
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

        },
    });
    
    
    
    
    var gameNum = 1;
    
    
    // Hides the divs for the playGame link when the page loads
    $("#playGame, #gameNumber, #scoreLine, #teamWins, #statLine, #attributesEarned, #seeStats").hide();

    
    
    
    // Shows the divs for playGame, gamenumner, and Scoreline when the play game link is clicked
    $("#playGameLink").on('click', function(){
        $("#playGame, #gameNumber, #scoreLine").show();
        
        //Updates the game number and changes the html
        $("#gameNumber h2").html("Regular Season Game #" + (games+1));
    });
       
    // When play button is clicked, simulation begins showing the score of the game period by period
    $('#play').on('click', function(){

        // Checks to see if the play button has been clicked
        if (playButtonClicked === false){
            
            /* Changes the playButtonClicked to true to avoid multiple calls
            to the setTimeout method during a single game*/
            playButtonClicked = true;
            games++;
            
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
                            }, 1000);
                        }
                        // Displays if your team wins or loses
                        setTimeout(function(){
                            $("#teamWins").show();
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000); 
        }   
    });
    
    // Shows the div for player stats when the gameStats button is clicked.
    $('#gameStats').on('click', function(){
        
        // Checks to see if the stats button has previously been clicked for the game
        if (statsButtonClicked === false){
            
            // Sets statsButtonClicked to true to avoid multiple clicks of the stats button
            statsButtonClicked = true;
            
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
        
        // Adds attribute point for completion of game
        attributePoints++;
    });
    
    
    $("#statsLink").on('click', function(){
        
        updateStats();
        $("#seeStats").toggle();
    });
    
    
    
});
    
// Player effect starts at zero but can be increased to directly effect outcome of games as player progresses
var playerEffect = 0;
// Declares variables for playGame
var period1H, period2H, period3H, periodOTH, periodRegH, periodFH;
var period1V, period2V, period3V, periodOTV, periodRegV, periodFV;
var playButtonClicked = false, statsButtonClicked = false;

var resetGameArray = ["#period1V", "#period1H", "#period2V", "#period2H", "#period3V", "#period3H", "#periodOTV", "#periodOTH", "#periodFV", "#periodFH"];

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

var games = 0, seasons = 1;
var wins = 0, losses = 0, lossesOT = 0;
var goals, assists, points, hits, timeOnIce;
var seasonGoals = 0, seasonAssists = 0, seasonPoints = 0, seasonHits = 0, seasonTimeOnIce = 0;
var careerGoals = 0, careerAssists = 0, careerPoints = 0, careerHits = 0, careerTimeOnIce = 0;

var goalChance, assistChance, hitChance, timeOnIceAverage;
var teamGoalsLeft, maxPlayerPoints;
var goalAbility, assistAbility, hitAbility, timeOnIceAbility;
var timeOnIceMin, timeOnIceSec, totalTimeOnIceMin = 0, totalTimeOnIceSec = 0;
var lowImpactAbility = 0.05, medImpactAbility = 0.1, highImpactAbility = 0.25;

// Function that determines how many assists your player gets in a given game
function goalsThisGame(teamGoals, callback) {
    // Radomizes a number between 1 and 200
    goalChance = Math.random() * 200;
    // Determines your players ability to record a goal based on your player attributes
    goalAbility = highImpactAbility * player.skills.offense.Shooting +
        lowImpactAbility * player.skills.offense.Passing +
        highImpactAbility * player.skills.offense.Handling +
        lowImpactAbility * player.skills.defense.Checking +
        lowImpactAbility * player.skills.defense.Positioning +
        lowImpactAbility * player.skills.defense.Takeaway +
        highImpactAbility * player.skills.athletics.Speed +
        medImpactAbility * player.skills.athletics.Strength +
        lowImpactAbility * player.skills.athletics.Endurance;
    
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
    assistAbility = lowImpactAbility * player.skills.offense.Shooting +
        highImpactAbility * player.skills.offense.Passing +
        medImpactAbility * player.skills.offense.Handling +
        lowImpactAbility * player.skills.defense.Checking +
        lowImpactAbility * player.skills.defense.Positioning +
        lowImpactAbility * player.skills.defense.Takeaway +
        highImpactAbility * player.skills.athletics.Speed +
        medImpactAbility * player.skills.athletics.Strength +
        lowImpactAbility * player.skills.athletics.Endurance;
    
    // Find how many goals were scored by your team, not including your player
    teamGoalsLeft = teamGoals - goals;
    console.log(teamGoalsLeft);
    
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
    hitAbility = lowImpactAbility * player.skills.offense.Shooting +
        lowImpactAbility * player.skills.offense.Passing +
        lowImpactAbility * player.skills.offense.Handling +
        highImpactAbility * player.skills.defense.Checking +
        highImpactAbility * player.skills.defense.Positioning +
        lowImpactAbility * player.skills.defense.Takeaway +
        medImpactAbility * player.skills.athletics.Speed +
        highImpactAbility * player.skills.athletics.Strength +
        lowImpactAbility * player.skills.athletics.Endurance;
    
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
    
    timeOnIceAbility = lowImpactAbility * player.skills.offense.Shooting +
        lowImpactAbility * player.skills.offense.Passing +
        lowImpactAbility * player.skills.offense.Handling +
        medImpactAbility * player.skills.defense.Checking +
        highImpactAbility * player.skills.defense.Positioning +
        highImpactAbility * player.skills.defense.Takeaway +
        highImpactAbility * player.skills.athletics.Speed +
        highImpactAbility * player.skills.athletics.Strength +
        highImpactAbility * player.skills.athletics.Endurance;

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
    
    seasonTimeOnIce = Math.floor(totalTimeOnIceMin/games) + ":" + 
        Math.floor(totalTimeOnIceSec/games);
}

function determineWinner() {
    if (periodRegH > periodRegV){
        $("#teamWins h2").html("Team Wins");
            wins++;
    } else if (periodRegH < periodRegV){
        $("#teamWins h2").html("Team Loses");
        losses++;
    } else {
        if (periodOTH > periodOTV){
            $("#teamWins h2").html("Team Wins in Overtime");
            wins++;
        } else {
            $("#teamWins h2").html("Team Loses in Overtime");
            lossesOT++;
        }
    }
}    

// Function updates the html to reflect the new player stats
function updateStats() {
    
    $("#seasonNum").html(seasons);
    $("#seasonGames").html(games);
    $("#seasonGoals").html(seasonGoals);
    $("#seasonAssists").html(seasonAssists);
    $("#seasonPoints").html(seasonPoints);
    $("#seasonHits").html(seasonHits);
    $("#seasonTOI").html(seasonTimeOnIce);

}

// Receives an array as a parameter and passes it to a for which changes the html to the pregame settings
function resetGame(arr){
    for (var i = 0; i < arr.length; i++) {
        $(arr[i]).html("-");
    }
}
    

 
