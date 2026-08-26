/* =====================================================
   LINKQR — QR STUDIO
   FINAL VERSION
   QR PREVIEW FIX
===================================================== */


/* =====================================================
   QR CODE LIBRARY
===================================================== */

const QR_LIBRARY_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";


function loadQRLibrary() {

    return new Promise((resolve, reject) => {

        if (window.QRCode) {
            resolve();
            return;
        }

        const script =
            document.createElement("script");

        script.src =
            QR_LIBRARY_URL;

        script.onload = () => {
            resolve();
        };

        script.onerror = () => {
            reject(
                new Error(
                    "Unable to load QR Code library."
                )
            );
        };

        document.head.appendChild(script);

    });

}


/* =====================================================
   DOM ELEMENTS
===================================================== */

const body =
    document.body;

const themeBtn =
    document.getElementById("themeBtn");

const qrTypes =
    document.querySelectorAll(".qr-type");

const generateBtn =
    document.getElementById("generateBtn");

const emptyPreview =
    document.getElementById("emptyPreview");

const qrResult =
    document.getElementById("qrResult");

const qrImage =
    document.getElementById("qrImage");

const qrCanvasWrapper =
    document.getElementById("qrCanvasWrapper");

const qrContent =
    document.getElementById("qrContent");

const qrStatus =
    document.getElementById("qrStatus");

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

const qrPattern =
    document.getElementById("qrPattern");

const eyeStyle =
    document.getElementById("eyeStyle");

const logoInput =
    document.getElementById("logoInput");

const logoOptions =
    document.getElementById("logoOptions");

const logoWrapper =
    document.getElementById("logoWrapper");

const qrLogo =
    document.getElementById("qrLogo");

const logoSize =
    document.getElementById("logoSize");

const logoSizeValue =
    document.getElementById("logoSizeValue");

const logoShape =
    document.getElementById("logoShape");

const historyList =
    document.getElementById("historyList");

const historySearch =
    document.getElementById("historySearch");

const historyCount =
    document.getElementById("historyCount");

const clearHistoryBtn =
    document.getElementById("clearHistory");

const downloadPng =
    document.getElementById("downloadPng");

const downloadJpg =
    document.getElementById("downloadJpg");

const downloadSvg =
    document.getElementById("downloadSvg");

const copyContent =
    document.getElementById("copyContent");

const backToTop =
    document.getElementById("backToTop");


/* =====================================================
   STATE
===================================================== */

let currentType =
    "url";

let currentContent =
    "";

let currentLogo =
    "";

let generatedQR =
    null;

let historyData =
    [];

let qrLibraryReady =
    false;


/* =====================================================
   STORAGE
===================================================== */

const HISTORY_KEY =
    "linkqr_history_v6";

const THEME_KEY =
    "linkqr_theme_v6";


/* =====================================================
   LOAD HISTORY
===================================================== */

function loadHistory() {

    try {

        const saved =
            localStorage.getItem(
                HISTORY_KEY
            );

        historyData =
            saved
                ? JSON.parse(saved)
                : [];

        if (!Array.isArray(historyData)) {
            historyData = [];
        }

    } catch (error) {

        console.error(
            "History error:",
            error
        );

        historyData = [];

    }

}


/* =====================================================
   SAVE HISTORY
===================================================== */

function saveHistory() {

    try {

        localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(historyData)
        );

    } catch (error) {

        console.error(
            "Save history error:",
            error
        );

    }

}


/* =====================================================
   THEME
===================================================== */

function loadTheme() {

    if (!themeBtn) {
        return;
    }

    const savedTheme =
        localStorage.getItem(
            THEME_KEY
        );

    if (savedTheme === "dark") {

        body.classList.add("dark");

        themeBtn.textContent =
            "☀️";

    } else {

        body.classList.remove("dark");

        themeBtn.textContent =
            "🌙";

    }

}


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "dark"
            );

            const isDark =
                body.classList.contains(
                    "dark"
                );

            localStorage.setItem(
                THEME_KEY,
                isDark
                    ? "dark"
                    : "light"
            );

            themeBtn.textContent =
                isDark
                    ? "☀️"
                    : "🌙";

        }
    );

}


/* =====================================================
   QR TYPE BUTTONS
===================================================== */

