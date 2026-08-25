/* =====================================================
   LINKQR - VERSION 4
   PROFESSIONAL QR GENERATOR
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const typeButtons =
    document.querySelectorAll(".type-btn");


const qrForms = {

    url:
        document.getElementById("urlForm"),

    text:
        document.getElementById("textForm"),

    wifi:
        document.getElementById("wifiForm"),

    email:
        document.getElementById("emailForm"),

    phone:
        document.getElementById("phoneForm")

};


const urlInput =
    document.getElementById("urlInput");


const textInput =
    document.getElementById("textInput");


const wifiName =
    document.getElementById("wifiName");


const wifiPassword =
    document.getElementById("wifiPassword");


const wifiSecurity =
    document.getElementById("wifiSecurity");


const emailAddress =
    document.getElementById("emailAddress");


const emailSubject =
    document.getElementById("emailSubject");


const emailMessage =
    document.getElementById("emailMessage");


const phoneInput =
    document.getElementById("phoneInput");


const qrColor =
    document.getElementById("qrColor");


const bgColor =
    document.getElementById("bgColor");


const qrColorValue =
    document.getElementById("qrColorValue");


const bgColorValue =
    document.getElementById("bgColorValue");


const qrSize =
    document.getElementById("qrSize");


const logoInput =
    document.getElementById("logoInput");


const logoSize =
    document.getElementById("logoSize");


const logoSizeValue =
    document.getElementById("logoSizeValue");


const logoBgColor =
    document.getElementById("logoBgColor");


const logoBgColorValue =
    document.getElementById("logoBgColorValue");


const generateBtn =
    document.getElementById(
        "generateAdvancedBtn"
    );


const qrEmpty =
    document.getElementById("qrEmpty");


const qrResult =
    document.getElementById("qrResult");


const qrImage =
    document.getElementById("qrImage");


const qrCanvas =
    document.getElementById("qrCanvas");


const logoWrapper =
    document.getElementById("logoWrapper");


const qrLogo =
    document.getElementById("qrLogo");


const qrContent =
    document.getElementById("qrContent");


const qrStatus =
    document.getElementById("qrStatus");


const downloadBtn =
    document.getElementById("downloadBtn");


const copyBtn =
    document.getElementById("copyBtn");


const historyList =
    document.getElementById("historyList");


const emptyHistory =
    document.getElementById("emptyHistory");


const clearHistoryBtn =
    document.getElementById(
        "clearHistoryBtn"
    );


const themeBtn =
    document.getElementById("themeBtn");


const backToTop =
    document.getElementById("backToTop");


/* =====================================================
   VARIABLES
===================================================== */

let currentType = "url";

let currentContent = "";

let currentQRUrl = "";

let logoData = "";

let qrGenerated = false;


/* =====================================================
   HISTORY
===================================================== */

let history =
    JSON.parse(
        localStorage.getItem(
            "linkQRHistory"
        )
    ) || [];


/* =====================================================
   QR TYPE
===================================================== */

typeButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                typeButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentType =
                    button.dataset.type;


                showForm(
                    currentType
                );

            }
        );

    }
);


function showForm(type) {

    Object.values(qrForms)
        .forEach(
            function (form) {

                form.classList.add(
                    "hidden"
                );

            }
        );


    if (qrForms[type]) {

        qrForms[type]
            .classList.remove(
                "hidden"
            );

    }

}


/* =====================================================
   COLOR
===================================================== */

qrColor.addEventListener(
    "input",
    function () {

        qrColorValue.textContent =
            qrColor.value.toUpperCase();

    }
);


bgColor.addEventListener(
    "input",
    function () {

        bgColorValue.textContent =
            bgColor.value.toUpperCase();

    }
);


logoBgColor.addEventListener(
    "input",
    function () {

        logoBgColorValue.textContent =
            logoBgColor.value.toUpperCase();


        updateLogoStyle();

    }
);


/* =====================================================
   LOGO SIZE
===================================================== */

logoSize.addEventListener(
    "input",
    function () {

        logoSizeValue.textContent =
            logoSize.value + "px";


        updateLogoStyle();

    }
);


function updateLogoStyle() {

    const size =
        Number(
            logoSize.value
        );


    logoWrapper.style.width =
        size + "px";


    logoWrapper.style.height =
        size + "px";


    logoWrapper.style.background =
        logoBgColor.value;

}


/* =====================================================
   LOGO UPLOAD
===================================================== */

