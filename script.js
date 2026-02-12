// دالة التحقق من الموقع الجغرافي (داخل العراق فقط)
async function checkUserLocation() {
    const loaderText = document.querySelector('.loader-text');
    
    try {
        // الاتصال بخدمة تحديد الموقع
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // IQ هو رمز دولة العراق
        if (data.country_code !== 'IQ') {
            // إذا كان المستخدم خارج العراق، نعرض له رسالة الحظر
            document.body.innerHTML = `
                <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #2b1414; color: #d4af37; font-family: 'Cairo', sans-serif; text-align: center; padding: 20px;">
                    <h1 style="font-family: 'Kufam', sans-serif; font-size: 2.5rem; margin-bottom: 20px;">عذراً.. كرزات ما شاء الله</h1>
                    <div style="width: 80px; height: 2px; background: #d4af37; margin-bottom: 20px;"></div>
                    <p style="font-size: 1.2rem; line-height: 1.6; max-width: 400px;">نعتذر منك، خدماتنا وعروض الأسعار متوفرة حالياً وحصرياً للمستخدمين داخل <br> <strong>جمهورية العراق 🇮🇶</strong></p>
                    <p style="margin-top: 30px; color: #f4e1b3; font-size: 0.9rem; opacity: 0.7;">شكراً لتفهمكم</p>
                </div>
            `;
            return false; // توقف العملية هنا
        }
        return true; // المستخدم داخل العراق
    } catch (error) {
        console.error("خطأ في التحقق من الموقع:", error);
        // في حال فشل الاتصال بالخدمة، يفضل فتح الموقع بدلاً من تعطيله
        return true; 
    }
}

// تعديل كود الـ Window Load ليتناسب مع الفحص
window.addEventListener("load", async function() {
    const isAllowed = await checkUserLocation();
    
    if (isAllowed) {
        const loader = document.getElementById("loader");
        setTimeout(() => {
            if (loader) loader.classList.add("loader-hidden");
        }, 1200); 
    }
});

const productsData = [
    // ===== المكسرات =====
    {category:"المكسرات", name:"حَب عباد الشمس", price:6000, img:"images/seeds.jpg", desc:"محمص طازج ومقرمش"},
    {category:"المكسرات", name:"كاجو محمص", price:16000, img:"images/cashew.jpg", desc:"كاجو فاخر محمص"},
    {category:"المكسرات", name:"فستق حلبي (مملح)", price:18000, img:"images/pistachio1.jpg", desc:"فستق فاخر مملح"},
    {category:"المكسرات", name:"فستق حلبي (حامض)", price:18000, img:"images/pistachio2.jpg", desc:"فستق بنكهة حامضة"},
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
    {category:"المكسرات", name:"قوز امريكي (غير مغلف)", price:12000, img:"images/pecan1.jpg", desc:"قوز أمريكي طبيعي"},
    {category:"المكسرات", name:"قوز امريكي (مغلف)", price:6000, img:"images/pecan2.jpg", desc:"قوز أمريكي مغلف"},

    // ===== الحلويات =====
    {category:"الحلويات", name:"جكليت حليب", price:8000, img:"images/choco1.jpg", desc:"طعم الحليب الأصلي"},
    {category:"الحلويات", name:"جكليت فواكه", price:7500, img:"images/choco2.jpg", desc:"طعم فواكه مع حموضة"},
    {category:"الحلويات", name:"جكليت جيلاتين", price:6000, img:"images/choco3.jpg", desc:"يوجد بكافة الأطعمة"},
    {category:"الحلويات", name:"جكليت كويتي", price:6000, img:"images/choco4.jpg", desc:"جكليت كويتي فاخر"},
    {category:"الحلويات", name:"جكليت كاكاو (نوتيلا)", price:10000, img:"images/nutella.jpg", desc:"كاكاو نوتيلا"},
    {category:"الحلويات", name:"جكليت كاكاو (حليب)", price:10000, img:"images/milk.jpg", desc:"كاكاو بالحليب"},
    {category:"الحلويات", name:"جكليت تمر الدين", price:4000, img:"images/tamr.jpg", desc:"كمية محدودة"},
    {category:"الحلويات", name:"كاكاو اصابع", price:6000, img:"images/sticks1.jpg", desc:"أصابع كاكاو"},
    {category:"الحلويات", name:"حليب اصابع", price:6000, img:"images/sticks2.jpg", desc:"أصابع حليب"},
    {category:"الحلويات", name:"جيلاتين", price:6000, img:"images/jelly.jpg", desc:"بكافة الأنواع"},
    {category:"الحلويات", name:"قرص نعناع", price:4000, img:"images/mint.jpg", desc:"منعش"},
    {category:"الحلويات", name:"بقلاوة", price:6000, img:"images/baklava.jpg", desc:"بقلاوة طازجة"},
    {category:"الحلويات", name:"دهين نجفي", price:4000, img:"images/dahin.jpg", desc:"كمية محدودة"},

    // ===== منتجات أخرى =====
    {category:"منتجات أخرى", name:"جبس كرادة", price:10000, img:"images/chips.jpg", desc:"جبس كرادة الأصلي"},
    {category:"منتجات أخرى", name:"فستق مقرمش", price:6000, img:"images/crispy.jpg", desc:"بكافة الأنواع"},
    {category:"منتجات أخرى", name:"تمر هندي (علبة)", price:3000, img:"images/tamarind1.jpg", desc:"علبة كبيرة"},
    {category:"منتجات أخرى", name:"تمر هندي صغير", price:750, img:"images/tamarind2.jpg", desc:" حجم صغير وملفوف"},
    {category:"منتجات أخرى", name:"تمر هندي (مسطح)", price:500, img:"images/tamarind3.jpg", desc:"حامض وطيب"}
];

// العناصر الرئيسية
const productsEl = document.getElementById("products");
const searchInput = document.getElementById("search");

// عرض المنتجات
function renderProducts(list) {
    productsEl.innerHTML = "";

    list.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="card-content">
                <h3>${p.name}</h3>
                <p class="desc">${p.desc}</p>
                <span class="price">${p.price.toLocaleString()} د.ع</span>
            </div>
        `;
        productsEl.appendChild(card);
    });

    // إضافة الحركة تدريجياً
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, index * 100);
    });
}

// دالة البحث
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim(); // إزالة الفراغات والحروف الكبيرة
    const filtered = productsData.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
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

// اللودر
window.addEventListener('load', function() {
    let progress = 0;
    const bar = document.getElementById('load-bar');
    const pc = document.getElementById('load-pc');
    const loader = document.getElementById('loader');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('loader-hidden');
            }, 500);
        }
        bar.style.width = progress + '%';
        pc.innerText = progress + '%';
    }, 100);
});

// التحميل الأولي للمنتجات
renderProducts(productsData);

// التعامل مع الأقسام (Tabs)
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-cat');
        let filteredProducts = category === "all" ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filteredProducts);
    });
});