qrTypes.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                qrTypes.forEach(
                    item => {

                        item.classList.remove(
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


/* =====================================================
   SHOW FORM
===================================================== */

function showForm(type) {

    const forms = [

        "urlForm",
        "textForm",
        "wifiForm",
        "emailForm",
        "phoneForm"

    ];


    forms.forEach(
        id => {

            const element =
                document.getElementById(
                    id
                );

            if (element) {

                element.classList.add(
                    "hidden"
                );

            }

        }
    );


    const selected =
        document.getElementById(
            `${type}Form`
        );


    if (selected) {

        selected.classList.remove(
            "hidden"
        );

    }

}


/* =====================================================
   GET INPUT
===================================================== */

function getInputValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


/* =====================================================
   BUILD QR CONTENT
===================================================== */

function buildQRContent() {

    switch (currentType) {


        /* =============================================
           URL
        ============================================= */

        case "url": {

            const url =
                getInputValue(
                    "urlInput"
                );

            if (!url) {

                showMessage(
                    "Please enter a website URL.",
                    "error"
                );

                return null;

            }


            if (
                /^https?:\/\//i.test(url)
            ) {

                return url;

            }


            return (
                "https://" +
                url
            );

        }


        /* =============================================
           TEXT
        ============================================= */

        case "text": {

            const text =
                getInputValue(
                    "textInput"
                );

            if (!text) {

                showMessage(
                    "Please enter some text.",
                    "error"
                );

                return null;

            }

            return text;

        }


        /* =============================================
           WIFI
        ============================================= */

        case "wifi": {

            const ssid =
                getInputValue(
                    "wifiName"
                );

            const password =
                getInputValue(
                    "wifiPassword"
                );

            const security =
                getInputValue(
                    "wifiSecurity"
                ) || "WPA";


            if (!ssid) {

                showMessage(
                    "Please enter Wi-Fi name.",
                    "error"
                );

                return null;

            }


            return (
                `WIFI:T:${security};` +
                `S:${escapeWifi(ssid)};` +
                `P:${escapeWifi(password)};;`
            );

        }


        /* =============================================
           EMAIL
        ============================================= */

        case "email": {

            const email =
                getInputValue(
                    "emailAddress"
                );

            const subject =
                getInputValue(
                    "emailSubject"
                );

            const message =
                getInputValue(
                    "emailMessage"
                );


            if (!email) {

                showMessage(
                    "Please enter an email address.",
                    "error"
                );

                return null;

            }


            return (
                `mailto:${email}` +
                `?subject=${encodeURIComponent(
                    subject
                )}` +
                `&body=${encodeURIComponent(
                    message
                )}`
            );

        }


        /* =============================================
           PHONE
        ============================================= */

        case "phone": {

            const phone =
                getInputValue(
                    "phoneInput"
                );


            if (!phone) {

                showMessage(
                    "Please enter phone number.",
                    "error"
                );

                return null;

            }


            return (
                `tel:${phone}`
            );

        }


        default:

            return null;

    }

}


/* =====================================================
   WIFI ESCAPE
===================================================== */

function escapeWifi(value) {

    return String(value)
        .replace(
            /([\\;,:"])/g,
            "\\$1"
        );

}


/* =====================================================
   QR SIZE
===================================================== */

function getQRSize() {

    let size =
        parseInt(
            qrSize?.value,
            10
        );


    if (
        !Number.isFinite(size) ||
        size <= 0
    ) {

        size = 300;

    }


    return size;

}


/* =====================================================
   GENERATE BUTTON
===================================================== */

if (generateBtn) {

    generateBtn.addEventListener(
        "click",
        async () => {

            const content =
                buildQRContent();


            if (!content) {
                return;
            }


            currentContent =
                content;


            generateBtn.disabled =
                true;


            generateBtn.innerHTML =
                "⏳ Generating...";


            try {

                await loadQRLibrary();

                qrLibraryReady =
                    true;


                generateQR(
                    content,
                    true
                );


            } catch (error) {

                console.error(
                    error
                );


                showMessage(
                    "QR library could not be loaded.",
                    "error"
                );

            }


            generateBtn.disabled =
                false;


            generateBtn.innerHTML =
                "<span>⚡</span> Generate QR Code";

        }
    );

}


/* =====================================================
   GENERATE QR
   FINAL FIX
===================================================== */

function generateQR(
    content,
    addHistory = false
) {

    if (!window.QRCode) {

        showMessage(
            "QR Code library is not ready.",
            "error"
        );

        return;

    }


    const size =
        getQRSize();


    const foreground =
        qrColor?.value ||
        "#111827";


    const background =
        bgColor?.value ||
        "#ffffff";


    /* ================================================
       CLEAR OLD QR
    ================================================ */

    if (qrCanvasWrapper) {

        qrCanvasWrapper.innerHTML =
            "";

    }


    /* ================================================
       CREATE QR CONTAINER

       IMPORTANT:
       DO NOT USE 500px WIDTH HERE.

       Preview = 100% of available space.
       Output = selected QR size.
    ================================================ */

    const qrContainer =
        document.createElement(
            "div"
        );


    qrContainer.id =
        "generatedQRCode";


    qrContainer.style.width =
        "100%";


    qrContainer.style.height =
        "100%";


    qrContainer.style.maxWidth =
        "100%";


    qrContainer.style.maxHeight =
        "100%";


    qrContainer.style.aspectRatio =
        "1 / 1";


    qrContainer.style.display =
        "flex";


    qrContainer.style.alignItems =
        "center";


    qrContainer.style.justifyContent =
        "center";


    qrContainer.style.position =
        "relative";


    qrContainer.style.margin =
        "0 auto";


    qrContainer.style.padding =
        "0";


    qrContainer.style.boxSizing =
        "border-box";


    /* ================================================
       ADD TO PREVIEW
    ================================================ */

    if (qrCanvasWrapper) {

        qrCanvasWrapper.appendChild(
            qrContainer
        );

    }


    /* ================================================
       CREATE QR

       WIDTH = HEIGHT
    ================================================ */

    generatedQR =
        new QRCode(
            qrContainer,
            {

                text:
                    content,

                width:
                    size,

                height:
                    size,

                colorDark:
                    foreground,

                colorLight:
                    background,

                correctLevel:
                    QRCode.CorrectLevel.H

            }
        );


    /* ================================================
       WAIT FOR QR
    ================================================ */

    setTimeout(
        () => {

            fixQRPreview(
                qrContainer,
                size
            );


            showGeneratedResult();


            if (addHistory) {

                addToHistory(
                    content
                );

            }

        },
        100
    );

}


/* =====================================================
   FIX QR PREVIEW
   THIS IS THE IMPORTANT PART
===================================================== */

function fixQRPreview(
    qrContainer,
    size
) {

    if (!qrContainer) {
        return;
    }


    /* ================================================
       CONTAINER
    ================================================ */

    qrContainer.style.width =
        "100%";


    qrContainer.style.height =
        "100%";


    qrContainer.style.maxWidth =
        "100%";


    qrContainer.style.maxHeight =
        "100%";


    qrContainer.style.aspectRatio =
        "1 / 1";


    qrContainer.style.display =
        "flex";


    qrContainer.style.alignItems =
        "center";


    qrContainer.style.justifyContent =
        "center";


    qrContainer.style.overflow =
        "hidden";


    /* ================================================
       CANVAS
    ================================================ */

    const canvas =
        qrContainer.querySelector(
            "canvas"
        );


    if (canvas) {

        /*
           DO NOT FORCE 500px HERE.
           Let CSS scale it to the preview box.
        */

        canvas.style.width =
            "100%";


        canvas.style.height =
            "100%";


        canvas.style.maxWidth =
            "100%";


        canvas.style.maxHeight =
            "100%";


        canvas.style.minWidth =
            "0";


        canvas.style.minHeight =
            "0";


        canvas.style.aspectRatio =
            "1 / 1";


        canvas.style.objectFit =
            "contain";


        canvas.style.display =
            "block";


        canvas.style.margin =
            "0 auto";


        canvas.style.boxSizing =
            "border-box";


        /* ============================================
           IMPORTANT

           Keep real canvas resolution square.
        ============================================ */

        if (
            canvas.width !== size
        ) {

            canvas.width =
                size;

        }


        if (
            canvas.height !== size
        ) {

            canvas.height =
                size;

        }


        /* ============================================
           CREATE PREVIEW IMAGE
        ============================================ */

        if (qrImage) {

            qrImage.src =
                canvas.toDataURL(
                    "image/png"
                );


            qrImage.style.width =
                "100%";


            qrImage.style.height =
                "auto";


            qrImage.style.maxWidth =
                "100%";


            qrImage.style.aspectRatio =
                "1 / 1";


            qrImage.style.objectFit =
                "contain";


            qrImage.style.display =
                "block";


            qrImage.style.margin =
                "0 auto";

        }

    }


    /* ================================================
       IMAGE FALLBACK
    ================================================ */

    const image =
        qrContainer.querySelector(
            "img"
        );


    if (image) {

        image.style.width =
            "100%";


        image.style.height =
            "100%";


        image.style.maxWidth =
            "100%";


        image.style.maxHeight =
            "100%";


        image.style.minWidth =
            "0";


        image.style.minHeight =
            "0";


        image.style.aspectRatio =
            "1 / 1";


        image.style.objectFit =
            "contain";


        image.style.display =
            "block";


        image.style.margin =
            "0 auto";

    }


    /* ================================================
       APPLY LOGO
    ================================================ */

    applyLogo();

}


/* =====================================================
   SHOW RESULT
===================================================== */

function showGeneratedResult() {

    if (emptyPreview) {

        emptyPreview.classList.add(
            "hidden"
        );

    }


    if (qrResult) {

        qrResult.classList.remove(
            "hidden"
        );

    }


    if (qrStatus) {

        qrStatus.textContent =
            "✓ QR Code Ready";

    }


    if (qrContent) {

        qrContent.textContent =
            currentContent;

    }

}


/* =====================================================
   LOGO UPLOAD
===================================================== */

if (logoInput) {

    logoInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                currentLogo =
                    "";


                if (logoOptions) {

                    logoOptions.classList.add(
                        "hidden"
                    );

                }


                if (logoWrapper) {

                    logoWrapper.style.display =
                        "none";

                }


                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                showMessage(
                    "Please select an image file.",
                    "error"
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                event => {

                    currentLogo =
                        event.target.result;


                    if (qrLogo) {

                        qrLogo.src =
                            currentLogo;

                    }


                    if (logoOptions) {

                        logoOptions.classList.remove(
                            "hidden"
                        );

                    }


                    applyLogo();

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =====================================================
   APPLY LOGO
===================================================== */

function applyLogo() {

    if (
        !logoWrapper ||
        !qrLogo
    ) {

        return;

    }


    if (!currentLogo) {

        logoWrapper.style.display =
            "none";

        return;

    }


    const qrContainer =
        document.getElementById(
            "generatedQRCode"
        );


    if (!qrContainer) {
        return;
    }


    const percentage =
        parseInt(
            logoSize?.value,
            10
        ) || 25;


    const qrPreviewSize =
        Math.min(
            qrContainer.clientWidth,
            qrContainer.clientHeight
        );


    const logoPixels =
        qrPreviewSize *
        (percentage / 100) *
        0.30;


    logoWrapper.style.position =
        "absolute";


    logoWrapper.style.left =
        "50%";


    logoWrapper.style.top =
        "50%";


    logoWrapper.style.transform =
        "translate(-50%, -50%)";


    logoWrapper.style.width =
        `${logoPixels}px`;


    logoWrapper.style.height =
        `${logoPixels}px`;


    logoWrapper.style.display =
        "flex";


    logoWrapper.style.alignItems =
        "center";


    logoWrapper.style.justifyContent =
        "center";


    logoWrapper.style.background =
        bgColor?.value ||
        "#ffffff";


    logoWrapper.style.padding =
        "4px";


    logoWrapper.style.boxSizing =
        "border-box";


    const shape =
        logoShape?.value ||
        "rounded";


    if (
        shape === "circle"
    ) {

        logoWrapper.style.borderRadius =
            "50%";


        qrLogo.style.borderRadius =
            "50%";

    }

    else if (
        shape === "rounded"
    ) {

        logoWrapper.style.borderRadius =
            "12px";


        qrLogo.style.borderRadius =
            "8px";

    }

    else {

        logoWrapper.style.borderRadius =
            "4px";


        qrLogo.style.borderRadius =
            "2px";

    }


    qrLogo.style.width =
        "100%";


    qrLogo.style.height =
        "100%";


    qrLogo.style.objectFit =
        "contain";

}


/* =====================================================
   LOGO SIZE
===================================================== */

if (logoSize) {

    logoSize.addEventListener(
        "input",
        () => {

            if (logoSizeValue) {

                logoSizeValue.textContent =
                    `${logoSize.value}%`;

            }


            applyLogo();

        }
    );

}


/* =====================================================
   LOGO SHAPE
===================================================== */

if (logoShape) {

    logoShape.addEventListener(
        "change",
        () => {

            applyLogo();

        }
    );

}


/* =====================================================
   COLORS
===================================================== */

if (qrColor) {

    qrColor.addEventListener(
        "input",
        () => {

            if (qrColorValue) {

                qrColorValue.textContent =
                    qrColor.value.toUpperCase();

            }

        }
    );

}


if (bgColor) {

    bgColor.addEventListener(
        "input",
        () => {

            if (bgColorValue) {

                bgColorValue.textContent =
                    bgColor.value.toUpperCase();

            }


            if (currentLogo) {

                applyLogo();

            }

        }
    );

}


/* =====================================================
   REGENERATE WHEN CUSTOMIZATION CHANGES
===================================================== */

[
    qrColor,
    bgColor,
    qrSize
]
    .filter(Boolean)
    .forEach(
        element => {

            element.addEventListener(
                "change",
                async () => {

                    if (!currentContent) {
                        return;
                    }


                    try {

                        await loadQRLibrary();


                        generateQR(
                            currentContent,
                            false
                        );

                    } catch (error) {

                        console.error(
                            error
                        );

                    }

                }
            );

        }
    );


/* =====================================================
   HISTORY
===================================================== */

function addToHistory(
    content
) {

    const item = {

        id:
            Date.now(),

        type:
            currentType,

        content:
            content,

        color:
            qrColor?.value ||
            "#111827",

        background:
            bgColor?.value ||
            "#ffffff",

        size:
            qrSize?.value ||
            "300",

        createdAt:
            new Date().toISOString(),

        image:
            getCurrentQRDataURL() ||
            ""

    };


    historyData =
        historyData.filter(
            oldItem =>
                oldItem.content !==
                content
        );


    historyData.unshift(
        item
    );


    if (
        historyData.length > 30
    ) {

        historyData =
            historyData.slice(
                0,
                30
            );

    }


    saveHistory();

    renderHistory();

}


/* =====================================================
   RENDER HISTORY
===================================================== */

function renderHistory() {

    if (!historyList) {
        return;
    }


    const query =
        historySearch
            ? historySearch.value
                .trim()
                .toLowerCase()
            : "";


    const filtered =
        historyData.filter(
            item =>
                String(
                    item.content || ""
                )
                    .toLowerCase()
                    .includes(query)
        );


    historyList.innerHTML =
        "";


    if (
        filtered.length === 0
    ) {

        historyList.appendChild(
            createEmptyHistory()
        );


        updateHistoryCount(
            0
        );


        return;

    }


    filtered.forEach(
        item => {

            historyList.appendChild(
                createHistoryItem(
                    item
                )
            );

        }
    );


    updateHistoryCount(
        filtered.length
    );

}


/* =====================================================
   EMPTY HISTORY
===================================================== */

function createEmptyHistory() {

    const div =
        document.createElement(
            "div"
        );


    div.className =
        "empty-history";


    div.innerHTML = `

        <div class="history-empty-icon">
            📝
        </div>

        <h3>
            No QR Codes Found
        </h3>

        <p>
            Your generated QR Codes
            will appear here.
        </p>

        <a
            href="#generator"
            class="small-create-btn"
        >
            Create QR
        </a>

    `;


    return div;

}


/* =====================================================
   HISTORY ITEM
===================================================== */

function createHistoryItem(
    item
) {

    const element =
        document.createElement(
            "div"
        );


    element.className =
        "history-item";


    const date =
        new Date(
            item.createdAt
        );


    element.innerHTML = `

        <img
            class="history-qr"
            src="${item.image || ""}"
            alt="QR Code"
        >

        <div class="history-info">

            <strong>
                ${escapeHTML(
                    item.content || ""
                )}
            </strong>

            <small>
                ${(item.type || "QR").toUpperCase()}
                •
                ${formatDate(date)}
            </small>

        </div>

        <div class="history-actions">

            <button
                class="history-action"
                data-action="load"
            >
                ↩
            </button>

            <button
                class="history-action"
                data-action="download"
            >
                ↓
            </button>

            <button
                class="history-action"
                data-action="delete"
            >
                🗑
            </button>

        </div>

    `;


    const loadButton =
        element.querySelector(
            '[data-action="load"]'
        );


    const downloadButton =
        element.querySelector(
            '[data-action="download"]'
        );


    const deleteButton =
        element.querySelector(
            '[data-action="delete"]'
        );


    if (loadButton) {

        loadButton.addEventListener(
            "click",
            () => {

                loadHistoryItem(
                    item
                );

            }
        );

    }


    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            () => {

                downloadDataURL(
                    item.image,
                    "linkqr.png"
                );

            }
        );

    }


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            () => {

                deleteHistoryItem(
                    item.id
                );

            }
        );

    }


    return element;

}


/* =====================================================
   LOAD HISTORY ITEM
===================================================== */

function loadHistoryItem(
    item
) {

    currentType =
        item.type || "url";


    qrTypes.forEach(
        button => {

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


    fillContentInput(
        item.content,
        currentType
    );


    if (qrColor) {

        qrColor.value =
            item.color ||
            "#111827";

    }


    if (bgColor) {

        bgColor.value =
            item.background ||
            "#ffffff";

    }


    if (qrSize) {

        qrSize.value =
            item.size ||
            "300";

    }


    if (qrColorValue) {

        qrColorValue.textContent =
            qrColor.value.toUpperCase();

    }


    if (bgColorValue) {

        bgColorValue.textContent =
            bgColor.value.toUpperCase();

    }


    currentContent =
        item.content;


    loadQRLibrary()
        .then(
            () => {

                generateQR(
                    currentContent,
                    false
                );


                const generator =
                    document.getElementById(
                        "generator"
                    );


                if (generator) {

                    generator.scrollIntoView({
                        behavior:
                            "smooth"
                    });

                }

            }
        );

}


/* =====================================================
   FILL INPUT
===================================================== */

function fillContentInput(
    content,
    type
) {

    if (!content) {
        return;
    }


    switch (type) {


        case "url": {

            const input =
                document.getElementById(
                    "urlInput"
                );


            if (input) {

                input.value =
                    content;

            }


            break;

        }


        case "text": {

            const input =
                document.getElementById(
                    "textInput"
                );


            if (input) {

                input.value =
                    content;

            }


            break;

        }


        case "phone": {

            const input =
                document.getElementById(
                    "phoneInput"
                );


            if (input) {

                input.value =
                    content.replace(
                        /^tel:/,
                        ""
                    );

            }


            break;

        }


        case "email": {

            const match =
                content.match(
                    /^mailto:([^?]+)/
                );


            if (match) {

                const input =
                    document.getElementById(
                        "emailAddress"
                    );


                if (input) {

                    input.value =
                        decodeURIComponent(
                            match[1]
                        );

                }

            }


            break;

        }


        case "wifi": {

            const match =
                content.match(
                    /S:((?:\\.|[^;])*)/
                );


            if (match) {

                const input =
                    document.getElementById(
                        "wifiName"
                    );


                if (input) {

                    input.value =
                        match[1];

                }

            }


            break;

        }

    }

}


/* =====================================================
   DELETE HISTORY
===================================================== */

function deleteHistoryItem(
    id
) {

    historyData =
        historyData.filter(
            item =>
                item.id !== id
        );


    saveHistory();

    renderHistory();

}


/* =====================================================
   CLEAR HISTORY
===================================================== */

if (clearHistoryBtn) {

    clearHistoryBtn.addEventListener(
        "click",
        () => {

            if (
                historyData.length === 0
            ) {

                showMessage(
                    "History is already empty.",
                    "info"
                );

                return;

            }


            const confirmed =
                confirm(
                    "Delete all QR history?"
                );


            if (!confirmed) {
                return;
            }


            historyData =
                [];


            saveHistory();

            renderHistory();

        }
    );

}


/* =====================================================
   HISTORY SEARCH
===================================================== */

if (historySearch) {

    historySearch.addEventListener(
        "input",
        renderHistory
    );

}


/* =====================================================
   HISTORY COUNT
===================================================== */

function updateHistoryCount(
    count
) {

    if (!historyCount) {
        return;
    }


    historyCount.textContent =
        `${count} QR Code${
            count === 1
                ? ""
                : "s"
        }`;

}


/* =====================================================
   GET CURRENT QR DATA
===================================================== */

function getCurrentQRDataURL() {

    if (
        qrImage &&
        qrImage.src &&
        qrImage.src.startsWith(
            "data:image"
        )
    ) {

        return qrImage.src;

    }


    const canvas =
        document.querySelector(
            "#generatedQRCode canvas"
        );


    if (canvas) {

        return canvas.toDataURL(
            "image/png"
        );

    }


    const image =
        document.querySelector(
            "#generatedQRCode img"
        );


    if (image) {

        return image.src;

    }


    return null;

}


/* =====================================================
   DOWNLOAD PNG
===================================================== */

if (downloadPng) {

    downloadPng.addEventListener(
        "click",
        () => {

            const dataURL =
                getCurrentQRDataURL();


            if (!dataURL) {

                showMessage(
                    "Generate a QR Code first.",
                    "error"
                );

                return;

            }


            downloadDataURL(
                dataURL,
                `linkqr-${getQRSize()}x${getQRSize()}.png`
            );

        }
    );

}


/* =====================================================
   DOWNLOAD JPG
===================================================== */

if (downloadJpg) {

    downloadJpg.addEventListener(
        "click",
        () => {

            const dataURL =
                getCurrentQRDataURL();


            if (!dataURL) {

                showMessage(
                    "Generate a QR Code first.",
                    "error"
                );

                return;

            }


            const image =
                new Image();


            image.onload =
                () => {

                    const size =
                        getQRSize();


                    const canvas =
                        document.createElement(
                            "canvas"
                        );


                    /*
                       ALWAYS SQUARE
                    */

                    canvas.width =
                        size;


                    canvas.height =
                        size;


                    const context =
                        canvas.getContext(
                            "2d"
                        );


                    context.fillStyle =
                        bgColor?.value ||
                        "#ffffff";


                    context.fillRect(
                        0,
                        0,
                        size,
                        size
                    );


                    context.drawImage(
                        image,
                        0,
                        0,
                        size,
                        size
                    );


                    downloadDataURL(
                        canvas.toDataURL(
                            "image/jpeg",
                            0.95
                        ),
                        `linkqr-${size}x${size}.jpg`
                    );

                };


            image.src =
                dataURL;

        }
    );

}


/* =====================================================
   DOWNLOAD SVG
===================================================== */

if (downloadSvg) {

    downloadSvg.addEventListener(
        "click",
        () => {

            if (!currentContent) {

                showMessage(
                    "Generate a QR Code first.",
                    "error"
                );

                return;

            }


            const dataURL =
                getCurrentQRDataURL();


            if (!dataURL) {

                showMessage(
                    "Generate a QR Code first.",
                    "error"
                );

                return;

            }


            const size =
                getQRSize();


            const svg =
                createSVG(
                    dataURL,
                    size
                );


            const blob =
                new Blob(
                    [svg],
                    {
                        type:
                            "image/svg+xml"
                    }
                );


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
                `linkqr-${size}x${size}.svg`;


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            setTimeout(
                () => {

                    URL.revokeObjectURL(
                        url
                    );

                },
                100
            );

        }
    );

}


/* =====================================================
   CREATE SVG
===================================================== */

function createSVG(
    dataURL,
    size
) {

    const background =
        bgColor?.value ||
        "#ffffff";


    return `

<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${size}"
    height="${size}"
    viewBox="0 0 ${size} ${size}"
>

    <rect
        width="${size}"
        height="${size}"
        fill="${background}"
    />

    <image
        href="${dataURL}"
        x="0"
        y="0"
        width="${size}"
        height="${size}"
        preserveAspectRatio="none"
    />

</svg>

`;

}


/* =====================================================
   COPY CONTENT
===================================================== */

if (copyContent) {

    copyContent.addEventListener(
        "click",
        async () => {

            if (!currentContent) {

                showMessage(
                    "Nothing to copy.",
                    "error"
                );

                return;

            }


            try {

                await navigator.clipboard.writeText(
                    currentContent
                );


                showMessage(
                    "QR content copied!",
                    "success"
                );

            } catch (error) {

                console.error(
                    error
                );


                showMessage(
                    "Copy failed.",
                    "error"
                );

            }

        }
    );

}


/* =====================================================
   DOWNLOAD DATA URL
===================================================== */

function downloadDataURL(
    dataURL,
    filename
) {

    if (!dataURL) {

        showMessage(
            "No QR Code available.",
            "error"
        );

        return;

    }


    const link =
        document.createElement(
            "a"
        );


    link.href =
        dataURL;


    link.download =
        filename;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();

}


/* =====================================================
   TOAST
===================================================== */

function showMessage(
    message,
    type = "info"
) {

    const oldToast =
        document.querySelector(
            ".linkqr-toast"
        );


    if (oldToast) {

        oldToast.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "linkqr-toast";


    let icon =
        "ℹ️";


    if (type === "success") {

        icon =
            "✅";

    }


    if (type === "error") {

        icon =
            "⚠️";

    }


    toast.innerHTML = `

        <span>
            ${icon}
        </span>

        <span>
            ${escapeHTML(
                message
            )}
        </span>

    `;


    Object.assign(
        toast.style,
        {

            position:
                "fixed",

            right:
                "20px",

            bottom:
                "20px",

            zIndex:
                "99999",

            display:
                "flex",

            alignItems:
                "center",

            gap:
                "9px",

            padding:
                "12px 16px",

            borderRadius:
                "12px",

            background:
                body.classList.contains(
                    "dark"
                )
                    ? "#161c24"
                    : "#ffffff",

            color:
                body.classList.contains(
                    "dark"
                )
                    ? "#e8edf5"
                    : "#1f2937",

            border:
                "1px solid #e4e8ef",

            boxShadow:
                "0 15px 35px rgba(0,0,0,.15)",

            fontSize:
                "13px",

            fontWeight:
                "600"

        }
    );


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },
        3000
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(
    date
) {

    if (
        !(date instanceof Date) ||
        isNaN(date)
    ) {

        return "Unknown date";

    }


    return date.toLocaleString(
        undefined,
        {

            year:
                "numeric",

            month:
                "short",

            day:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"

        }
    );

}


/* =====================================================
   BACK TO TOP
===================================================== */

if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                backToTop.style.display =
                    "grid";

            } else {

                backToTop.style.display =
                    "none";

            }

        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );

}


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }
            );

        }
    );


