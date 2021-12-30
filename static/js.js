var globalUrl = "https://apiflinkgerardo.herokuapp.com/"
var allCompanies = {};
function drawChart(values,idChart){
    labelsName = []
    for (let index = 0; index < values.length; index++) {
        labelsName.push(index+1)
    }
    var ctx = document.getElementById(idChart).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: labelsName,
    datasets: [{
    label: 'Valores de mercado',
    data: values,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
    }]
    },
    options: {
    scales: {
    yAxes: [{
    ticks: {
    beginAtZero: true
    }
    }]
    }
    }
    });
}

function displayFormPost(){
    htmlForm = '<h2 class="mt-5 mb-3">Agregar nueva compañía</h2>'
    +'<form class="row">'
    +    '<div class="row mt-5">'
    +        '<div class="col">'
    +            '<label for="nameCompany" class="form-label">Nombre de la compañía</label>'
    +            '<input type="text" class="form-control" id="nameCompany" value="" required maxlength="50">'
    +           ' <div class="valid-feedback">'
    +            '</div>'
    +          '</div>'
    +          '<div class="col">'
    +            '<label for="dscCompany" class="form-label">Descripción de la compañía</label>'
    +            '<input type="text" class="form-control" id="dscCompany" value="" required maxlength="100">'
    +            '<div class="valid-feedback">'
    +              'Looks good!'
    +            '</div>'
    +          '</div>'
    +    '</div>'
    +    '<div class="row mt-5"></div>'
    +    '<div class="row">'
    +        '<div class="col">'
    +            '<label for="tickerCompany" class="form-label">Ticker (Símbolo) de la compañía</label>'
    +            '<input type="text" class="form-control" id="tickerCompany" value="" required onkeyup="this.value = this.value.toUpperCase();" maxlength="10">'
    +            '<div class="valid-feedback">'
    +                'Looks good!'
    +            '</div>'
    +        '</div>'
    +        '<div class="col">'
    +            '<label for="valCompany" class="form-label">Valores de mercado de la compañía</label>'
    +            '<input type="text" class="form-control" id="valCompany" value="" placeholder="Favor de separar cada valor con una coma. 50 valores máximo" onkeyup="validateValCompany(this)">'
    +            '<div class="valid-feedback">'
    +                'Looks good!'
    +            '</div>'
    +        '</div>'
    +    '</div>'
    +    '<div class="row mt-5">'
    +        '<div class="col-12">'
    +            '<button class="btn btn-primary" type="button" onclick="sendForm()">Guardar Compañía</button>'
    +        '</div>'
    +    '</div>'
    +'</form>'
    $("#companyForm").html(htmlForm);
}

function displayFormUpdate(e){
    data = allCompanies;
    company = data.filter(
        function(data){ return data.uuidCompany == e }
    );
    valuesCompany = company[0]['valCompany'].join(",")
    htmlForm = '<h2 class="mt-5 mb-3">Actualizar compañía</h2>'
    +'<form class="row">'
    +    '<div class="row mt-5">'
    +        '<div class="col">'
    +            '<label for="nameCompany" class="form-label">Nombre de la compañía</label>'
    +            '<input type="text" class="form-control" id="updateNameCompany" value="'+company[0]['nameCompany']+'" required maxlength="50">'
    +           ' <div class="valid-feedback">'     
    +            '</div>'
    +          '</div>'
    +          '<div class="col">'
    +            '<label for="dscCompany" class="form-label">Descripción de la compañía</label>'
    +            '<input type="text" class="form-control" id="updateDscCompany" value="'+company[0]['dscCompany']+'" required maxlength="100">'
    +            '<div class="valid-feedback">'
    +              'Looks good!'
    +            '</div>'
    +          '</div>'
    +    '</div>'
    +    '<div class="row mt-5"></div>'
    +    '<div class="row">'
    +        '<div class="col">'
    +            '<label for="tickerCompany" class="form-label">Ticker (Símbolo) de la compañía</label>'
    +            '<input type="text" class="form-control" id="updateTickerCompany" value="'+company[0]['tickerCompany']+'" required onkeyup="this.value = this.value.toUpperCase();" maxlength="10">'
    +            '<div class="valid-feedback">'
    +                'Looks good!'
    +            '</div>'
    +        '</div>'
    +        '<div class="col">'
    +            '<label for="valCompany" class="form-label">Valores de mercado de la compañía</label>'
    +            '<input type="text" class="form-control" id="updateValCompany" value="'+valuesCompany+'" placeholder="Favor de separar cada valor con una coma. 50 valores máximo" onkeyup="validateValCompany(this)">'
    +            '<div class="valid-feedback">'
    +                'Looks good!'
    +            '</div>'
    +        '</div>'
    +    '</div>'
    +    '<div class="row mt-5">'
    +        '<div class="col-12">'
    +            '<button class="btn btn-primary" type="button" onclick="sendUpdate('+"'"+company[0]['uuidCompany']+"'"+')">Actualizar Compañía</button>'
    +        '</div>'
    +    '</div>'
    +'</form>'
    $("#companyForm").html(htmlForm);
    document.getElementById("companiesCard").hidden=true;
    document.getElementById("companyForm").hidden = false;
}


