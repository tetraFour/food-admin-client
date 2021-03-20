import axios from "axios";
import { makeAutoObservable } from "mobx";

class Test {
  count = 0;
  foodList = [];
  checked = false;
  text = "";

  constructor() {
    makeAutoObservable(this);
    this.getFoodList();
  }

  increment() {
    this.count = this.count + 1;
  }

  decrement() {
    this.count = this.count - 1;
  }

  changeHandler(e) {
    this.text = e.target.value;
  }

  async getFoodList() {
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/get-food`
    );
    this.foodList = data;
  }

  changeChecked() {
    this.checked = !this.checked;
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

export const test = new Test();
