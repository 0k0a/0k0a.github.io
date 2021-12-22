if (document.location.origin != "https://lh3.googleusercontent.com") {
  alert("Moving Location, Try again.")
  document.location = "https://lh3.googleusercontent.com";
}
else {  
  var e_div = document.getElementById('div_gga_file');
  var e_target = document.body;
  if ((e_div == null) && (e_target != null)) {
    e_target.style.maxWidth = window.innerWidth + "px";
    e_target.style.minHeight = "0px";
    
    var e_div = document.createElement('div');
    e_div.id = 'div_gga_file';
    e_div.setAttribute('style', 'z-index:999999;position:fixed;top:0;background-color:white');
    e_div.innerHTML = `<input id="txt_clip" type="text" style="width: 600px;height: 50px">&emsp;<button id="btn_GetName">get name</button>&emsp;<button id="btn_clear">clear</button><br/><div id="img_dsp"></div>`;
    document.body.appendChild(e_div);

    function fnGetImageSize() {
      var sTmp = txt_clip.value;
      var aTmp = sTmp.split("=");
      txt_url.value = aTmp[0] + "=w" + img_gga.width + "-h" + img_gga.height + "-rw-no";
    }
    
    function fnGetImageFileName(url) {
      var sTmp = txt_clip.value;
      var aTmp = sTmp.split("=");
      url = aTmp[0];
      if(!window.XMLHttpRequest) {
        alert("The function(window.XMLHttpRequest) is not defined.");
        return;
      }
      img_dsp.innerHTML = "";
      var xHttp = new XMLHttpRequest();
      xHttp.onreadystatechange = function() {
          if ((this.readyState == 4) && (this.status == 200)) {
            var sTmp = xHttp.getResponseHeader("content-disposition");
            if ((sTmp == undefined) || (sTmp == null)) {
              alert("getResponseHeaderHeader(content-disposition) Failed.");	
            } else {
              var aTmp = sTmp.split(";");
              for (var i=0; i<aTmp.length; i++) {
                if (aTmp[i].substr(0, 9) == "filename=") {
                  var aTmp1 = aTmp[i].split("=");
                  if (aTmp1.length == 2) {
                    img_dsp.innerHTML = '<img id="img_gga" src="' + url + '" onload="fnGetImageSize()"><br/><input id="txt_url" type="text" style="width: 600px;"><br/><input id="txt_name" type="text" style="width: 600px;" value="' + aTmp1[1] + '">';
                  }
                }
              }
            }
          }
        };
      xHttp.open("GET", url, true);
      xHttp.send();
    }

    txt_clip.onchange = () => fnGetImageFileName(txt_clip.value);
    txt_clip.onkeyup = () => fnGetImageFileName(txt_clip.value);
    txt_clip.onpaste = () => fnGetImageFileName(txt_clip.value);
    txt_clip.ondragover = e => e.preventDefault();
    txt_clip.ondrop = e => {e.preventDefault();txt_clip.value=e.dataTransfer.getData('Text');fnGetImageFileName(txt_clip.value)};
    btn_GetName.onclick = () => fnGetImageFileName(txt_clip.value);
    btn_clear.onclick = () => {txt_clip.value="";img_dsp.innerHTML=""};
  }
}
