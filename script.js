const noResults = document.getElementById("no-results");

function renderProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = ""; // مسح أي محتوى سابق

    if (!products || products.length === 0) {
        noResults.style.display = "block";
        return;
    } else {
        noResults.style.display = "none";
    }

    products.forEach((product, i) => {  // أضف i هنا
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="card-content">
            <h3>${product.name}</h3>
            <p class="desc">${product.desc}</p>
            <div class="price">${product.price.toLocaleString()} د.ع</div>
        </div>
    `;

    container.appendChild(card);

    // Touch-hover للجوال فقط
    if (window.innerWidth <= 600) {
        card.addEventListener('touchstart', () => {
            card.classList.add('touch-hover');
        });
        card.addEventListener('touchend', () => {
            card.classList.remove('touch-hover');
        });
    }

    // ظهور تدريجي لكل كارد (staggered fade-in)
    setTimeout(() => {
        card.classList.add("show");
    }, i * 150); 
});
}

// دالة التشغيل الرئيسية
async function initApp() {
    // 1. فحص الموقع الجغرافي أولاً
    const isIraq = await checkUserLocation();
    
    // إذا كان المستخدم خارج العراق، الدالة ستتوقف هنا لأن checkUserLocation سيعيد false
    if (!isIraq) return;

    // 2. إذا كان داخل العراق، نبدأ تشغيل اللودر
    startLoader(() => {
        // 3. عند انتهاء اللودر بنجاح، نقوم بعرض المنتجات
        renderProducts(productsData);
    });
}

// دالة فحص الموقع (محدثة لتعطيك النتيجة)
async function checkUserLocation() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        
        if (data.country_code !== 'IQ') {
            // رسالة الحظر للمستخدمين خارج العراق
            document.body.innerHTML = `
                <div style="height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#2b1414; color:#d4af37; font-family:'Cairo',sans-serif; text-align:center; padding:20px;">
                    <h1 style="font-size:2.5rem; margin-bottom:20px;">عذراً.. كرزات ما شاء الله</h1>
                    <p style="font-size:1.2rem;">خدماتنا متوفرة حالياً فقط داخل 🇮🇶 جمهورية العراق</p>
                </div>`;
            return false;
        }
        return true;
    } catch (e) {
        // في حال فشل السيرفر في تحديد الموقع، نسمح بالدخول للاحتياط
        console.log("Location check failed, proceeding anyway.");
        return true;
    }
}

// دالة اللودر (تستقبل وظيفة لتنفيذها بعد الانتهاء)
function startLoader(callback) {
    const loader = document.getElementById("loader");
    const progressBar = document.getElementById("load-bar");
    const progressText = document.getElementById("load-pc");
    let progress = 0;

    const interval = setInterval(() => {
        progress += 10; // زيادة ثابتة
        if (progress > 100) progress = 100;
        if (progressBar) progressBar.style.width = progress + "%";
        if (progressText) progressText.innerText = progress + "%";

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add("loader-hidden");
                document.body.classList.remove("loading");
                document.body.style.overflow = "auto";
                callback(); // عرض المنتجات
            }, 300); // فاصل صغير قبل الإخفاء
        }
    }, 200);
}

// تشغيل كل شيء عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", initApp);

const productsData = [
    // ===== المكسرات =====
    {category:"المكسرات", name:"حَب عباد الشمس", price:6000, img:"seeds.jpg", desc:"محمص طازج ومقرمش"},
    {category:"المكسرات", name:"كاجو محمص", price:16000, img:"cashew.jpg", desc:"كاجو فاخر محمص"},
    {category:"المكسرات", name:"فستق حلبي (مملح)", price:18000, img:"pistachio1.jpg", desc:"فستق فاخر مملح"},
    {category:"المكسرات", name:"فستق حلبي (حامض)", price:18000, img:"pistachio2.jpg", desc:"فستق بنكهة حامضة"},
    {category:"المكسرات", name:"لوز مملح", price:13000, img:"images/almond1.jpg", desc:"لوز مقرمش مملح"},
    {category:"المكسرات", name:"لوز فاهي", price:13000, img:"images/almond2.jpg", desc:"لوز بدون ملح"},
    {category:"المكسرات", name:"حَب ابيض (مملح)", price:8000, img:"images/white1.jpg", desc:"حب أبيض مملح"},
    {category:"المكسرات", name:"حَب ابيض (فاهي)", price:8000, img:"images/white2.jpg", desc:"حب أبيض بدون ملح"},
    {category:"المكسرات", name:"حَب احمر", price:9000, img:"images/red.jpg", desc:"حب أحمر طازج"},
    {category:"المكسرات", name:"حَب مصري (مملح)", price:6000, img:"images/masri1.jpg", desc:"حب مصري مملح"},
    {category:"المكسرات", name:"حَب مصري (حامض)", price:6000, img:"images/masri2.jpg", desc:"حب مصري حامض"},
    {category:"المكسرات", name:"فستق عبيد (محمص ومملح)", price:5000, img:"images/abeed1.jpg", desc:"فستق عبيد مملح"},
    {category:"المكسرات", name:"فستق عبيد (حامض)", price:5000, img:"images/abeed2.jpg", desc:"فستق عبيد حامض"},
    {category:"المكسرات", name:"فستق عبيد (مغلف وحامض)", price:5000, img:"images/abeed3.jpg", desc:"فستق مغلف حامض"},
    {category:"المكسرات", name:"حمص صغير (محمص)", price:5000, img:"images/chickpeas.jpg", desc:"حمص مقرمش"},
    {category:"المكسرات", name:"ذرة منكهة", price:5000, img:"images/corn.jpg", desc:"ذرة بنكهة خاصة"},
    {category:"المكسرات", name:"حَب گرع", price:9000, img:"images/pumpkin.jpg", desc:"حب گرع طازج"},
    {category:"المكسرات", name:"لب الجوز الامريكي", price:12000, img:"images/pecan1.jpg", desc:"جوز أمريكي طبيعي"},
    {category:"المكسرات", name:"جوز امريكي عادي", price:6000, img:"images/pecan2.jpg", desc:"جوز أمريكي مغلف"},
    {category:"المكسرات", name:"حَب أحمر", price:9000, img:"images/redseed.jpg", desc:"طعم لذيذ وطيب مع المشكل"},

    // ===== الحلويات =====
    {category:"الحلويات", name:"جكليت حليب", price:8000, img:"images/choco1.jpg", desc:"طعم الحليب الأصلي"},
    {category:"الحلويات", name:"جكليت فواكه", price:7500, img:"images/choco2.jpg", desc:"طعم فواكه مع حموضة"},
    {category:"الحلويات", name:"جكليت جيلاتين", price:6000, img:"images/choco3.jpg", desc:"يوجد بكافة الأطعمة"},
    {category:"الحلويات", name:"جكليت كويتي", price:6000, img:"images/choco4.jpg", desc:"جكليت كويتي فاخر"},
    {category:"الحلويات", name:"جكليت كاكاو (نوتيلا)", price:10000, img:"images/nutella.jpg", desc:"كاكاو نوتيلا"},
    {category:"الحلويات", name:"جكليت كاكاو (حليب)", price:10000, img:"images/milk.jpg", desc:"كاكاو بالحليب"},
    {category:"الحلويات", name:"جكليت تمر هندي", price:4000, img:"images/tamr.jpg", desc:"كمية محدودة"},
    {category:"الحلويات", name:"بسكت اصابع قهوائي", price:6000, img:"images/sticks1.jpg", desc:"أصابع كاكاو"},
    {category:"الحلويات", name:" بسكت اصابع حليبي", price:6000, img:"images/sticks2.jpg", desc:"أصابع حليب"},
    {category:"الحلويات", name:"جيلاتين", price:6000, img:"images/jelly.jpg", desc:"بكافة الأنواع"},
    {category:"الحلويات", name:"قرص نعناع", price:4000, img:"images/mint.jpg", desc:"منعش"},
    {category:"الحلويات", name:"بقلاوة", price:6000, img:"images/baklava.jpg", desc:"بقلاوة طازجة"},
    {category:"الحلويات", name:"دهين نجفي", price:4000, img:"images/dahin.jpg", desc:"كمية محدودة"},

    // ===== منتجات أخرى =====
    {category:"منتجات أخرى", name:"جبس كرادة", price:10000, img:"images/chips.jpg", desc:"جبس كرادة الأصلي"},
    {category:"منتجات أخرى", name:"فستق مقرمش", price:6000, img:"images/crispy.jpg", desc:"بكافة الأنواع"},
    {category:"منتجات أخرى", name:"تمر هندي (علبة)", price:3000, img:"images/tamarind1.jpg", desc:"علبة كبيرة"},
    {category:"منتجات أخرى", name:"قمر الدين صغير", price:750, img:"images/tamarind2.jpg", desc:" حجم صغير وملفوف"},
    {category:"منتجات أخرى", name:"قمر الدين (مسطح)", price:500, img:"images/tamarind3.jpg", desc:"حامض وطيب"},
        {category:"منتجات أخرى", name:"قهوة جكليتية", price:20000, img:"images/jeklitya.jpg", desc:"طعم جميل"}
];

// العناصر الرئيسية
const productsEl = document.getElementById("products");
const searchInput = document.getElementById("search");


// دالة البحث
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    currentList = productsData.filter(p =>
        p.name.toLowerCase().includes(term)
    );
    renderProducts(currentList);
});

// دالة الواتساب
function openWhatsApp() {
    const phone = "9647735514122"; 
    const msg = "مرحباً كرزات ما شاء الله، أود الطلب من قائمة المكسرات.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

// دالة الاتصال
function openCall() {
    const phone = "07735514122"; 
    window.location.href = `tel:${phone}`;
}

// منع التمرير أثناء اللودر
document.body.style.overflow = "hidden";


let currentList = productsData;

// التعامل مع الأقسام (Tabs)
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-cat');

        let filteredProducts = category === "all"
            ? currentList
            : currentList.filter(p => p.category === category);

        renderProducts(filteredProducts);
    });
});

const backBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backBtn.classList.toggle("show", window.scrollY > 400);
});
backBtn.onclick = () => window.scrollTo({top:0, behavior:"smooth"});