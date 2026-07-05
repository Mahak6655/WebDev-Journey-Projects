// ===========================================
// FILTER CONFIGURATION
// ===========================================

let filters = {

    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },

    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },

    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },

    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },

    blur:{
        value:0,
        min:0,
        max:50,
        unit:"px"
    },

    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },

    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },

    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },

    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }

};


// ===========================================
// DOM
// ===========================================

const imageCanvas = document.querySelector("#image-canvas");
const canvasCtx = imageCanvas.getContext("2d");

const imageInput = document.querySelector("#image-input");

const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");

const presetContainer = document.querySelector(".presets");

const placeholder = document.querySelector(".placeholder");

const basicContainer = document.querySelector(".basic-filters");
const colorContainer = document.querySelector(".color-filters");
const effectContainer = document.querySelector(".effect-filters");


// ===========================================
// VARIABLES
// ===========================================

let image = null;
let file = null;


// ===========================================
// FILTER GROUPS
// ===========================================

const BASIC_FILTERS = [
    "brightness",
    "contrast",
    "saturation"
];

const COLOR_FILTERS = [
    "hueRotation",
    "grayscale",
    "sepia",
    "invert"
];

const EFFECT_FILTERS = [
    "blur",
    "opacity"
];


// ===========================================
// FORMAT NAME
// hueRotation -> Hue Rotation
// ===========================================

function formatName(name){

    return name
        .replace(/([A-Z])/g," $1")
        .replace(/^./,c=>c.toUpperCase());

}


// ===========================================
// RESET FILTERS
// ===========================================

function resetFilters(){

    filters = {

        brightness:{value:100,min:0,max:200,unit:"%"},

        contrast:{value:100,min:0,max:200,unit:"%"},

        saturation:{value:100,min:0,max:200,unit:"%"},

        hueRotation:{value:0,min:0,max:360,unit:"deg"},

        blur:{value:0,min:0,max:50,unit:"px"},

        grayscale:{value:0,min:0,max:100,unit:"%"},

        sepia:{value:0,min:0,max:100,unit:"%"},

        opacity:{value:100,min:0,max:100,unit:"%"},

        invert:{value:0,min:0,max:100,unit:"%"}

    };

}

// ===========================================
// CREATE FILTER ELEMENT
// ===========================================

function createFilterElement(name, unit, value, min, max){

    const div = document.createElement("div");
    div.classList.add("filter");

    const title = document.createElement("p");

    title.innerHTML = `
        <span>${formatName(name)}</span>
        <span class="filter-value">${value}${unit}</span>
    `;

    const input = document.createElement("input");

    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    div.appendChild(title);
    div.appendChild(input);

    input.addEventListener("input",()=>{

        filters[name].value = Number(input.value);

        title.querySelector(".filter-value").innerText =
            input.value + unit;

        applyFilters();

    });

    return div;

}



// ===========================================
// CREATE ALL FILTERS
// ===========================================

function createFilters(){

    basicContainer.innerHTML = "";
    colorContainer.innerHTML = "";
    effectContainer.innerHTML = "";

    Object.keys(filters).forEach(filterName=>{

        const filter = filters[filterName];

        const element = createFilterElement(

            filterName,
            filter.unit,
            filter.value,
            filter.min,
            filter.max

        );

        if(BASIC_FILTERS.includes(filterName)){

            basicContainer.appendChild(element);

        }

        else if(COLOR_FILTERS.includes(filterName)){

            colorContainer.appendChild(element);

        }

        else{

            effectContainer.appendChild(element);

        }

    });

}

createFilters();



// ===========================================
// IMAGE UPLOAD
// ===========================================

imageInput.addEventListener("change",(e)=>{

    file = e.target.files[0];

    if(!file) return;

    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = ()=>{

        image = img;

        placeholder.style.display = "none";

        imageCanvas.style.display = "block";

        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        applyFilters();

    };

});



