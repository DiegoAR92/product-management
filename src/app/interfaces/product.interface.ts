export interface Producto {
    category: Category[];
}

export interface Category {
    id:       number;
    name:     string;
    amount:   number;
}

export interface Product {
    id:      number;
    categoryId:      number;
    name:    string;
    price:   number;
    format:  string;
    mark:    string;
    checked: boolean;
}
