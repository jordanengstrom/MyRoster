PlayerController = function PlayerController() {

    var loading = true; //Start the spinner
    var playerService = new PlayerService();
   

    function ready() {
        loading = false; //stop the spinner
        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
        $('some-button').on('click', function () {
            var teamSF = playerService.getPlayersByTeam("SF");
        })
        
    }
    
    playerService.loadPlayersData(drawMyTeam)
    
    function drawMyTeam(arr) {
        console.log(arr)
        var myTeamElem = document.getElementById("my-team");
        var template = '';
        // it thinks this whole array is on my team right now.
        for(var i = 0; i < arr.length; i++){
            teamMember = arr[i];
            template +=`
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
    
    
    function drawSearchResults(arr) {    
        var searchElem = document.getElementById("loc-cards");
        var template = '';
        for(var i = 0; i < arr.length; i++){
            aResult = arr[i];
            template +=`
            <div class="card">
            <img class="card-img-top" src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Player Name: ${aResult.fullname}</h5>
                    <p class="card-text">Position: ${aResult.position}</p>
                    <p class="card-text">Team: ${aResult.pro_team}</p>
                    <button type="button" class="btn btn-success" onclick="app.controllers.playerCtrl.addToTeam()">Add to Team</button>
                </div>
            </div>`
        }
        
        searchElem.innerHTML = template;
    }
    
    this.addToTeam = function(id){
        playerService.addToTeam(id);
        drawMyTeam(playerService.getMyTeam);
    }

    this.removeFromTeam = function(id){
        playerService.removeFromTeam(id);
        drawMyTeam(playerService.getMyTeam);
    }
}