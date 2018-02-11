function PlayerService() {

    var playersData = [];
    var searchResults = [];
    var myTeam = [];

    console.log(1)
    this.loadPlayersData = function (callback) {
        console.log(2)
        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 
        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback();
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            // callback()
        });
    }


    this.getPlayersByTeam = function (teamName) {
        var searchResults = playersData.forEach(function (player) {
            if (player.team === playersData.pro_team) {
                return true;
            }
        })
    }

    this.getPlayersByName = function (playerName) {
        var searchResults = playersData.forEach(function (player) {
            if (player.firstname === playersData.firstname ||
                player.lastname === playersData.lastname ||
                player.fullname === playersData.fullname) {
                return true;
            }
        })
    }

    this.getPlayersByPosition = function (position) {
        var searchResults = playersData.forEach(function (player) {
            if (player.position === playersData.position) {
                return true;
            }
        })
    }

    this.addToTeam = function (id) {
        for (var i = 0; i < searchResults.length; i++) {
            var teamMember = searchResults[i];
            if (teamMember.id == id) {
                myTeam.push(teamMember);
            }
        }
    }

    this.removeFromTeam = function (id) {
        for (var i = 0; i < myTeam.length; i++) {
            var delMem = myTeam[i];
            if (delMem.id == id) {
                myTeam.splice(myTeam.indexOf(id));
            }
        }
    }

    this.getMyTeam = function () {
        return myTeam;
    }

}