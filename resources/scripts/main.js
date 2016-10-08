var graphFunctions = function () {
  "use strict";

  var adjacencyMatrix = new Array();
  var degreeArray     = new Array();

  var parseTextboxToArray = function(){
    var resultArray = new Array();

    var text = $("#graphText").val();
    text = text.trim();
    if (text.length == 0) {
      setAlert("Grafo não preenchido.");
      return false;
    }

    var lines = text.split("\n");

    var validMatrix = true;

    resultArray = lines.map(function(element){
      return element.split(",").map(function(numString, idx, array){
        if(array.length != lines.length)
          validMatrix = false;
        return parseInt(numString);
      });
    });

    if(!validMatrix){
      setAlert("Matriz de tamanho inválido.")
      return false;
    }

    adjacencyMatrix = resultArray;
    return true;
  };

  var clearAnswers = function(){
    $(".resultado").html("");
  }

  var getAlert = function(){
    return $(".alert").first();
  }
  var clearAlert = function(){
    var alert = getAlert();
    $(alert).children("span").html("");
    alert.hide();
  }
  var setAlert = function(text){
    var alert = getAlert();
    $(alert).children("span").html(" "+text);
    alert.show();
  }

  var fillDegreeArray = function(){
    degreeArray = adjacencyMatrix.map(function(verticeLine, lineIdx){
      return verticeLine.reduce( (prev, curr) => prev + curr ) + verticeLine[lineIdx];
    });
  };

  var isCompleteGraph = function(){
    for (var i = 0; i < adjacencyMatrix.length-1; i++) {
      for (var j = i+1; j < adjacencyMatrix[i].length; j++) {
        if(adjacencyMatrix[i][j]<1)
          return false;
      }
    }
    return true;
  }

  var isSimpleGraph = function(){
    for (var i = 0; i < adjacencyMatrix.length; i++) {
      //Check if there is any loop.
      if (adjacencyMatrix[i][i]>0)
        return false;

      //Check if there is multiple edge.
      for (var j = i+1; j < adjacencyMatrix[i].length; j++) {
        if(adjacencyMatrix[i][j]>1)
          return false;
      }
    }
    return true;
  }


  var doExercise01 = function(){
    //Calculations...
    fillDegreeArray();

    //Printing results
    var containerResults = $("#resultado01");
    containerResults.html("");
    degreeArray.forEach(function(element){
      containerResults.append("<span>{{el}}</span>".replace("{{el}}",element));
    });
  };

  var doExercise02 = function(){
    var message         = "Grafo Regular"
    for(var i = 1; i < degreeArray.length; i++){
      if (degreeArray[i] !== degreeArray[i-1]){
          message = "Grafo Não Regular";
          break;
      }
    }
    $("#resultado02").html("<span>{{res}}</span>".replace("{{res}}", message));
  };

  var doExercise03 = function(){
    var message         = "Grafo Não é Completo";
    if(isCompleteGraph()){
      message = "Grafo é Completo"
    }
    $("#resultado03").html("<span>{{res}}</span>".replace("{{res}}", message));
  };

  var doExercise04 = function(){
    var message         = "Grafo Não é Simples";
    if(isSimpleGraph()){
      message = "Grafo é Simples"
    }
    $("#resultado04").html("<span>{{res}}</span>".replace("{{res}}", message));
  }



  return {
    doExercises : function (){
      clearAlert(); clearAnswers();
      if(parseTextboxToArray()){
        doExercise01();
        doExercise02();
        doExercise03();
        doExercise04();
      }
    }
  }
};

$(document).ready(function(){
  $("#go").click(graphFunctions().doExercises);
});
