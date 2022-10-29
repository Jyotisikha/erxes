<img id="image" src="pic1.jpg" width="100%">

<script>
const classifier = ml5.imageClassifier('MobileNet');
classifier.classify(document.getElementById("image"), gotResult);
function gotResult(error, results) { ... }
</script>