// ===========================================
// APPLY FILTERS
// ===========================================

function applyFilters(){

    if(!image) return;

    canvasCtx.clearRect(

        0,
        0,
        imageCanvas.width,
        imageCanvas.height

    );

    canvasCtx.filter = `

        brightness(${filters.brightness.value}${filters.brightness.unit})

        contrast(${filters.contrast.value}${filters.contrast.unit})

        saturate(${filters.saturation.value}${filters.saturation.unit})

        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})

        blur(${filters.blur.value}${filters.blur.unit})

        grayscale(${filters.grayscale.value}${filters.grayscale.unit})

        sepia(${filters.sepia.value}${filters.sepia.unit})

        opacity(${filters.opacity.value}${filters.opacity.unit})

        invert(${filters.invert.value}${filters.invert.unit})

    `.trim();

    canvasCtx.drawImage(

        image,
        0,
        0,
        imageCanvas.width,
        imageCanvas.height

    );

}
// ===========================================
// RESET BUTTON
// ===========================================

resetBtn.addEventListener("click",()=>{

    if(!image) return;

    resetFilters();

    createFilters();

    applyFilters();

    document.querySelectorAll(".presets button").forEach(btn=>{
        btn.classList.remove("active");
    });

});



// ===========================================
// DOWNLOAD IMAGE
// ===========================================

downloadBtn.addEventListener("click",()=>{

    if(!image) return;

    const link=document.createElement("a");

    link.download="edited-image.png";

    link.href=imageCanvas.toDataURL("image/png");

    link.click();

});



// ===========================================
// PRESETS
// ===========================================

