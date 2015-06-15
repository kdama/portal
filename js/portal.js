var SM = (function () {
    var my = {};
    my.get = function (key) { return localStorage.getItem(key); }
    my.put = function (key, value) { return localStorage.setItem(key, value); }
    my.delete = function (key) { return localStorage.removeItem(key); }
    return my;
}());

var GB = (function (SM) {
    var my = {};
	my.getColumnLabel = function () { return ["A","B","C","D","E","F","G","H","I","J"]; }
	my.getRowLabel = function () { return ["1","2","3","4","5","6","7"]; }
    my.matrix = {};
    for (var c in my.getColumnLabel()) {
        for (var r in my.getRowLabel()) {
            my.matrix[my.getColumnLabel()[c]+my.getRowLabel()[r]] = 'X';//my.getColumnLabel()[c]+my.getRowLabel()[r];
        }
    }
    if (!SM.get("matrix")) {
        SM.put("matrix", JSON.stringify(my.matrix));
    }
    my.getMatrix = function () {
        return JSON.parse(SM.get("matrix"));
    }
    my.setMatrix = function (matrix) {
        return SM.put("matrix", JSON.stringify(matrix));
    }
    my.getCell = function (col, row) {
        return my.getMatrix()[GB.getColumnLabel()[col-1]+my.getRowLabel()[row-1]];
    }
    my.pref = {};
    my.pref["mode"] = 'mode_noop';
    if (!SM.get("pref")) {
        SM.put("pref", JSON.stringify(my.pref));
    }
    my.getPref = function () {
        return JSON.parse(SM.get("pref"));
    }
    my.setPref = function (pref) {
        return SM.put("pref", JSON.stringify(pref));
    }
    return my;
}(SM));

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({
        a1: GB.getMatrix()[request.q1],
        a2: GB.getMatrix()[request.q2],
        a3: GB.getMatrix()[request.q3],
        mode: GB.getPref().mode
    });
  }
);

function checkForValidUrl(tabId, changeInfo, tab) {
     // If the letter 'g' is found in the tab's URL...
     if (tab.url.indexOf('https://portal.nap.gsic.titech.ac.jp/GetAccess/Login?Template=idg_key') > -1) {
       // ... show the page action.
      chrome.pageAction.show(tabId);
    }
  };
  
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);