PlayerController = function PlayerController() {
    var playerService = new PlayerService(ready);
    var loading = true; //Start the spinner


    function ready() {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
        $('some-button').on('click', function () {
            var teamSF = playerService.getPlayersByTeam("SF");
        })
    }

    function drawMyTeam(myTeam) {
        var myTeam = playerService.getMyTeam();
        var myTeamElem = document.getElementById("my-team");
        var template = '';
        for (var i = 0; i < myTeam.length; i++) {
            teamMember = myTeam[i];
            template += `
            <div class=" col-sm-3 card">
            <img class="card-img-top" src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Player Name: ${teamMember.fullname}</h5>
            <p class="card-text">Position: ${teamMember.position}</p>
            <p class="card-text">Team: ${teamMember.pro_team}</p>
            <button type="button" class="btn btn-danger" onclick="app.controllers.playerCtrl.removeFromTeam(${teamMember.id})">Remove From Team</button>
            </div>
            </div>`
        }
        myTeamElem.innerHTML = template;
    }

    function drawSearchResults(searchResults) {
        var searchResults = playerService.getSearchResults();
        var searchElem = document.getElementById("searched-cards");
        var template = '';
        for (var i = 0; i < searchResults.length; i++) {
            aResult = searchResults[i];
            template += `
                <div class="col-sm-3 card">
                <img class="card-img-top" src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Player Name: ${aResult.fullname}</h5>
                        <p class="card-text">Position: ${aResult.position}</p>
                     <p class="card-text">Team: ${aResult.pro_team}</p>
                     <button type="button" class="btn btn-success" onclick="app.controllers.playerCtrl.addToTeam(${aResult.id})">Add to Team</button>
                    </div>
                </div>`
        }
        searchElem.innerHTML = template;
    }

    // Lets search our newly loaded data using onsubmit functionality
    this.getPlayersByTeam = function (e) {
        e.preventDefault();
        var teamName = e.target.team.value;
        playerService.getPlayersByTeam(teamName);
        drawSearchResults();
    }

    this.getPlayersByName = function (e) {
        e.preventDefault();
        var playerName = e.target.fullname.value;
        playerService.getPlayersByName(playerName);
        drawSearchResults();
    }

    this.getPlayersByPosition = function (e) {
        e.preventDefault();
        var position = e.target.position.value;
        playerService.getPlayersByPosition(position);
        drawSearchResults();
    }

    this.addToTeam = function (id) {
        playerService.addToTeam(id);
        drawMyTeam();
    }

    this.removeFromTeam = function (id) {
        playerService.removeFromTeam(id);
        drawMyTeam();
    }

}