var paused = false;

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function calc() {
    while (!paused) {
        console.log("calc");
        var timeStart = $("#txtStart").val();
        var timeEnd = $("#txtEnd").val();
        var salary = $("#txtSalary").val();
    
        var splitIndexTimeStart = timeStart.indexOf(":");
        var splitIndexTimeEnd = timeEnd.indexOf(":");
    
        var hStart = timeStart.substring(0, splitIndexTimeStart);
        var hEnd = timeEnd.substring(0, splitIndexTimeEnd);
    
        var mStart = timeStart.substring(splitIndexTimeStart + 1, splitIndexTimeStart + 3);
        var mEnd = timeEnd.substring(splitIndexTimeEnd + 1, splitIndexTimeEnd + 3);
    
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();
    
        var startDate = new Date(year, month -1, day, hStart, mStart, 0, 0);
        var endDate = new Date(year, month -1, day, hEnd, mEnd, 0, 0);
    
        var toWork = endDate - startDate;
        var worked = currentDate - startDate;
        
        var percentWorked = worked / toWork * 100;
        var percentWorkedFormatted = Math.round(percentWorked * 100) / 100;
    
        var hoursWorked = Math.floor(worked / 1000 / 60 / 60);
        var minutesWorked = Math.floor(worked / 1000 / 60) % 60;
    
        var salaryPerMillisecond = salary / toWork;
        var earnedMoney = salaryPerMillisecond * worked;
        var earnedMoneyFormatted = Math.round(earnedMoney * 100) / 100;
    
        if (worked < toWork) {
            $("#progressTime")
              .css("width", percentWorked + "%")
              .attr("aria-valuenow", percentWorked)
              .text(percentWorkedFormatted + "% Complete");
        
            $("#resWorkedHours").text(hoursWorked);
            $("#resWorkedMinutes").text(minutesWorked);
            $("#resWorkedPercent").text(percentWorkedFormatted);
            $("#resEarnedMoney").text(earnedMoneyFormatted);
        }
        else {
            paused = true;
    
            $("#finishInfo").show();
    
            $("#progressTime").css("width", "100%").attr("aria-valuenow", 100).text("100% Complete");
            $("#progressTime").addClass("bg-success");
    
            hoursWorked = Math.floor(toWork / 1000 / 60 / 60);
            minutesWorked = Math.floor(toWork / 1000 / 60) % 60;
    
            $("#resWorkedHours").text(hoursWorked);
            $("#resWorkedMinutes").text(minutesWorked);
            $("#resWorkedPercent").text(100);
            $("#resEarnedMoney").text(salary);
        }
        await timer(1000);
    }
}
function startJob() {
    paused = false;
    calc();
}

function pauseJob() {
    paused = true;
}