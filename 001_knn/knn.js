
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function(data){
  var self = this;
  data.forEach(function(trainEle){
    self.points.push(trainEle);
  })
}


// HELPER FUNCTIONS //

KNN.prototype._distance = function(vectorA, vectorB){
  var sum = 0;
  if (vectorA.length === vectorB.length){
    for (var i = 0; i < vectorA.length; i++){
      sum += Math.pow((vectorB[i] - vectorA[i]), 2);
    }
  }
  return Math.sqrt(sum);
}

KNN.prototype._distances = function(vector, dataArr){
  var self = this;
  return dataArr.map(function(classifiedVector){
    return [self._distance(vector, classifiedVector[0]), classifiedVector[1]];
  })
}

KNN.prototype._sorted = function(distancesOutput){
  var storage = [];
  var hash = {};
  distancesOutput.forEach(function(element){
    storage.push(element[0]);
    hash[element[0]] = element[1];
  });

  var sorted = bubbleSort(storage);

  return sorted.map(function(element){
    return hash[element];
  })
}

KNN.prototype._majority = function(k, sortedOutput){
  var hash = {};
  for (var i = 0; i < k; i++){
    if (!hash[sortedOutput[i]]) hash[sortedOutput[i]] = 0;
    hash[sortedOutput[i]]++;
  }
  console.log('Hash table: ', hash);
}


// HELPER FOR _sorted method on KNN
function bubbleSort(arr){
  var temp;
  var swapped = false;
  for (var i = 0; i < arr.length; i++) {
    if(arr[i] > arr[i+1]){
      swapped = true;
      temp = arr[i];
      arr[i] = arr[i+1];
      arr[i+1] = temp;
    }
    if(!swapped){
      return arr;
    }
  }
  return arr;
}

module.exports = KNN
