export interface Producto {
    category: Category[];
}

export interface Category {
    id:       number;
    name:     string;
    products: Product[];
}

export interface Product {
    id:      number;
    name:    string;
    price:   number;
    format:  string;
    mark:    string;
    checked: boolean;
}
