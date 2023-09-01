//FUNCTIONS====================
$(document).ready();

// displays the current date in the header of the page
var today = dayjs();
var dayWeek = today.format("dddd MMM D, YYYY");
$("#currentDay").text(dayWeek);
//generates time blocks 
$(function () {
  var timeBlocksContainer = $("#time-blocks");
  var timeBlocks = generateTimeBlocks();
  function generateTimeBlocks() {
    var startingHour = 8;
    var endingHour = 17;
    var timeBlocks = [];

    for (var i = startingHour; i <= endingHour; i++) {
      var timeBlock = {
        time: i,
        events: "",
      };
      timeBlocks.push(timeBlock);
    }
    return timeBlocks;
  }

  function renderTimeBlocks(timeBlocks) {
    var thisHour = parseInt(dayjs().format("H"));
    var pastPresentFuture;
    //adds am  / pm to rendered timeblocks
    timeBlocksContainer.empty(); //jquery
    for (var i = 0; i < timeBlocks.length; i++) {
      var amPm = timeBlocks[i].time;
      if (amPm >= 12) amPm = "pm";
      else amPm = "am";
      // Adds code to apply the past, present, or future class to each time block
      if (timeBlocks[i].time < thisHour) {
        pastPresentFuture = "past";
      } else if (timeBlocks[i].time === thisHour) {
        pastPresentFuture = "present";
      } else {
        pastPresentFuture = "future";
      }
      //converts military time to am/pm time
      //gets entered data from local storage (if any)
      //renders timeblock content
      var hour = timeBlocks[i].time % 12;
      if (hour === 0) hour = 12;
      var saveNote = localStorage.getItem(hour + amPm) || "";
      var newTimeBlockEl =
        $(`<div id="hour-${hour}" class="row time-block ${pastPresentFuture}">
  <div class="col-2 col-md-1 hour text-center py-3">${hour}${amPm}</div>
  <textarea class="col-8 col-md-10 description" rows="3">${saveNote}</textarea>
  <button class="btn saveBtn save-me col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>`);
      timeBlocksContainer.append(newTimeBlockEl);
    }
  }
  // adds data to local storage
  renderTimeBlocks(timeBlocks);
  var saveBtn = $(".saveBtn");
  // Adds a listener for click events on the save button
  saveBtn.on("click", function (event) {
    event.preventDefault();
    var siblings = $(this).siblings();
    var time = siblings[0].textContent;
    var calInput = siblings[1].value;
    localStorage.setItem(time, calInput);
  });
});

