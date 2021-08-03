function parseFormAction(e) {
    var formResponse = {
        "email": e.response.getRespondentEmail(),
        "editlink": e.response.getEditResponseUrl(),
    };
    var itemResponses = e.response.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      var questionItem = itemResponse.getItem();
      var itemType = questionItem.getType();
      var title = questionItem.getTitle();
      var response = itemResponse.getResponse();
      console.log('title: ' + title + ' response: ' + response);
      if (typeof(response) === "string") {
        formResponse[title] = response;  
      }
      else if (itemType = "CHECKBOX_GRID") {
        formResponse[title] = {
          "rows": questionItem.asCheckboxGridItem().getRows(),
          "columns": questionItem.asCheckboxGridItem().getColumns(),
          "values": JSON.stringify(response).trim(),
        };
      }
      else {
        formResponse[title] = JSON.stringify(response).trim();
      }
    }

    var url = "https://tiulimg-companion.herokuapp.com/api/couples";
    options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(formResponse),
    };
    var responsepost = UrlFetchApp.fetch(url, options);
}