logoInput.addEventListener(
    "change",
    function () {

        const file =
            logoInput.files[0];


        if (!file) {

            logoData = "";

            logoWrapper.style.display =
                "none";

            return;

        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select an image file."
            );

            logoInput.value = "";

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                logoData =
                    event.target.result;


                qrLogo.src =
                    logoData;


                logoWrapper.style.display =
                    "flex";


                updateLogoStyle();

            };


        reader.readAsDataURL(
            file
        );

    }
);


/* =====================================================
   GET QR CONTENT
===================================================== */

function getQRContent() {


    /* URL */

    if (
        currentType === "url"
    ) {

        const value =
            urlInput.value.trim();


        if (!value) {

            alert(
                "Please enter a website URL."
            );

            urlInput.focus();

            return null;

        }


        let parsedURL;


        try {

            parsedURL =
                new URL(value);

        } catch {

            alert(
                "Please enter a valid URL.\n\nExample:\nhttps://example.com"
            );

            urlInput.focus();

            return null;

        }


        if (
            parsedURL.protocol !==
                "http:" &&

            parsedURL.protocol !==
                "https:"
        ) {

            alert(
                "Only HTTP and HTTPS URLs are supported."
            );

            return null;

        }


        return value;

    }



    /* TEXT */

    if (
        currentType === "text"
    ) {

        const value =
            textInput.value.trim();


        if (!value) {

            alert(
                "Please enter some text."
            );

            textInput.focus();

            return null;

        }


        return value;

    }



    /* WIFI */

    if (
        currentType === "wifi"
    ) {

        const name =
            wifiName.value.trim();


        const password =
            wifiPassword.value;


        const security =
            wifiSecurity.value;


        if (!name) {

            alert(
                "Please enter your Wi-Fi name."
            );

            wifiName.focus();

            return null;

        }


        if (
            security !== "nopass" &&
            !password
        ) {

            alert(
                "Please enter your Wi-Fi password."
            );

            wifiPassword.focus();

            return null;

        }


        return (

            "WIFI:" +

            "T:" +
            security +

            ";S:" +
            escapeQR(name) +

            ";P:" +
            escapeQR(password) +

            ";;"

        );

    }



    /* EMAIL */

    if (
        currentType === "email"
    ) {

        const address =
            emailAddress.value.trim();


        const subject =
            emailSubject.value.trim();


        const message =
            emailMessage.value.trim();


        if (!address) {

            alert(
                "Please enter an email address."
            );

            emailAddress.focus();

            return null;

        }


        return (

            "mailto:" +

            address +

            "?subject=" +

            encodeURIComponent(
                subject
            ) +

            "&body=" +

            encodeURIComponent(
                message
            )

        );

    }



    /* PHONE */

    if (
        currentType === "phone"
    ) {

        const phone =
            phoneInput.value.trim();


        if (!phone) {

            alert(
                "Please enter a phone number."
            );

            phoneInput.focus();

            return null;

        }


        return (
            "tel:" +
            phone
        );

    }


    return null;

}


/* =====================================================
   ESCAPE WIFI
===================================================== */

function escapeQR(value) {

    return String(value)

        .replace(
            /\\/g,
            "\\\\"
        )

        .replace(
            /;/g,
            "\\;"
        )

        .replace(
            /,/g,
            "\\,"
        )

        .replace(
            /:/g,
            "\\:"
        );

}


/* =====================================================
   GENERATE QR
===================================================== */

generateBtn.addEventListener(
    "click",
    generateQR
);


function generateQR() {

    const content =
        getQRContent();


    if (!content) {

        return;

    }


    currentContent =
        content;


    const size =
        qrSize.value;


    const foreground =
        qrColor.value
            .replace(
                "#",
                ""
            );


    const background =
        bgColor.value
            .replace(
                "#",
                ""
            );


    currentQRUrl =

        "https://api.qrserver.com/v1/create-qr-code/" +

        "?size=" +
        size +
        "x" +
        size +

        "&color=" +
        foreground +

        "&bgcolor=" +
        background +

        "&data=" +
        encodeURIComponent(
            content
        );


    qrStatus.textContent =
        "Generating...";


    qrGenerated =
        false;


    qrImage.onload =
        function () {

            qrEmpty.style.display =
                "none";


            qrResult.style.display =
                "block";


            qrStatus.textContent =
                "Ready ✓";


            qrGenerated =
                true;


            if (logoData) {

                logoWrapper.style.display =
                    "flex";

            }

        };


    qrImage.onerror =
        function () {

            qrStatus.textContent =
                "Error";


            alert(
                "Unable to generate QR Code.\nPlease check your Internet connection."
            );

        };


    qrImage.src =
        currentQRUrl;


    qrContent.textContent =
        getDisplayContent();


    addToHistory(
        content,
        currentType
    );

}


