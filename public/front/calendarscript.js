console.log('hello jackson');
const moment = require('moment')
function Calendar(elem, date) {
    var today = moment(date),
        first = moment(today).date(1);

    function createDay(n) {
        var li = document.createElement("li"),
            span = document.createElement("span");

        span.innerHTML = n;
        li.appendChild(span);

        return li;
    }

    function addDay(n) {
        var li = createDay(n);
        if (n === 1) {
            li.classList.add("offset-" + first.day());
        }
        if (n === today.date()) {
            li.classList.add("today");
        }
        elem.appendChild(li);
    }

    function deselect(li) {
        if (!li) return;
        li.classList.remove("selected");
    }

    function select(li) {
        deselect(elem.querySelector(".selected"));
        li.classList.add("selected");
    }

    function onClick(event) {
        select(event.srcElement.parentNode);
        event.preventDefault();
    }

    // init
    for (var i=1, days = today.daysInMonth(); i<=days; i++) {
        addDay(i);
    }
}
    // event listeners
var cal = new Calendar(document.getElementById("calendar"), new Date)
