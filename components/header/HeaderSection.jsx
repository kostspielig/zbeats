import React, {Component} from 'react'

class HeaderSection extends Component {
    render() {
        return (
           <div className='app-title'>
               <i className="material-icons">album</i> zBeats
           </div>
        )
    }
}

HeaderSection.propTypes = {
    bpm: React.PropTypes.number.isRequired
}

export default HeaderSection