function displayNewCompany() {
    displayFormPost();
    document.getElementById("companiesCard").hidden=true;
    document.getElementById("companyForm").hidden = false;
}

function displayCompaniesList(){
    document.getElementById("companiesCard").hidden=false;
    document.getElementById("companyForm").hidden = true;
    getAjaxGET();
}

function validateValCompany(e){
    val = e.value
    var last1=val.substr(-1);
    var last2 = val.substr(-2);
    var last3 = val.substr(-3)
    values = ["1","2","3","4","5","6","7","8","9","0",",","."]
    exep = [",,","..",",.,"]
    if(values.includes(last1) && !exep.includes(last2) && !exep.includes(last3)){
        e.value = val
    }else{
        e.value = val.slice(0,-1);
    }
}

function sendForm(){
    var nameCompany = $("#nameCompany").val();
    var dscCompany = $("#dscCompany").val();
    var tickerCompany = $("#tickerCompany").val();
    var valCompany = $("#valCompany").val();
    if(valCompany==""){
        valCompany = null;
    }
    if(valCompany!=null && valCompany!= ""){
        if (!validateArrayValCompany(valCompany)) {
            return false;
        } 
        valCompany = validateArrayValCompany(valCompany);
    }
    if(nameCompany==null || nameCompany==""){
        showModal("Por favor llenar el nombre de la compañía")
    }else if(dscCompany==null || dscCompany==""){
        showModal("Por favor llenar la descripción de la compañía")
    }else if(tickerCompany==null || tickerCompany==""){
        showModal("Por favor llenar el ticker de la compañía")
    }else{
        sendAjaxPOST(nameCompany,dscCompany,tickerCompany,valCompany)
    }
}

function sendUpdate(uuidCompany){
    var nameCompany = $("#updateNameCompany").val();
    var dscCompany = $("#updateDscCompany").val();
    var tickerCompany = $("#updateTickerCompany").val();
    var valCompany = $("#updateValCompany").val();
    if(valCompany==""){
        valCompany = null;
    }
    if(valCompany!=null && valCompany!= ""){
        if (!validateArrayValCompany(valCompany)) {
            return false;
        } 
        valCompany = validateArrayValCompany(valCompany);
    }
    if(nameCompany==null || nameCompany==""){
        showModal("Por favor llenar el nombre de la compañía")
    }else if(dscCompany==null || dscCompany==""){
        showModal("Por favor llenar la descripción de la compañía")
    }else if(tickerCompany==null || tickerCompany==""){
        showModal("Por favor llenar el ticker de la compañía")
    }else{
        sendAjaxPUT(uuidCompany,nameCompany,dscCompany,tickerCompany,valCompany)
    }
}

function deleteCompany(e){
    sendAjaxDELETE(e)
}

function showModal(txt,title="ADVERTENCIA!"){
    $("#modalTitle").html(title);
    $(".modal-body").html(txt);
    $('#myModal').modal('show');
}

function validateArrayValCompany(values){
    vArray = values.split(",")
    if(vArray.length > 50){
        showModal("El número de valores de mercado sobrepasa el límite de 50")
        return false
    }
    return vArray
}

