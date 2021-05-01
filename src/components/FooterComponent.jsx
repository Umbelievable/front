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
                <footer className="footer">
                    <a style={{float:'left'}} id="csbtn" className="mybtn" href="/cs-board">Customer&nbsp;Service</a>
                    
                    <span style={{float:'right', padding:'14px'}}onClick = {this.goToAdmin} className="text-muted">UMbelievable</span>
                </footer>
            </div>
        );
    }
}

export default withRouter(FooterComponent);