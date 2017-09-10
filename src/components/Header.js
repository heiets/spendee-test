import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render() {
        return <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">Spendee App</Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Main</Link></li>
                        <li><Link to="/incomes">Incomes</Link></li>
                        <li><Link to="/spending">Spending</Link></li>
                        <li><Link to="/categories">Categories</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    }
}
export default Header;