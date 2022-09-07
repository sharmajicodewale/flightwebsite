$(document).ready(function () {

    $.getJSON("/flight/fetchallstates", function (data) {

        data.map((item) => {
            $("#sourcestate").append(
                $("<option>").text(item.statename).val(item.stateid)
            );
            $("#destinationstate").append(
                $("<option>").text(item.statename).val(item.stateid)
            );


        });
        $("#sourcestate").formSelect();
        $("#destinationstate").formSelect();
    });


    $("#sourcestate").change(function () {

        $("#sourcecity").empty()
        $("#sourcecity").append(
            $("<option disabled selected>").text('Choose your City')
        );
        $.getJSON("/flight/fetchallcity", { stateid: $('#sourcestate').val() }, function (data) {

            data.map((item) => {
                $("#sourcecity").append(
                    $("<option>").text(item.cityname).val(item.cityid)
                );
            });
            $("#sourcecity").formSelect();
        });
    });

    $("#destinationstate").change(function () {

        $("#destinationcity").empty()
        $("#destinationcity").append(
            $("<option disabled selected>").text('Choose your City')
        );
        $.getJSON("/flight/fetchallcity", { stateid: $('#destinationstate').val() }, function (data) {

            data.map((item) => {
                $("#destinationcity").append(
                    $("<option>").text(item.cityname).val(item.cityid)
                );


            });
            $("#destinationcity").formSelect();
        });
    })

    $('#btn').click(function(){

        $.getJSON('/flight/searchflight',{sid:$('#sourcecity').val(),did:$('#destinationcity').val()},function(data){
            if(data.length==0)
            {
                $('#result').html("<h1>Flight Doesn't Exist</h1>")
            }
            else
            {   var htm='<tbody>'
                data.map((item)=>{

                    htm+="<thead><tr><th>Flight Id</th><th>Company Name</th><th>Source</th><th>Destination</th><th>Type</th><th>Class</th><th>Days</th></tr></thead>"
                    htm+="<tr><td>"+item.flightid+"</td><th>"+item.companyname+"<br> <img src='/images/"+item.logo+"' width='40'></th>"
                    htm+="<td>"+item.sc+"<br>"+item.sourcetiming+"</td>"
                    htm+="<td>"+item.dc+"<br>"+item.destinationtiming+"</td>"
                    htm+="<td>"+item.status+"</td>"
                    htm+="<td>"+item.flightclass+"</td>"
                    htm+="<td>"+item.days+"</td></tr>"

                })
                htm+="</tbody>"
                $('#result').html(htm)
            }

        })
    })

});
