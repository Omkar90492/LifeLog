function doGet(e) {
  return HtmlService.createHtmlOutput("Lifelog Advanced API is running");
}

// Log entries for food, exercise, or emotion
function logEntry(entry) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs");
  var data = JSON.parse(entry.parameter.data);
  sheet.appendRow([new Date(), data.type, data.value, data.description]);
  return ContentService.createTextOutput("Entry logged successfully");
}

// Retrieve all logs
function getLogs() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs");
  var data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// Summary statistics: calories, minutes exercised, average mood
function getSummaryStats() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs");
  var data = sheet.getDataRange().getValues();
  var stats = {
    totalCalories: 0,
    totalExerciseMinutes: 0,
    moodSum: 0,
    moodCount: 0
  };
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] == "Food") {
      stats.totalCalories += Number(data[i][2]);
    } else if (data[i][1] == "Exercise") {
      stats.totalExerciseMinutes += Number(data[i][2]);
    } else if (data[i][1] == "Emotion") {
      stats.moodSum += Number(data[i][2]);
      stats.moodCount += 1;
    }
  }
  stats.avgMood = stats.moodCount > 0 ? (stats.moodSum / stats.moodCount).toFixed(2) : "N/A";
  return ContentService.createTextOutput(JSON.stringify(stats)).setMimeType(ContentService.MimeType.JSON);
}