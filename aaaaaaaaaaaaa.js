var elements = document.querySelectorAll(
  "#react-root section main article div div div div a"
);

function downloadFile(data, fileName) {
  var img = new Image();
  img.origin = "anonymous";
  img.crossOrigin = "anonymous";
  img.src = data.attributes["src"].value;

  let imgs = document.createElement("img");
  imgs = img;
  document.body.appendChild(imgs);

  img.onload = function() {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL();
    // dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    //var base64 = getBase64Image(document.getElementById("imageid"));

    const a = document.createElement("a");
    a.style.display = "none";

    a.href = dataURL;
    a.innerHTML = "aaaaaaaaaaaaaa";

    a.setAttribute("download", fileName);

    a.click();

    document.body.appendChild(a);
    a.click();

    setTimeout(function() {
      //   a.remove();
      //   img.remove();
    }, 100);
  };
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
var index = 0;
function downloadImage() {
  setTimeout(function() {
    let element = elements[index];
    element.click();
    setTimeout(function() {
      downloadFile(
        document.querySelector(
          "body > div > div > div > article > div > div > div > div  img"
        ),
        Math.floor(Math.random() * 100000000) + 1 + ".png"
      );
      setTimeout(function() {
        // document.querySelector("body > div > button").click();
        setTimeout(function() {
          if (elements.length - 30 > index) {
            index++;
            downloadImage();
          }
        }, 1000);
      }, 500);
    }, 1000);
  }, 0);
}

downloadImage();
