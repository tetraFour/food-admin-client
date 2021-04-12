import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";

class Food {
  foodList = [];
  currentFood = {};

  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async getFoodList() {
    this.isLoading = true;
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/product/get-products`
    );
    this.foodList = data;
    this.isLoading = false;
  }

  async getCurrentFood(id) {
    this.isLoading = true;
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/product/${id}`
    );
    this.currentFood = data;
    this.isLoading = false;
  }

  setIsLoadingInTrue() {
    this.isLoading = true;
  }

  setIsLoadingInFalse() {
    this.isLoading = false;
  }

  get food() {
    return toJS(this.currentFood);
  }

  get sortFoodListByName() {
    if (this.checked) {
      return [...this.foodList].sort((a, b) =>
        a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
      );
    }
    return this.foodList;
  }
}

export const foodStore = new Food();
