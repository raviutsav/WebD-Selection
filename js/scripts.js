const toggleButton = document.getElementById("toggle-button")
const navbarLinks = document.getElementsByTagName('nav')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

changeErrorMsg = document.getElementById("indianState");
changeErrorMsg.addEventListener('click', () =>{
    document.getElementById('invalid-state').innerHTML = "";
    document.getElementById('stateID').innerHTML = "";
})

fetch('https://api.apify.com/v2/datasets/58a4VXwBBF0HtxuQa/items?format=json&clean=1').then(function (response){
    return response.json();
}).then(function (obj){

    let lenn = obj.length;
    document.getElementById("indiaActive").innerHTML = obj[lenn-1].activeCases;
    document.getElementById("activeToday").innerHTML = obj[lenn-1].activeCasesNew + "&#8593";

    document.getElementById("indiaRecovered").innerHTML = obj[lenn-1].recovered;
    document.getElementById("recoveredToday").innerHTML = obj[lenn-1].recoveredNew + "&#8593";

    document.getElementById("indiaDeaths").innerHTML = obj[lenn-1].deaths;
    document.getElementById("deathToday").innerHTML = obj[lenn-1].deathsNew + "&#8593";

    document.getElementById("lastUpdated").innerHTML = obj[lenn-1].lastUpdatedAtApify;

}).catch(function (error){
    console.error('Something went wrong');
    console.error(error);
});



function searchCases() {
    let given_state = document.getElementById('indianState').value;
    given_state = given_state.toLowerCase();
    given_state = given_state.replace(/(^\w|\s\w)/g, m => m.toUpperCase()); // to capitalize each word
    fetch('https://api.covid19india.org/data.json').then(function (response){
        return response.json();
    }).then(function (obj){

        let state_data = obj.statewise;
        let check = 0;
        for(let i = 0; i < state_data.length; i++)
        {
            if(state_data[i].state == given_state)
            {
                check = 1;
                document.getElementById("stateID").innerHTML = "Total Confirmed Cases: " + state_data[i].confirmed + 
                    "<br />" + "Total recovered cases: " + state_data[i].recovered + "<br />" +  "Total active Cases: " + state_data[i].active + "<br />" 
                        + "Total Deceased: " + state_data[i].deaths;

                document.getElementById("invalid-state").innerHTML = "";
                break;
            }
        }

        if(check == 0)
        {
            document.getElementById('stateID').innerHTML = "";
            document.getElementById("invalid-state").innerHTML = "Please enter a correct Indian state name"
        }
    }).catch(function (error){
        console.error('Something went wrong');
        console.error(error);
    });
}