function sendAjaxPOST(nameCompany,dscCompany,tickerCompany,valCompany){
    // alert("AJAXPOST "+nameCompany+dscCompany+tickerCompany+valCompany)
    data = {
        nameCompany:nameCompany,
        dscCompany:dscCompany,
        tickerCompany:tickerCompany,
        valCompany : valCompany
    }
    $.ajax({
        method: "POST",
        url: globalUrl+"api/company/",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(data, textStatus, xhr) {
            if(xhr.status==201){
                showModal("Compañía creada con éxito!","INFO!");
                clearForm()
                $("#listCompany").click();
            }else{
                showModal("Ocurrió un error durante la realización de la tarea","ERROR!");
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            errorMsg = "";
            for(var k in jqXHR.responseJSON){
                errorMsg += jqXHR.responseJSON[k][0]+"\n";
            }
            showModal(textStatus + ": " + jqXHR.status + " " + errorThrown +"\n"+ errorMsg,"ERROR!");
        }
    });
}

function sendAjaxPUT(uuidCompany,nameCompany,dscCompany,tickerCompany,valCompany){
    // alert("AJAXPOST "+nameCompany+dscCompany+tickerCompany+valCompany)
    data = {
        nameCompany:nameCompany,
        dscCompany:dscCompany,
        tickerCompany:tickerCompany,
        valCompany : valCompany
    }
    $.ajax({
        method: "PUT",
        url: globalUrl+"api/company/"+uuidCompany+"/",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(data, textStatus, xhr) {
            if(xhr.status==200){
                showModal("Compañía Actualizada con éxito!","INFO!");
                clearForm()
                $("#listCompany").click();
            }else{
                showModal("Ocurrió un error durante la realización de la tarea","ERROR!");
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            errorMsg = "";
            for(var k in jqXHR.responseJSON){
                errorMsg += jqXHR.responseJSON[k][0]+"\n";
            }
            showModal(textStatus + ": " + jqXHR.status + " " + errorThrown +"\n"+ errorMsg,"ERROR!");
        }
    });
}

function sendAjaxDELETE(uuidCompany){
    $.ajax({
        method: "DELETE",
        url: globalUrl+"api/company/"+uuidCompany+"/",
        success: function(data, textStatus, xhr) {
            if(xhr.status==204){
                showModal("Compañía borrada con éxito!","INFO!");
                clearForm()
                $("#listCompany").click();
            }else{
                showModal("Ocurrió un error durante la realización de la tarea","ERROR!");
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            errorMsg = "";
            for(var k in jqXHR.responseJSON){
                errorMsg += jqXHR.responseJSON[k][0]+"\n";
            }
            showModal(textStatus + ": " + jqXHR.status + " " + errorThrown +"\n"+ errorMsg,"ERROR!");
        }
    });
}

function clearForm(){
    $("#nameCompany").val("");
    $("#dscCompany").val("");
    $("#tickerCompany").val("");
    $("#valCompany").val("");
}

function getAjaxGET(){
    $.getJSON(globalUrl+"api/company/", function(data) {
        if(data.length==0){
            return false
        }
        allCompanies = data;
        htmlCards = generateCards(data);
        
        $("#totalCompanies").html(data.length);
        $("#companiesCardBody").html(htmlCards);
        for(var k in data){
            drawChart(data[k]['valCompany'],'myChart_'+data[k]['uuidCompany'])
        }
    });
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  

function orderCompanies(orderBy){
    allCompanies.sort(GetSortOrder(orderBy));
    data = allCompanies
    htmlCards = generateCards(data);                
    $("#totalCompanies").html(data.length);
    $("#companiesCardBody").html(htmlCards);
    for(var k in data){
        drawChart(data[k]['valCompany'],'myChart_'+data[k]['uuidCompany'])
    }
}

function searchCompany() {
    sValue = $("#searchValue").val();
    data = allCompanies;
    function getValue(code) {
        return data.filter(
            function(data){ return data.nameCompany ?  data.nameCompany.indexOf(code) >=0 : null }
        );
    }

    var found = getValue(sValue);
    if(found.length <= 0){
        function getValueTicker(code) {
            return data.filter(
                function(data){ return data.tickerCompany ? data.tickerCompany.indexOf(code)>=0 : null }
            );
        }
        found = getValueTicker(sValue);
    }

    data = found
    if(data.length>0){
        allCompanies = data;
    }
    htmlCards = generateCards(data);                
    $("#totalCompanies").html(data.length);
    $("#companiesCardBody").html(htmlCards);
    for(var k in data){
        drawChart(data[k]['valCompany'],'myChart_'+data[k]['uuidCompany'])
    }
}

function generateCards(data){
    htmlCards = "";
    for(var k in data){
            htmlCards += '<div class="card">'
                +'<div class="card-body" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample_'+data[k]['uuidCompany']+'" aria-expanded="false" aria-controls="collapseWidthExample_'+data[k]['uuidCompany']+'">'
                    +'<p>Nombre de la compañía: '+data[k]['nameCompany']+'</p>'
                    +'<p>Descripción: '+data[k]['dscCompany']+'</p>'
                    +'<p>Ticker (Símbolo): '+data[k]['tickerCompany']+'</p>'
                    // +'<p>Valores: '+data[k]['valCompany']+'</p>'
                    +'<p>Da click para desplegar gráfica de valores de mercado!</p>'
                    +'<a onclick="displayFormUpdate('+"'"+data[k]['uuidCompany']+"'"+')" class="btn btn-info ml-2" id="newCompany">Actualizar compañía</a>'
                    +'<a onclick="deleteCompany('+"'"+data[k]['uuidCompany']+"'"+')" class="btn btn-danger mr-2" id="listCompany">Borrar compañía</a>'
                +'</div>'
            +'</div>'
            +'<div style="min-height: 20px;">'
                +'<div class="collapse" id="collapseWidthExample_'+data[k]['uuidCompany']+'">'
                +'<div class="card card-body" style="width: 100%">'
                    +'<canvas id="myChart_'+data[k]['uuidCompany']+'"></canvas>'
                +'</div>'
                +'</div>'
            +'</div>';
        }
    return htmlCards;
}
getAjaxGET();