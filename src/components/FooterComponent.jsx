import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class FooterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <a href='/cs-board' style={{float:'left', fontSize:'16px'}} id="csbtn" className="text-muted" href="/cs-board">Customer&nbsp;Service</a>            
                    <a href='/admin-board' style={{float:'right', padding:'14px', fontSize:'16px'}} className="text-muted">UMbelievable</a>
                </footer>
            </div>
        );
    }
}

export default withRouter(FooterComponent);