PlayerControllerTwo = function PlayerControllerTwo() {
    var playerService = new PlayerServiceTwo(ready);
    var loading = true; //Start the spinner

    function ready() {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.

        $('some-button').on('click', function () {
            var teamSF = playerService.getPlayersByTeam("SF");
        })
    }

    this.drawMyTeam = function () {
        var myTeamElem = document.getElementById("my-team");
        var template = '';
        for (var i = 0; i < playerService.myTeam.length; i++) {
            teamMember = playerService.myTeam[i];
            template += `
            <div class="card">
            <img class="card-img-top" src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Player Name: ${teamMember.fullname}</h5>
            <p class="card-text">Position: ${teamMember.position}</p>
            <p class="card-text">Team: ${teamMember.pro_team}</p>
            <button type="button" class="btn btn-success" onclick="app.controllers.playerCtrl.addToTeam()">Add to Team</button>
            </div>
            </div>`
        }
        myTeamElem.innerHTML = template;
    }

    // Lets search our newly loaded data using onsubmit functionality
    console.log("console is staying out here")
    this.formSubmission = function () {
        console.log("is console coming in here?")
    }


}