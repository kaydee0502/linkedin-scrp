(async () => {
const tabId = await getTabId();
console.log(tabId)
chrome.scripting.executeScript({
    target: {tabId: tabId},
    func: scrape
});

async function getTabId() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
  }



function scrape(){
    var url = window.location.hostname;
    if (url.includes('linkedin')) {
        try{
            let profileCard = document.getElementById("main")
            let mainDiv = profileCard.getElementsByClassName("ph5")
            let data = mainDiv[0].children[1].children[0]
            let name = data.getElementsByTagName("h1")[0].innerHTML

            let experience = document.getElementById("oc-background-section")
            // let personBackground = experience.getElementsByTagName("h3")[0].innerHTML
            let currentCompany = experience.getElementsByTagName("ul")[0].getElementsByTagName("li")[0].getElementsByTagName('p')[1].innerText
    
            console.log(name, currentCompany)
            let req = {"first_name": name.split(" ")[0], "last_name": name.split(" ")[1], "company": currentCompany}
            console.log(req);
            fetch("http://localhost:8000/people", {
                method: "POST", 
                body: JSON.stringify(req),
                headers:  {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
              }).then(res => {
                console.log("Request complete! response:", res);
              });

        }
        catch (err){
            window.alert(err);
        }
    }
}



})();