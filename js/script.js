var data, jsonData, placeHolder, table, errorMessage;

function logAddress() {
    var streetField = document.getElementById("street");
    var houseField = document.getElementById("house");

    streetField.onfocus = function() {
        if (streetField.value == "Улица") {
            streetField.value = "";
        }
    };
    streetField.onblur = function() {
        if (streetField.value == "") {
            streetField.value = "Улица";
        }
    };
    
    houseField.onfocus = function() {
        if (houseField.value == "Дом") {
            houseField.value = "";
        }
    };
    houseField.onblur = function() {
        if (houseField.value == "") {
            houseField.value = "Дом";
        }
    };
    
    var houseField = document.getElementById("house");

    document.getElementById("button").onclick = function() {
       
        if (document.getElementById("street").value == "Улица" || 
                    document.getElementById("house").value == "Дом") {
            errorMessage.style.display = "inline";
        } else {
            
            errorMessage.style.display = "none";
            placeHolder.style.display = "block";
            
            var street = document.getElementById("street").value;
            var house = document.getElementById("house").value;

            var address = street + ", " + house;
            var myRE = new RegExp(address);
            var response;
            for (var i = 0; i < jsonData.length; i++) {
                var baseValue = jsonData[i].address;
                if (myRE.test(baseValue)) {
                    response = jsonData[i].count;
                    break;
                } else {
                    response = "Не зарегистрировано";
                }
            }
            var newRow = document.createElement("tr");
            var newTd1 = document.createElement("td");
            var newTd2 = document.createElement("td");            
            var newTdata1 = document.createTextNode(address);
            var newTdata2 = document.createTextNode(response);
            
            newTd1.appendChild(newTdata1);
            newTd2.appendChild(newTdata2);            
            newRow.appendChild(newTd1);
            newRow.appendChild(newTd2);            
            table.appendChild(newRow);
            
        };
        //streetField.value = "Улица";
        //houseField.value = "Дом";
    }
}

window.onload = function() {
    document.getElementById("street").value = "Улица";
    document.getElementById("house").value = "Дом";
    
    logAddress();

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState === 4) {
            data = request.responseText;
            jsonData = JSON.parse(data);
        }
    };

    request.open("GET", "data/data.json", true);
    request.send(null);
    
    placeHolder = document.getElementById("output");
    errorMessage = document.getElementById("error");
    table = document.createElement("table");
    
    table.setAttribute("width", "100%");
    table.setAttribute("border", "1");
    placeHolder.appendChild(table);
    
    
    var tableHeading1 = document.createTextNode("Адрес");
    var tableHeading2 = document.createTextNode("ЧС и пожаров");
    var tHeader = document.createElement("tr");
    var tdH1 = document.createElement("th");
    var tdH2 = document.createElement("th");

    tdH1.appendChild(tableHeading1);
    tdH2.appendChild(tableHeading2);
    tHeader.appendChild(tdH1);
    tHeader.appendChild(tdH2);
    table.appendChild(tHeader);

};
