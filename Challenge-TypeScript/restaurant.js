"use strict";
// Menghitung total harga
function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price, 0);
}
// Validasi pesanan
function validateOrder(items, menuList) {
    return items.every((orderedItem) => menuList.some((menuItem) => menuItem.id === orderedItem.id));
}
// Simulasi memasak
function cookFood(order) {
    return new Promise((resolve, reject) => {
        const totalPrepTime = order.items.reduce((total, item) => total + item.prepTime, 0);
        order.status = 'Cooking';
        console.log(`🍳 Pesanan ${order.orderId} sedang dimasak...`);
        console.log(`⏱️ Waktu memasak: ${totalPrepTime / 1000} detik`);
        setTimeout(() => {
            // Kemungkinan gagal 10%
            if (Math.random() < 0.1) {
                reject(new Error('Gagal memasak: Bahan habis!'));
                return;
            }
            order.status = 'Ready';
            console.log(`✅ Pesanan ${order.orderId} sudah siap!`);
            resolve(order);
        }, totalPrepTime);
    });
}
// Simulasi pengiriman
function deliverOrder(orderId) {
    return new Promise((resolve) => {
        console.log(`🚚 Pesanan ${orderId} sedang dikirim...`);
        setTimeout(() => {
            resolve(`Pesanan ${orderId} berhasil diantar ke alamat tujuan!`);
        }, 2000);
    });
}
// Fungsi utama
async function processOrder(orderId, orderedItems, menuList) {
    // Validasi pesanan
    const isValid = validateOrder(orderedItems, menuList);
    if (!isValid) {
        console.error('❌ Pesanan tidak valid! Ada item yang tidak tersedia.');
        return;
    }
    // Hitung total
    const totalPrice = calculateTotal(orderedItems);
    const order = {
        orderId: orderId,
        items: orderedItems,
        totalPrice: totalPrice,
        status: 'Pending'
    };
    console.log('\n==============================');
    console.log(`🍽️ PESANAN ${order.orderId}`);
    console.log('==============================');
    console.log(`Status: ${order.status}`);
    console.log(`Total harga: Rp${order.totalPrice.toLocaleString('id-ID')}`);
    console.log('Item:');
    order.items.forEach((item) => {
        console.log(`- ${item.name} : Rp${item.price.toLocaleString('id-ID')}`);
    });
    // Proses memasak
    try {
        const cookedOrder = await cookFood(order);
        console.log(`Status: ${cookedOrder.status}`);
        // Proses pengiriman
        const deliveryMessage = await deliverOrder(cookedOrder.orderId);
        cookedOrder.status = 'Delivered';
        console.log(`📦 ${deliveryMessage}`);
        console.log(`Status akhir: ${cookedOrder.status}`);
        console.log('==============================');
        console.log('🎉 PESANAN SELESAI!');
        console.log('==============================');
    }
    catch (error) {
        console.error(`❌ ${error instanceof Error ? error.message : error}`);
    }
}
// Data menu
const menu = [
    {
        id: 1,
        name: 'Nasi Goreng Spesial',
        price: 25000,
        prepTime: 3000
    },
    {
        id: 2,
        name: 'Es Teh Manis',
        price: 5000,
        prepTime: 1000
    },
    {
        id: 3,
        name: 'Ayam Bakar Madu',
        price: 35000,
        prepTime: 5000
    }
];
// Menjalankan program
processOrder('ORD-001', [menu[0], menu[1]], menu);
