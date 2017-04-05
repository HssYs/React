
var React = require('react');
var ReactDom = require('react-dom');

var products = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.9', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'iPad Air  '},
    
];

var SearchBar = React.createClass({
    onHandleChange: function () {
        this.props.changeFilterText(this.refs.inp.value);
    },
    render: function () {
        return (
            <div>
                <input ref='inp' type="text" onChange={this.onHandleChange}/>
                <br/>
                <input type="checkbox" onClick={this.props.changeOnlyShowStocked}/>
                <span>Only show stocked</span>
            </div>
        )
    }
})
var ProductTable = React.createClass({
    componentWillMount: function () {
        this.onHandleChange();
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        this.props = nextProps;
        this.onHandleChange();
        return true;
    },
    onHandleChange: function () {
        var products = this.props.products;
        var lastCategory = '';
        var rows = [];
        var _self = this;
        products.forEach(function (ele, index) {
             if (lastCategory != ele.category) {
                rows.push(
                    <ProductCategory key={index} category={ele.category}></ProductCategory>
                );
                console.log(<ProductCategory key={index} category={ele.category}></ProductCategory>)
             }
             lastCategory = ele.category;
             if (!_self.props.onlyShowStocked || (_self.props.onlyShowStocked && ele.stocked)) {
                 if (ele.name.indexOf(_self.props.filterText) != -1) {
                    rows.push(
                        <ProductRow key={index + 1000} name={ele.name} price={ele.price} stocked={ele.stocked}></ProductRow>
                    )
                 }
             }
        })
        this.rows = rows;
    },
    render: function () {
        return (
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.rows
                    }
                </tbody>
            </table>
        )
    }
})
var ProductCategory = React.createClass({
    render: function () {
        return (
            <tr style={{fontWeight: 900, color: 'skyblue'}}>
                <td>{this.props.category}</td>
            </tr>
        )
    }
})
var ProductRow = React.createClass({
    render: function () {
        return (
            <tr style={this.props.stocked ? {} : {color: '#f00'}}>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
})
var App = React.createClass({
    getInitialState: function () {
        return {
            onlyShowStocked: false,
            filterText: '',
        }
    },
    changeOnlyShowStocked: function () {
        this.setState({
            onlyShowStocked: !this.state.onlyShowStocked,
        }) 
    },
    changeFilterText: function (text) {
        this.setState({
            filterText: text
        })
    },
    render: function () {
        return (
            <div>
                <SearchBar changeFilterText={this.changeFilterText} changeOnlyShowStocked={this.changeOnlyShowStocked}></SearchBar>
                <ProductTable filterText={this.state.filterText} onlyShowStocked={this.state.onlyShowStocked} products={this.props.products}></ProductTable>
            </div>
        )
    }
})

ReactDom.render(
    <App products={products}/>,
    document.getElementById('root')
)