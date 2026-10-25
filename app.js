import { initializeApp } from "https://gstatic.com";
import { getDatabase, ref, onValue } from "https://gstatic.com";

// ফায়ারবেস কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyD3hHIJkwKswBrQ2GENXgczQPToNf-9ATE",
  authDomain: "://firebaseapp.com",
  projectId: "sheikh-agro",
  storageBucket: "sheikh-agro.firebasestorage.app",
  messagingSenderId: "626692427979",
  appId: "1:626692427979:web:6db97abdb501bf8b980b4e",
  measurementId: "G-D3479VJDKL",
  databaseURL: "https://firebaseio.com" // আপনার ডাটাবেজ ইউআরএল
};

// ফায়ারবেস ইনিশিয়ালাইজ
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// HTML কন্টেইনার সিলেকশন
const productContainer = document.getElementById("product-container");

// ডাটাবেজ থেকে পণ্য লোড করার ফাংশন
const productsRef = ref(db, "products");
onValue(productsRef, (snapshot) => {
  const data = snapshot.val();
  
  if (!data) {
    productContainer.innerHTML = "<p style='text-align:center; padding:20px;'>কোনো পণ্য পাওয়া যায়নি।</p>";
    return;
  }

  productContainer.innerHTML = ""; // "পণ্য লোড হচ্ছে..." টেক্সট মুছে ফেলার জন্য

  // ডাটাবেজের অবজেক্ট লুপ করে স্ক্রিনে দেখানো
  Object.keys(data).forEach((key) => {
    const product = data[key];
    productContainer.innerHTML += `
      <div class="product-card" style="border: 1px solid #ddd; padding: 15px; margin: 10px; border-radius: 8px; text-align: center;">
        <img src="${product.imageUrl || 'https://placeholder.com'}" alt="${product.title}" style="max-width: 100%; height: 120px; object-fit: cover; border-radius: 4px;">
        <h3 style="margin: 10px 0 5px 0; font-size: 18px;">${product.title}</h3>
        <p style="color: #666; margin: 0 0 10px 0;">${product.unit || 'প্রতি কেজি'}</p>
        <span style="font-weight: bold; color: #2ecc71; font-size: 16px;">৳${product.price}</span>
      </div>
    `;
  });
}, (error) => {
  console.error("ডেটা লোড করতে সমস্যা হয়েছে:", error);
  productContainer.innerHTML = "<p style='text-align:center; color:red; padding:20px;'>সার্ভার কানেকশন এরর। আবার চেষ্টা করুন।</p>";
});
