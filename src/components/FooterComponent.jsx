import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class FooterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    goToAdmin() {
        window.location.replace('/admin-board');
    }

    render() {
        return (
            <div>
                <footer class="footer">
                    <span onClick = {this.goToAdmin} className="text-muted">UMbelievable</span>
                </footer>
            </div>
        );
    }
}

export default withRouter(FooterComponent);