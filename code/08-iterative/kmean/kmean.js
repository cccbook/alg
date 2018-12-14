// ref : https://dotblogs.com.tw/dragon229/2013/02/04/89919
module.exports = KMean = {}

KMean.loadData = function (data) {
  KMean.data = data
}

KMean.sample = function (data, k) {
  var r = Math.random(k)*k
  var n = Math.ceil(r)
  return data[n]
}

KMean.euclidDistance = function (p1, p2) {
  let d = 0;
  for (let i=0; i<p1.length; i++) {
    d += Math.pow(p1[i]-p2[i], 2)
  }
  return d
}

KMean.initialize = function (k, data) {
  KMean.k = k
  KMean.centers = []
  for (let i=0; i<k; i++) {
    KMean.centers[i] = KMean.sample(KMean.data, k)    
  }
}

KMean.grouping = function (distance) {
  var data = KMean.data
  var k = KMean.k
  var groups = Array(k).fill(0)
  var totalDist = 0
  for (var di = 0; di < data.length; di++) {
    var minDist = Number.MAX_VALUE
    var minGroup = 0
    for (var gi = 0; gi < k; gi++) {
      var dist = distance(KMean.centers[gi], data[di])
      if (dist < minDist) {
        minDist = dist
        minGroup = gi
      }
    }
    groups[di] = minGroup
    totalDist += minDist
  }
  console.log('totalDist = %d', totalDist)
  return groups
}

KMean.centering = function () {
  var data = KMean.data
  var groups = KMean.groups
  var k = KMean.k
  var counts = Array(k).fill(0)
  var newCenters = j6.M.new(k, data[0].length)
  for (let i = 0; i < data.length; i++) {
    var gi = groups[i]
    newCenters[gi] = newCenters[gi].vadd(data[i])
    counts[gi] ++
  }
  for (let gi = 0; gi < k; gi++) {
    if (counts[gi] > 0) { // 如果 counts[gi] == 0 不能除，這一群沒有人！
      newCenters[gi] = newCenters[gi].div(counts[gi])
    }
  }
  return newCenters
}

KMean.run = function (data, k, maxLoop) {
  KMean.loadData(data)
  KMean.initialize(k)
  for (var i = 0; i < maxLoop; i++) {
    console.log('============== loop ' + i + '================')
    KMean.groups = KMean.grouping(KMean.euclidDistance)
    console.log('groups=%j', KMean.groups)
    KMean.centers = KMean.centering()
    console.log('centers=%j', KMean.centers)
  }
  return KMean.data
}
