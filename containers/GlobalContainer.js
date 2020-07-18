import { Container } from "unstated";
import { AsyncStorage } from 'react-native';

import Dishes from 'app/constants/Dishes';
import Categories from 'app/constants/Categories';

export default class GlobalContainer extends Container {

    constructor(props) {
        super(props);
        this.state = {
            dishes: [],
            categories: {
                genreList: []
            }
        };
    }

    writeDishes = async (dishes) => {
        try {
            const minDishes = dishes.map(({ name, place, genre, taste, ingredients, dishType, other }) => (
                { name, place, genre, taste, ingredients, dishType, other }
            ));
            AsyncStorage.setItem('dishes', JSON.stringify(minDishes));

            this.setState({
                dishes: minDishes
            });
        } catch (e) {
            console.warn(e);
        }
    }

    reset = async () => {
        try {
            AsyncStorage.removeItem('dishes');
            AsyncStorage.removeItem('categories');

            this.setState({
                dishes: Dishes,
                categories: Categories
            })
        } catch (e) {
            console.warn(e);
        }
    }

    load = async () => {
        try {
            // initialzie global
            const categoriesFuture = AsyncStorage.getItem('categories');
            const dishesFuture = AsyncStorage.getItem('dishes');

            const categoriesString = await categoriesFuture;
            const dishesString = await dishesFuture;

            const categories = categoriesString ? JSON.parse(categoriesString) : Categories;
            const dishes = dishesString ? JSON.parse(dishesString) : Dishes;

            this.setState({
                dishes: dishes,
                categories: categories
            });
        } catch (e) {
            console.warn(e);
        }
    }
}