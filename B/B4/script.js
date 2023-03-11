const eventsContainer = document.getElementsByClassName("events-container")[0];
const carousel = document.querySelector('.container');
const prevButton = carousel.querySelector('.prev-button');
const nextButton = carousel.querySelector('.next-button');
let numberOfEvents = 0;
while (numberOfEvents <= 0) {
    numberOfEvents = parseInt(prompt("Enter the total number of events: "));    
}
let setNumber = 1;
let numberOfEventsinOneSet = 0;
while (numberOfEventsinOneSet <= 0 || numberOfEventsinOneSet > numberOfEvents) {
    numberOfEventsinOneSet = parseInt(prompt("Enter the number of events at a single page: "));
}
let numberOfSet = parseInt(numberOfEvents / numberOfEventsinOneSet);
let numberOfEventsinLastSet = numberOfEvents % numberOfEventsinOneSet;
let boxWidth = 80 / numberOfEventsinOneSet; 
if ( boxWidth > 20) {
    boxWidth = 20;
}
const boxHeight = boxWidth ;
const fontSize = boxWidth * 0.5;

const createEvent = () => {
    for (i = 0; i < numberOfSet; i++) {
        let eventsSet = document.createElement('div');
        eventsSet.className = "events-set";
        for (j = 0; j < numberOfEventsinOneSet; j++) {
            let eventsbox = document.createElement('div');
            eventsbox.style.width = boxWidth + 'vw';
            eventsbox.style.height = boxHeight + 'vw';
            eventsbox.style.fontSize = fontSize + 'rem';
            eventsbox.className = "events-box";
            eventsbox.innerHTML = i*numberOfEventsinOneSet + j + 1;

            eventsSet.appendChild(eventsbox);
        }
        eventsContainer.appendChild(eventsSet);
    }
    if (numberOfEventsinLastSet != 0) {
        let eventsSet = document.createElement('div');
        eventsSet.className = "events-set";
        for (j = 0; j < numberOfEventsinLastSet; j++) {
            let eventsbox = document.createElement('div');
            eventsbox.style.width = boxWidth + 'vw';
            eventsbox.style.height = boxHeight + 'vw';
            eventsbox.style.fontSize = fontSize + 'rem';
            eventsbox.className = "events-box";
            eventsbox.innerHTML = i*numberOfEventsinOneSet + j + 1;
            
            eventsSet.appendChild(eventsbox);
        }
        eventsContainer.appendChild(eventsSet);
    }
}

const createEventDots = () => {
    const dotsContainer = document.getElementsByClassName('events-nav-dots')[0];
    for (i = 0; i < numberOfSet; i++) {
        let dot = document.createElement('div');
        dot.className = "event-nav-dot";
        dot.id = (i + 1);
        dot.setAttribute('onclick', 'navigateEvent(this.id)');
        dotsContainer.appendChild(dot);
    }
    if (numberOfEventsinLastSet != 0) {
        let dot = document.createElement('div');
        dot.className = "event-nav-dot";
        dot.id = (i + 1);
        dot.setAttribute('onclick', 'navigateEvent(this.id)');
        dotsContainer.appendChild(dot);
    }
}


const changeEventSet = () => {
    const limit = (numberOfEventsinLastSet == 0) ? numberOfSet : (numberOfSet + 1);
    if (setNumber < limit) {
        setNumber++;
        eventsContainer.style.transform = "translate(" + (-100 * (setNumber - 1)) + "%)";
        for (dot of document.getElementsByClassName('event-nav-dot')) {
            dot.style.background = 'none';
        }
        setTimeout(() => {
            document.querySelectorAll('.events-nav-dots > .event-nav-dot')[setNumber - 1].style.background = "#ffffff";
        }, 5000);
    } else {
        setNumber = 0;
        changeEventSet();
    }
}
const changeEventSetrev = () => {
    const limit = (numberOfEventsinLastSet == 0) ? numberOfSet : (numberOfSet + 1);
    if (setNumber < (limit+1) && setNumber>1) {
        setNumber--;
        eventsContainer.style.transform = "translate(" + (-100 * (setNumber - 1)) + "%)";
        for (dot of document.getElementsByClassName('event-nav-dot')) {
            dot.style.background = 'none';
        }
        setTimeout(() => {
            document.querySelectorAll('.events-nav-dots > .event-nav-dot')[setNumber - 1].style.background = "#ffffff";
        }, 5000);
    } else if(setNumber<=1) {
        setNumber = limit+1;
        changeEventSetrev();
    }
}

const navigateEvent = (dotIndex) => {
    if (setNumber != dotIndex) {
        setNumber = dotIndex - 1;
        changeEventSet();
        clearInterval(eventSetChangeInterval);
        eventSetChangeInterval = setInterval(changeEventSet, 5000);
    }
}


window.onload = () => {
    setTimeout(() => {
        changeEventSet();
        eventSetChangeInterval = setInterval(changeEventSet, 5000);
    }, 1);
    createEventDots();
    createEvent();
}
nextButton.addEventListener('click', changeEventSet);
prevButton.addEventListener('click', changeEventSetrev);
document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 37) {
      changeEventSetrev()
    } else if (e.keyCode === 39) {
        changeEventSet()
    }
  }
