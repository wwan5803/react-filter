import React, { Component } from "react";
import { CategoryFilter, BrandFilter, DateFilter, RefineResult } from "../lib";
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
            pickedCategoryIds: [],
            pickedBrands: [],
            savedCategories: [],
            savedBrands: [],
            startDate: undefined,
            endDate: undefined
        };
    }
    selectCategory = checkedValues => {
        console.log("category:", checkedValues);
        this.setState({ pickedCategoryIds: checkedValues });
    };
    selectBrand = e => {
        console.log("brand:", JSON.parse(e.target.value));
        const brandObj = JSON.parse(e.target.value);
        let newPickedBrands = [];
        if (
            this.state.pickedBrands.find(brand => brand.id === parseInt(brandObj.id))
        ) {
            newPickedBrands = this.state.pickedBrands.filter(
                brand => brand.id !== parseInt(brandObj.id)
            );
        } else {
            newPickedBrands = [...this.state.pickedBrands, brandObj];
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
        console.log("savedCategory", this.state.pickedCategoryIds);
        //todo call api of search by category
        const savedCategories = this.state.categories.filter(c => {
            return c.id === this.state.pickedCategoryIds.find(id => Number(c.id) === Number(id))
        })
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
    removeFilter = type => {
        if (type === "CATEGORY") {
            this.setState({
                savedCategories: [],
                pickedCategoryIds: []
            });
        } else if (type === "BRAND") {
            this.setState({
                savedBrands: [],
                pickedBrands: []
            });
        } else {
            this.setState({
                startDate: undefined,
                endDate: undefined
            });
        }
    };
    selectDateRange = (date, dateString) => {
        this.setState({
            startDate: dateString[0],
            endDate: dateString[1]
        });
    };
    render() {
        return (
            <div>
                <RefineResult
                    label="Refine By"
                    categoryLabel="Category"
                    brandLabel="Brands"
                    dateLabel="Online Date"
                    categories={[...this.state.savedCategories.map(d => d.name)]}
                    brands={[...this.state.savedBrands.map(d => d.name)]}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    date={this.state.startDate && this.state.endDate ? this.state.startDate + ' - ' + this.state.endDate : undefined}
                    removeFilter={this.removeFilter}
                />
                <CategoryFilter
                    selectCategory={this.selectCategory}
                    saveCategory={this.saveCategory}
                    pickedCategoryIds={this.state.pickedCategoryIds}
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
                <DateFilter
                    onChange={this.selectDateRange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    label="Online Date"
                />
            </div>
        );
    }
}

export default App;
