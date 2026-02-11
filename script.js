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
    {name:"حب عباد الشمس", price:6000, img:"images/seeds.jpg", desc:"اجواد انواع الحب لدينا"},
    {name:"فستق حلبي (مملح)", price:18000, img:"images/pistachio1.jpg", desc:"فستق حلبي (مملح) موصلي ذات طعم رهيب"},
    {name:"فستق حلبي (حامض)", price:11000, img:"images/pistachio2.jpg", desc:"فستق حلبي (حامض) موصلي ذات حموضة جيدة"},
    {name:"كاجو محمص", price:12000, img:"images/cashew.jpg", desc:"كاجو محمص طازج، طعمه لذيذ وشهي"}
];

const productsEl = document.getElementById("products");
const searchInput = document.getElementById("search");

function renderProducts(list) {
    productsEl.innerHTML = "";
    list.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${index * 0.1}s`; // حركة ظهور متسلسلة
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
}

// دالة البحث
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = productsData.filter(p => p.name.includes(term));
    renderProducts(filtered);
});

// دالة الواتساب (مراسلة)
function openWhatsApp() {
    const phone = "9647735514122"; 
    const msg = "مرحباً كرزات ما شاء الله، أود الطلب من قائمة المكسرات.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

// دالة الاتصال (اتصال هاتف)
function openCall() {
    const phone = "07735514122"; 
    window.location.href = `tel:${phone}`;
}

// التحميل الأولي
renderProducts(productsData);

window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    // ننتظر ثانية واحدة إضافية لإعطاء طابع الفخامة ثم نخفيه
    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1000); 
});