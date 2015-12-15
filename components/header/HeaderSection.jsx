import React, {Component} from 'react'

class HeaderSection extends Component {
    render() {
        return (
           <div className='app-title'>
               <h1>zBeats</h1>
           </div>
        )
    }
}

HeaderSection.propTypes = {
    bpm: React.PropTypes.number.isRequired
}

export default HeaderSection