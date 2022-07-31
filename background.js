browser.contextMenus.create({
    id: "copy-image-as-png",
    title: "Copy image as PNG",
    contexts: ["image"]
});

function getImage(src){
    console.log("Setting source: "+src)
    const img = new Image();
    img.addEventListener('load', function() {
        console.log(img.width + "x" + img.height);
        canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob( function(blob) {
            blob.arrayBuffer().then((buffer) => browser.clipboard.setImageData(buffer, "png"))
        })
    })
    img.src = src
}

browser.contextMenus.onClicked.addListener(async (info,tab)=>{
    if(info.menuItemId != "copy-image-as-png"){
        return;
    }

    getImage(info.srcUrl);
});