document.getElementById("shayari").textContent = window.localStorage.getItem("s001");
document.getElementById("shayari").style.whiteSpace = 'pre-line';


document.getElementById("dld").addEventListener('click', function() {
    html2canvas(document.getElementById("page")).then(function(canvas) {
        var imgData = canvas.toDataURL('image/jpg');
        var link = document.createElement('a');
        link.download = 'shayari-byRVSR.jpg';
        link.href = imgData;
        link.click();
    });
});