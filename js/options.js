var GB = chrome.extension.getBackgroundPage().GB;

$(document).ready(function () {
    $("#update").click(function () {
        tmp_matrix = {};
        for (var c in GB.getColumnLabel()) {
            for (var r in GB.getRowLabel()) {
                tmp_matrix[GB.getColumnLabel()[c]+GB.getRowLabel()[r]] = $("#cell_" + GB.getColumnLabel()[c]+GB.getRowLabel()[r]).val();
            }
        }
        GB.setMatrix(tmp_matrix);
        var mode = $("[name=options]:checked")[0].id;
        GB.setPref({
            mode: $("[name=options]:checked")[0].id
        });
        $("#update").removeClass("btn-primary").html('<span class="glyphicon glyphicon-saved"></span> Saved').addClass("btn-success");
        setTimeout(function(){
            $("#update").removeClass("btn-success").html('<span class="glyphicon glyphicon-save"></span> Save').addClass("btn-primary")
        },3000);
    });
    $("#reset").click(function () {
        alert('reset (dummy)');
        //GB.setMatrix(GB.matrix);
        //showBlockList();
    });
    $('[rel=popover]').popover();
    showBlockList();
});
function showBlockList () {
    $("#matrix").children().remove();
    for(var i=0;i<=GB.getRowLabel().length;++i) {
        for(var j=0;j<=GB.getColumnLabel().length;++j){
            if (i==0) {
                if(j==0) {
                    $("#matrix").append("<thead class='text-center' id='row_" + i +"'></thead>");
                    $("#row_" + i).append("<th></th>");
                }
                else {
                    $("#row_" + i).append("<th class='text-center'>" + GB.getColumnLabel()[j-1] + "</th>");
                }
            }
            else {
                if(j==0) {
                    $("#matrix").append("<tr id='row_" + i +"'></tr>");
                    $("#row_" + i).append("<th>" + i + "</th>");
                }
                else {
                    $("#row_" + i).append("<td><input class='cell form-control' id='cell_" + GB.getColumnLabel()[j-1]+GB.getRowLabel()[i-1] + "' type='text' value='" + GB.getCell(j,i) + "' /></td>");
                    // getCell(j-1,i-1) ja naino...? nande ugokunodarou....
                }
            }
        }
    }
    $("#"+GB.getPref().mode)[0].click();
}