var selectBox, itemsBox, selectedValue;
var intervalId;

document.addEventListener("DOMContentLoaded", function() {
    selectBox = document.querySelector(".select-selected");
    itemsBox = document.querySelector(".select-items");
    var items = itemsBox.querySelectorAll("div");

    selectBox.addEventListener("click", function() {
        itemsBox.style.display = itemsBox.style.display === "block" ? "none" : "block";
    });

    items.forEach(function(item) {
        item.addEventListener("click", function() {
            items.forEach(function(el) {
                el.classList.remove("selected");
            });
            item.classList.add("selected");
        
            selectBox.textContent = item.textContent;

            selectedValue = item.getAttribute("data-value");
            itemsBox.style.display = "none";
            

            if (intervalId) {
                clearInterval(intervalId);
            }
            
            startClock();
        });
    });

    document.addEventListener("click", function(e) {
        if (!selectBox.contains(e.target) && !itemsBox.contains(e.target)) {
            itemsBox.style.display = "none";
        }
    });
});

function startClock() {

    getLocationAPI();


    intervalId = setInterval(getLocationAPI, 1000);
}

function getLocationAPI() {
    if (!selectedValue) {
        return; 
    }

    const api = `http://worldtimeapi.org/api/timezone/${selectedValue}`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            const { date, time, utcOffset } = formatDateTime(data.datetime);
            updateResults(date, time, utcOffset);
        })
        .catch(error => {
            console.error("Erro:", error);
        });
}

function formatDateTime(dateTimeString) {
    const [date, timeWithOffset] = dateTimeString.split('T');
    const [time, offset] = timeWithOffset.split('-');
    
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    
    const [hour, minute, secondWithMillis] = time.split(':');
    const [second] = secondWithMillis.split('.');
    const formattedTime = `${hour}:${minute}:${second}`;
    
    const formattedUTCOffset = `${offset}`; 
    
    return {
        date: formattedDate,
        time: formattedTime,
        utcOffset: formattedUTCOffset
    };
}

function updateResults(date, time, utcOffset) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `
        <li>Data: ${date}</li>
        <li>Hora: ${time}</li>
        <li>UTC Offset: ${utcOffset}</li>
    `;
}


