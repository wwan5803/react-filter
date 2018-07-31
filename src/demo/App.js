import React, { Component } from "react";
import {
  CategoryFilter,
  BrandFilter,
  RefineResult
} from "../lib";
import "antd/dist/antd.css";
import "./app.css";
const mockData = [
  { id: 0, name: "Nutritional Foods" },
  { id: 1, name: "Woman Care" }
];
for (let i = 2; i < 20; i++) {
  const obj = { id: i, name: "test " + i };
  mockData.push(obj);
}

const mockBrand = [{ id: 0, name: "swiss" }, { id: 1, name: "blackmores" }];
for (let i = 2; i < 20; i++) {
    const obj = { id: i, name: "test " + i };
    mockBrand.push(obj);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: mockData,
      brands: mockBrand,
      pickedCategories: [],
      pickedBrands: [],
      savedCategories: [],
      savedBrands: []
    };
  }
  selectCategory = checkedValues => {
    console.log("category:", checkedValues);
    this.setState({ pickedCategories: checkedValues });
  };
  selectBrand = e => {
    console.log('brand:', JSON.parse(e.target.value));
    const brandObj = JSON.parse(e.target.value);
    let newPickedBrands = [];
    if (e.target.checked) {
      newPickedBrands = [...this.state.pickedBrands, brandObj];
    } else {
      newPickedBrands = this.state.pickedBrands.filter(
        brand => brand.id !== parseInt(brandObj.id)
      );
    }
    this.setState({
      pickedBrands: newPickedBrands
    });
  };
  selectAlphabet = v => {
    console.log("alphabet", v);
    //todo search brands according to alphabet
  };
  saveCategory = () => {
    console.log("savedCategory", this.state.pickedCategories);
    //todo call api of search by category
    const savedCategories = [...this.state.pickedCategories];
    this.setState({
      savedCategories
    });
  };
  saveBrand = () => {
    console.log("pickedBrands", this.state.pickedBrands);
    //todo call api of search by brand
    const savedBrands = [...this.state.pickedBrands];
    this.setState({
      savedBrands
    });
  };
  removeFilter = () => {
    this.setState({
      savedCategories: [],
      savedBrands: []
    });
  };
  render() {
    return (
      <div>
        <RefineResult
          label="Refine By"
          data={[
            ...this.state.savedCategories.map(d => d.name),
            ...this.state.savedBrands.map(d => d.name)
          ]}
          removeFilter={this.removeFilter}
        />
        <CategoryFilter
          selectCategory={this.selectCategory}
          saveCategory={this.saveCategory}
          label="Category"
          data={this.state.categories}
          saveBackground="green"
          cancelBackground="red"
        />
        <BrandFilter
          pickedBrands={this.state.pickedBrands}
          selectBrand={this.selectBrand}
          saveBrand={this.saveBrand}
          selectAlphabet={this.selectAlphabet}
          label="Brand"
          data={this.state.brands}
          saveBackground="green"
          cancelBackground="red"
        />
      </div>
    );
  }
}

export default App;
