function parseFormAction(e) {
    var formResponse = {
        "email": e.response.getRespondentEmail(),
        "editlink": e.response.getEditResponseUrl(),
    };
    var itemResponses = e.response.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      var response = itemResponse.getResponse();
      console.log('title: ' + itemResponse.getItem().getTitle() + ' response: ' + response);
      if (typeof(response) === "string") {
        formResponse[itemResponse.getItem().getTitle()] = response;  
      }
      else {
        formResponse[itemResponse.getItem().getTitle()] = JSON.stringify(response).trim();
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