/* =====================================================
   ENTER KEY
===================================================== */

document
    .querySelectorAll(
        "input"
    )
    .forEach(
        input => {

            input.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        if (
                            generateBtn
                        ) {

                            generateBtn.click();

                        }

                    }

                }
            );

        }
    );


/* =====================================================
   RESIZE FIX
   IMPORTANT FOR DESKTOP + PHONE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        const qr =
            document.getElementById(
                "generatedQRCode"
            );


        if (!qr) {
            return;
        }


        const size =
            getQRSize();


        fixQRPreview(
            qr,
            size
        );

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

function initialize() {

    loadTheme();

    loadHistory();

    renderHistory();

    showForm(
        "url"
    );


    if (
        qrColor &&
        qrColorValue
    ) {

        qrColorValue.textContent =
            qrColor.value.toUpperCase();

    }


    if (
        bgColor &&
        bgColorValue
    ) {

        bgColorValue.textContent =
            bgColor.value.toUpperCase();

    }


    if (
        logoSize &&
        logoSizeValue
    ) {

        logoSizeValue.textContent =
            `${logoSize.value}%`;

    }


    /* ================================================
       INITIAL QR PREVIEW BOX
    ================================================ */

    if (qrCanvasWrapper) {

        qrCanvasWrapper.style.width =
            "min(100%, 500px)";


        qrCanvasWrapper.style.height =
            "min(100%, 500px)";


        qrCanvasWrapper.style.aspectRatio =
            "1 / 1";


        qrCanvasWrapper.style.display =
            "flex";


        qrCanvasWrapper.style.alignItems =
            "center";


        qrCanvasWrapper.style.justifyContent =
            "center";


        qrCanvasWrapper.style.position =
            "relative";


        qrCanvasWrapper.style.margin =
            "0 auto";


        qrCanvasWrapper.style.overflow =
            "hidden";


        qrCanvasWrapper.style.boxSizing =
            "border-box";

    }


    console.log(
        "===================================="
    );


    console.log(
        "LinkQR QR Studio"
    );


    console.log(
        "Version: FINAL QR PREVIEW FIX"
    );


    console.log(
        "QR Preview: ALWAYS SQUARE"
    );


    console.log(
        "QR Output: WIDTH = HEIGHT"
    );


    console.log(
        "===================================="
    );

}


initialize();