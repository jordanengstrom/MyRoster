function PlayerService(callback) {

    var playersData = [];
    var searchResults = [];
    var myTeam = [];

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            console.log(playersData);
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
            callback()
        });
    }
    loadPlayersData(); //call the function above every time we create a new service

    this.getPlayersByTeam = function (teamName) {
        searchResults = [];
        playersData.forEach(function (player, index) {
            if (player.pro_team === teamName) {
                searchResults.push(player);
            }
        })
        return searchResults;
    }

    this.getPlayersByName = function (playerName) {
        searchResults = [];
        playersData.forEach(function (player, index) {
            if (player.fullname.toLowerCase().includes(playerName.toLowerCase())) {
                searchResults.push(player);
            }
        })
        return searchResults;
    }

    this.getPlayersByPosition = function (position) {
        searchResults = [];
        playersData.forEach(function (player, index) {
            if (player.position === position) {
                searchResults.push(player);
            }
        })
        return searchResults;
    }

    this.getSearchResults = function () {
        return searchResults;
    }

    this.getMyTeam = function () {
        return myTeam;
    }

    this.addToTeam = function (id) {
        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];
            if (player.id == id) {
                myTeam.push(player)
            }
        }
        console.log(myTeam);
        return myTeam;
    }

    this.removeFromTeam = function (id) {
        for (var i = 0; i < myTeam.length; i++) {
            var delMem = myTeam[i];
            if (delMem.id == id) {
                myTeam.splice(myTeam.indexOf(id));
            }
        }
        console.log(myTeam);
        return myTeam;
    }
} 