/* =====================================================
   DISPLAY CONTENT
===================================================== */

function getDisplayContent() {

    if (
        currentType === "url"
    ) {

        return urlInput.value.trim();

    }


    if (
        currentType === "text"
    ) {

        return textInput.value.trim();

    }


    if (
        currentType === "wifi"
    ) {

        return (
            "Wi-Fi: " +
            wifiName.value.trim()
        );

    }


    if (
        currentType === "email"
    ) {

        return (
            "Email: " +
            emailAddress.value.trim()
        );

    }


    if (
        currentType === "phone"
    ) {

        return (
            "Phone: " +
            phoneInput.value.trim()
        );

    }


    return currentContent;

}


/* =====================================================
   DOWNLOAD QR + LOGO
===================================================== */

downloadBtn.addEventListener(
    "click",
    downloadQR
);


async function downloadQR() {

    if (!qrGenerated) {

        alert(
            "Please generate a QR Code first."
        );

        return;

    }


    try {

        qrStatus.textContent =
            "Preparing PNG...";


        /*
         * Create canvas
         */

        const canvas =
            document.createElement(
                "canvas"
            );


        const size =
            Number(
                qrSize.value
            );


        canvas.width =
            size;


        canvas.height =
            size;


        const ctx =
            canvas.getContext(
                "2d"
            );


        /*
         * Background
         */

        ctx.fillStyle =
            bgColor.value;


        ctx.fillRect(
            0,
            0,
            size,
            size
        );


        /*
         * Load QR image
         */

        const qr =
            await loadImage(
                currentQRUrl
            );


        ctx.drawImage(
            qr,
            0,
            0,
            size,
            size
        );


        /*
         * Draw Logo
         */

        if (logoData) {

            const logo =
                await loadImage(
                    logoData
                );


            const logoSizePercent =
                Number(
                    logoSize.value
                );


            const logoPixelSize =
                size *
                (
                    logoSizePercent /
                    100
                );


            const x =
                (
                    size -
                    logoPixelSize
                ) / 2;


            const y =
                (
                    size -
                    logoPixelSize
                ) / 2;


            /*
             * Logo background
             */

            ctx.fillStyle =
                logoBgColor.value;


            roundRect(
                ctx,
                x - 10,
                y - 10,
                logoPixelSize + 20,
                logoPixelSize + 20,
                15
            );


            ctx.fill();


            /*
             * Logo
             */

            ctx.drawImage(
                logo,
                x,
                y,
                logoPixelSize,
                logoPixelSize
            );

        }


        /*
         * Convert PNG
         */

        canvas.toBlob(
            function (blob) {

                if (!blob) {

                    throw new Error(
                        "PNG creation failed"
                    );

                }


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;


                link.download =
                    "LinkQR-" +
                    Date.now() +
                    ".png";


                document.body.appendChild(
                    link
                );


                link.click();


                document.body.removeChild(
                    link
                );


                URL.revokeObjectURL(
                    url
                );


                qrStatus.textContent =
                    "Downloaded ✓";


            },
            "image/png"
        );


    } catch (error) {

        console.error(error);


        qrStatus.textContent =
            "Error";


        alert(
            "Unable to download QR Code.\nPlease try again."
        );

    }

}


/* =====================================================
   LOAD IMAGE
===================================================== */

function loadImage(src) {

    return new Promise(
        function (resolve, reject) {

            const image =
                new Image();


            image.crossOrigin =
                "anonymous";


            image.onload =
                function () {

                    resolve(
                        image
                    );

                };


            image.onerror =
                function () {

                    reject(
                        new Error(
                            "Image loading failed"
                        )
                    );

                };


            image.src =
                src;

        }
    );

}


/* =====================================================
   ROUNDED RECTANGLE
===================================================== */

function roundRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
) {

    ctx.beginPath();


    ctx.moveTo(
        x + radius,
        y
    );


    ctx.lineTo(
        x + width - radius,
        y
    );


    ctx.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + radius
    );


    ctx.lineTo(
        x + width,
        y + height - radius
    );


    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
    );


    ctx.lineTo(
        x + radius,
        y + height
    );


    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );


    ctx.lineTo(
        x,
        y + radius
    );


    ctx.quadraticCurveTo(
        x,
        y,
        x + radius,
        y
    );


    ctx.closePath();

}


/* =====================================================
   COPY
===================================================== */

copyBtn.addEventListener(
    "click",
    async function () {

        if (!currentContent) {

            alert(
                "Please generate a QR Code first."
            );

            return;

        }


        try {

            await navigator.clipboard
                .writeText(
                    currentContent
                );


            const oldText =
                copyBtn.innerHTML;


            copyBtn.innerHTML =
                "✅ Copied!";


            setTimeout(
                function () {

                    copyBtn.innerHTML =
                        oldText;

                },
                2000
            );


        } catch {

            alert(
                "Unable to copy content."
            );

        }

    }
);


