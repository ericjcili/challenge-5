function getCurrentDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}
getCurrentDate();

var today = [
    {
        id: "0",
        hour: "09",
        time: "09",
        type: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        type: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        type: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        type: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        type: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        type: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        type: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        type: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        type: "pm",
        reminder: ""
    },
    {
        id: "9",
        hour: "06",
        time: "18",
        type: "pm",
        reminder: ""
    },
    {
        id: "10",
        hour: "07",
        time: "18",
        type: "pm",
        reminder: ""
    },
    {
        id: "11",
        hour: "08",
        time: "19",
        type: "pm",
        reminder: ""
    },
    
]

function displayReminders() {
    today.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

function save() {
    localStorage.setItem("today", JSON.stringify(today));
}

function init() {
    var storedDay = JSON.parse(localStorage.getItem("today"));

    if (storedDay) {
        today = storedDay;
    }
    save();
    displayReminders();
}

today.forEach(function(thisHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.type}`)
        .attr({
            "class": "col-md-2 hour"
    });

    var reminderText = $("<div>")
        .attr({
            "class": "col-md-1 description p-0"
        });
    var planData = $("<textarea>");
    reminderText.append(planData);
    planData.attr("id", thisHour.id);
    
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, reminderText, savePlan);
})

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    today[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    save();
    displayReminders();
})
init();