const presets={

    Normal:{
        brightness:100,
        contrast:100,
        saturation:100,
        hueRotation:0,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    Drama:{
        brightness:90,
        contrast:170,
        saturation:70,
        hueRotation:0,
        blur:0,
        grayscale:15,
        sepia:10,
        opacity:100,
        invert:0
    },

    Vintage:{
        brightness:105,
        contrast:90,
        saturation:80,
        hueRotation:10,
        blur:1,
        grayscale:20,
        sepia:60,
        opacity:100,
        invert:0
    },

    Retro:{
        brightness:105,
        contrast:95,
        saturation:75,
        hueRotation:15,
        blur:1,
        grayscale:10,
        sepia:45,
        opacity:100,
        invert:0
    },

    OldSchool:{
        brightness:95,
        contrast:85,
        saturation:60,
        hueRotation:0,
        blur:2,
        grayscale:35,
        sepia:75,
        opacity:100,
        invert:0
    },

    Noir:{
        brightness:80,
        contrast:180,
        saturation:0,
        hueRotation:0,
        blur:0,
        grayscale:100,
        sepia:5,
        opacity:100,
        invert:0
    },

    BlackWhite:{
        brightness:100,
        contrast:120,
        saturation:0,
        hueRotation:0,
        blur:0,
        grayscale:100,
        sepia:0,
        opacity:100,
        invert:0
    },

    Warm:{
        brightness:110,
        contrast:110,
        saturation:130,
        hueRotation:350,
        blur:0,
        grayscale:0,
        sepia:20,
        opacity:100,
        invert:0
    },

    Cool:{
        brightness:100,
        contrast:105,
        saturation:120,
        hueRotation:20,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    Dreamy:{
        brightness:120,
        contrast:80,
        saturation:110,
        hueRotation:10,
        blur:4,
        grayscale:0,
        sepia:15,
        opacity:100,
        invert:0
    },

    Cinematic:{
        brightness:95,
        contrast:140,
        saturation:80,
        hueRotation:345,
        blur:0,
        grayscale:10,
        sepia:10,
        opacity:100,
        invert:0
    },

    Summer:{
        brightness:115,
        contrast:110,
        saturation:140,
        hueRotation:350,
        blur:0,
        grayscale:0,
        sepia:10,
        opacity:100,
        invert:0
    },

    Winter:{
        brightness:95,
        contrast:115,
        saturation:90,
        hueRotation:20,
        blur:0,
        grayscale:10,
        sepia:0,
        opacity:100,
        invert:0
    },

    Neon:{
        brightness:110,
        contrast:170,
        saturation:200,
        hueRotation:40,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    Faded:{
        brightness:110,
        contrast:75,
        saturation:70,
        hueRotation:0,
        blur:1,
        grayscale:15,
        sepia:20,
        opacity:90,
        invert:0
    }

};



// ===========================================
// CREATE PRESET BUTTONS
// ===========================================

Object.keys(presets).forEach(name=>{

    const btn=document.createElement("button");

    btn.innerText=name;

    presetContainer.appendChild(btn);

    btn.addEventListener("click",()=>{

        document.querySelectorAll(".presets button")
        .forEach(button=>button.classList.remove("active"));

        btn.classList.add("active");

        const preset=presets[name];

        Object.keys(preset).forEach(filter=>{

            filters[filter].value=preset[filter];

        });

        createFilters();

        applyFilters();

    });

});
// ===========================================
// KEYBOARD SHORTCUTS
// ===========================================

document.addEventListener("keydown",(e)=>{

    // Ctrl + O -> Open Image
    if(e.ctrlKey && e.key.toLowerCase()=="o"){

        e.preventDefault();
        imageInput.click();

    }

    // Ctrl + S -> Download
    if(e.ctrlKey && e.key.toLowerCase()=="s"){

        e.preventDefault();

        if(image){
            downloadBtn.click();
        }

    }

    // Ctrl + R -> Reset Filters
    if(e.ctrlKey && e.key.toLowerCase()=="r"){

        e.preventDefault();

        if(image){
            resetBtn.click();
        }

    }

});


// ===========================================
// DRAG & DROP IMAGE
// ===========================================

const imageArea=document.querySelector(".bottom");

imageArea.addEventListener("dragover",(e)=>{

    e.preventDefault();

    imageArea.style.border="2px dashed #4cafef";

});

imageArea.addEventListener("dragleave",()=>{

    imageArea.style.border="1px solid rgba(255,255,255,.05)";

});

imageArea.addEventListener("drop",(e)=>{

    e.preventDefault();

    imageArea.style.border="1px solid rgba(255,255,255,.05)";

    const droppedFile=e.dataTransfer.files[0];

    if(!droppedFile) return;

    if(!droppedFile.type.startsWith("image")) return;

    const img=new Image();

    img.src=URL.createObjectURL(droppedFile);

    img.onload=()=>{

        image=img;

        placeholder.style.display="none";

        imageCanvas.style.display="block";

        imageCanvas.width=img.width;

        imageCanvas.height=img.height;

        applyFilters();

    };

});


// ===========================================
// DOUBLE CLICK -> RESET CURRENT FILTER
// ===========================================

document.addEventListener("dblclick",(e)=>{

    if(e.target.tagName!="INPUT") return;

    const name=e.target.id;

    filters[name].value=

        name=="brightness" ||
        name=="contrast" ||
        name=="saturation" ||
        name=="opacity"

        ?100

        :0;

    createFilters();

    applyFilters();

});


// ===========================================
// IMAGE INFORMATION
// ===========================================

function getImageInfo(){

    if(!image) return;

    console.log(

        "Width :",image.width,

        "Height :",image.height,

        "Aspect :", (image.width/image.height).toFixed(2)

    );

}


// ===========================================
// LOAD IMAGE INFO
// ===========================================

imageInput.addEventListener("change",()=>{

    setTimeout(getImageInfo,200);

});


// ===========================================
// WINDOW RESIZE
// ===========================================

window.addEventListener("resize",()=>{

    if(image){

        applyFilters();

    }

});


// ===========================================
// READY
// ===========================================

console.log("✅ Browser Image Editor Loaded Successfully");