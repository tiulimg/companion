function parseFormAction(e) {
    var formResponse = {};
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

    var url = "http://tiulimg-carpool.herokuapp.com/api/couples";
    options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(formResponse),
    };
    var responsepost = UrlFetchApp.fetch(url, options);
}