export const formatPrice = (price: any) => {

    var x = price;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x);
}