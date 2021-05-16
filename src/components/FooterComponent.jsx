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
<<<<<<< HEAD
<<<<<<< HEAD
                    <span onClick = {this.goToAdmin} className="text-muted">UMbelievable</span>
=======
                    <a style={{float:'left'}} id="csbtn" className="mybtn" href="/cs-board">Customer&nbsp;Service</a>
                    
=======
                    <a style={{float:'left'}} id="csbtn" className="mybtn" href="/cs-board">Customer&nbsp;Service</a>            
>>>>>>> 840d536be0884e6bfa08aa4a31f86075ebfcd1a6
                    <span style={{float:'right', padding:'14px'}}onClick = {this.goToAdmin} className="text-muted">UMbelievable</span>
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
                </footer>
            </div>
        );
    }
}

export default withRouter(FooterComponent);