const toggleButton = document.getElementById("toggle-button")
const navbarLinks = document.getElementsByTagName('nav')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

changeErrorMsg = document.getElementById("indianState");
changeErrorMsg.addEventListener('click', () =>{
    document.getElementById('invalid-state').innerHTML = "";
})


fetch('https://api.covid19india.org/data.json').then(function (response){
    return response.json();
}).then(function (obj){

    let last_data = obj.cases_time_series[(obj.cases_time_series.length)-1];
    let state_wise = obj.statewise;
    let tested_wise = obj.tested;
    let total_active = 0;
    
    
    document.getElementById("indiaActive").innerHTML = state_wise[0].active;
    document.getElementById("activeToday").innerHTML = last_data.dailyconfirmed + "&#8593";

    document.getElementById("indiaRecovered").innerHTML = last_data.totalrecovered;
    document.getElementById("recoveredToday").innerHTML = last_data.dailyrecovered + "&#8593";

    document.getElementById("indiaDeaths").innerHTML = last_data.totaldeceased;
    document.getElementById("deathToday").innerHTML = last_data.dailydeceased + "&#8593";

    document.getElementById("lastUpdated").innerHTML = state_wise[0].lastupdatedtime;

    let last_tested_data = tested_wise[tested_wise.length - 1];

    document.getElementById("indiaVaccine").innerHTML = last_tested_data.totaldosesadministered;
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