/* =====================================================
   HISTORY
===================================================== */

function addToHistory(
    content,
    type
) {

    const existing =
        history.findIndex(
            function (item) {

                return (
                    item.content ===
                    content
                );

            }
        );


    if (
        existing !== -1
    ) {

        history.splice(
            existing,
            1
        );

    }


    history.unshift({

        content:
            content,

        type:
            type,

        display:
            getDisplayContent(),

        date:
            new Date()
                .toLocaleString()

    });


    history =
        history.slice(
            0,
            10
        );


    localStorage.setItem(
        "linkQRHistory",
        JSON.stringify(
            history
        )
    );


    renderHistory();

}


/* =====================================================
   RENDER HISTORY
===================================================== */

function renderHistory() {

    historyList.innerHTML =
        "";


    if (
        history.length === 0
    ) {

        historyList.appendChild(
            emptyHistory
        );

        return;

    }


    history.forEach(
        function (item) {

            const historyItem =
                document.createElement(
                    "div"
                );


            historyItem.className =
                "history-item";


            const image =
                document.createElement(
                    "img"
                );


            image.className =
                "history-qr";


            image.src =

                "https://api.qrserver.com/v1/create-qr-code/" +

                "?size=150x150" +

                "&data=" +

                encodeURIComponent(
                    item.content
                );


            image.alt =
                "QR Code";


            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "history-info";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                item.display;


            const date =
                document.createElement(
                    "small"
                );


            date.textContent =
                item.date;


            info.appendChild(
                title
            );


            info.appendChild(
                date
            );


            const useButton =
                document.createElement(
                    "button"
                );


            useButton.className =
                "history-use";


            useButton.textContent =
                "Use";


            useButton.addEventListener(
                "click",
                function () {

                    loadHistoryItem(
                        item
                    );

                }
            );


            historyItem.appendChild(
                image
            );


            historyItem.appendChild(
                info
            );


            historyItem.appendChild(
                useButton
            );


            historyList.appendChild(
                historyItem
            );

        }
    );

}


/* =====================================================
   CLEAR HISTORY
===================================================== */

clearHistoryBtn.addEventListener(
    "click",
    function () {

        if (
            history.length === 0
        ) {

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to clear all QR history?"
            );


        if (!confirmed) {

            return;

        }


        history = [];


        localStorage.removeItem(
            "linkQRHistory"
        );


        renderHistory();

    }
);


/* =====================================================
   LOAD HISTORY
===================================================== */

function loadHistoryItem(
    item
) {

    currentType =
        item.type;


    typeButtons.forEach(
        function (button) {

            button.classList.toggle(
                "active",
                button.dataset.type ===
                    currentType
            );

        }
    );


    showForm(
        currentType
    );


    if (
        currentType === "url"
    ) {

        urlInput.value =
            item.content;

    }


    if (
        currentType === "text"
    ) {

        textInput.value =
            item.content;

    }


    if (
        currentType === "phone"
    ) {

        phoneInput.value =
            item.content.replace(
                "tel:",
                ""
            );

    }


    if (
        currentType === "email"
    ) {

        parseEmail(
            item.content
        );

    }


    generateQR();


    document
        .getElementById("generator")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   EMAIL PARSER
===================================================== */

function parseEmail(
    content
) {

    try {

        const url =
            new URL(
                content
            );


        emailAddress.value =
            url.pathname;


        emailSubject.value =
            url.searchParams.get(
                "subject"
            ) || "";


        emailMessage.value =
            url.searchParams.get(
                "body"
            ) || "";


    } catch {

        console.log(
            "Email parsing failed."
        );

    }

}


/* =====================================================
   DARK MODE
===================================================== */

const savedTheme =
    localStorage.getItem(
        "linkQRTheme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );


    themeBtn.textContent =
        "☀️";

}


themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        if (isDark) {

            themeBtn.textContent =
                "☀️";


            localStorage.setItem(
                "linkQRTheme",
                "dark"
            );

        } else {

            themeBtn.textContent =
                "🌙";


            localStorage.setItem(
                "linkQRTheme",
                "light"
            );

        }

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        if (
            window.scrollY > 500
        ) {

            backToTop.style.display =
                "block";

        } else {

            backToTop.style.display =
                "none";

        }

    }
);


backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

showForm(
    "url"
);


logoWrapper.style.display =
    "none";


updateLogoStyle();


renderHistory();