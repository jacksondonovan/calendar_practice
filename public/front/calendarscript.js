

function calendarDates(arrOfNums){
  let classNumbers = []
  for (let i = 0; i < arrOfNums.length; i++) {
    let numbervalue = arrOfNums[i]--;
    switch (numbervalue) {
      case 1:
        console.log('booking on the first');
        break;
      case 2:
        console.log('booking on the second');
        break;
      case 3:
        console.log('booking on the third');
        break;
      case 4:
        console.log('booking on the fourth');
        break;
      case 5:
        console.log('booking on the fifth');
        break;
      case 6:
        console.log('booking on the sixth');
        break;
      case 7:
        console.log('booking on the seventh');
        break;
      case 8:
        console.log('booking on the eigthth');
        break;
      case 9:
        console.log('booking on the ninth');
        break;
      case 10:
        console.log('booking on the tenth');
        break;
      case 11:
        console.log('booking on the eleventh');
        break;
      case 12:
        console.log('booking on the twelth');
        break;
      case 13:
        classNumbers.push('thirteen')
        console.log('booking on the 13th');
        break;
      case 14:
        console.log('booking on the 14th');
        break;
      case 15:
        console.log('booking on the 15th');
        break;
      case 16:
        console.log('booking on the 16th');
        break;
      case 17:
        console.log('booking on the 17th');
        break;
      case 18:
        console.log('booking on the 18th');
        break;
      case 19:
        console.log('booking on the 19th');
        break;
      case 20:
        console.log('booking on the 20th');
        break;
      case 21:
        console.log('booking on the 21st');
        break;
      case 22:
        console.log('booking on the 22nd');
        break;
      case 23:
        console.log('booking on the 23rd');
        break;
      case 24:
        console.log('booking on the 24th');
        break;
      case 25:
        console.log('booking on the 25th');
        break;
      case 26:
        console.log('booking on the 26th');
        break;
      case 27:
        console.log('booking on the 27th');
        break;
      case 28:
        classNumbers.push('twenty-eight')
        console.log('booking on the 28th');
        break;
      case 29:
        classNumbers.push('twenty-nine')
        console.log('booking on the 29th');
        break;
      case 30:
        console.log('booking on the 30th');
        break;
      case 31:
        console.log('booking on the 31st');
        break;
      default:

    }
  }
  return classNumbers;
}































// console.log('hello jackson');
// const moment = require('moment')
// function Calendar(elem, date) {
//     var today = moment(date),
//         first = moment(today).date(1);
//
//     function createDay(n) {
//         var li = document.createElement("li"),
//             span = document.createElement("span");
//
//         span.innerHTML = n;
//         li.appendChild(span);
//
//         return li;
//     }
//
//     function addDay(n) {
//         var li = createDay(n);
//         if (n === 1) {
//             li.classList.add("offset-" + first.day());
//         }
//         if (n === today.date()) {
//             li.classList.add("today");
//         }
//         elem.appendChild(li);
//     }
//
//     function deselect(li) {
//         if (!li) return;
//         li.classList.remove("selected");
//     }
//
//     function select(li) {
//         deselect(elem.querySelector(".selected"));
//         li.classList.add("selected");
//     }
//
//     function onClick(event) {
//         select(event.srcElement.parentNode);
//         event.preventDefault();
//     }
//
//     // init
//     for (var i=1, days = today.daysInMonth(); i<=days; i++) {
//         addDay(i);
//     }
// }
//     // event listeners
// var cal = new Calendar(document.getElementById("calendar"), new Date)
