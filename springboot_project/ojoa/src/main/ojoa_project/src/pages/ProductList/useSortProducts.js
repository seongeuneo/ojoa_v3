// useSortProducts.js

export const useSortProducts = (products, sortKey) => {
    switch (sortKey) {
        case "신상품":
            return products.slice().sort((a, b) => b.id - a.id);
        case "상품명":
            return products.slice().sort((a, b) => a.prod_name.localeCompare(b.prod_name));
        case "낮은가격":
            return products.slice().sort((a, b) => a.prod_price1 - b.prod_price1);
        case "높은가격":
            return products.slice().sort((a, b) => b.prod_price1 - a.prod_price1);
        case "Best": // 새로 추가한 BEST 카테고리 정렬 (별점높은순)
            return products.slice().sort((a, b) => parseFloat(b.prod_grade) - parseFloat(a.prod_grade));
        case "New": // 새로 추가한 New 카테고리 정렬 (각 타입별 id의 숫자가 높은 순으로 - 2개)
            return products.slice().sort((a, b) => parseFloat(b.prod_grade) - parseFloat(a.prod_grade));
        default:
            return products.slice().sort((a, b) => a.id - b.id);
    }
};