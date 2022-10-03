// Файл productList.jsx
import { useState, useEffect } from "react";
import { products as productsFromData } from "../data/products";
import Product from "./product";
import SortSelect from "./sortSelect";
import _ from "lodash";

// Варинты выбора признака сортировки
const sortOptions = [
    {
        value: "priceASC",
        label: "Цена по возрастанию",
        sort: (products) => _.orderBy(products, ["price"], ["asc"])
    },
    {
        value: "priceDESC",
        label: "Цена по убыванию",
        sort: (products) => _.orderBy(products, ["price"], ["desc"])
    },
    {
        value: "ratingASC",
        label: "Рейтинг по возрастанию",
        sort: (products) => _.orderBy(products, ["rating.rate"], ["asc"])
    },
    {
        value: "ratingDESC",
        label: "Рейтинг по убыванию",
        sort: (products) => _.orderBy(products, ["rating.rate"], ["desc"])
    }
];

const ProductList = () => {
    // Наши товары
    const [products] = useState(productsFromData);

    // Переменная для хранения сортированных товаров
    // eslint-disable-next-line no-unused-vars
    const [sortProducts, setSortProducts] = useState(productsFromData); 
    // Хранение признака сортировки
    const [sortSign, setSortSign] = useState("price");

    // Метод для изменения признака сортировки
    const handleChangeSortSign = (e) => {
        setSortSign(e.target.value);
    };

    // отслеживаем изменение признака сортировки или списка товаров
    useEffect(() => {
		
        // В sortOptions ищем признак по которому сортируем 
        const findOption = sortOptions.find(({ value }) => value === sortSign);
            
        // Если такой признак есть
        if (findOption) {    
            // Вызываем нужный метод сортировки
            setSortProducts(findOption.sort(products));
        } else {
                
            // Если не нашли то просто устанавливаем продукты
            setSortProducts(products);
        }
    }, [sortSign, products]);

    return (
        <div className="container mt-t">
            <div>
                {/* Компонент выбора признака сортировки */}
                <SortSelect
                    value={sortSign}
                    options={sortOptions}
                    onSort={handleChangeSortSign}
                />
            </div>
            <div className="row mt-4">
                {sortProducts.map((product) => (
                    // Список товаров
                    <Product key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
